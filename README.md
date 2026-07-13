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
