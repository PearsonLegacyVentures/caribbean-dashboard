import type { DashboardDataProvider, DataReviewIssue, DashboardMetadata, Market, SalesRecord, ServiceDefinition } from "../types";
import type { CreateRecordResult, NewSalesRecord, UpdateRecordResult } from "../recordEntry";

type ApiSuccess<T> = { success: true; data: T; message?: string };
type ApiFailure = { success: false; error: { code: string; message: string } };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export class GoogleSheetsDataProvider implements DashboardDataProvider {
  constructor(private apiUrl: string, private writeToken = import.meta.env.VITE_DASHBOARD_WRITE_TOKEN || "") {}
  private async request<T>(action: string, payload?: unknown, write = false): Promise<T> {
    const res = await fetch(this.apiUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action, token: write ? this.writeToken : undefined, payload }) });
    const json = (await res.json()) as ApiResponse<T>;
    if (!json.success) throw new Error(json.error.message);
    return json.data;
  }
  getSalesRecords(){ return this.request<SalesRecord[]>("GET_RECORDS"); }
  getMarkets(){ return this.request<Market[]>("GET_MARKETS"); }
  getServices(){ return this.request<ServiceDefinition[]>("GET_SERVICES"); }
  createSalesRecords(records: NewSalesRecord[]){ return this.request<CreateRecordResult>("CREATE_RECORDS", { records, idempotencyKey: crypto.randomUUID() }, true); }
  updateSalesRecord(id: string, updates: Partial<NewSalesRecord>){ return this.request<UpdateRecordResult>("UPDATE_RECORD", { id, updates }, true); }
  getReviewIssues(){ return Promise.resolve([] as DataReviewIssue[]); }
  getMetadata(){ return Promise.resolve({ sourceFile:"Google Sheets", lastNormalizedAt:new Date().toISOString(), sheetsUsed:["SALES_LOG","MARKETS","SERVICES","SETTINGS"], availableRange:{start:"2024-01-01",end:new Date().toISOString().slice(0,10)}, defaultCurrency:"USD", recordCounts:{totalPopulatedRecords:0,validRecords:0,reviewRecords:0}, configuredMarkets:0, activeServiceDefinitions:0, defaultCommissionRate:0, securityReview:"Write requests require token validation in Apps Script." } as DashboardMetadata); }
}
