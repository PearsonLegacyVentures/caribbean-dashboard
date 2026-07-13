import { describe, expect, it } from "vitest";
import { calculateEntry, serviceLabel, servicesForCountry, summarizeCalculations } from "@/data/recordEntry";
const market = { region:"Caribbean", country:"St. Barths", countryCode:"BL", aliases:[], commissionRate:.2, defaultCurrency:"USD", active:true };
const services = [
 { region:"Caribbean", country:"St. Barths", countryCode:"BL", serviceKey:"deep-60", serviceName:"Deep Tissue", serviceCategory:"Massage", durationMinutes:60, aliases:[], unitPrice:207, currency:"USD", active:true, notes:null },
 { region:"Caribbean", country:"Curaçao", countryCode:"CW", serviceKey:"couples-60", serviceName:"Couples Massage", serviceCategory:"Massage", durationMinutes:60, aliases:[], unitPrice:390, currency:"USD", active:true, notes:null },
];
describe("record entry calculations", () => {
 it("filters country-specific services without exposing keys as labels", () => { expect(servicesForCountry(services,"BL")).toHaveLength(1); expect(serviceLabel(services[0])).toBe("Deep Tissue — 60 min — $207"); expect(serviceLabel(services[0])).not.toContain("deep-60"); });
 it("selecting a service populates price, duration, gross, commission, and payout", () => { const calc=calculateEntry(market, services[0], 2)!; expect(calc.unitPrice).toBe(207); expect(calc.durationMinutes).toBe(60); expect(calc.grossSales).toBe(414); expect(calc.tranquilitasRevenue).toBe(82.80000000000001); expect(calc.partnerPayout).toBe(331.2); });
 it("marks price overrides and includes them in summaries", () => { const calc=calculateEntry(market, services[0], 1, 250)!; expect(calc.isPriceOverride).toBe(true); expect(summarizeCalculations([{country:"St. Barths",quantity:1,calculation:calc}]).grossSales).toBe(250); });
});
