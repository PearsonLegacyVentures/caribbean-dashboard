# Tranquilitas Caribbean Performance

Executive dashboard for Tranquilitas Caribbean sales, service volume, commissions, partner payout and market performance. The app is built from the real workbook at `data/Tranquilitas_Caribbean_Tracker_Simplified.xlsx` and does not parse Excel in the browser.

## Tech stack

- Vite, React 18, TypeScript, React Router
- Tailwind CSS and shadcn/ui primitives
- Recharts for dashboard charts
- Vitest for calculation tests
- Playwright for smoke coverage
- Python standard library for workbook normalization

## Local setup

```bash
npm install
python3 -m pip install -r requirements-dev.txt
npm run data:build
npm run dev
```

## Production checks

```bash
npm run test
npm run lint
npm run build
```

## Data flow

- Raw workbook: `data/Tranquilitas_Caribbean_Tracker_Simplified.xlsx`
- Normalization script: `scripts/normalize_workbook.py`
- Generated frontend data: `src/data/generated/`

Run `npm run data:build` after changing the workbook. Commit the regenerated JSON files with the code change.

## Workbook sheets used

- `LOG_ENTRIES`: transaction source fields including Entry_ID, Timestamp, Region, Country, Service_Key, Service_Raw, Qty (Amt), Unit_Price, Currency, Total_Price, Commission_Rate, Commission_Amount, Booking_Source, Status, Review_Reason and Notes.
- `CONFIG_COUNTRIES`: market normalization, aliases, default currency and commission rate.
- `CONFIG_SERVICES`: service labels, aliases, prices, currency and active flags.
- `CONFIG_COMMISSIONS`: commission context.
- `README`: inspected for operational notes and sensitive values.

The workbook's `DASHBOARD` sheet is not used as a source of truth.

## Metric definitions

- **Sales entries**: count of valid transaction rows.
- **Service volume**: sum of `Qty (Amt)` across valid records.
- **Gross sales**: sum of `Total_Price`; if missing, quantity × unit price where safe.
- **Tranquilitas revenue**: sum of `Commission_Amount`; if missing, gross sales × commission rate where safe.
- **Partner payout**: gross sales minus Tranquilitas revenue.
- **Active markets**: unique countries represented by valid sales records.
- **Average sale per service**: gross sales divided by service volume.

Review records are visible on `/data-review` and excluded from valid KPI totals.

## Refresh process

1. Update `data/Tranquilitas_Caribbean_Tracker_Simplified.xlsx`.
2. Run `npm run data:build`.
3. Confirm the validation summary matches expectations.
4. Run `npm run test`, `npm run lint`, and `npm run build`.
5. Commit the source workbook and generated JSON together.

## Future Google Sheets path

The frontend reads data through a `DashboardDataProvider` interface. A later Google Sheets integration can replace `LocalWorkbookDataProvider` while keeping the metrics, filters and UI unchanged.


## Live Google Sheets record entry

The dashboard now treats the Excel workbook as the seed/configuration source and Google Sheets as the operational source of truth for newly entered records. The frontend talks to a `DashboardDataProvider` adapter, so screens do not depend on spreadsheet implementation details. Local workbook data remains available as a development fallback when `VITE_GOOGLE_SHEETS_API_URL` is not configured.

### Required Google Sheet tabs

Create these tabs before deploying the Apps Script API:

- `SALES_LOG`: `Entry_ID`, `Timestamp`, `Service_Date`, `Region`, `Country`, `Country_Code`, `Service_Key`, `Service_Name`, `Service_Category`, `Duration_Minutes`, `Quantity`, `Unit_Price`, `Currency`, `Gross_Sales`, `Commission_Rate`, `Tranquilitas_Revenue`, `Partner_Payout`, `Booking_Source`, `Channel`, `Entered_By`, `Status`, `Review_Reason`, `Notes`.
- `MARKETS`: `Country`, `Country_Code`, `Region`, `Currency`, `Commission_Rate`, `Active`, `Aliases`.
- `SERVICES`: `Service_Key`, `Country`, `Country_Code`, `Service_Name`, `Service_Category`, `Duration_Minutes`, `Unit_Price`, `Currency`, `Active`, `Aliases`, `Notes`.
- `SETTINGS`: key-value rows for default currency, default booking source, default commission rate, last data refresh, and application version.

### Import the original Excel workbook

Run the workbook normalization flow, review generated markets/services, then import the historic transaction rows into `SALES_LOG`. Use `MARKETS` and `SERVICES` as controlled configuration: active markets determine available countries, and active services are filtered by selected country.

### Deploy Apps Script

The backend lives in `google-apps-script/`. Copy or deploy `Code.gs` and `appsscript.json` into a bound Apps Script project, set the `DASHBOARD_WRITE_TOKEN` Script Property, and deploy the project as a Web App. The script validates request shape, validates country/service combinations, recalculates gross sales, commission revenue, partner payout, generates Entry IDs, and returns structured JSON.

### Frontend environment

Copy `.env.example` into your deployment environment and set placeholders only in your host secrets manager:

```
VITE_GOOGLE_SHEETS_API_URL=
VITE_DASHBOARD_WRITE_TOKEN=
```

Do not commit real credentials. Browser-visible write tokens provide limited protection; keep Script Properties, origin controls where possible, and server-side validation in place. Rotate the token by updating the Apps Script property and frontend deployment secret together, then redeploy the dashboard.

### Testing record creation

Use Add Records to select a country, select a country-specific service, enter quantity and booking source, then submit. The dashboard sends one batch request, disables duplicate submission while pending, clears saved rows only after success, and refreshes dashboard queries so KPIs and Activity reflect the saved records. If the API fails, unsent rows remain in session storage for retry.
