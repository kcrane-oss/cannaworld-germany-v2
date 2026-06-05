/* Generates the full-catalogue CannaWorld pricing PDF in Thai and English.
   Thai uses the Loma OpenType font; English uses built-in Helvetica. */
const PDFDocument = require("pdfkit");
const fs = require("fs");

const LOMA = "/usr/share/fonts/opentype/tlwg/Loma.otf";
const LOMA_BOLD = "/usr/share/fonts/opentype/tlwg/Loma-Bold.otf";
const OUT_DIR = require("path").join(__dirname, "..", "docs", "pricing");

const GREEN = "#0a6b5a";
const ACCENT = "#16b39a";
const PRICE = "#b06a00";
const TOK = "#0a7d6a";
const INK = "#0d1b24";
const MUTE = "#4a6b73";
const ROW_EVEN = "#f3f8f7";

const num = (n) => n.toLocaleString("en-US");

const TOKENS = {
  basic: { th: "พื้นฐาน", en: "Basic" },
  read: { th: "อ่าน", en: "Read" },
  create: { th: "สร้าง", en: "Create" },
  contrib: { th: "มีส่วนร่วม", en: "Contribute" },
  master: { th: "Master", en: "Master" },
  full: { th: "เต็ม", en: "Full" },
};

function cellPrice(unit, n, lang) {
  const v = num(n);
  const TH = {
    mo: `+฿${v}/ด.`, audit: `฿${v}/ครั้ง`, coa: `฿${v}/CoA`, release: `฿${v}/ปล่อย`,
    analysis: `฿${v}/ครั้ง`, pack: `฿${v}/ชุด`, memo: `฿${v}/ฉบับ`, site: `+฿${v}/สาขา`,
  };
  const EN = {
    mo: `+${v}/mo`, audit: `${v}/audit`, coa: `${v}/CoA`, release: `${v}/rel.`,
    analysis: `${v}/anl.`, pack: `${v}/pack`, memo: `${v}/memo`, site: `+${v}/site`,
  };
  return (lang === "th" ? TH : EN)[unit];
}

function addPrice(unit, n, lang) {
  const v = num(n);
  const TH = {
    mo: `+฿${v}/เดือน`, audit: `฿${v}/ออดิท`, coa: `฿${v}/CoA`, release: `฿${v}/การปล่อย`,
    analysis: `฿${v}/ครั้ง`, pack: `฿${v}/ชุด`, memo: `฿${v}/ฉบับ`, site: `+฿${v}/สาขา`,
  };
  const EN = {
    mo: `+THB ${v}/mo`, audit: `THB ${v}/audit`, coa: `THB ${v}/CoA`, release: `THB ${v}/release`,
    analysis: `THB ${v}/analysis`, pack: `THB ${v}/pack`, memo: `THB ${v}/memo`, site: `+THB ${v}/site`,
  };
  return (lang === "th" ? TH : EN)[unit];
}

