# Google Apps Script live records API

Create a Google Sheet with `SALES_LOG`, `MARKETS`, `SERVICES`, and `SETTINGS` tabs using the columns documented in the project README. Import the normalized Excel workbook into those tabs before enabling writes.

## Deploy
1. Create a bound Apps Script project for the Google Sheet.
2. Copy `Code.gs` and `appsscript.json` into the Apps Script editor or deploy with `clasp`.
3. In **Project Settings → Script Properties**, add `DASHBOARD_WRITE_TOKEN` with a generated secret value.
4. Deploy as a Web App. Use **Execute as me** and restrict access as tightly as your workspace permits.
5. Add the Web App URL to `VITE_GOOGLE_SHEETS_API_URL` and the same token to `VITE_DASHBOARD_WRITE_TOKEN` in the frontend deployment environment.

Client-side tokens are a limited protection layer because browser code can be inspected. Keep the adapter boundary in place so Google sign-in, a server proxy, or stronger auth can be added later without rewriting dashboard screens.
