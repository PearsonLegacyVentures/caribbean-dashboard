export const currency = (value:number, code="USD") => new Intl.NumberFormat("en-US",{style:"currency",currency:code,maximumFractionDigits:0}).format(value);
export const currencyExact = (value:number, code="USD") => new Intl.NumberFormat("en-US",{style:"currency",currency:code,minimumFractionDigits:2,maximumFractionDigits:2}).format(value);
export const number = (value:number) => new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(value);
export const percent = (value:number) => `${(value*100).toFixed(1)}%`;
export const dateLabel = (iso:string|null) => iso ? new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}).format(new Date(`${iso}T00:00:00Z`)) : "—";
export const monthLabel = (month:string) => new Intl.DateTimeFormat("en-US",{month:"short",year:"numeric",timeZone:"UTC"}).format(new Date(`${month}-01T00:00:00Z`));