// Service catalogue grouped into 5 layers. cells: F,Exp,Prod,Lab,Ent
// codes: I=included, A=à-la-carte(row.add), or a token name; seats row uses lit.
const LAYERS = [
  {
    title: { th: "ก · แพลตฟอร์มดิจิทัล", en: "A · Digital Platform" },
    rows: [
      { name: { th: "Compliance Gateway (BfArM/GDP/GMP)", en: "Compliance Gateway (BfArM/GDP/GMP)" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "mo", n: 3500 } },
      { name: { th: "Regulatory Gateway (บทบาท/ใบอนุญาต)", en: "Regulatory Gateway (role/license)" }, cells: ["A", "I", "I", "A", "I"], add: { unit: "mo", n: 2200 } },
      { name: { th: "Batch Tracking", en: "Batch Tracking" }, cells: ["A", "I", "I", "A", "I"], add: { unit: "mo", n: 2400 } },
      { name: { th: "Document Intelligence (Buyer Packs)", en: "Document Intelligence (buyer packs)" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "mo", n: 3800 } },
      { name: { th: "Regulatory Risk Scoring", en: "Regulatory Risk Scoring" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "mo", n: 2900 } },
      { name: { th: "AI Video Audit / ShinrAi", en: "AI Video Audit / ShinrAi" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "audit", n: 35000 } },
    ],
  },
  {
    title: { th: "ข · การปฏิบัติตามกฎและที่ปรึกษา", en: "B · Compliance & Advisory" },
    rows: [
      { name: { th: "Import Gap Analysis", en: "Import Gap Analysis" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "analysis", n: 9900 } },
      { name: { th: "ความพร้อม QMS / SOP", en: "QMS / SOP readiness" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "mo", n: 4500 } },
      { name: { th: "Certification Roadmap (GACP/EU-GMP)", en: "Certification Roadmap (GACP/EU-GMP)" }, cells: ["I", "A", "I", "A", "I"], add: { unit: "mo", n: 2500 } },
      { name: { th: "Regulatory Positioning", en: "Regulatory Positioning" }, cells: ["A", "A", "A", "A", "I"], add: { unit: "memo", n: 8000 } },
      { name: { th: "Due Diligence Packs", en: "Due Diligence Packs" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "pack", n: 6500 } },
      { name: { th: "Audit Trail (ALCOA+)", en: "Audit Trail (ALCOA+)" }, cells: ["A", "A", "I", "I", "I"], add: { unit: "mo", n: 1900 } },
    ],
  },
  {
    title: { th: "ค · การค้าและโลจิสติกส์", en: "C · Trade & Logistics" },
    rows: [
      { name: { th: "Supplier Qualification", en: "Supplier Qualification" }, cells: ["A", "I", "I", "A", "I"], add: { unit: "mo", n: 2200 } },
      { name: { th: "Lab / CoA Review", en: "Lab / CoA Review" }, cells: ["A", "A", "I", "master", "I"], add: { unit: "coa", n: 900 } },
      { name: { th: "GDP Logistics", en: "GDP Logistics" }, cells: ["A", "I", "I", "A", "I"], add: { unit: "mo", n: 3200 } },
      { name: { th: "QP Release Support", en: "QP Release Support" }, cells: ["A", "A", "A", "A", "I"], add: { unit: "release", n: 12000 } },
      { name: { th: "Commercial Matching", en: "Commercial Matching" }, cells: ["A", "I", "A", "A", "I"], add: { unit: "mo", n: 4900 } },
      { name: { th: "Cross-Platform Sync", en: "Cross-Platform Sync" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "mo", n: 1500 } },
    ],
  },
  {
    title: { th: "ง · ความน่าเชื่อถือและการวิเคราะห์", en: "D · Trust & Intelligence" },
    rows: [
      { name: { th: "Audit Passport", en: "Audit Passport" }, cells: ["read", "read", "create", "contrib", "create"], add: null },
      { name: { th: "Identity / KYC", en: "Identity / KYC" }, cells: ["I", "I", "I", "I", "I"], add: { flat: true } },
      { name: { th: "Remote Inspector Toolkit", en: "Remote Inspector Toolkit" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "mo", n: 5500 } },
      { name: { th: "Analytics", en: "Analytics" }, cells: ["A", "A", "A", "A", "I"], add: { unit: "mo", n: 2900 } },
      { name: { th: "Warehouse / Inventory", en: "Warehouse / Inventory" }, cells: ["A", "I", "I", "A", "I"], add: { unit: "mo", n: 2400 } },
      { name: { th: "Facility Planner", en: "Facility Planner" }, cells: ["A", "A", "I", "A", "I"], add: { unit: "mo", n: 2600 } },
    ],
  },
  {
    title: { th: "จ · แพลตฟอร์มและการเข้าถึง", en: "E · Platform & Access" },
    rows: [
      { name: { th: "ออนบอร์ด Gateway (TH)", en: "Gateway onboarding (TH)" }, cells: ["I", "I", "I", "I", "I"], add: { flat: true } },
      { name: { th: "Document Vault", en: "Document Vault" }, cells: ["basic", "I", "I", "I", "I"], add: null },
      { name: { th: "จัดการคำขอตัวอย่าง", en: "Sample-request fulfillment" }, cells: ["A", "I", "I", "A", "I"], add: { unit: "mo", n: 1500 } },
      { name: { th: "Europe Portal (ปลายทาง EU)", en: "Europe portal (EU destination)" }, cells: ["A", "A", "A", "A", "I"], add: { unit: "mo", n: 9900 } },
      { name: { th: "การเข้าถึง API", en: "API access" }, cells: ["A", "A", "A", "read", "full"], add: { unit: "mo", n: 5900 } },
      { name: { th: "ผู้ใช้ / สาขา", en: "Users / sites" }, seats: true, add: { unit: "site", n: 2900 }, lit: { th: ["3 / 1", "5 / 1", "15 / หลาย", "8 / 1", "ไม่จำกัด / หลาย"], en: ["3 / 1", "5 / 1", "15 / Multi", "8 / 1", "unltd / Multi"] } },
    ],
  },
];

