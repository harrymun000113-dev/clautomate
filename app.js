(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- reference data ---------- */
const C={
 US:{ko:"미국",en:"the United States",style:"direct",cur:"USD",we:[0,6],grp:"US",note:"결론과 숫자를 먼저 봅니다. 1쪽 요약과 다음 단계 날짜를 명확히 주세요."},
 CA:{ko:"캐나다",en:"Canada",style:"direct",cur:"CAD",we:[0,6],grp:"CA",note:"직설적이되 친근한 어조. 소비재는 영어·프랑스어 이중 라벨이 필요합니다."},
 UK:{ko:"영국",en:"the United Kingdom",style:"direct",cur:"GBP",we:[0,6],grp:"UK",note:"과장 표현을 싫어합니다. 절제된 어조와 근거 있는 수치가 좋습니다."},
 DE:{ko:"독일",en:"Germany",style:"direct",cur:"EUR",we:[0,6],grp:"EU",eu:1,note:"기술 사양, 인증, 납기 정확성을 중시합니다. 과장 없이 데이터로 말하세요."},
 FR:{ko:"프랑스",en:"France",style:"direct",cur:"EUR",we:[0,6],grp:"EU",eu:1,note:"격식 있는 서두를 선호합니다. 8월 휴가철 일정을 피하세요."},
 IT:{ko:"이탈리아",en:"Italy",style:"direct",cur:"EUR",we:[0,6],grp:"EU",eu:1,note:"관계 형성도 중요하게 봅니다. 대면 미팅 제안이 효과적입니다."},
 ES:{ko:"스페인",en:"Spain",style:"direct",cur:"EUR",we:[0,6],grp:"EU",eu:1,note:"8월 휴가철과 늦은 업무 시간대를 고려하세요."},
 NL:{ko:"네덜란드",en:"the Netherlands",style:"direct",cur:"EUR",we:[0,6],grp:"EU",eu:1,note:"매우 직설적입니다. 가격과 조건을 투명하게 제시하세요."},
 AU:{ko:"호주",en:"Australia",style:"direct",cur:"AUD",we:[0,6],grp:"AU",note:"간결하고 실용적인 제안을 선호합니다. 12~1월은 여름 휴가철입니다."},
 CN:{ko:"중국",en:"China",style:"context",cur:"CNY",we:[0,6],grp:"CN",note:"상호 이익과 장기 협력을 강조하세요. 경쟁사를 공개적으로 깎아내리지 마세요."},
 JP:{ko:"일본",en:"Japan",style:"context",cur:"JPY",we:[0,6],grp:"JP",note:"품질관리와 납기 준수 실적을 중시하고 사내 품의로 결정이 느립니다. 정중한 표현을 쓰세요."},
 VN:{ko:"베트남",en:"Vietnam",style:"context",cur:"VND",we:[0,6],grp:"VN",note:"관계 형성이 먼저입니다. 가격 협상 여지를 남겨 두세요."},
 ID:{ko:"인도네시아",en:"Indonesia",style:"context",cur:"IDR",we:[0,6],grp:"ID",mus:1,note:"할랄 의무화 대상 품목이 늘고 있습니다. 정중하고 관계 중심적인 어조가 좋습니다."},
 MY:{ko:"말레이시아",en:"Malaysia",style:"context",cur:"MYR",we:[0,6],grp:"MY",mus:1,note:"할랄 인증은 유통 단계에서 사실상 요구됩니다. 영어 소통은 무난합니다."},
 IN:{ko:"인도",en:"India",style:"context",cur:"INR",we:[0,6],grp:"IN",note:"가격에 민감합니다. 물량별 가격과 유연한 결제조건 옵션을 준비하세요."},
 SA:{ko:"사우디아라비아",en:"Saudi Arabia",style:"context",cur:"SAR",we:[5,6],grp:"SA",mus:1,note:"관계와 신뢰가 먼저입니다. 주말은 금·토요일이고, 종교적 이미지와 국기 사용에 주의하세요."},
 AE:{ko:"아랍에미리트",en:"the United Arab Emirates",style:"context",cur:"AED",we:[0,6],grp:"AE",mus:1,note:"주말은 토·일요일이고 금요일은 단축 근무입니다. 다국적 바이어가 많아 영문 자료로 충분합니다."},
 BR:{ko:"브라질",en:"Brazil",style:"context",cur:"BRL",we:[0,6],grp:"BR",note:"관계 중심 문화입니다. 포르투갈어 요약을 함께 주면 호감을 얻습니다."},
 MX:{ko:"멕시코",en:"Mexico",style:"context",cur:"MXN",we:[0,6],grp:"MX",note:"관계 중심 문화입니다. 스페인어 요약을 함께 주면 좋습니다."}
};
const MUS=["SA","AE","ID","MY"], WEST=["US","CA","UK","DE","FR","IT","ES","NL","AU","BR","MX"];
const HOL=[];
const h=(n,s,e,c,tip,approx)=>HOL.push({n,s,e,c,tip,approx});
const RAM="근무시간이 짧아지고 결정이 늦어집니다. 오찬·만찬 제안은 피하고, 이드 연휴 이후로 일정을 잡으세요.";
[["2026-02-18","2026-03-19","2026-03-20","2026-03-23","2026-05-26","2026-05-30"],
 ["2027-02-08","2027-03-09","2027-03-10","2027-03-13","2027-05-16","2027-05-19"],
 ["2028-01-28","2028-02-25","2028-02-26","2028-02-29","2028-05-04","2028-05-07"]].forEach(r=>{
  h("라마단",r[0],r[1],MUS,RAM,1);h("이드 알피트르 연휴",r[2],r[3],MUS,"공휴일로 업무가 멈춥니다.",1);h("이드 알아드하 연휴",r[4],r[5],MUS,"공휴일로 업무가 멈춥니다.",1);});
[["2026-02-15","2026-02-23"],["2027-02-05","2027-02-11"],["2028-01-25","2028-01-31"]].forEach(r=>h("춘절(설) 연휴",r[0],r[1],["CN","VN","MY"],"공장·물류·통관이 1~2주 멈춥니다. 앞뒤 일정도 여유를 두세요."));
[2026,2027,2028].forEach(y=>{
  h("국경절 황금연휴",y+"-10-01",y+"-10-07",["CN"],"정부·기업 대부분이 쉽니다.");
  h("골든위크",y+"-04-29",y+"-05-05",["JP"],"대부분의 기업이 쉽니다.");
  h("오봉 연휴",y+"-08-13",y+"-08-16",["JP"],"많은 기업이 쉽니다.");
  h("연말연시 휴무",y+"-12-29",(y+1)+"-01-03",["JP"],"기업 대부분이 쉽니다.");
  h("크리스마스·연말 휴가",y+"-12-21",(y+1)+"-01-02",WEST,"담당자 부재가 많아 회신이 늦습니다.");
  h("8월 여름 휴가철",y+"-08-01",y+"-08-31",["FR","IT","ES","DE","NL"],"담당자 장기 휴가가 흔합니다.");
});
h("추수감사절 연휴","2026-11-25","2026-11-27",["US"],"미국 최대 연휴입니다.");
h("추수감사절 연휴","2027-11-24","2027-11-26",["US"],"미국 최대 연휴입니다.");
h("디왈리","2026-11-06","2026-11-10",["IN"],"최대 명절입니다.");
h("디왈리","2027-10-27","2027-10-31",["IN"],"최대 명절입니다.");
const KRH=[["한국 추석 연휴","2026-09-24","2026-09-27"],["한국 설 연휴","2027-02-06","2027-02-09"],["한국 추석 연휴","2027-09-14","2027-09-17"],["한국 설 연휴","2028-01-25","2028-01-28"]];

const CERT={
 "US|food":[["FDA 식품시설 등록 (FFR)","제조시설 등록, 2년마다 갱신"],["FSVP 대응 자료","미국 수입자가 공급자 검증 시 요구"],["FDA 영양·알레르기 라벨","영문 Nutrition Facts"]],
 "US|cosmetics":[["MoCRA 시설 등록·제품 리스팅","2023년 화장품 규제 현대화법"],["FDA 화장품 라벨 규정","INCI 전성분, 영문 표기"]],
 "US|medical":[["FDA 시설 등록·기기 리스팅",""],["510(k)/De Novo 또는 면제 확인","등급별 시판 전 절차"]],
 "US|electronics":[["FCC 인증","무선·디지털 기기"],["UL/ETL 안전인증","법정 의무는 아니나 유통사가 흔히 요구"]],
 "US|machinery":[["NRTL 안전인증 (UL 등)","OSHA 작업장 기준"]],
 "US|textiles":[["FTC 섬유·원산지·세탁 라벨",""],["CPSIA 적합성 인증서","아동용 제품일 때"]],
 "CA|food":[["CFIA SFCR 수입 라이선스","캐나다 수입자 보유"],["영·불 이중언어 라벨",""]],
 "CA|cosmetics":[["Health Canada 화장품 신고 (CNF)",""],["영·불 이중언어 라벨",""]],
 "CA|medical":[["Health Canada MDL/MDEL",""]],
 "CA|electronics":[["ISED 인증","무선 기기"],["CSA/cUL 안전인증",""]],
 "UK|food":[["영국 수입 위생요건 (IPAFFS)",""],["영국 식품 라벨 규정",""]],
 "UK|cosmetics":[["UK 책임자(RP) 지정",""],["SCPN 제품 신고",""]],
 "UK|medical":[["MHRA 등록",""],["UKCA 또는 CE (인정 기한 확인)",""]],
 "UK|electronics":[["UKCA 또는 CE","품목별 CE 인정 여부 확인"]],
 "UK|machinery":[["UKCA 또는 CE (기계류)",""]],
 "EU|food":[["EU 수입 위생요건 (제3국 승인)",""],["EU 식품 라벨 (Reg. 1169/2011)","현지어 표기"]],
 "EU|cosmetics":[["EU 책임자(RP) 지정","Reg. (EC) 1223/2009"],["CPNP 제품 신고",""],["PIF·안전성 평가 (CPSR)",""]],
 "EU|medical":[["CE 마킹 (MDR 2017/745)",""],["EU 대리인(AR) 지정",""]],
 "EU|electronics":[["CE (LVD·EMC·RED)",""],["RoHS 적합",""],["WEEE 등록",""],["GPSR 역내 경제운영자","일반제품안전규정"]],
 "EU|machinery":[["CE (기계지침 2006/42/EC)","2027년 1월부터 Reg. (EU) 2023/1230 적용"]],
 "EU|textiles":[["섬유 라벨 (Reg. 1007/2011)",""],["REACH 적합",""]],
 "CN|food":[["GACC 해외제조업체 등록","해관총서령 248호"],["중문 라벨",""]],
 "CN|cosmetics":[["NMPA 등록·비안",""],["중국 내 책임자",""]],
 "CN|medical":[["NMPA 의료기기 등록",""]],
 "CN|electronics":[["CCC 인증","대상 품목 여부 확인"]],
 "CN|machinery":[["CCC 인증 (대상 품목)",""],["GB 표준 적합",""]],
 "CN|textiles":[["GB 18401 적합",""],["중문 라벨",""]],
 "JP|food":[["식품위생법 수입신고",""],["일본어 라벨",""]],
 "JP|cosmetics":[["PMD법 제조판매업자 (일본 내)",""],["일본어 전성분 라벨",""]],
 "JP|medical":[["PMD법 인증·승인 (PMDA)",""]],
 "JP|electronics":[["PSE 마크 (전기용품안전법)",""],["기술기준적합 (무선, TELEC)","무선 기기일 때"]],
 "JP|textiles":[["가정용품품질표시법 라벨",""]],
 "VN|food":[["제품 자기공표·등록",""],["베트남어 라벨",""]],
 "VN|cosmetics":[["화장품 공시 (DAV)",""]],
 "VN|medical":[["의료기기 등록",""]],
 "VN|electronics":[["QCVN 적합성 인증 (대상 품목)",""]],
 "ID|food":[["할랄 인증 (BPJPH, 의무)",""],["BPOM 등록 (ML)",""]],
 "ID|cosmetics":[["BPOM 신고",""],["할랄 인증 (2026.10 의무화 단계)",""]],
 "ID|medical":[["보건부 등록 (AKL)",""]],
 "ID|electronics":[["SNI 인증 (대상 품목)",""],["SDPPI (무선)",""]],
 "MY|food":[["할랄 인증 (JAKIM 또는 인정기관)","유통 단계에서 사실상 필수"],["말레이어·영어 라벨",""]],
 "MY|cosmetics":[["NPRA 신고",""],["할랄 인증","유통사 요구가 흔함"]],
 "MY|medical":[["MDA 등록",""]],
 "MY|electronics":[["SIRIM/ST 인증 (대상 품목)",""]],
 "IN|food":[["FSSAI 수입 라이선스·라벨",""]],
 "IN|cosmetics":[["CDSCO 수입 등록",""]],
 "IN|medical":[["CDSCO 의료기기 등록",""]],
 "IN|electronics":[["BIS 의무등록 (CRS) 대상 확인",""]],
 "IN|machinery":[["BIS / QCO 대상 확인",""]],
 "SA|food":[["SFDA 등록",""],["할랄 인증",""],["아랍어 라벨",""]],
 "SA|cosmetics":[["SFDA 화장품 등록",""],["할랄 성분 확인","돼지 유래·알코올 성분"]],
 "SA|medical":[["SFDA 의료기기 판매허가 (MDMA)",""]],
 "SA|electronics":[["SABER 적합성 인증서 (SASO)",""]],
 "SA|machinery":[["SABER 적합성 인증서",""]],
 "SA|textiles":[["SABER 적합성 인증서",""],["아랍어 라벨",""]],
 "AE|food":[["지자체 식품 등록 (예: 두바이 Montaji)",""],["할랄 인증",""]],
 "AE|cosmetics":[["지자체 화장품 등록",""]],
 "AE|medical":[["UAE 의료기기 등록 (EDE)",""]],
 "AE|electronics":[["MoIAT 적합성 인증 (ECAS/EQM)",""]],
 "AU|food":[["수입식품 검사 (DAFF)",""],["FSANZ 라벨",""]],
 "AU|cosmetics":[["AICIS 등록 (수입자)",""]],
 "AU|medical":[["TGA ARTG 등재",""]],
 "AU|electronics":[["RCM 마크 (전기안전·EMC)",""]],
 "MX|*":[["NOM 적합 (대상 품목)",""],["스페인어 라벨",""]],
 "MX|food":[["COFEPRIS 수입 허가",""],["NOM-051 라벨",""]],
 "MX|cosmetics":[["COFEPRIS 신고",""],["스페인어 라벨",""]],
 "BR|*":[["INMETRO 인증 (대상 품목)",""],["포르투갈어 라벨",""]],
 "BR|food":[["ANVISA 등록·신고",""],["포르투갈어 라벨",""]],
 "BR|cosmetics":[["ANVISA 신고",""],["포르투갈어 라벨",""]],
 "BR|medical":[["ANVISA 의료기기 등록",""]]
};
function certsFor(cc,cat){
  const g=(C[cc]||{}).grp||cc;
  const list=CERT[g+"|"+cat]||CERT[g+"|*"]||[["현지 필수 인증·등록 확인","KOTRA 무역관·인증기관 문의 후 상태를 고르세요"]];
  return list.map((x,i)=>({id:g+"-"+cat+"-"+i,label:x[0],note:x[1]}));
}

/* ---------- presets ---------- */
const BASE={seller:"",sender:"",senderTitle:"",fictional:true,product:"",category:"cosmetics",hs:"",ingredients:"",country:"US",buyerType:"distributor",buyer:"",contact:"",
 pain:"",solution:"",value:"",intro:"",benchCost:"",extraCost:"",annualQty:"",price:"",currency:"USD",unit:"unit",moq:"",incoterm:"",place:"",mode:"container",
 payMethod:"tt_split",dep:30,balTiming:"against copy of B/L",days:60,lcConfirmed:false,lead:"",validity:"",fxOn:true,fxRate:"",fxBand:5,meeting:"",shipDate:"",law:"",venue:"",disclaimer:true,
 c1:"#1F4E79",c2:"#F2B134",theme:"light",nativeDone:false,reviewer:"",evidence:[{claim:"",src:"",date:""}],certs:{}};
const PRESETS={
 us:{...BASE,seller:"Hanbit Cosmetics Co., Ltd.",sender:"Minji Kim",senderTitle:"Export Sales Manager",product:"Tinted Mineral Sunscreen SPF 50+ (50 ml)",category:"cosmetics",hs:"3304.99",
  ingredients:"zinc oxide, iron oxides, glycerin, squalane",country:"US",buyerType:"distributor",buyer:"Sunvale Retail Distribution",contact:"Ms. Rachel Moore",
  pain:"Your retail partners report that chemical-filter sunscreens are losing shelf space as shoppers ask for reef-friendly mineral options. Current mineral SKUs leave a white cast on medium to deep skin tones, which drives returns.",
  solution:"Our tinted zinc oxide formula blends clear on medium to deep skin tones and comes in 50 ml tubes sized for checkout displays. Samples can be provided by us within 7 days. We offer high quality and a competitive price.",
  value:"At USD 4.20 per unit, your landed cost is 28% lower than your current mineral SKU while the shelf price stays the same.",
  intro:"Hanbit Cosmetics was founded in 1998 and is the leading sun care maker in Korea. We have won many awards, hold 12 patents and export to 30 countries with our world-class R&D center.",
  benchCost:5.9,extraCost:0.35,annualQty:100000,price:4.2,currency:"USD",unit:"unit",moq:10000,incoterm:"FOB",place:"Busan",mode:"container",
  payMethod:"tt_split",dep:30,balTiming:"against copy of B/L",lead:45,validity:"2026-12-31",fxOn:true,fxRate:1385,fxBand:5,meeting:"2026-11-26",shipDate:"2027-01-15",law:"",venue:"",disclaimer:true,
  c1:"#1F4E79",c2:"#F2B134",theme:"light",
  evidence:[{claim:"US mineral sunscreen sales grew faster than chemical sunscreens in 2025",src:"Circana US Sun Care report 2025",date:"2026-10-20"},{claim:"White cast is the top reason for mineral sunscreen returns",src:"",date:""}],
  certs:{"US-cosmetics-0":"progress","US-cosmetics-1":"held"}},
 sa:{...BASE,seller:"Daon Foods Co., Ltd.",sender:"Joon Lee",senderTitle:"Overseas Business Lead",product:"Korean Beef Bone Broth Ramen (5-pack)",category:"food",hs:"1902.30",
  ingredients:"wheat flour, palm oil, beef extract, gelatin, soy sauce",country:"SA",buyerType:"retailer",buyer:"Al Noor Hypermarkets",contact:"",
  pain:"Young shoppers in Riyadh and Jeddah are searching for Korean food after K-drama hits, but most Korean noodles on shelves are imported through third countries and arrive with short remaining shelf life.",
  solution:"We ship directly from our factory with 12 months of remaining shelf life and Arabic labels applied at origin. Our cutting-edge HTST process ensures best taste.",
  value:"Direct supply reduces your landed cost per pack and keeps 12 months of shelf life on arrival.",
  intro:"Daon Foods has supplied Korean supermarkets since 2005.",
  benchCost:"",extraCost:"",annualQty:"",price:2.8,currency:"USD",unit:"5-pack",moq:2400,incoterm:"CIF",place:"Jeddah Islamic Port, Saudi Arabia",mode:"air",
  payMethod:"lc_sight",dep:0,balTiming:"before shipment",lead:30,validity:"2027-03-31",fxOn:false,fxRate:1385,fxBand:5,meeting:"2027-02-20",shipDate:"2027-03-11",law:"Republic of Korea",venue:"SIAC",disclaimer:true,lcConfirmed:true,
  c1:"#0B6E4F",c2:"#E30613",theme:"light",
  evidence:[{claim:"Korean ramen exports to the GCC grew in 2025",src:"KITA trade statistics, HS 1902.30",date:"2026-09-30"}],
  certs:{"SA-food-0":"progress","SA-food-1":"none","SA-food-2":"held"}},
 cn:{...BASE,seller:"Nuri Electronics Co., Ltd.",sender:"Seoyeon Park",senderTitle:"Sales Director, Greater China",product:"Quiet Desk Fan Q3 (USB-C)",category:"electronics",hs:"8414.51",
  ingredients:"",country:"CN",buyerType:"ecommerce",buyer:"Hangzhou Bright Home Trading",contact:"Mr. Wang Lei",
  pain:"Desk fans sold on major marketplaces in China receive frequent complaints about noise above 40 dB, which lowers store ratings and increases return costs for sellers.",
  solution:"Our Q3 fan runs at 24 dB on its lowest setting and charges through USB-C, so you can list it in the premium home-office category. We will try to deliver samples ASAP.",
  value:"Sellers who switched to quieter models cut noise-related returns by 35% within one season.",
  intro:"Nuri Electronics designs small home appliances in Seoul.",
  benchCost:62,extraCost:4,annualQty:20000,price:48,currency:"CNY",unit:"unit",moq:4000,incoterm:"DDP",place:"Hangzhou, China",mode:"container",
  payMethod:"lc_sight",dep:0,balTiming:"before shipment",lead:40,validity:"2026-12-20",fxOn:true,fxRate:192,fxBand:4,meeting:"2026-12-08",shipDate:"2027-02-08",law:"Republic of Korea",venue:"KCAB",disclaimer:true,
  c1:"#111111",c2:"#FFFFFF",theme:"dark",
  evidence:[{claim:"Noise is a top complaint for desk fans on Chinese marketplaces",src:"Internal review analysis of 1,200 listings",date:"2025-03-10"},{claim:"Switching to quieter models cut returns by 35%",src:"Pilot with 3 sellers, 2026 summer season",date:"2026-10-01"}],
  certs:{"CN-electronics-0":"none"}}
};
const BLANK={...BASE,evidence:[{claim:"",src:"",date:""}],certs:{}};

/* ---------- state ---------- */
const KEYS=Object.keys(BASE).filter(k=>k!=="evidence"&&k!=="certs");
let S;
try{S=JSON.parse(localStorage.getItem("proposal-desk-v1")||"null")}catch(e){S=null}
if(!S||typeof S!=="object")S=JSON.parse(JSON.stringify(PRESETS.us));
S={...BASE,...S};

const sel=$("#country");
sel.innerHTML=Object.entries(C).map(([k,v])=>`<option value="${k}">${v.ko}</option>`).join("");

function load(){
  KEYS.forEach(k=>{const el=document.getElementById(k);if(!el)return;if(el.type==="checkbox")el.checked=!!S[k];else el.value=S[k]??"";});
  renderEv();renderCerts();toggles();
}
function collect(){
  KEYS.forEach(k=>{const el=document.getElementById(k);if(!el)return;S[k]=el.type==="checkbox"?el.checked:el.value;});
  try{localStorage.setItem("proposal-desk-v1",JSON.stringify(S))}catch(e){}
  return S;
}
function renderEv(){
  $("#evList").innerHTML=S.evidence.map((e,i)=>`<div class="ev">
    <input type="text" id="ev-claim-${i}" data-ev="${i}" data-f="claim" placeholder="주장 (영문)" value="${esc(e.claim)}" aria-label="주장">
    <input type="text" id="ev-src-${i}" data-ev="${i}" data-f="src" placeholder="출처 (기관·보고서·URL)" value="${esc(e.src)}" aria-label="출처">
    <input type="date" id="ev-date-${i}" data-ev="${i}" data-f="date" value="${esc(e.date)}" aria-label="확인일">
    <button type="button" class="x" data-rm="${i}" aria-label="삭제">×</button></div>`).join("");
}
function renderCerts(){
  const list=certsFor(S.country,S.category);
  $("#certList").innerHTML=list.map(c=>{const v=S.certs[c.id]||"none";return `<div class="cert"><div>${esc(c.label)}${c.note?`<small>${esc(c.note)}</small>`:""}</div>
   <select id="cert-${c.id}" data-cert="${c.id}" aria-label="${esc(c.label)} 상태">
   ${[["held","보유"],["progress","진행 중"],["none","미보유"],["na","해당 없음"]].map(([a,b])=>`<option value="${a}"${v===a?" selected":""}>${b}</option>`).join("")}</select></div>`}).join("");
}
function toggles(){
  const m=S.payMethod;
  $("#depWrap").hidden=m!=="tt_split";$("#balWrap").hidden=m!=="tt_split";
  $("#daysWrap").hidden=!["lc_usance","da","oa"].includes(m);
  $("#lcRow").hidden=!m.startsWith("lc");
  const hints={EXW:"EXW·FCA·FOB·FAS면 해상·항공 운임, 보험, 관세, 현지 내륙운송을 모두 넣으세요.",FCA:"FCA·FOB면 운임·보험·관세·내륙운송을 모두 넣으세요.",FOB:"FOB면 해상운임·보험·관세·내륙운송을 모두 넣으세요.",FAS:"FAS면 선적비·운임·보험·관세를 넣으세요.",CFR:"CFR이면 보험·관세·하역·내륙운송을 넣으세요.",CPT:"CPT면 보험·관세·내륙운송을 넣으세요.",CIF:"CIF면 관세·하역·내륙운송을 넣으세요.",CIP:"CIP면 관세·내륙운송을 넣으세요.",DAP:"DAP면 수입 관세·부가세를 넣으세요.",DPU:"DPU면 수입 관세·부가세를 넣으세요.",DDP:"DDP면 바이어 추가 비용은 보통 0입니다."};
  $("#extraHint").textContent="바이어가 지금 쓰는 제품 단가와 바이어 쪽 추가 비용을 넣으면 절감액을 계산하고, 메시지에 쓴 %와 맞는지 대조합니다. "+(hints[S.incoterm]||"");
}

/* ---------- helpers ---------- */
const num=v=>{const n=parseFloat(v);return isFinite(n)?n:null};
const words=t=>(t||"").trim().split(/\s+/).filter(Boolean).length;
const D=iso=>iso?new Date(iso+"T00:00:00"):null;
const today=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const days=(a,b)=>Math.round((b-a)/864e5);
const fmtD=iso=>iso?D(iso).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"[date]";
const money=(n,cur)=>n==null?"[price]":`${cur} ${n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const int=n=>n==null?"":Math.round(n).toLocaleString("en-US");
const sentences=t=>(t||"").split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(Boolean);
function hsl(hex){const m=/^#?([0-9a-f]{6})$/i.exec(hex||"");if(!m)return null;const n=parseInt(m[1],16),r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255;
  const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let H=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);
  H=mx===r?((g-b)/d+(g<b?6:0)):mx===g?((b-r)/d+2):((r-g)/d+4);H*=60;}return{h:H,s,l}}
function cname(hex){const c=hsl(hex);if(!c)return"?";if(c.l>.9)return"white";if(c.l<.13)return"black";if(c.s<.15)return"gray";const x=c.h;
  if(x<15||x>=345)return"red";if(x<40)return"orange";if(x<65)return"yellow";if(x<170)return"green";if(x<255)return"blue";if(x<300)return"purple";return"pink"}
function lum(hex){const m=/^#?([0-9a-f]{6})$/i.exec(hex||"");if(!m)return 0;const n=parseInt(m[1],16);const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(n>>16&255)+.7152*f(n>>8&255)+.0722*f(n&255)}
const contrast=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const KO=/[ㄱ-ㆎ가-힣]/;

/* ---------- English lint ---------- */
const KONGLISH=[[/\bA\/S\b/g,"after-sales service"],[/\bhand ?phone\b/gi,"mobile phone"],[/\bnotebook (computer|pc)\b/gi,"laptop"],[/\beye shopping\b/gi,"window shopping"],[/\bskinship\b/gi,"(삭제 권장)"],[/\bfighting!?/gi,"(삭제 권장)"],
 [/\bservice item\b/gi,"complimentary item"],[/\bdiscuss about\b/gi,"discuss"],[/\bcontact to\b/gi,"contact"],[/\bmention about\b/gi,"mention"],[/\bexplain about\b/gi,"explain"],[/\brevert back\b/gi,"reply"],
 [/\bplease kindly\b/gi,"please"],[/\bdo the needful\b/gi,"(구체적 요청으로)"],[/\bmake a contract\b/gi,"sign a contract"],[/\bin the near future\b/gi,"(구체적 날짜로)"],[/\bwhite shirt(s)? worker\b/gi,"office worker"],[/\bcunning\b/gi,"cheating"]];
const VAGUE=[/\bhigh[- ]quality\b/gi,/\bbest\b/gi,/\bworld[- ]class\b/gi,/\bexcellent\b/gi,/\bpremium quality\b/gi,/\bcompetitive price(s)?\b/gi,/\bvarious\b/gi,/\betc\.?/gi,/\band so on\b/gi,/\ba lot of\b/gi,/\bmany (customers|awards|countries)\b/gi];
const HEDGE=[/\bwe will try to\b/gi,/\bmaybe\b/gi,/\bhopefully\b/gi,/\bas soon as possible\b/gi,/\bASAP\b/g,/\bif possible\b/gi];
const JARGON=[/\bsynerg\w*/gi,/\bleverag\w*/gi,/\bparadigm\b/gi,/\bbest[- ]in[- ]class\b/gi,/\bcutting[- ]edge\b/gi,/\bstate[- ]of[- ]the[- ]art\b/gi,/\bholistic\b/gi,/\bturnkey\b/gi,/\bgame[- ]chang\w*/gi,/\bdisruptive\b/gi,/\bnext[- ]generation\b/gi,/\bseamless(ly)?\b/gi,/\brobust\b/gi,/\becosystem\b/gi,/\bvalue[- ]added\b/gi];
const OK_ABBR=new Set("USD EUR GBP JPY CNY SAR AED AUD CAD KRW FOB CIF CFR CIP CPT DAP DPU DDP EXW FCA FAS MOQ ROI FDA CE UK US EU USB SPF PO HS OEM ODM QC ISO UV KC CCC PSE ID OK SKU CEO B2B R&D LLC CO LTD INC GCC TV PC LED AI".split(" "));
const PASS_EX=/\b(based|located|pleased|delighted|interested|committed|dedicated|honored|honoured|excited|sized|used to)\b/i;
const PASS=/\b(am|is|are|was|were|be|been|being)\s+(?:\w+ly\s+)?(\w+ed|built|done|made|given|taken|shown|sent|written|seen|known|paid|held|kept|brought|sold|bought|found|told|chosen|driven|grown|provided|shipped|delivered|produced|processed|manufactured)\b(\s+by\b)?/gi;
function lint(text){
  const r={passive:[],byus:[],konglish:[],vague:[],hedge:[],jargon:[],abbr:[],long:[],korean:false};
  if(!text)return r;
  if(KO.test(text))r.korean=true;
  let m;PASS.lastIndex=0;
  while((m=PASS.exec(text))){if(PASS_EX.test(m[0]))continue;r.passive.push(m[0].trim());}
  if(/\bby us\b/i.test(text))r.byus.push("by us");
  KONGLISH.forEach(([re,fix])=>{const mm=text.match(re);if(mm)r.konglish.push(`${mm[0]} → ${fix}`)});
  VAGUE.forEach(re=>{const mm=text.match(re);if(mm)r.vague.push(mm[0])});
  HEDGE.forEach(re=>{const mm=text.match(re);if(mm)r.hedge.push(mm[0])});
  JARGON.forEach(re=>{const mm=text.match(re);if(mm)r.jargon.push(mm[0])});
  (text.match(/\b[A-Z][A-Z&]{1,5}\b/g)||[]).forEach(a=>{if(!OK_ABBR.has(a)&&!new RegExp("\\(\\s*"+a.replace("&","\\&")+"\\s*\\)").test(text)&&!r.abbr.includes(a))r.abbr.push(a)});
  sentences(text).forEach(s=>{if(words(s)>30)r.long.push(s.slice(0,60)+"…")});
  return r;
}

/* ---------- derived values ---------- */
function derive(d){
  const c=C[d.country]||C.US;
  const price=num(d.price),bench=num(d.benchCost),extra=num(d.extraCost)??0,qty=num(d.annualQty);
  let roi=null;
  if(price!=null&&bench!=null&&bench>0){const landed=price+extra,save=bench-landed;roi={landed,save,pct:save/bench*100,annual:qty!=null?save*qty:null,bench,extra,price,qty};}
  const certs=certsFor(d.country,d.category).map(x=>({...x,st:d.certs[x.id]||"none"}));
  const dep=Math.max(0,Math.min(100,num(d.dep)??0));
  const pay={tt_split:`${dep}% by T/T as a deposit with the purchase order; ${100-dep}% by T/T ${d.balTiming}`,
   tt_adv:"100% by T/T in advance, before production starts",
   lc_sight:`Irrevocable L/C at sight${d.lcConfirmed?", confirmed by a first-class bank acceptable to the seller":""}, subject to UCP 600`,
   lc_usance:`Irrevocable usance L/C at ${num(d.days)??"[ ]"} days after B/L date${d.lcConfirmed?", confirmed by a first-class bank":""}, subject to UCP 600`,
   dp:"Documents against payment (D/P) at sight, subject to URC 522",
   da:`Documents against acceptance (D/A) at ${num(d.days)??"[ ]"} days after B/L date, subject to URC 522`,
   oa:`Open account, payment ${num(d.days)??"[ ]"} days after B/L date`}[d.payMethod];
  const priceStr=`${money(price,d.currency)} per ${d.unit||"unit"}, ${d.incoterm||"[Incoterm]"} ${d.place||"[named place]"} (Incoterms® 2020)`;
  const fx=d.fxOn?`Prices are quoted in ${d.currency}${num(d.fxRate)?` and based on an exchange rate of KRW ${num(d.fxRate).toLocaleString("en-US")} per ${d.currency} on the date of this proposal`:""}. If the rate moves by more than ±${num(d.fxBand)??5}% before order confirmation, either party may request a price review.`:"";
  const lawTxt=d.law==="buyer"?`the laws of ${c.en}`:d.law?`the laws of ${d.law==="Republic of Korea"?"the Republic of Korea":d.law}`:"";
  const venueTxt={KCAB:"arbitration in Seoul under the Rules of the Korean Commercial Arbitration Board (KCAB)",SIAC:"arbitration in Singapore under the SIAC Rules",ICC:"arbitration under the ICC Rules of Arbitration",HKIAC:"arbitration in Hong Kong under the HKIAC Rules",LCIA:"arbitration in London under the LCIA Rules",court:`the competent courts of ${c.en}`}[d.venue]||"";
  const disc=`This proposal is for discussion only and is not a binding offer. Prices, lead times and availability are indicative and may change with raw material costs, freight rates, exchange rates and market conditions until confirmed in a signed contract or proforma invoice.${d.validity?` This proposal is valid until ${fmtD(d.validity)}.`:""}`;
  return {c,roi,certs,pay,priceStr,fx,lawTxt,venueTxt,disc};
}

/* ---------- review engine ---------- */
const CATS=["문화·관습","영문 표현","바이어 가치 (WIIFM·ROI)","법규·인증·면책","인코텀즈·통화·결제"];
function review(d,x){
  const out=[];const add=(cat,st,t,p,f)=>out.push({cat,st,t,p,f});
  const c=x.c, cc=d.country;

  /* 1. culture */
  add(1,"pass",c.style==="direct"?"구성: Executive Summary와 ROI를 덱 맨 앞에 배치":"구성: 인사·관계 → 회사·시장 배경 → 해결책 → 조건 순으로 배치",
    c.style==="direct"?`${c.ko} 바이어는 결론부터 보는 직진형입니다. 덱 2쪽에 요약과 수치화된 가치를 넣었습니다.`:`${c.ko} 바이어는 배경과 신뢰를 먼저 봅니다. 요약은 마지막 다음 단계 슬라이드에서 다시 정리합니다.`);
  add(1,"info",`${c.ko} 비즈니스 관습`,c.note);
  const n1=cname(d.c1),n2=cname(d.c2),bg=d.theme==="dark"?"black":"white";
  const pal=[n1,n2],chroma=pal.filter(n=>!["white","black","gray"].includes(n)).length;
  if(["CN","JP","VN"].includes(cc)){
    const hasW=pal.includes("white")||bg==="white",hasB=pal.includes("black")||bg==="black";
    if(chroma===0&&hasW&&hasB)add(1,"fail","흰색·검은색 조합은 상(喪)을 연상시킵니다",`${c.ko}에서 흑백 위주 디자인은 장례를 떠올리게 합니다. 브랜드 색에 유채색을 넣으세요.${cc==="CN"?" 빨강·금색 계열이 길한 색으로 통합니다.":""}`,"c1");
    else if(bg==="black")add(1,"warn","어두운 배경 + 흰 글씨는 피하세요",`${c.ko}에서는 검은 바탕에 흰 글씨가 부고장처럼 보일 수 있습니다. 밝은 배경을 권합니다.`,"theme");
    else add(1,"pass","색상: 흑백 상복 조합 아님","");
    if(["CN","JP"].includes(cc)&&/4/.test(String(d.price)+String(d.moq)))add(1,"info","숫자 4가 가격·MOQ에 들어 있습니다",`${c.ko}에서 4는 죽을 사(死)와 발음이 같아 꺼리는 경우가 있습니다. 협상용 수량 단위를 조정할 여지가 있는지 보세요.`,"moq");
  }
  if(cc==="IN"&&chroma===0&&pal.includes("white"))add(1,"warn","흰색 위주 디자인 주의","인도 일부 지역에서 흰색은 애도의 색입니다. 유채색 포인트를 넣으세요.","c1");
  if(MUS.includes(cc)){
    if(pal.includes("green"))add(1,"info","녹색 사용: 존중하는 맥락에서만","녹색은 이슬람과 국기를 상징합니다. 국기, 종교 문구, 모스크 이미지를 장식용으로 쓰지 마세요.","c1");
    const h1=hsl(d.c1),h2=hsl(d.c2);
    if(h1&&h2&&h1.s>.75&&h2.s>.75&&chroma===2)add(1,"warn","원색 두 가지를 강하게 쓰고 있습니다","중동·이슬람권 공식 제안서에서는 강한 원색 대비보다 차분한 톤과 여백이 신뢰감을 줍니다. 한 색의 채도를 낮추세요.","c2");
  }
  if(["BR","MX"].includes(cc)&&pal.includes("purple"))add(1,"warn","보라색 주의","중남미 일부 지역에서 보라색은 장례·애도와 연결됩니다.","c1");
  const ratio=contrast(d.c1,d.theme==="dark"?"#14181D":"#FFFFFF");
  if(ratio<3)add(1,"warn","브랜드 주색이 배경과 대비가 낮습니다",`대비 ${ratio.toFixed(1)}:1. 슬라이드 제목이 잘 보이지 않습니다. 3:1 이상으로 조정하세요.`,"c1");
  const dateChecks=[["meeting","미팅 제안일",cc],["shipDate","첫 선적 예정일",cc]];
  dateChecks.forEach(([k,lab])=>{
    if(!d[k]){add(1,"warn",`${lab}이 비어 있습니다`,"날짜를 넣어야 현지 공휴일·종교 기간과 겹치는지 검사할 수 있습니다.",k);return;}
    const dt=D(d[k]);let hit=false;
    HOL.filter(H=>H.c.includes(cc)).forEach(H=>{const s=D(H.s),e=D(H.e);
      if(dt>=s&&dt<=e){hit=true;add(1,H.n==="8월 여름 휴가철"?"warn":"fail",`${lab}이 ${c.ko}의 ${H.n} 기간과 겹칩니다`,`${H.s} ~ ${H.e}${H.approx?" (예상, ±1~2일)":""}. ${H.tip}`,k);}
      else{const g=Math.min(Math.abs(days(dt,s)),Math.abs(days(e,dt)));if(g<=5&&!hit&&H.n!=="8월 여름 휴가철"){hit=true;add(1,"warn",`${lab}이 ${H.n} 직전·직후입니다`,`${H.s} ~ ${H.e}${H.approx?" (예상)":""}와 ${g}일 차이. 업무 공백을 감안해 여유를 두세요.`,k);}}});
    if(k==="meeting"&&c.we.includes(dt.getDay()))add(1,"fail",`미팅 제안일이 ${c.ko}의 주말입니다`,cc==="SA"?"사우디의 주말은 금·토요일입니다.":"현지 주말입니다. 평일로 옮기세요.",k);
    if(k==="shipDate")KRH.forEach(([n,s,e])=>{if(dt>=D(s)&&dt<=D(e)){hit=true;add(1,"warn",`선적일이 ${n} 기간과 겹칩니다`,`${s} ~ ${e}. 한국 공장·선사·세관 업무가 멈춥니다.`,k);}});
    if(!hit)add(1,"pass",`${lab}: 주요 공휴일·종교 기간과 겹치지 않음`,"");
  });
  if(MUS.includes(cc)){
    const bad=(d.ingredients||"").match(/\b(pork|lard|bacon|ham|gelatin|gelatine|alcohol|ethanol|wine|rum|carmine)\b/gi);
    const halal=x.certs.find(z=>/할랄/.test(z.label));
    if(bad)add(1,"fail",`이슬람권 금기 가능 성분: ${[...new Set(bad.map(s=>s.toLowerCase()))].join(", ")}`,"돼지 유래 여부(젤라틴 등)와 알코올 함량을 확인하고, 할랄 원료로 바꾸거나 할랄 인증 범위를 명시하세요.","ingredients");
    if(["food","cosmetics"].includes(d.category)&&!halal)add(1,"warn","할랄 대응 여부를 명시하세요","할랄 인증 또는 할랄 원료 사용 확인서를 준비하면 유통사 입점이 쉬워집니다.","ingredients");
    const allTxt=[d.pain,d.solution,d.value,d.intro].join(" ");
    if(/\b(wine|beer|pork|bacon|party|dating)\b/i.test(allTxt))add(1,"warn","메시지에 이슬람권에서 민감한 표현이 있습니다","술·돼지고기·이성 교제 관련 표현을 빼세요.","solution");
  }

  /* 2. English */
  const fields=[["pain","Pain point"],["solution","Solution"],["value","Value"],["intro","회사 소개"]];
  let engIssues=0;
  fields.forEach(([k,lab])=>{
    const r=lint(d[k]);
    if(!d[k]){return;}
    if(r.korean){engIssues++;add(2,"fail",`${lab}에 한글이 남아 있습니다`,"바이어가 읽는 문장은 모두 영문이어야 합니다.",k);}
    if(r.passive.length||r.byus.length){engIssues++;add(2,"warn",`${lab}: 수동태 ${r.passive.length}곳`,`"${r.passive.slice(0,3).join('", "')}". 주어를 밝혀 능동태로 바꾸세요. 예: "Samples can be provided by us" → "We will send samples within 7 days."`,k);}
    if(r.konglish.length){engIssues++;add(2,"fail",`${lab}: 콩글리시·어색한 직역`,r.konglish.join(" / "),k);}
    if(r.jargon.length){engIssues++;add(2,"warn",`${lab}: 유행어·전문용어`,`"${r.jargon.join('", "')}". 바이어가 바로 이해하는 쉬운 말과 구체적 사실로 바꾸세요.`,k);}
    if(r.abbr.length){engIssues++;add(2,"warn",`${lab}: 설명 없는 약어 ${r.abbr.length}개`,`${r.abbr.join(", ")}. 처음 나올 때 풀어 쓰세요. 예: high-temperature short-time (HTST).`,k);}
    if(r.vague.length){engIssues++;add(2,"warn",`${lab}: 모호한 자랑 표현`,`"${r.vague.join('", "')}". 숫자·인증·시험 결과로 바꾸세요.`,k);}
    if(r.hedge.length){engIssues++;add(2,"warn",`${lab}: 책임을 피하는 표현`,`"${r.hedge.join('", "')}". 날짜와 약속으로 바꾸세요. 예: "We will send samples by 20 Nov 2026."`,k);}
    if(r.long.length){engIssues++;add(2,"warn",`${lab}: 30단어 넘는 문장 ${r.long.length}개`,"두 문장으로 나누세요.",k);}
  });
  if(!engIssues&&fields.some(([k])=>d[k]))add(2,"pass","자동 문장 검사 통과","수동태, 콩글리시, 전문용어, 모호한 표현, 긴 문장이 발견되지 않았습니다.");
  add(2,d.nativeDone?"pass":"manual",d.nativeDone?`원어민 감수 완료${d.reviewer?" ("+d.reviewer+")":""}`:"원어민·전문 교정자 감수가 필요합니다","자동 검사는 뉘앙스와 계약 조건 오해를 잡지 못합니다. 감수 전까지 모든 산출물에 DRAFT 표시가 붙습니다.","nativeDone");

  /* 3. WIIFM */
  const buyerTxt=[d.pain,d.solution,d.value].join(" ");
  const we=(buyerTxt+" "+d.intro).match(/\b(we|our|us|ours)\b/gi)||[], you=(buyerTxt+" "+d.intro).match(/\b(you|your|yours)\b/gi)||[];
  if(words(d.pain)<12)add(3,"fail","바이어의 문제(Pain point)가 비었거나 너무 짧습니다","바이어 시장의 구체적 문제를 먼저 짚어야 제안이 읽힙니다.","pain");
  else add(3,"pass","바이어의 문제를 먼저 제시","");
  if(we.length>you.length*1.5&&we.length>2)add(3,"warn",`"we/our" ${we.length}회 vs "you/your" ${you.length}회`,"공급자 중심 문장입니다. 바이어가 얻는 결과를 주어로 쓰세요. 예: \"Your stores cut returns by…\"","solution");
  else if(we.length+you.length>0)add(3,"pass",`바이어 중심 문장 (you ${you.length} : we ${we.length})`,"");
  const iw=words(d.intro),bw=words(buyerTxt);
  const brag=(d.intro||"").match(/\b(founded|established|since \d{4}|awards?|patents?|leading|largest|No\.? ?1|number one|world-class|history)\b/gi)||[];
  if(iw>0&&iw/(iw+bw)>.3)add(3,"warn",`회사 소개가 바이어 메시지의 ${Math.round(iw/(iw+bw)*100)}%를 차지합니다`,"회사 소개는 2문장 이내로 줄이고, 바이어 문제와 연결되는 사실 하나만 남기세요.","intro");
  if(brag.length>=2)add(3,"warn",`자랑 나열: ${[...new Set(brag.map(s=>s.toLowerCase()))].join(", ")}`,"연혁·수상·특허는 부록으로 옮기고, 바이어에게 어떤 이익인지로 바꿔 쓰세요. 예: \"12 patents\" → \"no white cast, so fewer returns\".","intro");
  const claimed=(d.value||"").match(/(\d+(?:\.\d+)?)\s*%/);
  if(!/\d/.test(d.value||""))add(3,"fail","가치 문장에 숫자가 없습니다","\"좋습니다\" 대신 \"운영 비용 30% 절감\"처럼 숫자로 이익을 보여 주세요.","value");
  if(x.roi){
    const r=x.roi;
    if(r.save<=0)add(3,"fail","계산상 바이어 원가가 오히려 올라갑니다",`도착 원가 ${money(r.landed,d.currency)} ≥ 현재 ${money(r.bench,d.currency)}. 가격 외 가치(품질·리드타임·반품 감소)를 수치로 제시하거나 단가를 조정하세요.`,"price");
    else add(3,"pass",`ROI 계산: 개당 ${money(r.save,d.currency)} 절감 (${r.pct.toFixed(1)}%)`,r.annual!=null?`연간 ${int(r.qty)}개 기준 ${money(r.annual,d.currency)} 절감. 덱과 이메일에 자동 반영했습니다.`:"연간 물량을 넣으면 연간 절감액도 계산합니다.");
    if(claimed&&/\b(cost|price|saving|savings|cheaper|lower|margin)\b/i.test(d.value)&&Math.abs(parseFloat(claimed[1])-r.pct)>3)add(3,"fail",`메시지의 ${claimed[1]}%와 계산값 ${r.pct.toFixed(1)}%가 다릅니다`,"근거 없는 수치는 신뢰를 잃고 분쟁 소지가 됩니다. 계산값으로 고치거나 다른 기준이면 그 기준을 명시하세요.","value");
    if(["EXW","FCA","FOB","FAS"].includes(d.incoterm)&&!(num(d.extraCost)>0))add(3,"warn","바이어 부대비용이 0입니다",`${d.incoterm} 조건이면 운임·보험·관세를 바이어가 부담합니다. 0이면 ROI가 부풀려집니다.`,"extraCost");
  } else add(3,claimed?"warn":"fail","ROI를 계산할 근거가 없습니다","바이어 현재 단가와 우리 단가를 넣으면 절감액을 계산해 증명할 수 있습니다.","benchCost");
  const ev=d.evidence.filter(e=>e.claim||e.src);
  if(!ev.length)add(3,"warn","출처가 하나도 없습니다","시장 수치와 성과 주장마다 출처와 확인일을 넣으세요.","addEv");
  ev.forEach((e,i)=>{const idx=d.evidence.indexOf(e);
    if(!e.src)add(3,"fail",`출처 없음: "${(e.claim||"").slice(0,50)}"`,"출처를 찾지 못하면 이 주장을 빼세요.",`ev-src-${idx}`);
    else if(!e.date)add(3,"warn",`확인일 없음: ${e.src}`,"자료를 확인한 날짜를 넣으세요.",`ev-date-${idx}`);
    else if(days(D(e.date),today())>365)add(3,"warn",`1년 넘은 자료: ${e.src} (${e.date})`,"최신 자료로 갱신하거나 연도를 본문에 밝히세요.",`ev-date-${idx}`);
  });

  /* 4. legal */
  x.certs.forEach(z=>{
    if(z.st==="held")add(4,"pass",`${z.label}: 보유`,"");
    else if(z.st==="progress")add(4,"warn",`${z.label}: 진행 중`,"제안서에는 \"in progress, expected [date]\"로만 표기했습니다. 취득 전 판매 가능하다고 약속하지 마세요.",`cert-${z.id}`);
    else if(z.st==="none")add(4,"fail",`${z.label}: 미보유`,"취득 계획이 없으면 이 시장에 판매할 수 없습니다. 구현 불가능한 조건을 제안하면 사기·계약 분쟁으로 이어질 수 있습니다.",`cert-${z.id}`);
  });
  if(!d.law)add(4,"warn","준거법이 미정입니다","계약 시 어느 나라 법을 따를지 기준을 정해 두세요. 한국·바이어 국가가 아닌 중립국(영국·싱가포르)도 흔한 선택입니다.","law");
  else add(4,"pass",`준거법: ${x.lawTxt}`,["UK","IN"].includes(cc)?"영국·인도는 CISG(국제물품매매협약) 비가입국입니다. 계약서에 적용 여부를 명시하세요.":"한국과 바이어 국가가 모두 CISG 가입국이면 별도 배제하지 않는 한 CISG가 적용됩니다.");
  if(!d.venue)add(4,"warn","분쟁 해결 방식이 미정입니다","중재지를 정하세요. 뉴욕협약 덕분에 중재 판정은 법원 판결보다 해외 집행이 쉽습니다.","venue");
  else if(d.venue==="court")add(4,"warn","바이어 국가 법원 관할","판결의 해외 집행이 어렵고 우리에게 불리할 수 있습니다. 중립 중재지를 검토하세요.","venue");
  else add(4,"pass",`분쟁 해결: ${d.venue}`,"");
  if(!d.disclaimer)add(4,"fail","면책 문구가 빠져 있습니다","가격·일정이 시장 상황에 따라 바뀔 수 있다는 문구가 없으면 제안서 숫자가 확정 청약으로 해석될 수 있습니다.","disclaimer");
  else add(4,"pass","면책 문구 포함 (구속력 없는 제안, 변동 가능)","");
  const allT=[d.pain,d.solution,d.value,d.intro].join(" ");
  const over=allT.match(/\b(guarantee[ds]?|100\s?%|risk[- ]free|no risk|always|never fail|fully compliant|certified)\b/gi);
  if(over)add(4,"warn",`과도한 보증 표현: ${[...new Set(over.map(s=>s.toLowerCase()))].join(", ")}`,"지킬 수 없는 보증은 계약 위반 근거가 됩니다. 시험 결과·조건부 표현으로 바꾸세요.","solution");
  if(d.fictional)add(4,"info","가상 시나리오 표기","모든 산출물에 \"Fictional scenario\"를 표기했습니다.");

  /* 5. Incoterms & payment */
  const SEA=["FAS","FOB","CFR","CIF"];
  if(!d.incoterm)add(5,"fail","인코텀즈가 선택되지 않았습니다","가격만 쓰면 운임·위험 부담 주체가 불분명합니다.","incoterm");
  else{
    if(!d.place||d.place.trim().length<4)add(5,"fail","지정 장소가 없습니다",`"${d.incoterm} Busan New Port, Korea"처럼 항구나 주소까지 쓰세요.`,"place");
    else if(!/,/.test(d.place)||words(d.place)<2)add(5,"warn",`지정 장소가 모호합니다: "${d.place}"`,`항구·터미널·주소와 국가까지 쓰세요. 예: "${d.incoterm} Busan New Port, Korea".`,"place");
    else add(5,"pass",`가격 표기: ${d.incoterm} ${d.place} (Incoterms® 2020)`,"");
    if(SEA.includes(d.incoterm)&&["air","road","multi"].includes(d.mode))add(5,"fail",`${d.incoterm}는 해상·내수로 전용 조건입니다`,`항공·육상·복합운송이면 ${({FOB:"FCA",FAS:"FCA",CFR:"CPT",CIF:"CIP"})[d.incoterm]}를 쓰세요.`,"incoterm");
    else if(SEA.includes(d.incoterm)&&d.mode==="container")add(5,"warn",`컨테이너 화물에 ${d.incoterm}`,`ICC는 컨테이너 화물에 ${({FOB:"FCA",FAS:"FCA",CFR:"CPT",CIF:"CIP"})[d.incoterm]}를 권장합니다. 선적 전 CY 반입 시점부터 위험이 넘어가지 않는 공백이 생깁니다.`,"incoterm");
    if(d.incoterm==="DDP")add(5,"warn","DDP: 수입 관세·부가세와 통관을 우리가 부담합니다",`${c.ko}에서 수입자(Importer of Record) 자격을 얻을 수 있는지, 부가세 환급이 가능한지 확인하세요.`,"incoterm");
    if(d.incoterm==="EXW")add(5,"warn","EXW: 수출 통관 책임이 모호해집니다","바이어가 한국에서 수출 신고를 할 수 없는 경우가 많습니다. FCA를 권합니다.","incoterm");
    if(d.incoterm==="CIF")add(5,"info","CIF 보험은 최소 ICC(C) 조건입니다","더 넓은 담보가 필요하면 보험 조건을 명시하세요.");
    if(d.incoterm==="CIP")add(5,"info","CIP 보험은 ICC(A) 전위험 담보가 기본입니다","");
  }
  if(num(d.price)==null)add(5,"fail","단가가 없습니다","","price");
  add(5,"pass",`통화: ${d.currency} (ISO 코드)`,d.currency!=="USD"&&d.currency!=="EUR"&&d.currency!==c.cur?"바이어 현지 통화도 USD·EUR도 아닙니다. 바이어가 원하는 통화인지 확인하세요.":"");
  if(!d.fxOn)add(5,"warn","환율 변동 조항이 없습니다",`${d.currency}/KRW가 움직이면 마진이 그대로 노출됩니다. 기준 환율과 재협의 변동폭(예: ±5%)을 넣으세요.`,"fxOn");
  else if(!num(d.fxRate))add(5,"warn","기준 환율이 비어 있습니다","환율 조항이 의미를 가지려면 기준 환율이 필요합니다.","fxRate");
  else add(5,"pass",`환율 조항: 기준 ${num(d.fxRate)} KRW, ±${num(d.fxBand)??5}% 초과 시 재협의`,"");
  const m=d.payMethod;
  if(m==="tt_split"){const dp=num(d.dep);if(dp==null||dp<=0||dp>=100)add(5,"warn","선금 비율을 확인하세요","보통 30% 선금 + 70% 잔금입니다.","dep");else add(5,"pass",`결제: ${x.pay}`,"비율과 시점이 모두 명시되었습니다.");}
  else if(m==="tt_adv")add(5,"info","100% 선불은 신규 바이어가 거절하기 쉽습니다","첫 거래라면 30/70 분할이나 L/C를 대안으로 함께 제시하세요.","payMethod");
  else if(m.startsWith("lc")){add(5,"pass",`결제: ${x.pay}`,"");if(!d.lcConfirmed&&["SA","AE","IN","ID","VN","BR","MX"].includes(cc))add(5,"warn","확인 신용장을 검토하세요","개설은행 신용도가 불확실하면 국내 은행 확인(confirmation)으로 지급 위험을 줄일 수 있습니다.","lcConfirmed");}
  else{add(5,"warn",`${m==="oa"?"외상":m.toUpperCase()} 결제는 대금 미회수 위험이 큽니다`,"한국무역보험공사(K-SURE) 단기수출보험 가입을 검토하세요.","payMethod");if(m!=="dp"&&!num(d.days))add(5,"warn","결제 기한(일)이 없습니다","","days");}
  if(!d.validity)add(5,"fail","견적 유효기간이 없습니다","유효기간이 없으면 오래된 가격으로 주문이 들어올 수 있습니다.","validity");
  else{const g=days(today(),D(d.validity));if(g<0)add(5,"fail","견적 유효기간이 이미 지났습니다",d.validity,"validity");else if(g>120)add(5,"warn",`유효기간이 ${g}일로 깁니다`,"원자재·운임·환율 변동을 감안해 30~90일을 권합니다.","validity");else add(5,"pass",`견적 유효기간: ${fmtD(d.validity)} (${g}일 남음)`,"");}
  const lead=num(d.lead);
  if(lead==null)add(5,"warn","리드타임이 없습니다","","lead");
  else if(d.shipDate&&days(today(),D(d.shipDate))<lead)add(5,"fail","선적 예정일이 리드타임보다 이릅니다",`오늘부터 ${lead}일이 필요하지만 선적일까지 ${days(today(),D(d.shipDate))}일뿐입니다.`,"shipDate");
  if(!num(d.moq))add(5,"warn","MOQ가 없습니다","","moq");
  return out;
}

/* ---------- outputs ---------- */
const ORDER_DIRECT=["cover","summary","pain","solution","roi","evidence","compliance","terms","about","next","legal"];
const ORDER_CONTEXT=["cover","greeting","about","pain","solution","roi","evidence","compliance","terms","next","legal"];
function slides(d,x){
  const c=x.c,r=x.roi,cur=d.currency,b=d.buyer||"[Buyer]",p=d.product||"[Product]",s=d.seller||"[Seller]";
  const roiLine=r&&r.save>0?`${r.pct.toFixed(1)}% lower landed cost: ${money(r.save,cur)} per ${d.unit||"unit"}${r.annual!=null?`, about ${money(r.annual,cur)} a year at ${int(r.qty)} ${d.unit||"unit"}s`:""}`:"Value to be confirmed with your current cost data";
  const certLines=x.certs.filter(z=>z.st!=="na").map(z=>`${z.label.replace(/\s*\(.*?\)\s*/g," ").trim()}: ${({held:"obtained",progress:"in progress (expected date to be confirmed)",none:"not yet obtained; we will confirm feasibility before any order"})[z.st]}`);
  const greet={JP:`We value long-term, reliable partnerships and would be honored to support ${b} with consistent quality and on-time delivery.`,CN:`We would like to build a long-term, mutually beneficial partnership with ${b}.`,SA:`It is our privilege to introduce ourselves to ${b}. We hope to build a partnership based on trust and respect.`,AE:`It is our privilege to introduce ourselves to ${b} and to explore a lasting partnership.`}[d.country]||`We would like to explore a long-term partnership with ${b} in ${c.en}.`;
  const S={
   cover:{k:"Supply proposal",t:`${p} for ${b}`,ul:[`Prepared by ${s}`,`${fmtD(new Date().toISOString().slice(0,10))}`]},
   summary:{k:"Executive summary",t:r&&r.save>0?`${r.pct.toFixed(0)}% lower landed cost for ${b}`:`What ${p} does for ${b}`,ul:[sentences(d.pain)[0]||"[Your challenge]",sentences(d.solution)[0]||"[Our solution]",roiLine,x.priceStr,`Valid until ${fmtD(d.validity)}`]},
   greeting:{k:"Introduction",t:`A partnership proposal for ${b}`,ul:[greet,`${s} would like to propose ${p} for your customers in ${c.en}.`]},
   pain:{k:"Your challenge",t:"What your market is telling you",ul:sentences(d.pain).length?sentences(d.pain):["[Describe the buyer's problem]"]},
   solution:{k:"Our solution",t:`How ${p} solves it`,ul:sentences(d.solution).length?sentences(d.solution):["[Describe the solution]"]},
   roi:{k:"Your return",t:r&&r.save>0?`${money(r.save,cur)} saved per ${d.unit||"unit"}`:"Your return",big:r&&r.save>0?`${r.pct.toFixed(1)}%`:"",ul:r?[`Your current cost: ${money(r.bench,cur)}`,`Our price (${d.incoterm||"[Incoterm]"}): ${money(r.price,cur)}`,`Your additional costs (freight, duty, handling): ${money(r.extra,cur)}`,`Landed cost: ${money(r.landed,cur)}`,r.annual!=null?`Annual saving at ${int(r.qty)} ${d.unit||"unit"}s: ${money(r.annual,cur)}`:""].filter(Boolean).concat(sentences(d.value).slice(0,1)):sentences(d.value)},
   evidence:{k:"Evidence",t:"Where our numbers come from",ul:d.evidence.filter(e=>e.claim).map(e=>`${e.claim}${e.src?` (Source: ${e.src}${e.date?`, checked ${fmtD(e.date)}`:""})`:" (source to be added)"}`)},
   compliance:{k:"Compliance",t:`Market requirements in ${c.en}`,ul:certLines.length?certLines:["Requirements to be confirmed"]},
   terms:{k:"Commercial terms",t:"Price, delivery and payment",ul:[`Price: ${x.priceStr}`,`Minimum order: ${int(num(d.moq))||"[MOQ]"} ${d.unit||"unit"}s`,`Lead time: ${num(d.lead)??"[ ]"} days from deposit or L/C receipt`,`Payment: ${x.pay}`,x.fx||`Currency: ${cur}`,`Valid until ${fmtD(d.validity)}`]},
   about:{k:"About us",t:s,ul:c.style==="direct"?sentences(d.intro).slice(0,2):sentences(d.intro)},
   next:{k:"Next steps",t:"Proposed next steps",ul:[d.meeting?`A 30-minute call on ${fmtD(d.meeting)} to review your requirements`:"A short call to review your requirements","We send samples and a proforma invoice for your evaluation",d.shipDate?`First shipment targeted for ${fmtD(d.shipDate)}`:"First shipment date to be agreed"].concat(c.style==="context"&&r&&r.save>0?[`In summary: ${roiLine}`]:[])},
   legal:{k:"Terms of this proposal",t:"Disclaimer and governing terms",ul:[d.disclaimer?x.disc:"[Disclaimer missing]",x.lawTxt?`Any contract will be governed by ${x.lawTxt}.`:"Governing law to be agreed.",x.venueTxt?`Disputes will be settled by ${x.venueTxt}.`:"Dispute resolution to be agreed."]}
  };
  return (c.style==="direct"?ORDER_DIRECT:ORDER_CONTEXT).map(k=>S[k]);
}
function emailText(d,x){
  const c=x.c,r=x.roi,b=d.buyer||"[Buyer]",p=d.product||"[Product]";
  const dear=d.contact?`Dear ${d.contact},`:"Dear Purchasing Team,";
  const roiShort=r&&r.save>0?`${r.pct.toFixed(1)}% lower landed cost (${money(r.save,d.currency)} per ${d.unit||"unit"})`:"";
  const sign=`\nBest regards,\n\n${d.sender||"[Name]"}\n${d.senderTitle||"[Title]"}\n${d.seller||"[Company]"}`;
  const terms=`- Price: ${x.priceStr}\n- Minimum order: ${int(num(d.moq))||"[MOQ]"} ${d.unit||"unit"}s, lead time ${num(d.lead)??"[ ]"} days\n- Payment: ${x.pay}\n- Valid until ${fmtD(d.validity)}`;
  const meet=d.meeting?`Would you be available for a 30-minute call on ${fmtD(d.meeting)}? If another time suits you better, please let me know.`:"Would you be available for a 30-minute call next week?";
  if(c.style==="direct"){
    return `Subject: ${p}: ${roiShort||"a proposal"} for ${b}\n\n${dear}\n\n${roiShort?`${p} can give ${b} a ${roiShort}. `:""}${sentences(d.pain)[0]||""} ${sentences(d.solution)[0]||""}\n\nKey terms:\n${terms}\n\nThe attached proposal shows how we calculated the saving and where each figure comes from.\n\n${meet}\n${sign}`;
  }
  const open={JP:"Thank you for taking the time to read this message.",CN:"Thank you for taking the time to read this message. We hope this finds you well.",SA:"I hope this message finds you well, and thank you for taking the time to read it.",AE:"I hope this message finds you well, and thank you for taking the time to read it."}[d.country]||"I hope this message finds you well.";
  return `Subject: Partnership proposal: ${p} for ${b}\n\n${dear}\n\n${open} My name is ${d.sender||"[Name]"}, ${d.senderTitle||"[Title]"} at ${d.seller||"[Company]"}. We would be glad to build a long-term partnership with ${b} in ${c.en}.\n\n${sentences(d.pain)[0]||""} ${sentences(d.solution)[0]||""}${roiShort?`\n\nBased on the figures in the attached proposal, this means a ${roiShort} for ${b}.`:""}\n\nOur proposed terms:\n${terms}\n\n${meet} We would also be pleased to send samples for your evaluation.\n\nThank you for your consideration.\n${sign}`;
}
function banners(res,d){
  const f=res.filter(i=>i.st==="fail").length;const b=[];
  if(f)b.push(["",`DRAFT · ${f} review item${f>1?"s":""} unresolved. Do not send.`]);
  if(!d.nativeDone)b.push(["m","DRAFT · Not yet reviewed by a native English speaker."]);
  return b;
}
let TAB="deck",TEXT="";
function render(){
  const d=collect(),x=derive(d),res=review(d,x);
  /* stamp */
  const f=res.filter(i=>i.st==="fail").length,w=res.filter(i=>i.st==="warn").length,mn=res.filter(i=>i.st==="manual").length,ps=res.filter(i=>i.st==="pass").length;
  const [mk,cl,msg]=f?["발송 보류","st-fail",`필수 수정 ${f}건`]:(w||mn)?["보완 필요","st-warn",`권고 ${w}건 · 수동 확인 ${mn}건`]:["발송 가능","st-pass","모든 자동 검토 통과"];
  $("#stamp").innerHTML=`<div class="mark ${cl}">${mk}</div><div class="sum"><b>${msg}</b>분류를 누르고, 항목을 누르면 이유와 고칠 곳이 보입니다</div>`;
  stepStatus(d,x,res);
  const rank={fail:4,manual:3,warn:2,info:1,pass:0};
  const open=new Set($$("#cats details[open]").map(e=>e.dataset.cat));
    $("#cats").innerHTML=CATS.map((name,i)=>{const it=res.filter(r=>r.cat===i+1).sort((a,b)=>rank[b.st]-rank[a.st]);
    const worst=it.reduce((m,r)=>rank[r.st]>rank[m]?r.st:m,"pass");
    const cnt=it.filter(r=>r.st==="fail"||r.st==="warn"||r.st==="manual").length;
    const label={pass:"통과",warn:"권고",fail:"필수 수정",manual:"수동 확인",info:"참고"}[worst];
    const isOpen=open.has(String(i+1));
    return `<details class="cat" data-cat="${i+1}"${isOpen?" open":""}><summary><span class="n">${i+1}</span><span class="t">${name}</span><span class="pill ${worst}">${label}${cnt?" "+cnt:""}</span></summary>
    <ul class="items">${it.filter(r=>r.st!=="pass").map(r=>(r.p||r.f)?`<li class="item ${r.st}"><details><summary><b>${esc(r.t)}</b></summary>${r.p?`<p>${esc(r.p)}</p>`:""}${r.f?`<button type="button" class="go" data-go="${esc(r.f)}">고치러 가기 ›</button>`:""}</details></li>`:`<li class="item ${r.st}"><b>${esc(r.t)}</b></li>`).join("")}${it.some(r=>r.st==="pass")?`<li class="item pass"><details><summary><b>통과 ${it.filter(r=>r.st==="pass").length}건</b></summary><p>${it.filter(r=>r.st==="pass").map(r=>esc(r.t)).join("<br>")}</p></details></li>`:""}</ul></details>`}).join("");
  /* outputs */
  const bn=banners(res,d);const bnHtml=bn.map(([c,t])=>`<div class="banner ${c}">${t}</div>`).join("");const bnTxt=bn.map(b=>b[1]).join("\n")+(bn.length?"\n\n":"");
  const fic=d.fictional?"Fictional scenario · ":"";
  $("#orderNote").textContent=x.c.style==="direct"?`${x.c.ko} 바이어용 직진형 구성 (요약 먼저)`:`${x.c.ko} 바이어용 맥락형 구성 (관계·배경 먼저)`;
  let html="";
  if(TAB==="deck"){
    const sl=slides(d,x);const bg=d.theme==="dark"?"#14181D":"#FFFFFF",fg=d.theme==="dark"?"#EEF1F4":"#1A1F24";
    html=`${bnHtml}<p class="order">슬라이드 순서: ${sl.map(s=>s.k).join(" → ")}</p><div class="deck">${sl.map((s,i)=>`<div class="slide" style="background:${bg};color:${fg}"><div class="bar" style="background:${esc(d.c1)}"></div><div class="in">
      <div class="k" style="color:${esc(d.c1)}">${esc(s.k)}</div><h4>${esc(s.t)}</h4>${s.big?`<div class="big" style="color:${esc(d.c2)}">${esc(s.big)}</div>`:""}<ul>${s.ul.filter(Boolean).map(u=>`<li>${esc(u)}</li>`).join("")}</ul></div>
      ${d.fictional?`<div class="fic">Fictional scenario</div>`:""}<div class="pg">${i+1} / ${sl.length}</div></div>`).join("")}</div>`;
    TEXT=bnTxt+sl.map((s,i)=>`[${i+1}] ${s.k.toUpperCase()}\n${s.t}\n${s.ul.filter(Boolean).map(u=>"- "+u).join("\n")}${s.big?"\n"+s.big:""}`).join("\n\n")+(d.fictional?"\n\nFictional scenario":"");
  }else if(TAB==="offer"){
    const rows=[["Seller",d.seller],["Buyer",d.buyer],["Product",d.product],["HS code",d.hs],["Unit price",x.priceStr],["Minimum order quantity",`${int(num(d.moq))} ${d.unit||"unit"}s`],["Mode of transport",{container:"Sea, containerized",bulk:"Sea, bulk",air:"Air",road:"Road",multi:"Multimodal"}[d.mode]],
      ["Lead time",`${num(d.lead)??"[ ]"} days from deposit or L/C receipt`],["Payment terms",x.pay],["Currency and exchange rate",x.fx||d.currency],["Certifications",x.certs.filter(z=>z.st!=="na").map(z=>`${z.label}: ${({held:"obtained",progress:"in progress",none:"not obtained"})[z.st]}`).join("; ")],
      ["Validity",fmtD(d.validity)],["Governing law",x.lawTxt||"To be agreed"],["Dispute resolution",x.venueTxt||"To be agreed"],["Disclaimer",d.disclaimer?x.disc:"[missing]"]];
    html=`${bnHtml}<div class="doc"><div class="eyebrow">${fic}Offer sheet</div><h3>${esc(d.product)}</h3><p style="color:var(--muted);margin:0 0 12px">${esc(d.seller)} → ${esc(d.buyer)} · ${fmtD(new Date().toISOString().slice(0,10))}</p><table class="num">${rows.map(([a,b])=>`<tr><th>${a}</th><td>${esc(b||"—")}</td></tr>`).join("")}</table></div>`;
    TEXT=bnTxt+`${fic}OFFER SHEET\n\n`+rows.map(([a,b])=>`${a}: ${b||"-"}`).join("\n");
  }else if(TAB==="appendix"){
    const r=x.roi;
    const asm=r?[["Buyer's current unit cost",money(r.bench,d.currency),"Buyer benchmark (to confirm with buyer)"],["Our unit price",money(r.price,d.currency),`${d.incoterm} ${d.place}`],["Buyer's additional costs per unit",money(r.extra,d.currency),"Estimate: freight, insurance, duty, handling"],["Annual volume",int(r.qty)||"—","Assumption"],["Landed cost",money(r.landed,d.currency),"Calculated"],["Saving per unit",`${money(r.save,d.currency)} (${r.pct.toFixed(1)}%)`,"Calculated"],["Annual saving",r.annual!=null?money(r.annual,d.currency):"—","Calculated"]]:[];
    const ev=d.evidence.filter(e=>e.claim||e.src);
    html=`${bnHtml}<div class="doc"><div class="eyebrow">${fic}Appendix</div><h3>Sources and assumptions</h3>
      <h4 style="margin:16px 0 6px">A. Sources</h4><table><tr><th style="width:auto">Claim</th><th style="width:auto">Source</th><th style="width:auto">Checked</th></tr>${ev.map(e=>`<tr><td>${esc(e.claim)}</td><td>${esc(e.src||"MISSING")}</td><td class="num">${esc(e.date||"—")}</td></tr>`).join("")||`<tr><td colspan="3">No sources entered</td></tr>`}</table>
      <h4 style="margin:16px 0 6px">B. ROI assumptions</h4>${asm.length?`<table class="num"><tr><th style="width:auto">Item</th><th style="width:auto">Value</th><th style="width:auto">Basis</th></tr>${asm.map(a=>`<tr><td>${a[0]}</td><td>${esc(a[1])}</td><td>${esc(a[2])}</td></tr>`).join("")}</table>`:"<p>ROI inputs not provided.</p>"}
      <h4 style="margin:16px 0 6px">C. Review log</h4><p style="margin:0">Automated review on ${new Date().toISOString().slice(0,16).replace("T"," ")} UTC: ${ps} passed, ${w} advisories, ${f} blocking, ${mn} manual. Native review: ${d.nativeDone?"completed"+(d.reviewer?" by "+esc(d.reviewer):""):"pending"}.</p></div>`;
    TEXT=bnTxt+`${fic}APPENDIX: SOURCES AND ASSUMPTIONS\n\nA. Sources\n`+(ev.map(e=>`- ${e.claim} | ${e.src||"MISSING"} | ${e.date||"-"}`).join("\n")||"- none")+`\n\nB. ROI assumptions\n`+(asm.map(a=>`- ${a[0]}: ${a[1]} (${a[2]})`).join("\n")||"- not provided")+`\n\nC. Review log: ${ps} passed, ${w} advisories, ${f} blocking, ${mn} manual. Native review: ${d.nativeDone?"completed":"pending"}.`;
  }else if(TAB==="email"){
    TEXT=bnTxt+emailText(d,x)+(d.fictional?"\n\n(Fictional scenario)":"");
    html=`${bnHtml}<div class="doc"><div class="eyebrow">${fic}Cover email · ${x.c.style==="direct"?"direct style":"relationship-first style"}</div><pre>${esc(emailText(d,x))}</pre></div>`;
  }else{
    const lines=CATS.map((n,i)=>`■ ${i+1}. ${n}\n`+res.filter(r=>r.cat===i+1).map(r=>`  [${({pass:"통과",warn:"권고",fail:"필수",manual:"수동",info:"참고"})[r.st]}] ${r.t}${r.p?"\n        "+r.p:""}`).join("\n")).join("\n\n");
    TEXT=`검토 결과: ${mk} (통과 ${ps} · 권고 ${w} · 필수 ${f} · 수동 ${mn})\n\n`+lines;
    html=`<div class="doc"><pre>${esc(TEXT)}</pre></div>`;
  }
  $("#out").innerHTML=html;
}

/* ---------- step accordion ---------- */
function openStep(st){$$("details.step").forEach(o=>{if(o!==st)o.open=false});st.open=true;}
$$("details.step").forEach(st=>st.addEventListener("toggle",()=>{if(st.open)$$("details.step").forEach(o=>{if(o!==st)o.open=false});}));
function stepStatus(d,x,res){
  const cnt={};res.forEach(r=>{if(!r.f||!["fail","warn","manual"].includes(r.st))return;const el=document.getElementById(r.f);const st=el&&el.closest("details.step");if(!st)return;const n=st.dataset.step;cnt[n]=cnt[n]||{fail:0,warn:0};cnt[n][r.st==="fail"?"fail":"warn"]++;});
  for(let n=1;n<=8;n++){const c=cnt[n];$("#sc"+n).innerHTML=!c?'<span class="pill pass">OK</span>':c.fail?`<span class="pill fail">필수 ${c.fail}</span>`:`<span class="pill warn">권고 ${c.warn}</span>`;}
  const held=x.certs.filter(z=>z.st==="held").length;
  const pv=["",[d.product,d.seller].filter(Boolean).join(" · "),[x.c.ko,d.buyer].filter(Boolean).join(" · "),words([d.pain,d.solution,d.value,d.intro].join(" "))+" words",
   x.roi?"절감 "+x.roi.pct.toFixed(1)+"%":"ROI 미입력",d.price?`${d.currency} ${d.price} · ${d.incoterm||"인코텀즈 미정"}`:"",
   [d.meeting&&"미팅 "+d.meeting,d.shipDate&&"선적 "+d.shipDate].filter(Boolean).join(" · "),`인증 ${held}/${x.certs.length} 보유`,d.nativeDone?"감수 완료":"감수 전"];
  for(let n=1;n<=8;n++)$("#pv"+n).textContent=pv[n]||"";
}
$("#form").addEventListener("click",e=>{const nx=e.target.dataset.next;if(nx){const st=$(`details.step[data-step="${nx}"]`);openStep(st);setTimeout(()=>st.scrollIntoView({behavior:"smooth",block:"start"}),30);}
  if(e.target.dataset.jump)$("#out-anchor").scrollIntoView({behavior:"smooth",block:"start"});});

/* ---------- events ---------- */
let t;const later=()=>{clearTimeout(t);t=setTimeout(render,180)};
$("#form").addEventListener("input",e=>{
  const el=e.target;
  if(el.dataset.ev!=null){S.evidence[+el.dataset.ev][el.dataset.f]=el.value;}
  if(el.dataset.cert){S.certs[el.dataset.cert]=el.value;}
  if(el.id==="country"||el.id==="category"){collect();if(el.id==="country"&&C[S.country]){/* keep currency */}renderCerts();}
  if(el.id==="payMethod"||el.id==="incoterm"){collect();toggles();}
  later();
});
$("#form").addEventListener("change",e=>{if(e.target.dataset.cert){S.certs[e.target.dataset.cert]=e.target.value;later();}});
$("#evList").addEventListener("click",e=>{const i=e.target.dataset.rm;if(i==null)return;S.evidence.splice(+i,1);if(!S.evidence.length)S.evidence.push({claim:"",src:"",date:""});renderEv();render();});
$("#addEv").addEventListener("click",()=>{S.evidence.push({claim:"",src:"",date:""});renderEv();render();$(`#ev-claim-${S.evidence.length-1}`).focus();});
$$("[data-preset]").forEach(b=>b.addEventListener("click",()=>{S=JSON.parse(JSON.stringify(PRESETS[b.dataset.preset]));load();render();}));
$("#clearAll").addEventListener("click",()=>{S=JSON.parse(JSON.stringify(BLANK));load();render();});
$("#cats").addEventListener("click",e=>{const id=e.target.dataset.go;if(!id)return;const el=document.getElementById(id);if(!el)return;const st=el.closest("details.step");if(st&&!st.open)openStep(st);el.scrollIntoView({behavior:"smooth",block:"center"});el.focus({preventScroll:true});el.classList.remove("flash");void el.offsetWidth;el.classList.add("flash");});
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("[data-tab]");if(!b)return;TAB=b.dataset.tab;$$("#tabs [data-tab]").forEach(x=>x.setAttribute("aria-selected",x===b?"true":"false"));render();});
function toast(m){const d=document.createElement("div");d.className="toast";d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),1800);}
$("#copyBtn").addEventListener("click",()=>{
  const fallback=()=>{const ta=document.createElement("textarea");ta.value=TEXT;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");toast("복사했습니다")}catch(e){toast("복사가 막혀 있어 텍스트를 선택해 두었습니다")}ta.remove();};
  try{navigator.clipboard.writeText(TEXT).then(()=>toast("복사했습니다"),fallback)}catch(e){fallback()}
});

load();render();
})();
