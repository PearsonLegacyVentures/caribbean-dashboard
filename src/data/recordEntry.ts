import type { Market, SalesRecord, ServiceDefinition } from "./types";

export const BOOKING_SOURCES = ["Direct", "Website", "Concierge", "Airbnb", "Hotel", "DMC", "Partner", "WhatsApp", "Phone", "Other"] as const;
export type BookingSource = (typeof BOOKING_SOURCES)[number];

export interface NewSalesRecord {
  serviceDate: string;
  region?: string;
  country: string;
  countryCode: string;
  serviceKey: string;
  quantity: number;
  bookingSource: string;
  channel?: string;
  enteredBy?: string;
  status?: "valid" | "review";
  reviewReason?: string;
  notes?: string;
  unitPriceOverride?: number | null;
  priceOverrideReason?: string;
  commissionRateOverride?: number | null;
  rawServiceNote?: string;
  batchId?: string;
}

export interface CreateRecordResult { created: SalesRecord[]; batchId: string; summary: EntrySummary; }
export interface UpdateRecordResult { record: SalesRecord; }
export interface EntryCalculation { unitPrice: number; standardUnitPrice: number; currency: string; grossSales: number; commissionRate: number; tranquilitasRevenue: number; partnerPayout: number; serviceCategory: string; durationMinutes: number | null; isPriceOverride: boolean; }
export interface EntrySummary { records: number; serviceVolume: number; grossSales: number; tranquilitasRevenue: number; partnerPayout: number; countries: string[]; }

export function activeMarkets(markets: Market[]) { return markets.filter((m) => m.active).sort((a, b) => a.country.localeCompare(b.country)); }
export function servicesForCountry(services: ServiceDefinition[], countryCode: string) { return services.filter((s) => s.active && s.countryCode === countryCode).sort((a,b)=>a.serviceName.localeCompare(b.serviceName) || (a.durationMinutes ?? 0) - (b.durationMinutes ?? 0)); }
export function serviceLabel(service: ServiceDefinition) { const price = service.unitPrice == null ? "Market rate" : new Intl.NumberFormat("en-US", { style: "currency", currency: service.currency || "USD", maximumFractionDigits: 0 }).format(service.unitPrice); return `${service.serviceName}${service.durationMinutes ? ` — ${service.durationMinutes} min` : ""} — ${price}`; }
export function normalizeBookingSource(value: string) { const cleaned = value.trim(); return BOOKING_SOURCES.find((s) => s.toLowerCase() === cleaned.toLowerCase()) ?? "Other"; }
export function calculateEntry(market?: Market, service?: ServiceDefinition, quantity = 1, unitPriceOverride?: number | null, commissionRateOverride?: number | null): EntryCalculation | null {
  if (!market || !service || service.unitPrice == null) return null;
  const standardUnitPrice = service.unitPrice;
  const unitPrice = unitPriceOverride != null ? unitPriceOverride : standardUnitPrice;
  const commissionRate = commissionRateOverride != null ? commissionRateOverride : market.commissionRate ?? 0;
  const grossSales = Math.max(0, quantity) * unitPrice;
  const tranquilitasRevenue = grossSales * commissionRate;
  return { unitPrice, standardUnitPrice, currency: service.currency || market.defaultCurrency || "USD", grossSales, commissionRate, tranquilitasRevenue, partnerPayout: grossSales - tranquilitasRevenue, serviceCategory: service.serviceCategory, durationMinutes: service.durationMinutes, isPriceOverride: unitPrice !== standardUnitPrice };
}
export function summarizeCalculations(rows: Array<{ country?: string; quantity: number; calculation: EntryCalculation | null }>): EntrySummary { return rows.reduce<EntrySummary>((sum, row) => { if (!row.calculation) return sum; sum.records += 1; sum.serviceVolume += row.quantity; sum.grossSales += row.calculation.grossSales; sum.tranquilitasRevenue += row.calculation.tranquilitasRevenue; sum.partnerPayout += row.calculation.partnerPayout; if (row.country && !sum.countries.includes(row.country)) sum.countries.push(row.country); return sum; }, { records: 0, serviceVolume: 0, grossSales: 0, tranquilitasRevenue: 0, partnerPayout: 0, countries: [] }); }
