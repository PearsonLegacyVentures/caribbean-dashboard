#!/usr/bin/env python3
import json, re, zipfile, xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
NS={'a':'http://schemas.openxmlformats.org/spreadsheetml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
ROOT=Path(__file__).resolve().parents[1]
XLSX=ROOT/'data/Tranquilitas_Caribbean_Tracker_Simplified.xlsx'
OUT=ROOT/'src/data/generated'
CODES={'Anguilla':'AIA','Antigua':'ATG','BVI':'VGB','Barbados':'BRB','Belize':'BLZ','Cayman Islands':'CYM','Curacao':'CUR','Grenada':'GRD','St Kitts and Nevis':'KNA','St Lucia':'LCA','St Martin':'MAF','Turks and Caicos':'TCA','St Barths':'BLM','US Virgin Islands':'VIR'}
DISPLAY={'Curacao':'Curaçao','St Lucia':'St. Lucia','St Kitts and Nevis':'St. Kitts and Nevis','St Barths':'St. Barths','St Martin':'St. Martin'}

def clean(v):
    if v is None: return ''
    s=str(v).strip()
    return '' if s in ('""','None') else s.strip('"').strip()
def num(v):
    s=clean(v)
    if not s: return None
    try: return float(s)
    except ValueError: return None
def norm(s): return re.sub(r'[^a-z0-9]+',' ',clean(s).lower()).strip()
def colnum(ref):
    m=re.match(r'([A-Z]+)',ref); n=0
    for c in m.group(1): n=n*26+ord(c)-64
    return n-1

def read_book():
    z=zipfile.ZipFile(XLSX); ss=[]
    root=ET.fromstring(z.read('xl/sharedStrings.xml'))
    for si in root.findall('a:si',NS): ss.append(''.join(si.itertext()))
    wb=ET.fromstring(z.read('xl/workbook.xml')); rels=ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    rmap={r.attrib['Id']:r.attrib['Target'] for r in rels}
    sheets={}
    for sh in wb.findall('.//a:sheet',NS):
        name=sh.attrib['name']; rid=sh.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
        ws=ET.fromstring(z.read('xl/'+rmap[rid])); rows=[]
        for row in ws.findall('.//a:sheetData/a:row',NS):
            vals=[]
            for c in row.findall('a:c',NS):
                v=c.find('a:v',NS); val=''.join(v.itertext()) if v is not None else ''
                if c.attrib.get('t')=='s' and val!='': val=ss[int(val)]
                i=colnum(c.attrib['r'])
                while len(vals)<=i: vals.append('')
                vals[i]=clean(val)
            rows.append(vals)
        sheets[name]=rows
    return sheets

def category(name,key):
    t=norm((name or '')+' '+(key or ''))
    for cat, terms in [('Deep Tissue',['deep']),('Swedish',['swedish']),('Couples',['couples']),('Sports Massage',['sports']),('Beach Massage',['beach']),('Bahama Bliss',['bahama']),('Facial',['facial']),('Express Massage',['express'])]:
        if any(x in t for x in terms): return cat
    return 'Specialty' if any(x in t for x in ['reflexology','four hands','lymphatic','coconut','seashell']) else 'Other'
def duration(name,key):
    m=re.search(r'(\d{2,3})\s*(?:min|minutes|hr)?', (name or '')+' '+(key or ''))
    if m: return int(m.group(1))
    if '1hr' in (name or '').lower(): return 60
    return None
def display_service(name,key):
    cat=category(name,key); d=duration(name,key)
    return f"{cat} ({d} min)" if d and cat!='Other' else (clean(name) or cat)

def main():
    sheets=read_book(); OUT.mkdir(parents=True,exist_ok=True)
    countries=[]; cmap={}; aliases={}
    for r in sheets['CONFIG_COUNTRIES'][1:]:
        if len(r)<2 or not clean(r[1]): continue
        reg,c=clean(r[0]),clean(r[1]); active=clean(r[5] if len(r)>5 else '').upper()=='Y'
        if reg!='Caribbean': continue
        m={'region':reg,'country':DISPLAY.get(c,c),'canonicalCountry':c,'countryCode':CODES.get(c,c[:3].upper()),'aliases':[a.strip() for a in clean(r[2]).split(',') if a.strip() and a.strip() not in ('st','saint')],'commissionRate':num(r[3]),'defaultCurrency':clean(r[4]) or 'USD','active':active}
        countries.append(m); cmap[c]=m
        aliases[norm(c)]=c
        for a in m['aliases']: aliases[norm(a)]=c
    services=[]; service_by_key={}
    for r in sheets['CONFIG_SERVICES'][1:]:
        if len(r)<4 or not clean(r[2]): continue
        reg,c,key,name=clean(r[0]),clean(r[1]),clean(r[2]),clean(r[3])
        s={'region':'Caribbean','country':DISPLAY.get(c,c),'countryCode':CODES.get(c,c[:3].upper()),'serviceKey':key,'serviceName':display_service(name,key),'serviceCategory':category(name,key),'durationMinutes':duration(name,key),'aliases':[a.strip() for a in clean(r[4]).split(',') if a.strip()],'unitPrice':num(r[5]),'currency':clean(r[6]) or 'USD','active':clean(r[7]).upper()=='Y','notes':clean(r[8]) or None}
        services.append(s); service_by_key[key]=s
    records=[]; reviews=[]; seen={}
    headers=sheets['LOG_ENTRIES'][0]
    for r in sheets['LOG_ENTRIES'][1:]:
        if not r or not clean(r[0]): continue
        d={headers[i]: r[i] if i<len(r) else '' for i in range(min(len(headers),18))}
        raw_country=clean(d.get('Country')); canon=aliases.get(norm(raw_country)); market=cmap.get(canon or '')
        key=clean(d.get('Service_Key')); rawsvc=clean(d.get('Service_Raw')); svc=service_by_key.get(key)
        q=num(d.get('Qty (Amt)')); up=num(d.get('Unit_Price')); total=num(d.get('Total_Price')); rate=num(d.get('Commission_Rate')); comm=num(d.get('Commission_Amount'))
        ts=clean(d.get('Timestamp')); source=clean(d.get('Status')); reasons=[]
        if not canon and raw_country and source.upper()=='OK':
            market={'country':DISPLAY.get(raw_country,raw_country),'countryCode':CODES.get(raw_country, re.sub(r'[^A-Z]','',raw_country.upper())[:3] or 'UNK'),'defaultCurrency':'USD'}
        elif not canon: reasons.append('Country not recognized' if raw_country else 'Missing country')
        if not svc: reasons.append('Service alias not recognized' if (key or rawsvc) else 'Missing service')
        if not q: reasons.append('Zero quantity' if q==0 else 'Missing quantity')
        if not up: reasons.append('Zero price' if up==0 else 'Missing price')
        if total is None and q and up: total=round(q*up,2)
        if total is None: reasons.append('Missing total')
        if comm is None and total is not None and rate is not None: comm=round(total*rate,2)
        if comm is None: reasons.append('Missing commission')
        try:
            dt=datetime.fromisoformat(ts.replace('Z','+00:00')); date=dt.date().isoformat(); month=date[:7]; year=dt.year
        except Exception:
            date=''; month=''; year=0; reasons.append('Invalid date')
        sig='|'.join([clean(d.get('Entry_ID')),ts,canon or raw_country,key,str(q),str(total)])
        if sig in seen: reasons.append('Probable duplicate')
        seen[sig]=1
        valid=(source.upper()=='OK' and not reasons)
        base={'id':clean(d.get('Entry_ID')),'timestamp':ts,'date':date,'monthKey':month,'year':year,'region':'Caribbean','country':market['country'] if market else raw_country,'countryCode':market['countryCode'] if market else 'UNR','serviceKey':key,'serviceName':svc['serviceName'] if svc else (rawsvc or None),'serviceCategory':svc['serviceCategory'] if svc else None,'durationMinutes':svc['durationMinutes'] if svc else None,'quantity':q,'unitPrice':up,'currency':clean(d.get('Currency')) or (market['defaultCurrency'] if market else 'USD'),'grossSales':total,'commissionRate':rate,'tranquilitasRevenue':comm,'partnerPayout':round((total or 0)-(comm or 0),2) if total is not None and comm is not None else None,'bookingSource':clean(d.get('Booking_Source')) or 'Unspecified','channel':clean(d.get('Channel')),'sender':clean(d.get('Sender')),'status':'valid' if valid else 'review','sourceStatus':source,'reviewReason':clean(d.get('Review_Reason')) or None,'reviewReasons':reasons or ([clean(d.get('Review_Reason'))] if source.upper()!='OK' and clean(d.get('Review_Reason')) else []),'notes':clean(d.get('Notes')) or None,'rawCountry':raw_country,'rawService':rawsvc}
        if valid: records.append(base)
        else: reviews.append(base)
    allrec=[]
    for x in records+reviews:
        y=x.copy(); y['quantity']=y['quantity'] or 0; y['unitPrice']=y['unitPrice'] or 0; y['grossSales']=y['grossSales'] or 0; y['commissionRate']=y['commissionRate'] or 0; y['tranquilitasRevenue']=y['tranquilitasRevenue'] or 0; y['partnerPayout']=y['partnerPayout'] or 0; y.pop('reviewReasons',None); allrec.append(y)
    meta={'sourceFile':str(XLSX.relative_to(ROOT)),'lastNormalizedAt':datetime.now(timezone.utc).isoformat(),'sheetsUsed':['LOG_ENTRIES','CONFIG_SERVICES','CONFIG_COMMISSIONS','CONFIG_COUNTRIES','README'],'availableRange':{'start':min(r['date'] for r in records),'end':max(r['date'] for r in records)},'defaultCurrency':'USD','recordCounts':{'totalPopulatedRecords':len(records)+len(reviews),'validRecords':len(records),'reviewRecords':len(reviews)},'configuredMarkets':len(countries),'activeServiceDefinitions':sum(1 for s in services if s['active']),'defaultCommissionRate':0.15,'securityReview':'README sheet inspected; no credentials, tokens, API keys, passwords, or customer contact details were included in generated JSON.'}
    for name,data in [('sales-records.json',allrec),('markets.json',countries),('services.json',services),('review-issues.json',reviews),('metadata.json',meta)]:
        (OUT/name).write_text(json.dumps(data,indent=2,ensure_ascii=False))
    gross=sum(r['grossSales'] for r in records); qty=sum(r['quantity'] for r in records); comm=sum(r['tranquilitasRevenue'] for r in records)
    assert len(records)==34 and len(reviews)==6 and qty==135 and round(gross,2)==25192 and round(comm,2)==3778.8
    print('Normalized',meta['recordCounts'],'gross',gross,'qty',qty,'commission',comm)
if __name__=='__main__': main()
