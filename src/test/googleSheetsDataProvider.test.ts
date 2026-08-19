import { describe, expect, it } from "vitest";
import { normalizeApiMarket, normalizeApiRecord, normalizeApiService } from "@/data/providers/GoogleSheetsDataProvider";

describe("Google Sheets response normalization", () => {
  it("maps raw SALES_LOG headers to dashboard records", () => {
    const record = normalizeApiRecord({ Entry_ID:"CE-1", Timestamp:"2026-08-19T12:00:00Z", Service_Date:"2026-08-19", Region:"Caribbean", Country:"Curaçao", Country_Code:"CW", Service_Key:"deep-60", Service_Name:"Deep Tissue", Service_Category:"Massage", Duration_Minutes:60, Quantity:2, Unit_Price:200, Currency:"USD", Gross_Sales:400, Commission_Rate:.2, Tranquilitas_Revenue:80, Partner_Payout:320, Booking_Source:"Direct", Channel:"Dashboard", Entered_By:"Owner", Status:"valid", Review_Reason:"", Notes:"Manual entry" });
    expect(record).toMatchObject({ id:"CE-1", date:"2026-08-19", monthKey:"2026-08", year:2026, countryCode:"CW", serviceName:"Deep Tissue", quantity:2, grossSales:400, notes:"Manual entry" });
  });

  it("maps raw configuration rows so entry controls remain populated", () => {
    const market = normalizeApiMarket({ Country:"Curaçao", Country_Code:"CW", Region:"Caribbean", Currency:"USD", Commission_Rate:.2, Active:true, Aliases:"Curacao, CW" });
    const service = normalizeApiService({ Country:"Curaçao", Country_Code:"CW", Region:"Caribbean", Service_Key:"deep-60", Service_Name:"Deep Tissue", Service_Category:"Massage", Duration_Minutes:60, Unit_Price:200, Currency:"USD", Active:true });
    expect(market).toMatchObject({ countryCode:"CW", commissionRate:.2, active:true, aliases:["Curacao", "CW"] });
    expect(service).toMatchObject({ serviceKey:"deep-60", unitPrice:200, active:true });
  });
});
