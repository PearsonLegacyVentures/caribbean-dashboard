import type { DashboardDataProvider, DataReviewIssue, DashboardMetadata, Market, SalesRecord, ServiceDefinition } from "../types";
import type { CreateRecordResult, NewSalesRecord, UpdateRecordResult } from "../recordEntry";

type ApiSuccess<T> = { success: true; data: T; message?: string };
type ApiFailure = { success: false; error: { code: string; message: string } };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

type SheetRow = Record<string, unknown>;
const value = (row: SheetRow, camel: string, sheet: string) => row[camel] ?? row[sheet];
const textValue = (row: SheetRow, camel: string, sheet: string) => String(value(row, camel, sheet) ?? "");
const numberValue = (row: SheetRow, camel: string, sheet: string) => Number(value(row, camel, sheet) ?? 0);
const nullableNumber = (row: SheetRow, camel: string, sheet: string) => {
  const raw = value(row, camel, sheet);
  return raw === "" || raw == null ? null : Number(raw);
};
const booleanValue = (row: SheetRow, camel: string, sheet: string) => {
  const raw = value(row, camel, sheet);
  return typeof raw === "boolean" ? raw : String(raw ?? "true").toLowerCase() !== "false";
};
const aliasesValue = (row: SheetRow) => {
  const raw = value(row, "aliases", "Aliases");
  return Array.isArray(raw) ? raw.map(String) : String(raw ?? "").split(",").map((item) => item.trim()).filter(Boolean);
};

/** Accept both the camel-case API contract and raw Google Sheet header rows. */
export function normalizeApiRecord(row: SheetRow): SalesRecord {
  const date = textValue(row, "date", "Service_Date").slice(0, 10);
  return {
    id: textValue(row, "id", "Entry_ID"), timestamp: textValue(row, "timestamp", "Timestamp"), date,
    monthKey: textValue(row, "monthKey", "Month_Key") || date.slice(0, 7), year: numberValue(row, "year", "Year") || Number(date.slice(0, 4)),
    region: textValue(row, "region", "Region"), country: textValue(row, "country", "Country"), countryCode: textValue(row, "countryCode", "Country_Code"),
    serviceKey: textValue(row, "serviceKey", "Service_Key"), serviceName: textValue(row, "serviceName", "Service_Name") || null,
    serviceCategory: textValue(row, "serviceCategory", "Service_Category") || null, durationMinutes: nullableNumber(row, "durationMinutes", "Duration_Minutes"),
    quantity: numberValue(row, "quantity", "Quantity"), unitPrice: numberValue(row, "unitPrice", "Unit_Price"), currency: textValue(row, "currency", "Currency"),
    grossSales: numberValue(row, "grossSales", "Gross_Sales"), commissionRate: numberValue(row, "commissionRate", "Commission_Rate"),
    tranquilitasRevenue: numberValue(row, "tranquilitasRevenue", "Tranquilitas_Revenue"), partnerPayout: numberValue(row, "partnerPayout", "Partner_Payout"),
    bookingSource: textValue(row, "bookingSource", "Booking_Source"), channel: textValue(row, "channel", "Channel"), sender: textValue(row, "sender", "Entered_By"),
    status: (textValue(row, "status", "Status") || "valid") as SalesRecord["status"], sourceStatus: textValue(row, "sourceStatus", "Source_Status") || null,
    reviewReason: textValue(row, "reviewReason", "Review_Reason") || null, notes: textValue(row, "notes", "Notes") || null,
  };
}

export function normalizeApiMarket(row: SheetRow): Market {
  return { region: textValue(row, "region", "Region"), country: textValue(row, "country", "Country"), countryCode: textValue(row, "countryCode", "Country_Code"), aliases: aliasesValue(row), commissionRate: nullableNumber(row, "commissionRate", "Commission_Rate"), defaultCurrency: textValue(row, "defaultCurrency", "Currency") || "USD", active: booleanValue(row, "active", "Active") };
}

export function normalizeApiService(row: SheetRow): ServiceDefinition {
  return { region: textValue(row, "region", "Region"), country: textValue(row, "country", "Country"), countryCode: textValue(row, "countryCode", "Country_Code"), serviceKey: textValue(row, "serviceKey", "Service_Key"), serviceName: textValue(row, "serviceName", "Service_Name"), serviceCategory: textValue(row, "serviceCategory", "Service_Category"), durationMinutes: nullableNumber(row, "durationMinutes", "Duration_Minutes"), aliases: aliasesValue(row), unitPrice: nullableNumber(row, "unitPrice", "Unit_Price"), currency: textValue(row, "currency", "Currency") || "USD", active: booleanValue(row, "active", "Active"), notes: textValue(row, "notes", "Notes") || null };
}

export class GoogleSheetsDataProvider implements DashboardDataProvider {
  constructor(private apiUrl: string, private writeToken = import.meta.env.VITE_DASHBOARD_WRITE_TOKEN || "") {}
  private async request<T>(action: string, payload?: unknown, write = false): Promise<T> {
    const res = await fetch(this.apiUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action, token: write ? this.writeToken : undefined, payload }) });
    const json = (await res.json()) as ApiResponse<T>;
    if (!json.success) throw new Error(json.error.message);
    return json.data;
  }
  async getSalesRecords(){ return (await this.request<SheetRow[]>("GET_RECORDS")).map(normalizeApiRecord); }
  async getMarkets(){ return (await this.request<SheetRow[]>("GET_MARKETS")).map(normalizeApiMarket); }
  async getServices(){ return (await this.request<SheetRow[]>("GET_SERVICES")).map(normalizeApiService); }
  createSalesRecords(records: NewSalesRecord[]){ return this.request<CreateRecordResult>("CREATE_RECORDS", { records, idempotencyKey: crypto.randomUUID() }, true); }
  updateSalesRecord(id: string, updates: Partial<NewSalesRecord>){ return this.request<UpdateRecordResult>("UPDATE_RECORD", { id, updates }, true); }
  getReviewIssues(){ return Promise.resolve([] as DataReviewIssue[]); }
  getMetadata(){ return Promise.resolve({ sourceFile:"Google Sheets", lastNormalizedAt:new Date().toISOString(), sheetsUsed:["SALES_LOG","MARKETS","SERVICES","SETTINGS"], availableRange:{start:"2024-01-01",end:new Date().toISOString().slice(0,10)}, defaultCurrency:"USD", recordCounts:{totalPopulatedRecords:0,validRecords:0,reviewRecords:0}, configuredMarkets:0, activeServiceDefinitions:0, defaultCommissionRate:0, securityReview:"Write requests require token validation in Apps Script." } as DashboardMetadata); }
}
