import { GoogleSheetsDataProvider } from "./GoogleSheetsDataProvider";
import { localWorkbookDataProvider } from "./LocalWorkbookDataProvider";

export const dashboardProvider = import.meta.env.VITE_GOOGLE_SHEETS_API_URL
  ? new GoogleSheetsDataProvider(import.meta.env.VITE_GOOGLE_SHEETS_API_URL)
  : localWorkbookDataProvider;