const STR = {
  th: {
    title: "CannaWorld — บริการทั้งหมดและราคา (ส่งออกจากไทย)",
    subtitle: "ราคาและแพ็กเกจ · บทบาท × ระดับ · ค่าบริการรายเดือน + ค่าธรรมเนียมตามการใช้งาน · เส้นทาง ไทย -> เยอรมนี/EU",
    badge: "ราคาทั้งหมดเป็นเงินบาท (THB) · เงื่อนไขแบบ B2B · ยังไม่รวมภาษี",
    s1: "1 · ภาพรวม 5 แพ็กเกจ",
    s1head: ["#", "แพ็กเกจ", "บทบาท", "ระดับ", "ค่าบริการ/เดือน", "ค่าธรรมเนียมตามการใช้งาน"],
    pkgs: [
      ["1", "Farm Starter", "ผู้เพาะปลูก / ฟาร์ม", "เริ่มต้น", "฿4,900", "฿3,500 / การตรวจ GACP"],
      ["2", "Marketplace Exporter", "เทรดเดอร์ / ผู้ส่งออก", "Pro", "฿9,900", "ค่าคอมมิชชันผู้ขาย 4% + ฿1,500 / ประกาศ"],
      ["3", "Producer GMP", "ผู้ผลิต / สกัด", "ขั้นสูง", "฿29,000", "฿35,000 / AI ออดิท · ฿59,000 ตั้งค่ารับรอง"],
      ["4", "Lab & CoA Partner", "ห้องแล็บ / CoA", "Pro", "฿14,900", "฿900 / CoA ที่ตรวจสอบแล้ว"],
      ["5", "Export Enterprise", "กลุ่มผู้ผลิต / หลายสาขา", "Enterprise", "เริ่ม ฿120,000", "ลดค่าคอมมิชชัน + โควตา API"],
    ],
    discount: "ส่วนลด: ชำระรายปี ฟรี 2 เดือน (-17%) · ตั้งแต่ 3 ฟาร์ม -15% · ตั้งแต่ 10 ฟาร์ม -25%",
    s2: "2 · บริการทั้งหมด พร้อมราคาซื้อเพิ่ม (à la carte)",
    legend: "คำอธิบาย: “รวม” = อยู่ในแพ็กเกจ · ราคา = ซื้อเพิ่มได้ — ไม่มีบริการใดถูกล็อก",
    matrixHead: ["บริการ", "Farm", "Exporter", "Producer", "Lab", "Enterprise", "ซื้อเพิ่ม"],
    inc: "รวม",
    flatAdd: "รวมทุกแพ็กเกจ",
    dash: "—",
    s3: "3 · โมดูลเสริม (ใช้ได้ทุกแพ็กเกจ)",
    s3head: ["โมดูล", "ราคา", "เหมาะสำหรับ"],
    addons: [
      ["โมดูลผู้ขาย Marketplace", "฿4,900/เดือน + 4%", "Producer GMP"],
      ["เพิ่มโรงงาน / ฟาร์ม", "฿2,900/เดือน ต่อสาขา", "Producer · Enterprise"],
      ["AI Video Audit ด่วน (72 ชม.)", "+฿15,000", "Producer GMP"],
      ["สนับสนุนการปล่อย QP (EU)", "฿12,000 / การปล่อย", "Producer · Enterprise"],
      ["บันทึกด้านกฎระเบียบ (อย. <-> EU)", "฿8,000 / ฉบับ", "ทุกบทบาทฝั่งซัพพลาย"],
      ["จับคู่ผู้ซื้อแบบ Priority", "฿6,900/เดือน", "Marketplace Exporter"],
    ],
    s4: "4 · เส้นทางอัปเกรด",
    p4a: "Farm Starter -> (ผ่าน GACP) -> Producer GMP -> (ขยายขนาด) -> Export Enterprise",
    p4b: "Marketplace Exporter -> (ต้องการ EU-GMP) -> Producer GMP · Lab & CoA เป็นบทบาทข้ามสายที่เสริมความน่าเชื่อถือให้ทุกแพ็กเกจ",
    p4c: "ค่าออดิท GACP/AI ที่จ่ายแล้วจะถูกนำมาหักกับค่าตั้งค่ารับรอง · ไม่มีการผูกมัด: Audit Passport และเอกสารย้ายออกได้ ข้อมูลเป็นของผู้ผลิต",
    s5: "5 · คำถามที่พบบ่อย",
    faq: [
      ["ทำไมราคาจึงเป็นเงินบาท?", "ค่าบริการคิดเป็นเงินบาทตามต้นทุนในประเทศ ค่าคอมมิชชัน Marketplace คำนวณจากดีลสกุล EUR และแสดง/จ่ายอย่างโปร่งใสเป็นเงินบาท"],
      ["ค่าคอมมิชชันเก็บเมื่อใด?", "เฉพาะเมื่อมีการขายจริงผ่าน Marketplace เท่านั้น — ไม่ขายก็ไม่มีค่าคอมมิชชัน"],
      ["มีส่วนลดตามปริมาณหรือไม่?", "มี: ตั้งแต่ 3 ฟาร์ม -15%, ตั้งแต่ 10 ฟาร์ม -25% · ชำระรายปีประหยัด 2 เดือน (-17%)"],
      ["รองรับภาษาใดบ้าง?", "เยอรมัน อังกฤษ และไทย"],
    ],
    footer: "CannaWorld · B2B Medical-Cannabis Compliance & Export · ราคาทั้งหมดเป็นเงินบาท (THB) ยังไม่รวมภาษี · เอกสารนี้เป็นข้อเสนอราคาเบื้องต้น ราคาอาจปรับเปลี่ยนได้ · info@cannaworld-germany.de",
  },
  en: {
    title: "CannaWorld - All Services & Pricing (Export from Thailand)",
    subtitle: "Pricing & Packages  -  Role x Tier  -  Monthly subscription + transaction  -  Corridor: Thailand -> Germany/EU",
    badge: "All prices in THB  -  B2B terms  -  excl. applicable taxes",
    s1: "1 - Five packages at a glance",
    s1head: ["#", "Package", "Role", "Tier", "Per month", "Transaction"],
    pkgs: [
      ["1", "Farm Starter", "Cultivator / Farm", "Entry", "THB 4,900", "THB 3,500 / GACP audit"],
      ["2", "Marketplace Exporter", "Trader / Exporter", "Pro", "THB 9,900", "4% seller commission + THB 1,500 / listing"],
      ["3", "Producer GMP", "Manufacturer / Extraction", "Advanced", "THB 29,000", "THB 35,000 / AI audit  -  THB 59,000 cert setup"],
      ["4", "Lab & CoA Partner", "Lab / CoA", "Pro", "THB 14,900", "THB 900 / verified CoA"],
      ["5", "Export Enterprise", "Producer group / Multi-site", "Enterprise", "from THB 120,000", "reduced commissions + API quotas"],
    ],
    discount: "Discounts: annual billing = 2 months free (-17%)  -  from 3 farms -15%  -  from 10 farms -25%",
    s2: "2 - All services with a-la-carte prices",
    legend: 'Legend: "Incl." = included  -  a price = available as add-on; no service is locked.',
    matrixHead: ["Service", "Farm", "Exporter", "Producer", "Lab", "Enterprise", "Add-on"],
    inc: "Incl.",
    flatAdd: "all packages",
    dash: "-",
    s3: "3 - Add-on modules (cross-package)",
    s3head: ["Module", "Price", "For"],
    addons: [
      ["Marketplace seller add-on", "THB 4,900/mo + 4%", "Producer GMP"],
      ["Additional facility / farm", "THB 2,900/mo per site", "Producer - Enterprise"],
      ["Express AI Video Audit (72 h)", "+THB 15,000", "Producer GMP"],
      ["QP release support (EU)", "THB 12,000 / release", "Producer - Enterprise"],
      ["Regulatory memo (Thai-FDA <-> EU)", "THB 8,000 / piece", "all supply roles"],
      ["Priority buyer matching", "THB 6,900/mo", "Marketplace Exporter"],
    ],
    s4: "4 - Upgrade paths",
    p4a: "Farm Starter -> (GACP passed) -> Producer GMP -> (scale up) -> Export Enterprise",
    p4b: "Marketplace Exporter -> (needs EU-GMP) -> Producer GMP.   Lab & CoA is a cross-role that strengthens trust across every package.",
    p4c: "Paid GACP/AI audits are credited toward the cert setup. No lock-in: the Audit Passport and documents are portable - the data belongs to the producer.",
    s5: "5 - Pricing FAQ",
    faq: [
      ["Why are prices in THB?", "Subscriptions are priced locally in THB. Marketplace commissions are calculated on the EUR deal and shown and paid out transparently in THB."],
      ["When does commission apply?", "Only on an actual sale via the marketplace - no sale, no commission."],
      ["Are there volume discounts?", "Yes: from 3 farms -15%, from 10 farms -25%. Annual payment saves 2 months (-17%)."],
      ["Which languages are supported?", "German, English and Thai."],
    ],
    footer: "CannaWorld - B2B Medical-Cannabis Compliance & Export. All prices in THB, excl. applicable taxes. This document is a preliminary quote; prices may change. info@cannaworld-germany.de",
  },
};

