import records from "../generated/sales-records.json";
import markets from "../generated/markets.json";
import services from "../generated/services.json";
import reviews from "../generated/review-issues.json";
import metadata from "../generated/metadata.json";
import type { DashboardDataProvider, DataReviewIssue, DashboardMetadata, Market, SalesRecord, ServiceDefinition } from "../types";
export class LocalWorkbookDataProvider implements DashboardDataProvider { async getSalesRecords(){return records as SalesRecord[]} async getMarkets(){return markets as Market[]} async getServices(){return services as ServiceDefinition[]} async getReviewIssues(){return reviews as DataReviewIssue[]} async getMetadata(){return metadata as DashboardMetadata} }
export const localWorkbookDataProvider = new LocalWorkbookDataProvider();
export const dashboardData = { records: records as SalesRecord[], markets: markets as Market[], services: services as ServiceDefinition[], reviews: reviews as DataReviewIssue[], metadata: metadata as DashboardMetadata };
