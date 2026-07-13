import records from "../generated/sales-records.json";
import markets from "../generated/markets.json";
import services from "../generated/services.json";
import reviews from "../generated/review-issues.json";
import metadata from "../generated/metadata.json";
import type { DashboardDataProvider, DataReviewIssue, DashboardMetadata, Market, SalesRecord, ServiceDefinition } from "../types";
import type { NewSalesRecord } from "../recordEntry";

export class LocalWorkbookDataProvider implements DashboardDataProvider {
  private liveRecords = [...(records as SalesRecord[])];
  async getSalesRecords(){return this.liveRecords}
  async getMarkets(){return markets as Market[]}
  async getServices(){return services as ServiceDefinition[]}
  async createSalesRecords(newRecords: NewSalesRecord[]){
    const created: SalesRecord[] = newRecords.map((record,index)=>({ id:`LOCAL-${Date.now()}-${index}`, timestamp:new Date().toISOString(), date:record.serviceDate, monthKey:record.serviceDate.slice(0,7), year:Number(record.serviceDate.slice(0,4)), region:"Caribbean", country:record.country, countryCode:record.countryCode, serviceKey:record.serviceKey, serviceName:null, serviceCategory:null, durationMinutes:null, quantity:record.quantity, unitPrice:record.unitPriceOverride ?? 0, currency:"USD", grossSales:0, commissionRate:0, tranquilitasRevenue:0, partnerPayout:0, bookingSource:record.bookingSource, channel:record.channel || "Dashboard", sender:record.enteredBy || "Dashboard", status:"valid", sourceStatus:null, reviewReason:null, notes:record.notes || null }));
    this.liveRecords=[...created,...this.liveRecords];
    return {created,batchId:`LOCAL-${Date.now()}`,summary:{records:created.length,serviceVolume:created.reduce((n,r)=>n+r.quantity,0),grossSales:0,tranquilitasRevenue:0,partnerPayout:0,countries:[...new Set(created.map(r=>r.country))]}}
  }
  async updateSalesRecord(id:string,updates:Partial<NewSalesRecord>){ const record=this.liveRecords.find(r=>r.id===id); if(!record) throw new Error("Record not found"); Object.assign(record,{date:updates.serviceDate ?? record.date, quantity:updates.quantity ?? record.quantity, bookingSource:updates.bookingSource ?? record.bookingSource, notes:updates.notes ?? record.notes}); return {record};}
  async getReviewIssues(){return reviews as DataReviewIssue[]} async getMetadata(){return metadata as DashboardMetadata}
}
export const localWorkbookDataProvider = new LocalWorkbookDataProvider();
export const dashboardData = { records: records as SalesRecord[], markets: markets as Market[], services: services as ServiceDefinition[], reviews: reviews as DataReviewIssue[], metadata: metadata as DashboardMetadata };