function build(lang) {
  const S = STR[lang];
  const doc = new PDFDocument({ size: "A4", margin: 36, bufferPages: true });
  if (lang === "th") {
    doc.registerFont("body", LOMA);
    doc.registerFont("bodyb", LOMA_BOLD);
  }
  const out = `${OUT_DIR}/cannaworld-services-${lang}.pdf`;
  doc.pipe(fs.createWriteStream(out));

  const M = 36;
  const RIGHT = doc.page.width - M;
  const BOTTOM = doc.page.height - M;
  const CW = RIGHT - M;
  let y = M;

  const font = (bold) => doc.font(lang === "th" ? (bold ? "bodyb" : "body") : bold ? "Helvetica-Bold" : "Helvetica");
  const newPage = () => {
    doc.addPage();
    y = M;
  };

  function heading(text) {
    if (y + 28 > BOTTOM) newPage();
    y += 6;
    font(true);
    doc.fontSize(13).fillColor(GREEN).text(text, M, y);
    y = doc.y + 2;
    doc.moveTo(M, y).lineTo(RIGHT, y).lineWidth(1.5).strokeColor(ACCENT).stroke();
    y += 6;
  }
  function subhead(text) {
    if (y + 18 > BOTTOM) newPage();
    y += 2;
    font(true);
    doc.fontSize(9.5).fillColor(GREEN).text(text, M, y);
    y = doc.y + 2;
  }
  function paragraph(text, opts = {}) {
    const size = opts.size || 9;
    font(opts.bold || false);
    doc.fontSize(size).fillColor(opts.color || INK);
    const h = doc.heightOfString(text, { width: CW });
    if (y + h > BOTTOM) newPage();
    doc.text(text, M, y, { width: CW });
    y = doc.y + (opts.gap == null ? 4 : opts.gap);
  }
  function table(headers, rows, widths, opt = {}) {
    const size = opt.size || 8;
    const pad = 4;
    const xs = [];
    let x = M;
    for (const w of widths) {
      xs.push(x);
      x += w;
    }
    const cellH = (cell, w) => {
      const c = typeof cell === "string" ? { text: cell } : cell;
      font(c.bold || false);
      doc.fontSize(size);
      return doc.heightOfString(c.text, { width: w - pad * 2 });
    };
    function drawRow(cells, isHeader) {
      const h = Math.max(...cells.map((c, i) => cellH(c, widths[i]))) + pad * 2;
      if (y + h > BOTTOM) {
        newPage();
        drawRow(headers, true);
      }
      if (isHeader) doc.rect(M, y, CW, h).fill(GREEN);
      else if (opt.zebra && opt.ri % 2 === 1) doc.rect(M, y, CW, h).fill(ROW_EVEN);
      cells.forEach((cell, i) => {
        const c = typeof cell === "string" ? { text: cell } : cell;
        font(c.bold || isHeader || false);
        doc.fontSize(size).fillColor(isHeader ? "#ffffff" : c.color || INK);
        doc.text(c.text, xs[i] + pad, y + pad, { width: widths[i] - pad * 2, align: c.align || "left" });
        doc.rect(xs[i], y, widths[i], h).lineWidth(0.5).strokeColor("#cdd8dd").stroke();
      });
      y += h;
    }
    drawRow(headers, true);
    rows.forEach((r, idx) => {
      opt.ri = idx;
      drawRow(r, false);
    });
    y += 6;
  }

  // Title
  font(true);
  doc.fontSize(18).fillColor(GREEN).text(S.title, M, y, { width: CW });
  y = doc.y + 2;
  paragraph(S.subtitle, { color: MUTE, size: 9.5, gap: 6 });
  paragraph(S.badge, { color: GREEN, bold: true, size: 9, gap: 4 });

  // Section 1
  heading(S.s1);
  table(
    S.s1head,
    S.pkgs.map((p) => [p[0], p[1], p[2], p[3], { text: p[4], bold: true }, p[5]]),
    [22, 96, 110, 58, 82, 155],
    { zebra: true, size: 8.5 },
  );
  paragraph(S.discount, { color: MUTE, size: 8.5 });

  // Section 2 — full service matrix grouped by layer
  heading(S.s2);
  paragraph(S.legend, { color: MUTE, size: 8.5 });
  const incCell = { text: S.inc, color: GREEN, bold: true, align: "center" };
  const widths = [146, 57, 61, 61, 57, 67, 74];
  for (const layer of LAYERS) {
    subhead(layer.title[lang]);
    const rows = layer.rows.map((r) => {
      const name = r.name[lang];
      let cells;
      if (r.seats) {
        cells = r.lit[lang].map((t) => ({ text: t, align: "center" }));
      } else {
        cells = r.cells.map((code) => {
          if (code === "I") return incCell;
          if (code === "A") return { text: cellPrice(r.add.unit, r.add.n, lang), color: PRICE, align: "center" };
          return { text: TOKENS[code][lang], color: TOK, align: "center" }; // token
        });
      }
      let addCell;
      if (!r.add) addCell = S.dash;
      else if (r.add.flat) addCell = S.flatAdd;
      else addCell = { text: addPrice(r.add.unit, r.add.n, lang), color: PRICE };
      return [name, ...cells, addCell];
    });
    table(S.matrixHead, rows, widths, { zebra: true, size: 7.5 });
  }

  // Section 3 — add-ons
  heading(S.s3);
  table(
    S.s3head,
    S.addons.map((a) => [a[0], { text: a[1], color: PRICE }, a[2]]),
    [210, 150, 163],
    { zebra: true, size: 8.5 },
  );

  // Section 4 — upgrade paths
  heading(S.s4);
  paragraph(S.p4a);
  paragraph(S.p4b);
  paragraph(S.p4c, { color: MUTE, size: 8.5 });

  // Section 5 — FAQ
  heading(S.s5);
  for (const [q, a] of S.faq) {
    paragraph(q, { bold: true, size: 9, gap: 1 });
    paragraph(a, { color: "#34515a", size: 8.5, gap: 5 });
  }

  y += 4;
  doc.moveTo(M, y).lineTo(RIGHT, y).lineWidth(0.5).strokeColor("#cdd8dd").stroke();
  y += 4;
  paragraph(S.footer, { color: MUTE, size: 7.5 });

  doc.end();
  return new Promise((res) => doc.on("end", () => res(out)));
}

(async () => {
  for (const lang of ["th", "en"]) {
    const f = await build(lang);
    console.log("written:", f);
  }
})();
