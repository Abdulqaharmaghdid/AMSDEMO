/* ===== AMS admin views ===== */

amsInit();
const staff = amsRequireStaff();

/* ---------- icons (stroke style like mockup) ---------- */
const I = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const IC = {
  dash: I('<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>'),
  users: I('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.6c2.8.4 5.5 2 5.5 5.4"/>'),
  meet: I('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  task: I('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8.5 12.5l2.5 2.5 5-6"/>'),
  eval: I('<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>'),
  cart: I('<circle cx="9" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/><path d="M3 4h2l2.5 11h10L21 8H6"/>'),
  report: I('<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>'),
  doc: I('<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/>'),
  gear: I('<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>'),
  team: I('<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9.5" r="2.2"/><path d="M2.5 19c.5-3 3-4.5 5.5-4.5S13 16 13.5 19M13.8 15.5c2 .3 4 1.7 4.4 3.5"/>'),
  /* small icons */
  leaf: I('<path d="M12 21c0-6 2-10 8-13-1 7-3 11-8 13z"/><path d="M12 21c0-6-2-10-8-13 1 7 3 11 8 13z"/><path d="M12 21v-5"/>'),
  pin: I('<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  cal: I('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  stage: I('<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>'),
  money: I('<circle cx="12" cy="12" r="9"/><path d="M12 6v12M15 8.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.3c0 3.5 6 1.7 6 5.2 0 1.4-1.3 2.5-3 2.5s-3-1.1-3-2.5"/>'),
  pie: I('<circle cx="12" cy="12" r="9"/><path d="M12 3v9h9"/><path d="M12 3a9 9 0 0 1 9 9"/>'),
  folder: I('<path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
  box: I('<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>'),
  alertc: I('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/>'),
  shield: I('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'),
  home: I('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
  filter: I('<path d="M4 5h16l-6 8v6l-4 2v-8z"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  dots: I('<circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/>'),
};

/* ---------- nav ---------- */
const NAV = [
  { v: "dashboard", label: "Dashboard", icon: "dash", perm: null },
  { v: "applicants", label: "Applicants", icon: "users", perm: "view_applicants" },
  { v: "meetings", label: "Meetings", icon: "meet", perm: "manage_meetings" },
  { v: "tasks", label: "Tasks", icon: "task", perm: "manage_tasks" },
  { v: "evaluations", label: "Evaluations", icon: "eval", perm: "evaluate" },
  { v: "procurement", label: "Procurement", icon: "cart", perm: "manage_procurement" },
  { v: "reports", label: "Reports", icon: "report", perm: "view_reports" },
  { v: "documents", label: "Documents", icon: "folder", perm: "view_applicants" },
  { v: "team", label: "Team & Roles", icon: "team", perm: "manage_staff" },
  { v: "settings", label: "Settings", icon: "gear", perm: null },
];

const $ams = (s, r = document) => r.querySelector(s);
const $$ams = (s, r = document) => [...r.querySelectorAll(s)];
const escA = (s) => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* typo-tolerant search — "abdlqhar" still finds "Abdulqahar" (handles dropped/swapped letters) */
const normS = (s) => String(s ?? "").toLowerCase().normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

const subseq = (q, h) => { let i = 0; for (const c of h) if (c === q[i]) i++; return i === q.length; };
const editDist = (a, b) => {
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 3) return 99;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
};
function fuzzyMatch(query, text) {
  const q = normS(query), hay = normS(text);
  if (!q) return true;
  if (hay.includes(q)) return true;
  const qc = q.replace(/ /g, ""), hc = hay.replace(/ /g, "");
  if (hc.includes(qc)) return true;
  if (qc.length >= 4 && qc[0] === hc[0] && subseq(qc, hc)) return true;
  const words = hay.split(" ").filter(Boolean);
  return q.split(" ").every(qw =>
    words.some(w => w.includes(qw)) ||
    words.some(w => w.startsWith(qw[0]) &&
      (subseq(qw, w) || editDist(qw, w) <= (qw.length > 5 ? 2 : 1))));
}

const can = (p) => amsCan(staff, p);
/* blind review: expert evaluators see the project without the applicant's identity (enabled in Settings) */
const blindReview = () => !!amsGetSettings().blindReview && staff.role === "evaluator";
const BLIND_SECTIONS = ["personal", "travel", "recommendations", "kii", "video", "instruction"];
const BLIND_FILES = ["cv", "photo", "studentId", "video"];
/* read-only users (e.g. Workshop / Focal Point) can view full history but not change it */
const readOnly = !["edit_applicants", "manage_tasks", "manage_meetings", "evaluate", "manage_documents",
  "make_decisions", "manage_financials", "manage_procurement", "manage_staff"].some(can);
const P = new URLSearchParams(location.search);
const view = P.get("v") || "dashboard";
const applicantId = P.get("id");
const tab = P.get("tab") || "overview";

/* build nav */
const navEl = $ams("#amsNav");
navEl.innerHTML = NAV.filter(n => !n.perm || can(n.perm))
  .map(n => `<a href="?v=${n.v}" data-v="${n.v}">${IC[n.icon]}${n.label}</a>`).join("");
$$ams("#amsNav a").forEach(a => a.classList.toggle("active",
  a.dataset.v === view || (view === "applicant" && a.dataset.v === "applicants")));

/* user chip + dropdown */
const initials = staff.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
$ams("#userAvatar").textContent = initials;
$ams("#userName").textContent = staff.name;
$ams("#userRole").textContent = staff.title || ROLES[staff.role]?.label || staff.role;
$ams("#userMenu").addEventListener("click", (e) => {
  if (e.target.closest("a")) return;
  $ams("#userMenuDrop").classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
  if (!e.target.closest("#userMenu")) $ams("#userMenuDrop")?.classList.add("hidden");
});
$ams("#logoutBtn").addEventListener("click", (e) => {
  e.preventDefault();
  amsStaffLogout();
  window.location.href = "admin-login.html";
});

/* global search */
$ams("#globalSearch").addEventListener("keydown", (e) => {
  if (e.key === "Enter") location.href = "?v=applicants&q=" + encodeURIComponent(e.target.value.trim());
});

/* ---------- notifications ---------- */
function renderBell() {
  const count = amsUnreadCount(staff.id);
  const badge = $ams("#bellCount");
  badge.textContent = count;
  badge.style.display = count ? "flex" : "none";
}
function renderNotifDrop() {
  const list = amsNotifsFor(staff.id).slice(0, 15);
  $ams("#notifDrop").innerHTML = `
    <div class="nh">Notifications <a href="#" id="markAllRead">Mark all read</a></div>
    ${list.map(n => `<a class="ni ${n.read ? "" : "unread"}" data-nid="${n.id}" href="${escA(n.link || "#")}">
      ${escA(n.text)}<div class="nt">${amsFmtDateTime(n.date)}</div></a>`).join("")
      || '<div class="nempty">No notifications yet.</div>'}`;
  $ams("#markAllRead")?.addEventListener("click", (e) => {
    e.preventDefault();
    const l = amsGetNotifs();
    l.forEach(n => { if (n.staffId === staff.id) n.read = true; });
    amsSaveNotifs(l);
    renderBell(); renderNotifDrop();
  });
  $$ams("#notifDrop .ni").forEach(a => a.addEventListener("click", (e) => {
    e.preventDefault();
    amsMarkRead(a.dataset.nid);
    const link = a.getAttribute("href");
    if (link && link !== "#") location.href = link;
    else renderBell(), renderNotifDrop();
  }));
}
$ams("#bellBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  const d = $ams("#notifDrop");
  d.classList.toggle("hidden");
  if (!d.classList.contains("hidden")) renderNotifDrop();
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".notif-wrap")) $ams("#notifDrop")?.classList.add("hidden");
});
renderBell();

/* ---------- CSV export ---------- */
function downloadCsv(filename, rows) {
  const cell = (c) => { let v = String(c ?? ""); if (/^[=+\-@\t\r]/.test(v)) v = "'" + v; return `"${v.replace(/"/g, '""')}"`; };
  const csv = rows.map(r => r.map(cell).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv" }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
function staffNames() { return amsGetStaff().map(s => s.name); }

/* ---------- small render helpers ---------- */
function chipStatus(s) {
  const map = { "Open": "chip-open", "In Progress": "chip-prog", "Completed": "chip-done",
    "Done": "chip-done", "Active": "chip-active", "Inactive": "chip-inactive",
    "Pending": "chip-pending", "Approved": "chip-approved", "Rejected": "chip-rejected",
    "Overdue": "chip-overdue", "Scheduled": "chip-open", "On Hold": "chip-pending" };
  return `<span class="chip ${map[s] || "chip-stage"}">${escA(s)}</span>`;
}
function chipPriority(p) {
  const map = { High: "chip-high", Medium: "chip-med", Low: "chip-low" };
  return `<span class="chip ${map[p] || "chip-low"}">${escA(p)}</span>`;
}
function ring(pct, color = "#22c55e") {
  return `<div class="ring" style="background:conic-gradient(${color} ${pct * 3.6}deg,#e9eef3 0)"><span>${pct}%</span></div>`;
}
/* colored file-type badge, like the reference UI's document icons */
const DOC_TYPE_STYLE = {
  pdf: ["PDF", "#dc2626", "#fee2e2"], doc: ["DOC", "#2563eb", "#dbeafe"], docx: ["DOC", "#2563eb", "#dbeafe"],
  xls: ["XLS", "#15803d", "#d1fae5"], xlsx: ["XLS", "#15803d", "#d1fae5"], csv: ["XLS", "#15803d", "#d1fae5"],
  ppt: ["PPT", "#c2410c", "#ffedd5"], pptx: ["PPT", "#c2410c", "#ffedd5"],
  jpg: ["IMG", "#7c3aed", "#ede9fe"], jpeg: ["IMG", "#7c3aed", "#ede9fe"], png: ["IMG", "#7c3aed", "#ede9fe"],
  gif: ["IMG", "#7c3aed", "#ede9fe"], webp: ["IMG", "#7c3aed", "#ede9fe"],
  mp4: ["VID", "#0e7490", "#cffafe"], mov: ["VID", "#0e7490", "#cffafe"], webm: ["VID", "#0e7490", "#cffafe"],
  zip: ["ZIP", "#475569", "#eef2f6"], rar: ["ZIP", "#475569", "#eef2f6"],
};
function docIcon(file) {
  const ext = String(file || "").split(".").pop().toLowerCase();
  const [t, fg, bg] = DOC_TYPE_STYLE[ext] || ["FILE", "#475569", "#eef2f6"];
  return `<span class="doc-ic" style="background:${bg};color:${fg}">${t}</span>`;
}
function donut(segs, centerTop, centerLbl) {
  const total = segs.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;
  const grad = segs.map(s => {
    const from = acc / total * 360; acc += s.value;
    return `${s.color} ${from}deg ${acc / total * 360}deg`;
  }).join(",");
  return `<div class="donut-wrap">
    <div class="donut" style="background:conic-gradient(${grad})">
      <div class="hole"><b>${centerTop}</b>${centerLbl}</div></div>
    <div class="legend">${segs.map(s => `<div class="li"><i style="background:${s.color}"></i>${escA(s.label)}<b>${s.value}</b></div>`).join("")}</div>
  </div>`;
}
function barChart(items, defColor = "#3b82f6") {
  const max = Math.max(...items.map(i => i.value), 1);
  return `<div class="bar-chart">${items.map(i => `
    <div class="bar"><div class="fill" style="height:${Math.max(4, i.value / max * 100)}%;background:${i.color || defColor}"><span>${i.value}</span></div>
    <div class="x">${escA(i.label)}</div></div>`).join("")}</div>`;
}
const FEED_COLORS = { meet: "#22c55e", eval: "#3b82f6", pr: "#8b5cf6", kpi: "#f59e0b", doc: "#64748b", note: "#0ea5e9", task: "#2ea87a", status: "#14b8a6" };
const FEED_GLYPH = { meet: "◷", eval: "✓", pr: "$", kpi: "↗", doc: "≡", note: "✎", task: "☐", status: "●" };
function feedItem(a) {
  const c = FEED_COLORS[a.icon] || "#64748b";
  return `<div class="fi"><div class="ic2" style="background:${c}">${FEED_GLYPH[a.icon] || "•"}</div>
    <div><div class="tt">${escA(a.title)}</div><div class="dd">${escA(a.desc || "")}${a.by ? " — " + escA(a.by) : ""}</div></div>
    <div class="tm">${amsFmtDate(a.date)}<b>${new Date(a.date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</b></div></div>`;
}
function pbarRow(label, pct, color) {
  return `<div class="pbar-row"><div class="pr"><span>${escA(label)}</span><b>${pct}%</b></div>
    <div class="pbar"><i style="width:${pct}%;background:${color}"></i></div></div>`;
}
function allTasks() {
  return amsGetApplicants().flatMap(a => (a.tasks || []).map(t => ({ ...t, appId: a.id, appName: a.name })));
}
function daysUntil(iso) { return Math.ceil((new Date(iso) - Date.now()) / 86400000); }

function go(url) { location.href = url; }
function saveAndReload(app) {
  const l = amsGetApplicants();
  const i = l.findIndex(x => x.id === app.id);
  l[i] = app;
  amsSaveApplicants(l);
  location.reload();
}
function touch(app, activity) {
  (app.activities = app.activities || []).unshift({ date: new Date().toISOString(), by: staff.name, ...activity });
  app.lastActivity = new Date().toISOString();
}
function statCard(color, bg, icon, num, lbl, sub) {
  return `<div class="stat-card"><div class="ic" style="background:${bg};color:${color}">${icon}</div>
    <div><div class="num ${String(num).length > 6 ? "sm" : ""}">${num}</div><div class="lbl">${lbl}${sub ? `<small>${sub}</small>` : ""}</div></div></div>`;
}

/* ============ VIEW: DASHBOARD ============ */
function viewDashboard(el) {
  const settings = amsGetSettings();
  const inactDays = settings.inactiveDays;
  const everything = amsGetApplicants();
  const drafts = everything.filter(isDraft);
  const apps = everything.filter(a => !isDraft(a)); // dashboard counts submitted applications only
  const total = apps.length;
  const live = (a) => !["Rejected", "Withdrawn"].includes(a.outcome);
  const active = apps.filter(a => a.status === "Active" && live(a)).length;
  const underEval = apps.filter(a => a.stage === "Under Evaluation").length;
  const stale = apps.filter(a => live(a) && amsDaysSince(a.lastActivity) > inactDays);
  const inactiveX = stale.length;
  const closing = apps.filter(a => a.closureDue && daysUntil(a.closureDue) <= 90).length;
  const support = apps.reduce((s, a) => s + (a.supportApproved || 0), 0);
  const spent = apps.reduce((s, a) => s + (a.spent || 0), 0);

  const stageCounts = STAGES.map(s => ({ label: s, value: apps.filter(a => a.stage === s).length, color: STAGE_COLORS[s] }));
  const statusMap = {};
  apps.forEach(a => {
    const k = a.outcome === "Rejected" ? "Rejected" :
      a.status === "Inactive" ? "On Hold" :
      a.stage === "Under Evaluation" ? "Under Evaluation" : "Active";
    statusMap[k] = (statusMap[k] || 0) + 1;
  });
  const statusSegs = [["Active", "#22c55e"], ["Under Evaluation", "#f59e0b"], ["On Hold", "#3b82f6"], ["Rejected", "#ef4444"]]
    .filter(([k]) => statusMap[k]).map(([k, c]) => ({ label: k, value: statusMap[k], color: c }));
  const sectorMap = {};
  apps.forEach(a => sectorMap[a.sector || "Other"] = (sectorMap[a.sector || "Other"] || 0) + 1);
  const secColors = ["#22c55e", "#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899", "#64748b", "#14b8a6"];
  const sectorSegs = Object.entries(sectorMap).map(([k, v], i) => ({ label: k, value: v, color: secColors[i % secColors.length] }));

  const feed = apps.flatMap(a => (a.activities || []).map(x => ({ ...x, appName: a.name })))
    .sort((x, y) => new Date(y.date) - new Date(x.date)).slice(0, 6);

  const openTasks = allTasks().filter(t => t.status !== "Completed")
    .sort((x, y) => new Date(x.due) - new Date(y.due));
  const overdueTasks = openTasks.filter(t => daysUntil(t.due) < 0);
  const weekTasks = openTasks.filter(t => { const d = daysUntil(t.due); return d >= 0 && d <= 7; });
  const doneTasks = allTasks().filter(t => t.status === "Completed").slice(0, 5);

  const alerts = [];
  stale.forEach(a =>
    alerts.push({ sev: "high", text: `${a.name} inactive for ${amsDaysSince(a.lastActivity)} days`, act: "Action required" }));
  const reportsDue = apps.flatMap(a => (a.milestones || []).filter(m => m.status === "Report submitted"));
  if (reportsDue.length) alerts.push({ sev: "med", text: `${reportsDue.length} milestone report(s) waiting for review`, act: "Review" });
  apps.forEach(a => (a.milestones || []).filter(m => m.status !== "Approved" && daysUntil(m.due) < 0)
    .forEach(m => alerts.push({ sev: "high", text: `Milestone overdue – ${a.name}: ${m.title}`, act: "Overdue" })));
  if (settings.deadline) {
    const d = daysUntil(settings.deadline + "T23:59:59");
    alerts.push({ sev: d < 0 ? "med" : d <= 14 ? "high" : "med",
      text: d < 0 ? `Call "${settings.callName}" closed on ${amsFmtDate(settings.deadline)}` : `Call "${settings.callName}" closes in ${d} day(s)`,
      act: d < 0 ? "Closed" : "Deadline" });
  }
  if (closing) alerts.push({ sev: "med", text: `${closing} application(s) approaching 90-day closure`, act: "Review needed" });
  const pendingPRs = apps.flatMap(a => (a.procurement || []).filter(p => p.status === "Pending"));
  if (pendingPRs.length) alerts.push({ sev: "med", text: `${pendingPRs.length} PRs pending approval`, act: "Follow up" });
  apps.forEach(a => (a.evaluations || []).filter(e => e.status === "Overdue")
    .forEach(e => alerts.push({ sev: "high", text: `Expert evaluation overdue – ${a.name}`, act: "Overdue" })));

  const now = new Date();
  const rangeStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const rangeEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const fmt = (d) => d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });

  el.innerHTML = `
    <div class="page-head-row">
      <div><div class="page-title">Management Dashboard</div>
      <div class="page-sub">Overview of applications, progress and key activities</div></div>
      <div class="date-range">${IC.cal} ${fmt(rangeStart)} – ${fmt(rangeEnd)}</div>
    </div>

    <div class="stat-grid">
      ${statCard("#2563eb", "#dbeafe", IC.doc, total, "Submitted Applications", drafts.length + " draft(s) in progress")}
      ${statCard("#15803d", "#d1fae5", IC.home, active, "Active Projects")}
      ${statCard("#b45309", "#fef3c7", IC.box, underEval, "Under Evaluation", "incl. interview / pitch")}
      ${statCard("#dc2626", "#fee2e2", IC.alertc, inactiveX, `Inactive &gt; ${inactDays} days`)}
      ${statCard("#7c3aed", "#ede9fe", IC.shield, closing, "Approaching Closure", "≤ 90 days")}
      ${statCard("#0f766e", "#ccfbf1", IC.money, amsMoney(support), "Total Support Committed", amsMoney(spent) + " spent")}
    </div>

    <div class="grid-3col">
      <div class="ams-card"><h3>Applications by Stage</h3>${barChart(stageCounts)}</div>
      <div class="ams-card"><h3>Application Status</h3>${donut(statusSegs.length ? statusSegs : [{ label: "None", value: 1, color: "#e2e8f0" }], total, "Total")}</div>
      <div class="ams-card"><h3>Sector Distribution</h3>${donut(sectorSegs.length ? sectorSegs : [{ label: "None", value: 1, color: "#e2e8f0" }], total, "Total")}</div>
    </div>

    <div class="ams-card"><h3>Action Required <a href="?v=tasks">View All Tasks</a></h3>
      <div class="ar-cols">
        <div class="ar-col overdue"><h4>Overdue <span>${overdueTasks.length}</span></h4>
          ${overdueTasks.slice(0, 4).map(t => `<div class="ar-item"><b>${escA(t.desc || t.task)}</b>
            <small>${escA(t.appName)} · ${escA(t.assignedTo)} · due ${amsFmtDate(t.due)}</small></div>`).join("")
            || '<div class="empty-state" style="padding:6px">None.</div>'}</div>
        <div class="ar-col week"><h4>Due This Week <span>${weekTasks.length}</span></h4>
          ${weekTasks.slice(0, 4).map(t => `<div class="ar-item"><b>${escA(t.desc || t.task)}</b>
            <small>${escA(t.appName)} · ${escA(t.assignedTo)} · ${amsFmtDate(t.due)}</small></div>`).join("")
            || '<div class="empty-state" style="padding:6px">None.</div>'}</div>
        <div class="ar-col done"><h4>Completed <span>${allTasks().filter(t => t.status === "Completed").length}</span></h4>
          ${doneTasks.map(t => `<div class="ar-item"><b style="text-decoration:line-through;color:#94a3b8">${escA(t.desc || t.task)}</b>
            <small>${escA(t.appName)} · ${escA(t.assignedTo)}</small></div>`).join("")
            || '<div class="empty-state" style="padding:6px">None yet.</div>'}</div>
      </div>
    </div>

    <div class="grid-3col">
      <div class="ams-card"><h3>Recent Activities</h3><div class="feed">
        ${feed.map(feedItem).join("") || '<div class="empty-state">No activity yet.</div>'}</div></div>
      <div class="ams-card"><h3>Upcoming Tasks <a href="?v=tasks">View All</a></h3>
        ${openTasks.slice(0, 6).map(t => `<div class="tk"><span class="box"></span>
          <span class="tt">${escA(t.desc || t.task)}</span>
          <span class="dt ${daysUntil(t.due) < 0 ? "over" : ""}">${amsFmtDate(t.due)}</span>
          ${chipPriority(t.priority)}</div>`).join("")
          || '<div class="empty-state">No open tasks.</div>'}</div>
      <div class="ams-card"><h3>Alerts <a href="?v=applicants">View Applicants</a></h3>
        ${alerts.map(a => `<div class="alert-li"><div class="tri" style="background:${a.sev === "high" ? "#fee2e2" : "#fef3c7"};color:${a.sev === "high" ? "#dc2626" : "#b45309"}">▲</div>
          <span>${escA(a.text)}</span><span class="act ${a.sev === "high" ? "sev-high" : "sev-med"}">${escA(a.act)}</span></div>`).join("")
          || '<div class="empty-state">No alerts.</div>'}</div>
    </div>`;
}

/* submission state of a portal applicant, shown under their name */
function portalFlag(a) {
  if (!a.portal) return "";
  const p = a.portalData || {};
  if (p.withdrawn) return ' · <span style="color:#64748b">Withdrawn by applicant</span>';
  if (!p.submitted && p.revisionNote) return ' · <span style="color:#7c3aed">Revision requested — awaiting resubmission</span>';
  if (!p.submitted) return ' · <span style="color:#b45309">Draft — not yet submitted</span>';
  return p.resubmittedAt ? ' · <span style="color:#15803d">Resubmitted</span>' : "";
}
const isDraft = (a) => a.portal && !a.portalData?.submitted && !a.portalData?.revisionNote && !a.portalData?.withdrawn;

/* ============ VIEW: APPLICANTS LIST ============ */
function viewApplicants(el) {
  const q = (P.get("q") || "").toLowerCase();
  const fStage = P.get("stage") || "";
  const fSector = P.get("sector") || "";
  const fStatus = P.get("status") || "";
  const fAssign = P.get("assignee") || "";
  const fSupport = P.get("support") || "";
  const fScope = P.get("scope") || "";
  const fFrom = P.get("from") || "";
  const fTo = P.get("to") || "";

  const all = amsGetApplicants();
  const sectors = [...new Set(all.map(a => a.sector).filter(Boolean))];
  const assignees = [...new Set(all.map(a => a.assignedToName).filter(Boolean))];

  const apps = all.filter(a => {
    if (q && !fuzzyMatch(q, [a.name, a.applicantName, a.applicantEmail, a.sector, a.location, a.stage, a.tagline].join(" "))) return false;
    if (fStage && a.stage !== fStage) return false;
    if (fSector && a.sector !== fSector) return false;
    if (fStatus && a.status !== fStatus && a.outcome !== fStatus) return false;
    if (fAssign && a.assignedToName !== fAssign) return false;
    if (fSupport && !(a.supportRequested || []).includes(fSupport)) return false;
    if (fScope === "in" && !a.inScope) return false;
    if (fScope === "out" && a.inScope) return false;
    if (fFrom && new Date(a.appliedDate) < new Date(fFrom)) return false;
    if (fTo && new Date(a.appliedDate) > new Date(fTo)) return false;
    return true;
  });

  const filterVal = (name, val) => {
    const p = new URLSearchParams(location.search);
    val ? p.set(name, val) : p.delete(name);
    location.search = p.toString();
  };

  el.innerHTML = `
    <div class="crumbs"><a href="?v=dashboard">Dashboard</a><span class="sep">›</span><b>Applicants</b></div>
    <div class="page-head-row">
      <div><div class="page-title">Applicants</div>
      <div class="page-sub">${apps.length} of ${all.length} application(s)</div></div>
      <button class="abtn ghost sm" id="exportCsv">${IC.report} Export CSV</button>
    </div>

    <div class="ams-card">
      <div class="filter-bar">
        <div class="fb"><label>Search</label><input type="text" id="fq" value="${escA(P.get("q") || "")}" placeholder="Applicant, project…"></div>
        <div class="fb"><label>Stage</label><select id="fstage"><option value="">All</option>
          ${STAGES.map(s => `<option ${s === fStage ? "selected" : ""}>${s}</option>`).join("")}</select></div>
        <div class="fb"><label>Category</label><select id="fsector"><option value="">All</option>
          ${sectors.map(s => `<option ${s === fSector ? "selected" : ""}>${escA(s)}</option>`).join("")}</select></div>
        <div class="fb"><label>Status / Outcome</label><select id="fstatus"><option value="">All</option>
          ${["Active", "Inactive", ...OUTCOMES].map(s => `<option ${s === fStatus ? "selected" : ""}>${s}</option>`).join("")}</select></div>
        <div class="fb"><label>Assigned</label><select id="fassign"><option value="">All</option>
          ${assignees.map(s => `<option ${s === fAssign ? "selected" : ""}>${escA(s)}</option>`).join("")}</select></div>
        <div class="fb"><label>Support requested</label><select id="fsupport"><option value="">All</option>
          ${SUPPORT_TYPES.map(s => `<option ${s === fSupport ? "selected" : ""}>${s}</option>`).join("")}</select></div>
        <div class="fb"><label>Scope</label><select id="fscope"><option value="">All</option>
          <option value="in" ${fScope === "in" ? "selected" : ""}>In scope</option>
          <option value="out" ${fScope === "out" ? "selected" : ""}>Out of scope</option></select></div>
        <div class="fb"><label>From</label><input type="date" id="ffrom" value="${escA(fFrom)}"></div>
        <div class="fb"><label>To</label><input type="date" id="fto" value="${escA(fTo)}"></div>
      </div>

      <table class="tbl"><thead><tr>
        <th>Applicant / Project</th><th>Scope</th><th>Category</th><th>Stage</th><th>Status</th>
        <th>Assigned</th><th>Applied</th><th>Progress</th><th>Next step</th><th></th>
      </tr></thead><tbody>
      ${apps.map(a => {
        const nextTask = (a.tasks || []).filter(t => t.status !== "Completed").sort((x, y) => new Date(x.due) - new Date(y.due))[0];
        return `<tr class="clickable" data-go="?v=applicant&id=${encodeURIComponent(a.id)}">
        <td><b>${escA(a.name)}</b><div class="sub2">${blindReview() ? "" : escA(a.applicantName || "")}${portalFlag(a)}</div></td>
        <td><span class="scope-badge ${a.inScope ? "scope-in" : "scope-out"}">${a.inScope ? "In scope" : "Out of scope"}</span></td>
        <td>${escA(a.sector || "—")}</td>
        <td><span class="chip chip-stage" style="border-left:3px solid ${STAGE_COLORS[a.stage] || "#94a3b8"}">${escA(a.stage)}</span></td>
        <td>${a.outcome ? `<span class="chip" style="background:${OUTCOME_COLORS[a.outcome]}22;color:${OUTCOME_COLORS[a.outcome]}">${a.outcome}</span>` : chipStatus(a.status)}</td>
        <td>${escA(a.assignedToName || "—")}</td>
        <td>${amsFmtDate(a.appliedDate)}</td>
        <td><div class="pbar" style="width:70px"><i style="width:${a.progress}%;background:#22c55e"></i></div><span class="sub2">${a.progress}%</span></td>
        <td>${nextTask ? `<span class="sub2">${escA(nextTask.task)}<br>${amsFmtDate(nextTask.due)}</span>` : '<span class="sub2">—</span>'}</td>
        <td class="act-dots">${IC.dots}</td>
      </tr>`; }).join("") || '<tr><td colspan="10"><div class="empty-state">No applicants found.</div></td></tr>'}
      </tbody></table>
    </div>`;

  $ams("#fq", el).addEventListener("keydown", (e) => { if (e.key === "Enter") filterVal("q", e.target.value.trim()); });
  $ams("#fstage", el).addEventListener("change", (e) => filterVal("stage", e.target.value));
  $ams("#fsector", el).addEventListener("change", (e) => filterVal("sector", e.target.value));
  $ams("#fstatus", el).addEventListener("change", (e) => filterVal("status", e.target.value));
  $ams("#fassign", el).addEventListener("change", (e) => filterVal("assignee", e.target.value));
  $ams("#fsupport", el).addEventListener("change", (e) => filterVal("support", e.target.value));
  $ams("#fscope", el).addEventListener("change", (e) => filterVal("scope", e.target.value));
  $ams("#ffrom", el).addEventListener("change", (e) => filterVal("from", e.target.value));
  $ams("#fto", el).addEventListener("change", (e) => filterVal("to", e.target.value));

  $ams("#exportCsv", el).addEventListener("click", () => {
    downloadCsv("kii-applicants.csv", [
      ["Applicant", "Project", "Sector", "Scope", "Stage", "Status", "Outcome", "Assigned To", "Applied", "Progress %", "Support Requested", "Approved $", "Spent $"],
      ...apps.map(a => [a.applicantName || "", a.name, a.sector, a.inScope ? "In scope" : "Out of scope",
        a.stage, a.status, a.outcome || "", a.assignedToName || "", amsFmtDate(a.appliedDate),
        a.progress, (a.supportRequested || []).join("; "), a.supportApproved || 0, a.spent || 0]),
    ]);
  });
}

/* ============ VIEW: APPLICANT DETAIL ============ */
const TABS = [
  ["overview", "Overview"], ["activity", "Activity Log"], ["timeline", "Timeline"],
  ["meetings", "Meetings"], ["tasks", "Tasks / Follow-up"], ["kpis", "KPIs"], ["milestones", "Milestones"],
  ["evaluations", "Expert Evaluations"], ["application", "Application"], ["documents", "Documents"],
  ["procurement", "Procurement"], ["financials", "Financial Support"],
  ["decisions", "Decisions"], ["communication", "Communication"], ["chat", "Chat"],
];

function workflowStepper(a) {
  const cur = STAGES.indexOf(a.stage);
  return `<div class="ams-card" style="padding:0"><div class="stepper">
    ${STAGES.map((s, i) => `<div class="step ${i < cur ? "done" : i === cur ? "current" : ""}">
      <div class="dot2">${i < cur ? "✓" : i + 1}</div><div class="sl">${escA(s)}</div></div>`).join("")}
  </div></div>`;
}

function viewApplicant(el) {
  const a = amsGetApplicant(applicantId);
  if (!a) { el.innerHTML = `<div class="ams-card">Applicant not found. <a href="?v=applicants">Back to list</a></div>`; return; }

  const tabs = TABS.filter(([id]) => !(blindReview() && (id === "chat" || id === "communication"))).map(([id, lbl]) =>
    `<a href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=${id}" class="${tab === id ? "active" : ""}">${lbl}</a>`).join("");
  const next = amsNextStage(a.stage);

  el.innerHTML = `
    <div class="crumbs"><a href="?v=applicants">Applicants</a><span class="sep">›</span><b>${escA(a.name)}</b></div>
    <div class="app-banner">
      <div class="logo"><span style="color:#22c55e">${IC.leaf}</span>${escA(a.logoText || a.name.slice(0, 2).toUpperCase())}</div>
      <div class="who">
        <h2>${escA(a.name)} ${chipStatus(a.status)}
          ${a.outcome ? `<span class="chip" style="background:${OUTCOME_COLORS[a.outcome]}22;color:${OUTCOME_COLORS[a.outcome]}">${a.outcome}</span>` : ""}
          <span class="scope-badge ${a.inScope ? "scope-in" : "scope-out"}">${a.inScope ? "In scope" : "Out of scope"}</span>
        </h2>
        <div class="tag">${escA(a.tagline || "")}${a.applicantName && !blindReview() ? " — " + escA(a.applicantName) : ""}</div>
        <div class="meta">
          <div class="m">${IC.leaf}<span>Sector<b>${escA(a.sector || "—")}</b></span></div>
          <div class="m">${IC.pin}<span>Location<b>${escA(a.location || "—")}</b></span></div>
          <div class="m">${IC.cal}<span>Applied Date<b>${amsFmtDate(a.appliedDate)}</b></span></div>
          <div class="m">${IC.clock}<span>Last Activity<b>${amsFmtDate(a.lastActivity)}</b></span></div>
          <div class="m">${IC.stage}<span>Current Stage<b>${escA(a.stage)}</b></span></div>
          <div class="m">${IC.users}<span>Assigned To<b id="assignedLabel">${escA(a.assignedToName || "Unassigned")}</b></span></div>
        </div>
      </div>
      <div style="margin-left:auto;display:flex;flex-direction:column;gap:8px;align-items:flex-end">
        ${can("edit_applicants") && next && !isDraft(a) && !a.portalData?.withdrawn && a.outcome !== "Rejected"
          ? `<button class="abtn sm" id="advanceBtn">Advance to “${escA(next)}”</button>` : ""}
        ${isDraft(a) ? '<span class="sub2">Draft — the applicant has not submitted yet</span>' : ""}
        ${can("edit_applicants") ? `<select id="assignSel" class="task-status">
          <option value="">Assign to…</option>
          ${staffNames().map(n => `<option ${n === a.assignedToName ? "selected" : ""}>${escA(n)}</option>`).join("")}
        </select>` : ""}
      </div>
      ${a.tagline ? `<div class="quote">“${escA(a.tagline)}”</div>` : ""}
    </div>
    ${workflowStepper(a)}
    <div class="ams-tabs">${tabs}</div>
    <div id="tabBody"></div>`;

  const adv = $ams("#advanceBtn");
  if (adv) adv.addEventListener("click", () => {
    if (a.stage === "Under Evaluation" && !(a.evaluations || []).some(e => e.status === "Completed")
      && !confirm("No expert evaluation has been completed for this application yet. Advance anyway?")) return;
    if (!confirm(`Advance "${a.name}" to “${next}”? The responsible team will be notified.`)) return;
    const moved = amsAdvanceStage(a, staff.name);
    if (moved) { saveAndReload(a); }
  });

  const asg = $ams("#assignSel");
  if (asg) asg.addEventListener("change", () => {
    const name = asg.value;
    a.assignedToName = name || null;
    touch(a, { icon: "status", title: "Case assigned", desc: name ? `Assigned to ${name}` : "Unassigned" });
    if (name) {
      const s = amsGetStaff().find(x => x.name === name);
      if (s) amsNotify(s.id, `You have been assigned to case "${a.name}".`, `admin.html?v=applicant&id=${encodeURIComponent(a.id)}`);
    }
    saveAndReload(a);
  });

  renderTab(a, $ams("#tabBody"));
}

function renderTab(a, body) {
  const R = {
    overview: tabOverview, application: tabApplication, timeline: tabTimeline, activity: tabActivity, meetings: tabMeetings,
    tasks: tabTasks, milestones: tabMilestones, kpis: tabKPIs, evaluations: tabEvals,
    documents: tabDocs, procurement: tabProc, financials: tabFin,
    decisions: tabDecisions, communication: tabCommunication, chat: tabChat,
  };
  (R[tab] || tabOverview)(a, body);
}

/* ----- Overview tab ----- */
const STAGE_SUB = {
  "Submitted Form": "Awaiting initial review", "Under Evaluation": "Scoring & expert review",
  "Approval": "Final approval decision", "Pitch Deck": "Panel presentation",
  "Market Validation": "Business & market validation", "Prototype Development": "Product development and piloting",
  "Investor / Stakeholder": "Investor readiness & engagement",
};
function tabOverview(a, body) {
  const nextMeet = (a.meetings || []).filter(m => m.status !== "Done")
    .sort((x, y) => new Date(x.date) - new Date(y.date))[0];
  body.innerHTML = `
    <div class="stat-grid cols5">
      <div class="stat-card"><div>${ring(a.progress || 0)}</div>
        <div><div class="lbl">Overall Progress</div><div class="num sm">${a.progress || 0}%</div>
        <div class="lbl"><span class="ok">● On track</span></div></div></div>
      ${statCard("#0f766e", "#ccfbf1", IC.gear, `<span class="num sm">${escA(a.stage)}</span>`, "Current Stage", STAGE_SUB[a.stage] || "")}
      ${statCard("#15803d", "#d1fae5", IC.money, amsMoney(a.supportApproved), "Total Support Approved", "KII Grant Support")}
      ${statCard("#b45309", "#fef3c7", IC.pie, amsMoney(a.spent), "Amount Spent", (a.supportApproved ? Math.round(a.spent / a.supportApproved * 100) : 0) + "% of approved")}
      ${statCard("#2563eb", "#dbeafe", IC.cal, amsDaysSince(a.lastActivity) + " days", "Days Since Last Activity", "on " + amsFmtDate(a.lastActivity))}
    </div>

    <div class="grid-32">
      <div class="ams-card"><h3>Recent Activity <a href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=activity">View All</a></h3>
        <div class="feed">${(a.activities || []).slice(0, 5).map(feedItem).join("") || '<div class="empty-state">No activity.</div>'}</div></div>

      <div class="ams-card"><h3>Meetings / Follow-up <a href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=meetings">View All</a></h3>
        ${nextMeet ? `<div class="meet-card">
          <b>${escA(nextMeet.title)}</b>
          <div class="when">${IC.cal.replace("<svg", '<svg style="width:13px;height:13px;vertical-align:-2px"')} ${amsFmtDate(nextMeet.date)} · ${escA(nextMeet.time || "")}</div>
          <div class="loc">${IC.pin.replace("<svg", '<svg style="width:12px;height:12px"')} ${escA(nextMeet.location || "")}</div>
          ${can("manage_meetings") ? `<a class="abtn sm meet-btn" href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=meetings">${IC.cal} Schedule Meeting</a>` : ""}
          ${(nextMeet.agenda || []).length ? `<div class="ag"><b>Meeting Agenda</b><ul>${nextMeet.agenda.map(x => `<li>${escA(x)}</li>`).join("")}</ul></div>` : ""}
        </div>` : '<div class="empty-state">No upcoming meetings.</div>'}
      </div>

      <div class="ams-card"><h3>KPI Evaluation <a href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=kpis">View Details</a></h3>
        ${a.kpiSheets?.length ? `<div class="sub2" style="margin-bottom:8px">Latest total: <b>${a.kpiSheets[0].total}/100 (${a.kpiSheets[0].pct}%)</b> — ${escA(a.kpiSheets[0].rating)}</div>` : ""}
        ${pbarRow("A. Innovation Viability", a.kpis?.technical || 0, "#22c55e")}
        ${pbarRow("B. Market Validation", a.kpis?.business || 0, "#3b82f6")}
        ${pbarRow("C. Impact Potential", a.kpis?.market || 0, "#22c55e")}
        ${pbarRow("D. Team & Execution", a.kpis?.team || 0, "#3b82f6")}
      </div>
    </div>

    <div class="ams-card"><h3>Quick Actions</h3><div class="qa-row">
      ${can("manage_meetings") ? `<a class="abtn sm" href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=meetings">${IC.cal} Schedule Meeting</a>` : ""}
      ${can("manage_documents") ? `<a class="abtn ghost sm" href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=documents">${IC.doc} Add Document</a>` : ""}
      ${can("manage_procurement") ? `<a class="abtn ghost sm" href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=procurement">${IC.money} Create PR</a>` : ""}
      ${can("evaluate") ? `<a class="abtn ghost sm" href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=evaluations">${IC.eval} Add Evaluation</a>` : ""}
      ${can("view_reports") ? `<a class="abtn ghost sm" href="?v=reports">${IC.report} Generate Report</a>` : ""}
      ${can("edit_applicants") ? `
        <form id="stageForm" style="display:inline-flex;gap:8px;margin-left:auto">
          <select name="stage" class="task-status">${STAGES.map(s => `<option ${s === a.stage ? "selected" : ""}>${s}</option>`).join("")}</select>
          <button class="abtn ghost sm">Update Stage</button>
        </form>` : ""}
    </div></div>

    <div class="grid-2col">
      <div class="ams-card"><h3>Documents <a href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=documents">View All</a></h3>
        <table class="tbl"><thead><tr><th>Document</th><th>File</th><th>Date</th><th>Size</th><th></th></tr></thead><tbody>
        ${(a.documents || []).slice(0, 5).map(d => `<tr><td><b>${docIcon(d.file)} ${escA(d.name)}</b></td><td class="sub2">${escA(d.file)}</td><td>${amsFmtDate(d.date)}</td><td class="sub2">${escA(d.size || "—")}</td><td class="act-dots">${IC.dots}</td></tr>`).join("")
          || '<tr><td colspan="5"><div class="empty-state">No documents.</div></td></tr>'}
        </tbody></table>
      </div>
      <div class="ams-card"><h3>Financial / Procurement Summary <a href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=financials">View Details</a></h3>
        <table class="tbl"><tbody>
          <tr><td>Approved Support</td><td class="text-right"><b>${amsMoney(a.supportApproved)}</b></td></tr>
          <tr><td>Committed (POs)</td><td class="text-right"><b>${amsMoney(a.committed)}</b></td></tr>
          <tr><td>Spent</td><td class="text-right"><b class="money-amber">${amsMoney(a.spent)}</b></td></tr>
          <tr><td>Remaining</td><td class="text-right"><b class="money-green">${amsMoney((a.supportApproved || 0) - (a.spent || 0))}</b></td></tr>
        </tbody></table>
        <div class="pbar" style="margin-top:10px"><i style="width:${a.supportApproved ? Math.min(100, a.spent / a.supportApproved * 100) : 0}%;background:#22c55e"></i></div>
        <div class="sub2 text-right">${a.supportApproved ? Math.round(a.spent / a.supportApproved * 100) : 0}% spent</div>
      </div>
    </div>

    <div class="grid-2col">
      <div class="ams-card ${blindReview() ? "hidden" : ""}"><h3>Applicant Profile</h3>
        <div class="detail-row"><span class="k">Applicant</span><span class="v">${escA(a.applicantName || "—")}</span></div>
        <div class="detail-row"><span class="k">Email</span><span class="v">${escA(a.applicantEmail || "—")}</span></div>
        <div class="detail-row"><span class="k">Phone</span><span class="v">${escA(a.applicantPhone || "—")}</span></div>
        <div class="detail-row"><span class="k">Organization</span><span class="v">${escA(a.applicantOrg || "—")}</span></div>
        <div class="detail-row"><span class="k">Applied</span><span class="v">${amsFmtDate(a.appliedDate)}</span></div>
        ${a.portal ? `<div class="sub2" style="margin-top:8px"><a href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=application">View full application →</a></div>` : ""}
      </div>
      <div class="ams-card"><h3>Tasks Assigned to Applicant <a href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=tasks">Manage</a></h3>
        ${(a.tasks || []).filter(t => t.assignedTo === "Applicant").map(t => `
          <div class="tk"><div class="tt"><b>${escA(t.task)}</b>${t.desc ? `<span class="sub2"> — ${escA(t.desc)}</span>` : ""}
            ${t.by ? `<div class="sub2">assigned by ${escA(t.by)}</div>` : ""}
            ${t.response ? `<div class="sub2" style="color:#166e4a">responded ${amsFmtDate(t.response.date)}${(t.response.files || []).length ? ` · ${t.response.files.length} file(s)` : ""}</div>` : ""}</div>
            <span class="dt ${daysUntil(t.due) < 0 && t.status !== "Completed" ? "over" : ""}">${amsFmtDate(t.due)}</span>
            ${chipStatus(t.status)}</div>`).join("")
          || '<div class="empty-state">No tasks assigned to the applicant yet — add one in Tasks / Follow-up with "Assigned To: Applicant".</div>'}
      </div>
      <div class="ams-card"><h3>Support Requested</h3>
        <div class="support-chips" id="supportChips">
          ${SUPPORT_TYPES.map(s => `<label class="sc ${(a.supportRequested || []).includes(s) ? "" : "off"}">
            ${can("edit_applicants") ? `<input type="checkbox" data-sup="${escA(s)}" ${(a.supportRequested || []).includes(s) ? "checked" : ""}>` : ""}
            ${escA(s)}</label>`).join("")}
        </div>
      </div>
      <div class="ams-card"><h3>Stage Checklist — ${escA(a.stage)}</h3>
        <div class="checklist" id="stageChecklist">
          ${amsChecklist(a).map((c, i) => `<label class="${c.done ? "done" : ""}">
            <input type="checkbox" data-chk="${i}" ${c.done ? "checked" : ""} ${can("edit_applicants") || can("manage_tasks") ? "" : "disabled"}>
            <span>${escA(c.label)}</span></label>`).join("") || '<div class="empty-state">No checklist for this stage.</div>'}
        </div>
      </div>
    </div>`;

  const sf = $ams("#stageForm", body);
  if (sf) sf.addEventListener("submit", (e) => {
    e.preventDefault();
    a.stage = sf.stage.value;
    a.stageForced = sf.stage.value;
    touch(a, { icon: "status", title: "Stage updated", desc: "Stage changed to " + a.stage });
    saveAndReload(a);
  });

  /* support requested toggles */
  $$ams("[data-sup]", body).forEach(cb => cb.addEventListener("change", () => {
    a.supportRequested = a.supportRequested || [];
    const s = cb.dataset.sup;
    if (cb.checked && !a.supportRequested.includes(s)) a.supportRequested.push(s);
    if (!cb.checked) a.supportRequested = a.supportRequested.filter(x => x !== s);
    touch(a, { icon: "note", title: "Support request updated", desc: s + (cb.checked ? " added" : " removed") });
    saveAndReload(a);
  }));

  /* stage checklist toggles */
  $$ams("[data-chk]", body).forEach(cb => cb.addEventListener("change", () => {
    a.checklist = a.checklist || {};
    a.checklist[a.stage] = a.checklist[a.stage] || [];
    a.checklist[a.stage][+cb.dataset.chk] = cb.checked;
    touch(a, { icon: "task", title: "Checklist updated", desc: `"${amsChecklist(a)[+cb.dataset.chk]?.label}" ${cb.checked ? "completed" : "reopened"}` });
    saveAndReload(a);
  }));
}

/* ----- Activity tab ----- */
function tabActivity(a, body) {
  const editable = (x) => !readOnly && (can("edit_applicants") || can("manage_tasks") || x.by === staff.name);
  body.innerHTML = `
    <div class="ams-card"><h3>Activity Log</h3>
      ${readOnly ? '<div class="sub2" style="margin-bottom:10px">Read-only access — full project history is shown below.</div>' : ""}
      <form id="actForm" class="inline-form ${readOnly ? "hidden" : ""}">
        <div class="grid-2">
          <div><label>Title</label><input name="title" required></div>
          <div><label>Type</label><select name="icon"><option value="note">Note</option><option value="meet">Meeting</option><option value="doc">Document</option><option value="status">Status</option></select></div>
        </div>
        <label>Description</label><textarea name="desc" rows="2"></textarea>
        <button class="abtn sm" style="margin-top:10px">Add Activity</button>
      </form>
      <div class="feed">${(a.activities || []).map((x, i) => `
        <div class="fi"><div class="ic2" style="background:${FEED_COLORS[x.icon] || "#64748b"}">${FEED_GLYPH[x.icon] || "•"}</div>
          <div><div class="tt">${escA(x.title)} ${x.edited ? '<span class="edited-mark">(edited)</span>' : ""}</div>
          <div class="dd">${escA(x.desc || "")}${x.by ? " — " + escA(x.by) : ""}</div></div>
          <div class="tm">${amsFmtDate(x.date)}<b>${new Date(x.date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</b></div>
          ${editable(x) ? `<div class="fia"><button data-edit="${i}">Edit</button><button data-del="${i}">Delete</button></div>` : ""}
        </div>`).join("") || '<div class="empty-state">No activity logged.</div>'}
      </div>
    </div>`;
  $ams("#actForm", body).addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    touch(a, { icon: f.icon.value, title: f.title.value, desc: f.desc.value });
    saveAndReload(a);
  });
  $$ams("[data-edit]", body).forEach(b => b.addEventListener("click", () => {
    const x = a.activities[+b.dataset.edit];
    const t = prompt("Edit title:", x.title);
    if (t === null) return;
    const d = prompt("Edit description:", x.desc || "");
    if (d === null) return;
    x.title = t; x.desc = d; x.edited = true;
    (a.activities).unshift({ date: new Date().toISOString(), icon: "note",
      title: "Comment edited", desc: `"${x.title}" edited by ${staff.name}`, by: staff.name });
    saveAndReload(a);
  }));
  $$ams("[data-del]", body).forEach(b => b.addEventListener("click", () => {
    const x = a.activities[+b.dataset.del];
    if (!confirm(`Delete this entry: "${x.title}"? It will still be noted in history.`)) return;
    a.activities.splice(+b.dataset.del, 1);
    a.activities.unshift({ date: new Date().toISOString(), icon: "note",
      title: "Comment deleted", desc: `"${x.title}" deleted by ${staff.name}`, by: staff.name });
    saveAndReload(a);
  }));
}

/* ----- Meetings tab ----- */
function tabMeetings(a, body) {
  body.innerHTML = `
    <div class="ams-card">
      <div class="page-head-row"><h3>Meetings / Follow-up</h3>
        ${can("manage_meetings") ? `<button class="abtn sm" id="toggleMeetForm">${IC.plus} Schedule Meeting</button>` : ""}</div>
      <div id="meetFormWrap" class="hidden">${can("manage_meetings") ? `<form id="meetForm" class="inline-form">
        <div class="grid-2">
          <div><label>Title</label><input name="title" required></div>
          <div><label>Date</label><input type="date" name="date" required></div>
          <div><label>Time</label><input name="time" placeholder="11:00 AM – 12:00 PM"></div>
          <div><label>Location</label><input name="location" placeholder="KII Office, Erbil"></div>
        </div>
        <label>Agenda (one item per line)</label><textarea name="agenda" rows="3"></textarea>
        <button class="abtn sm" style="margin-top:10px">Schedule Meeting</button>
      </form>` : ""}</div>
      <table class="tbl"><thead><tr><th>Meeting</th><th>Date</th><th>Time</th><th>Location</th><th>Status</th>${can("manage_meetings") ? "<th></th>" : ""}</tr></thead><tbody>
      ${(a.meetings || []).map(m => `<tr>
        <td><b>${escA(m.title)}</b>${(m.agenda || []).length ? `<div class="sub2">${m.agenda.map(escA).join(" · ")}</div>` : ""}</td>
        <td>${amsFmtDate(m.date)}</td><td>${escA(m.time || "—")}</td><td>${escA(m.location || "—")}</td>
        <td>${chipStatus(m.status)}</td>
        ${can("manage_meetings") ? `<td>${m.status !== "Done" ? `<button class="abtn ghost sm" data-done="${m.id}">Mark done</button>` : ""}</td>` : ""}
      </tr>`).join("") || '<tr><td colspan="6"><div class="empty-state">No meetings scheduled.</div></td></tr>'}
      </tbody></table>
    </div>`;
  const tg = $ams("#toggleMeetForm", body);
  if (tg) tg.addEventListener("click", () => $ams("#meetFormWrap", body).classList.toggle("hidden"));
  const f = $ams("#meetForm", body);
  if (f) f.addEventListener("submit", (e) => {
    e.preventDefault();
    (a.meetings = a.meetings || []).push({
      id: amsUid("m"), title: f.title.value, date: f.date.value,
      time: f.time.value, location: f.location.value, status: "Scheduled",
      agenda: f.agenda.value.split("\n").map(x => x.trim()).filter(Boolean),
    });
    touch(a, { icon: "meet", title: "Meeting scheduled", desc: f.title.value });
    saveAndReload(a);
  });
  $$ams("[data-done]", body).forEach(b => b.addEventListener("click", () => {
    const m = (a.meetings || []).find(x => x.id === b.dataset.done);
    if (m) { m.status = "Done"; saveAndReload(a); }
  }));
}

/* ----- Tasks tab ----- */
function tabTasks(a, body) {
  const filter = P.get("f") || "all";
  const counts = { all: (a.tasks || []).length,
    open: (a.tasks || []).filter(t => t.status === "Open").length,
    prog: (a.tasks || []).filter(t => t.status === "In Progress").length,
    done: (a.tasks || []).filter(t => t.status === "Completed").length };
  const list = (a.tasks || []).filter(t =>
    filter === "all" || (filter === "open" && t.status === "Open") ||
    (filter === "prog" && t.status === "In Progress") || (filter === "done" && t.status === "Completed"));

  body.innerHTML = `
    <div class="ams-card">
      <div class="page-head-row"><div><h3 style="margin:0">Tasks / Follow-up</h3>
        <div class="page-sub" style="margin:3px 0 0">Track actions, deadlines and follow-up for this applicant</div></div>
        ${can("manage_tasks") ? `<button class="abtn blue sm" id="toggleTaskForm">${IC.plus} Add Task</button>` : ""}</div>
      <div id="taskFormWrap" class="hidden" style="margin-top:12px">${can("manage_tasks") ? `<form id="taskForm" class="inline-form">
        <div class="grid-2">
          <div><label>Task</label><input name="task" required></div>
          <div><label>Description</label><input name="desc"></div>
          <div><label>Assigned To</label><select name="assignedTo">
            ${staffNames().map(n => `<option ${n === staff.name ? "selected" : ""}>${escA(n)}</option>`).join("")}
            <option>Applicant</option></select></div>
          <div><label>Due Date</label><input type="date" name="due" required></div>
          <div><label>Priority</label><select name="priority"><option>Low</option><option selected>Medium</option><option>High</option></select></div>
        </div>
        <button class="abtn sm" style="margin-top:10px">Add Task</button>
      </form>` : ""}</div>
      <div class="filter-chips">
        <button data-f="all" class="${filter === "all" ? "on" : ""}">All (${counts.all})</button>
        <button data-f="open" class="${filter === "open" ? "on" : ""}">Open (${counts.open})</button>
        <button data-f="prog" class="${filter === "prog" ? "on" : ""}">In Progress (${counts.prog})</button>
        <button data-f="done" class="${filter === "done" ? "on" : ""}">Completed (${counts.done})</button>
        <span class="spacer"></span>
        <button class="btn-filter">${IC.filter} Filter</button>
      </div>
      <table class="tbl"><thead><tr>
        <th style="width:26px"><input type="checkbox" id="chkAll"></th>
        <th>Task</th><th>Description</th><th>Assigned To</th><th>Due Date</th><th>Status</th><th>Priority</th><th>Actions</th>
      </tr></thead><tbody>
      ${list.map(t => `<tr>
        <td><input type="checkbox" class="chk"></td>
        <td><b>${escA(t.task)}</b>${t.response ? `<div class="tr-view">
            <div class="sub2"><b>Applicant response</b> · ${amsFmtDate(t.response.date)}</div>
            ${t.response.text ? `<div class="sub2">${escA(t.response.text)}</div>` : ""}
            ${(t.response.files || []).map(f => f.fileId
              ? `<a href="#" class="view-upload" data-fid="${escA(f.fileId)}" data-name="${escA(f.name)}">${escA(f.name)}</a>`
              : `<span class="sub2">${escA(f.name)}</span>`).join(" · ")}
          </div>` : ""}</td><td class="sub2">${escA(t.desc || "")}</td>
        <td>${t.assignedTo === "Applicant" ? '<span class="chip" style="background:#ede9fe;color:#5b21b6">Applicant</span>' : escA(t.assignedTo)}</td>
        <td>${daysUntil(t.due) < 0 && t.status !== "Completed" ? `<span style="color:#dc2626">${amsFmtDate(t.due)}</span>` : amsFmtDate(t.due)}</td>
        <td>${chipStatus(t.status)}</td><td>${chipPriority(t.priority)}</td>
        <td>${can("manage_tasks") ? `<select data-task="${t.id}" class="task-status">
          ${["Open", "In Progress", "Completed"].map(s => `<option ${s === t.status ? "selected" : ""}>${s}</option>`).join("")}
        </select>` : `<span class="act-dots">${IC.dots}</span>`}</td>
      </tr>`).join("") || '<tr><td colspan="8"><div class="empty-state">No tasks.</div></td></tr>'}
      </tbody></table>
    </div>`;

  $$ams(".filter-chips button[data-f]", body).forEach(b =>
    b.addEventListener("click", () => go(`?v=applicant&id=${encodeURIComponent(a.id)}&tab=tasks&f=${b.dataset.f}`)));
  const tg = $ams("#toggleTaskForm", body);
  if (tg) tg.addEventListener("click", () => $ams("#taskFormWrap", body).classList.toggle("hidden"));
  const ca = $ams("#chkAll", body);
  if (ca) ca.addEventListener("change", () => $$ams(".chk", body).forEach(c => c.checked = ca.checked));
  const f = $ams("#taskForm", body);
  if (f) f.addEventListener("submit", (e) => {
    e.preventDefault();
    (a.tasks = a.tasks || []).push({
      id: amsUid("t"), task: f.task.value, desc: f.desc.value,
      assignedTo: f.assignedTo.value, due: f.due.value,
      status: "Open", priority: f.priority.value, by: staff.name,
    });
    touch(a, { icon: "task", title: "Task added", desc: f.task.value });
    const s = amsGetStaff().find(x => x.name === f.assignedTo.value);
    if (s && s.id !== staff.id)
      amsNotify(s.id, `New task assigned: "${f.task.value}" on ${a.name} (due ${amsFmtDate(f.due.value)})`, `admin.html?v=applicant&id=${encodeURIComponent(a.id)}&tab=tasks`);
    if (f.assignedTo.value === "Applicant") {
      // task goes to the applicant — simulate the email notification
      const rec = { appId: a.id, appName: a.name, to: a.applicantEmail || a.portalData?.email || "applicant",
        subject: `New task assigned – ${a.name}`, tpl: "Task reminder",
        body: `Dear ${a.applicantName || "Applicant"},\n\nA new task has been assigned to you:\n\n"${f.task.value}"${f.desc.value ? " — " + f.desc.value : ""}\n\nDue date: ${amsFmtDate(f.due.value)}. Please complete it in your applicant dashboard.\n\nBest regards,\nKII Team`,
        by: staff.name, kind: "task" };
      amsLogMessage(rec);
      (a.messages = a.messages || []).unshift({ ...rec, date: new Date().toISOString() });
    }
    saveAndReload(a);
  });
  $$ams(".task-status", body).forEach(s => s.addEventListener("change", () => {
    const t = (a.tasks || []).find(x => x.id === s.dataset.task);
    if (t) { t.status = s.value; saveAndReload(a); }
  }));
  bindUploadViewers(body);
}

/* ----- Milestones tab: deliverables, funding tranches, progress reports ----- */
const MS_CHIP = { "Planned": "chip-open", "Report submitted": "chip-pending", "Approved": "chip-done", "Revision needed": "chip-rejected" };
function tabMilestones(a, body) {
  const list = a.milestones || [];
  const canManage = can("edit_applicants") || can("manage_financials");
  const planned = list.reduce((s, m) => s + (+m.tranche || 0), 0);
  const released = list.filter(m => m.status === "Approved").reduce((s, m) => s + (+m.tranche || 0), 0);
  const plan = a.application?.supporting?.milestonesPlan;
  body.innerHTML = `
    <div class="stat-grid" style="grid-template-columns:repeat(4,1fr)">
      ${statCard("#2563eb", "#dbeafe", IC.task, list.length, "Milestones")}
      ${statCard("#15803d", "#d1fae5", IC.shield, list.filter(m => m.status === "Approved").length, "Approved")}
      ${statCard("#b45309", "#fef3c7", IC.doc, list.filter(m => m.status === "Report submitted").length, "Reports to review")}
      ${statCard("#0f766e", "#ccfbf1", IC.money, amsMoney(released), "Tranches released", "of " + amsMoney(planned) + " planned")}
    </div>
    ${plan ? `<div class="ams-card"><h3>Applicant's proposed 12-month plan</h3><div class="sub2" style="white-space:pre-wrap">${escA(plan)}</div></div>` : ""}
    <div class="ams-card">
      <div class="page-head-row"><div><h3 style="margin:0">Project Milestones</h3>
        <div class="page-sub" style="margin:3px 0 0">Each tranche is released only after the applicant's progress report is approved.</div></div>
        ${canManage ? `<button class="abtn sm" id="toggleMsForm">${IC.plus} Add Milestone</button>` : ""}</div>
      <div id="msFormWrap" class="hidden" style="margin-top:12px">${canManage ? `<form id="msForm" class="inline-form">
        <div class="grid-2">
          <div><label>Milestone</label><input name="title" required placeholder="e.g. Working prototype tested"></div>
          <div><label>Due date</label><input type="date" name="due" required></div>
          <div><label>Deliverable / evidence required</label><input name="deliverable" placeholder="e.g. test report + demo video"></div>
          <div><label>Funding tranche ($)</label><input type="number" name="tranche" min="0" value="0"></div>
        </div>
        <button class="abtn sm" style="margin-top:10px">Add Milestone</button>
      </form>` : ""}</div>
      <table class="tbl"><thead><tr><th>Milestone</th><th>Due</th><th>Tranche</th><th>Status</th><th>Progress report</th>${canManage ? "<th>Actions</th>" : ""}</tr></thead><tbody>
      ${list.map(m => `<tr>
        <td><b>${escA(m.title)}</b>${m.deliverable ? `<div class="sub2">Evidence: ${escA(m.deliverable)}</div>` : ""}</td>
        <td>${m.status !== "Approved" && daysUntil(m.due) < 0 ? `<span style="color:#dc2626">${amsFmtDate(m.due)}</span>` : amsFmtDate(m.due)}</td>
        <td>${amsMoney(m.tranche)}</td>
        <td><span class="chip ${MS_CHIP[m.status] || "chip-stage"}">${escA(m.status)}</span></td>
        <td class="sub2">${m.report ? `${escA(m.report.text)}<br><i>${amsFmtDate(m.report.date)}</i>` : "—"}
          ${m.reviewNote ? `<div style="color:#7c3aed">KII: ${escA(m.reviewNote)}</div>` : ""}</td>
        ${canManage ? `<td>${m.status === "Report submitted" ? `<button class="abtn sm" data-ms-ok="${m.id}">Approve</button>
          <button class="abtn ghost sm" data-ms-rev="${m.id}">Request changes</button>` : ""}</td>` : ""}
      </tr>`).join("") || `<tr><td colspan="6"><div class="empty-state">No milestones yet. Add them once the project is accepted.</div></td></tr>`}
      </tbody></table>
    </div>`;
  const tg = $ams("#toggleMsForm", body);
  if (tg) tg.addEventListener("click", () => $ams("#msFormWrap", body).classList.toggle("hidden"));
  const f = $ams("#msForm", body);
  if (f) f.addEventListener("submit", (e) => {
    e.preventDefault();
    (a.milestones = a.milestones || []).push({ id: amsUid("ms"), title: f.title.value.trim(), due: f.due.value,
      deliverable: f.deliverable.value.trim(), tranche: +f.tranche.value || 0, status: "Planned" });
    touch(a, { icon: "task", title: "Milestone added", desc: `${f.title.value.trim()} (due ${amsFmtDate(f.due.value)})` });
    saveAndReload(a);
  });
  $$ams("[data-ms-ok]", body).forEach(b => b.addEventListener("click", () => {
    const m = list.find(x => x.id === b.dataset.msOk);
    if (!m || !confirm(`Approve "${m.title}" and release the ${amsMoney(m.tranche)} tranche?`)) return;
    m.status = "Approved"; m.approvedBy = staff.name; m.approvedAt = new Date().toISOString(); m.reviewNote = "";
    a.committed = (a.committed || 0) + (+m.tranche || 0);
    touch(a, { icon: "pr", title: "Milestone approved — tranche released", desc: `${m.title}: ${amsMoney(m.tranche)}` });
    const doneN = list.filter(x => x.status === "Approved").length;
    a.progress = Math.max(a.progress || 0, Math.round(doneN / list.length * 100));
    saveAndReload(a);
  }));
  $$ams("[data-ms-rev]", body).forEach(b => b.addEventListener("click", () => {
    const m = list.find(x => x.id === b.dataset.msRev);
    const note = m && prompt(`What should the applicant change in the report for "${m.title}"?`);
    if (!note) return;
    m.status = "Revision needed"; m.reviewNote = note;
    touch(a, { icon: "task", title: "Milestone report returned", desc: `${m.title}: ${note}` });
    saveAndReload(a);
  }));
}

/* ----- KPIs tab — KII Innovator KPI Evaluation Sheet (auto-scored per the official guideline) ----- */
const pctNum = (v) => { v = parseFloat(v); if (isNaN(v)) return 0; return v > 1 ? v : v * 100; };
const KPI_SECTIONS = [
  { id: "A", title: "INNOVATION VIABILITY", max: 30, groups: [
    { id: "a1", title: "A1. Technical Development Stage", cols: ["Stage", "Assessment", "Points"], rows: [
      { k: "a1_stage", label: "Current stage of the innovation", type: "select", ptsMax: 12,
        opts: { "Concept": 2, "Prototype": 4, "Pilot": 7, "Market-ready": 10, "Scaling": 12 } } ] },
    { id: "a2", title: "A2. Problem–Solution Fit", cols: ["Criterion", "Measurement", "Points"], rows: [
      { k: "a2_validation", label: "Problem Validation", type: "number", ptsMax: 3, hint: "number of interviews (50+ → 3)",
        calc: v => v >= 50 ? 3 : v >= 20 ? 2 : v >= 10 ? 1 : 0 },
      { k: "a2_effectiveness", label: "Solution Effectiveness", type: "decimal", ptsMax: 3, hint: "decimal, e.g. 0.30 = 30% improvement",
        calc: v => { const p = pctNum(v); return p > 50 ? 3 : p >= 25 ? 2 : p >= 10 ? 1 : 0; } },
      { k: "a2_adoption", label: "Target User Adoption", type: "decimal", ptsMax: 4, hint: "decimal, e.g. 0.60 = 60% willing",
        calc: v => { const p = pctNum(v); return p > 75 ? 4 : p >= 50 ? 3 : p >= 25 ? 2 : p >= 10 ? 1 : 0; } } ] },
    { id: "a3", title: "A3. Intellectual Property & Competitive Advantage", cols: ["Indicator", "Status", "Points"], rows: [
      { k: "a3_ip", label: "IP Documentation", type: "select", ptsMax: 3,
        opts: { "Filed/Registered": 3, "In process": 2, "Documented": 1, "None": 0 } },
      { k: "a3_unique", label: "Unique Technology / Approach", type: "select", ptsMax: 3,
        opts: { "Highly Unique": 3, "Moderately Unique": 2, "Some Uniqueness": 1, "Not Unique": 0 } },
      { k: "a3_barriers", label: "Barriers to Replication", type: "select", ptsMax: 2,
        opts: { "Strong Barriers": 2, "Some Barriers": 1, "No Barriers": 0 } } ] } ] },
  { id: "B", title: "MARKET VALIDATION", max: 25, groups: [
    { id: "b1", title: "B1. Customer Traction", cols: ["Metric", "Count / Amount", "Points"], rows: [
      { k: "b1_users", label: "Active Users / Customers", type: "number", ptsMax: 5, hint: "1 pt per 20 users",
        calc: v => Math.min(Math.floor(v / 20), 5) },
      { k: "b1_pilots", label: "Pilot Sites / Partners", type: "number", ptsMax: 4, hint: "2 pts per site",
        calc: v => Math.min(v * 2, 4) },
      { k: "b1_paying", label: "Paying Customers", type: "number", ptsMax: 3, hint: "1 pt per customer",
        calc: v => Math.min(v, 3) } ] },
    { id: "b2", title: "B2. Revenue & Financial Sustainability", cols: ["Metric", "Amount", "Points"], rows: [
      { k: "b2_revenue", label: "Total Revenue (USD)", type: "number", ptsMax: 5, hint: "1 pt per $2,000",
        calc: v => Math.min(Math.floor(v / 2000), 5) },
      { k: "b2_recovery", label: "Cost Recovery Rate", type: "decimal", ptsMax: 3, hint: "decimal, e.g. 0.55 = 55%",
        calc: v => { const p = pctNum(v); return p > 50 ? 3 : p >= 25 ? 2 : p >= 10 ? 1 : 0; } } ] },
    { id: "b3", title: "B3. Market Size & Growth Potential", cols: ["Factor", "Assessment", "Points"], rows: [
      { k: "b3_size", label: "Addressable Market Size", type: "select", ptsMax: 2, opts: { "Large": 2, "Medium": 1, "Small": 0 } },
      { k: "b3_growth", label: "Market Growth Rate", type: "select", ptsMax: 2, opts: { "Growing": 2, "Stable": 1, "Declining": 0 } },
      { k: "b3_expansion", label: "Expansion Potential", type: "select", ptsMax: 1, opts: { "Multi-sector/regional": 1, "Single sector/local": 0 } } ] } ] },
  { id: "C", title: "IMPACT POTENTIAL", max: 25, groups: [
    { id: "c1", title: "C1. Beneficiary Reach", cols: ["Metric", "Number", "Points"], rows: [
      { k: "c1_direct", label: "Direct Beneficiaries (current)", type: "number", ptsMax: 5, hint: "1 pt per 50 people",
        calc: v => Math.min(Math.floor(v / 50), 5) },
      { k: "c1_projected", label: "Projected Beneficiaries (12 months)", type: "number", ptsMax: 5, hint: "1 pt per 200 people",
        calc: v => Math.min(Math.floor(v / 200), 5) } ] },
    { id: "c2", title: "C2. Measurable Outcomes", kind: "outcome",
      cols: ["Outcome", "Baseline %", "Current %", "% Improvement", "Points"], rows: [
      { k: "c2_o1", ptsMax: 5 }, { k: "c2_o2", ptsMax: 5 } ] },
    { id: "c3", title: "C3. Social & Economic Impact", cols: ["Impact Area", "Measurement", "Points"], rows: [
      { k: "c3_jobs", label: "Jobs Created", type: "number", ptsMax: 3, hint: "1 pt per job",
        calc: v => Math.min(v, 3) },
      { k: "c3_multiplier", label: "Economic Multiplier", type: "select", ptsMax: 1,
        opts: { "Enables income generation for others": 1, "Direct only": 0 } },
      { k: "c3_krg", label: "Alignment with KRG Priorities", type: "select", ptsMax: 1,
        opts: { "High": 1, "Medium": 0.5, "Low": 0 } } ] } ] },
  { id: "D", title: "TEAM & EXECUTION", max: 20, groups: [
    { id: "d1", title: "D1. Team Capacity", cols: ["Factor", "Measurement", "Points"], rows: [
      { k: "d1_size", label: "Core Team Size", type: "number", ptsMax: 3, hint: "1 pt per member",
        calc: v => Math.min(v, 3) },
      { k: "d1_expertise", label: "Relevant Expertise", type: "select", ptsMax: 3,
        opts: { "Technical + Business": 3, "One area": 2, "Neither": 0 } },
      { k: "d1_time", label: "Time Commitment", type: "select", ptsMax: 2,
        opts: { "Full-time": 2, "Part-time": 1, "Sporadic": 0 } } ] },
    { id: "d2", title: "D2. Milestone Achievement Rate", kind: "rate",
      cols: ["Metric", "Value", "Points"], rows: [
      { k: "d2_done", label: "Milestones Completed", type: "number" },
      { k: "d2_plan", label: "Milestones Planned", type: "number" },
      { k: "d2_rate", label: "Achievement Rate", type: "auto", ptsMax: 7, hint: "1 pt per 15% completion rate" } ] },
    { id: "d3", title: "D3. KII Support Utilization", cols: ["Support Type", "Level / Status", "Points"], rows: [
      { k: "d3_mentorship", label: "Mentorship Engagement", type: "select", ptsMax: 2,
        opts: { "Regular": 2, "Occasional": 1, "Rare": 0 } },
      { k: "d3_training", label: "Training / Workshops Attended", type: "select", ptsMax: 2,
        opts: { "3+ sessions": 2, "1-2 sessions": 1, "None": 0 } },
      { k: "d3_network", label: "Network Connections Used", type: "select", ptsMax: 1,
        opts: { "Yes": 1, "No": 0 } } ] } ] },
];
/* official rating bands: 80+ Excellent | 60-79 Good | 40-59 Developing | 20-39 At Risk | 0-19 Critical */
const kpiVerdict = (pct) =>
  pct >= 80 ? ["Excellent — Priority support; investment-ready", "#15803d", "#dcfce7"] :
  pct >= 60 ? ["Good — Continue support; monitor progress", "#166534", "#d1fae5"] :
  pct >= 40 ? ["Developing — Targeted interventions; improvement plan", "#b45309", "#fef3c7"] :
  pct >= 20 ? ["At Risk — Intensive support or pivot required", "#c2410c", "#ffedd5"] :
              ["Critical — Exit consideration; major restructuring", "#b91c1c", "#fee2e2"];
const kpiSecRating = (pct) =>
  pct >= 80 ? "Excellent" : pct >= 60 ? "Good" : pct >= 40 ? "Developing" : pct >= 20 ? "At Risk" : "Critical";
const kpiOutcomePts = (imp) => imp > 50 ? 5 : imp >= 30 ? 4 : imp >= 15 ? 3 : imp >= 5 ? 2 : imp > 0 ? 1 : 0;
/* management decision matrix — recommended actions per rating */
const KPI_ACTIONS = {
  "Excellent": ["Priority for advanced support", "Investment readiness assessment", "Showcase for funders / media", "Peer mentoring opportunities"],
  "Good": ["Continue current support level", "Focus on weak areas", "Quarterly progress reviews", "Consider for acceleration programs"],
  "Developing": ["Targeted intervention plan", "Increase mentorship frequency", "Address specific gaps", "Set 90-day improvement goals"],
  "At Risk": ["Intensive support required", "Consider pivot options", "Monthly check-ins", "Decision point in 6 months"],
  "Critical": ["Exit consideration", "Major restructuring needed", "Bi-weekly reviews", "3-month decision deadline"],
};
const KPI_SEC_RECS = [
  { id: "A", min: 15, max: 30, rec: "Technical development support; prototype funding; expert consultation" },
  { id: "B", min: 12, max: 25, rec: "Business model coaching; customer development support; pilot site facilitation" },
  { id: "C", min: 12, max: 25, rec: "Impact measurement training; beneficiary engagement support; outcome tracking systems" },
  { id: "D", min: 10, max: 20, rec: "Team building support; skill training; time management coaching; co-founder matching" },
];
function kpiRecommendations(latest) {
  const rating = (latest.rating || "").split(" — ")[0];
  const weak = KPI_SEC_RECS.filter(w => (latest.sections?.[w.id] || 0) < w.min);
  return `<div class="kpi-recs">
    <b>Recommended actions — ${escA(rating)}:</b>
    <ul>${(KPI_ACTIONS[rating] || []).map(x => `<li>${x}</li>`).join("")}</ul>
    ${weak.length ? `<b>Section gaps — suggested support:</b>
      <ul>${weak.map(w => `<li><b>Section ${w.id} (${latest.sections[w.id]}/${w.max}):</b> ${w.rec}</li>`).join("")}</ul>` :
      `<div class="sub2">All sections are above their minimum thresholds.</div>`}
  </div>`;
}

function tabKPIs(a, body) {
  const sheets = a.kpiSheets || [];
  const latest = sheets[0];
  const vals = latest?.values || {};
  const ms = a.milestones || [];
  const msPlanned = ms.length;
  const msDone = ms.filter(m => /^(Approved|Done|Completed)$/i.test(m.status || "")).length;
  const editable = can("evaluate") || can("edit_applicants");

  const valInput = (r) => {
    const v = vals["v_" + r.k] ?? (r.k === "d2_done" ? msDone : r.k === "d2_plan" ? msPlanned : "");
    if (r.type === "select") return `<select name="v_${r.k}"><option value="">—</option>${Object.keys(r.opts).map(o =>
      `<option ${v === o ? "selected" : ""}>${o}</option>`).join("")}</select>`;
    if (r.type === "number" || r.type === "decimal") return `<input type="number" name="v_${r.k}" min="0" step="any" value="${escA(v)}">`;
    return `<input type="text" name="v_${r.k}" value="${escA(v)}">`;
  };
  const ptsCell = (r) => `<td><b data-pts="${r.k}">0</b><span class="sub2">/${r.ptsMax}</span>${r.hint ? `<div class="sub2">${r.hint}</div>` : ""}</td>`;

  const rowHtml = (g, r) => {
    if (g.kind === "outcome") return `<tr>
      <td><input type="text" name="v_${r.k}_name" value="${escA(vals["v_" + r.k + "_name"] ?? "")}" placeholder="Outcome ${r.k.slice(-1)}"></td>
      <td><input type="number" name="v_${r.k}_base" min="0" max="100" value="${escA(vals["v_" + r.k + "_base"] ?? "")}"></td>
      <td><input type="number" name="v_${r.k}_cur" min="0" max="100" value="${escA(vals["v_" + r.k + "_cur"] ?? "")}"></td>
      <td data-imp="${r.k}">—</td>
      ${ptsCell(r)}</tr>`;
    if (r.type === "auto") return `<tr><td>${r.label}</td><td><b data-imp="rate">—</b></td>${ptsCell(r)}</tr>`;
    return `<tr><td>${r.label}</td><td>${valInput(r)}</td>${ptsCell(r)}</tr>`;
  };

  const summary = latest ? `
    <div class="ams-card"><h3>Overall Evaluation Summary <span class="sub2">— latest sheet, ${amsFmtDate(latest.date)} by ${escA(latest.by)}</span></h3>
      <table class="tbl"><thead><tr><th>Section</th><th>Score</th><th>Max</th><th>% Score</th><th>Rating</th></tr></thead><tbody>
      ${KPI_SECTIONS.map(s => { const sc = latest.sections?.[s.id] || 0; const pct = Math.round(sc / s.max * 100);
        return `<tr><td><b>${s.id}. ${s.title}</b></td><td>${sc}</td><td>${s.max}</td><td>${pct}%</td><td>${kpiSecRating(pct)}</td></tr>`; }).join("")}
      <tr style="font-weight:700"><td>TOTAL SCORE</td><td>${latest.total}</td><td>100</td><td>${latest.pct}%</td>
        <td><span class="chip" style="background:${kpiVerdict(latest.pct)[2]};color:${kpiVerdict(latest.pct)[1]}">${kpiVerdict(latest.pct)[0]}</span></td></tr>
      </tbody></table>
      ${kpiRecommendations(latest)}</div>` :
    `<div class="ams-card"><div class="empty-state">No KPI evaluation sheet has been completed yet${editable ? " — fill in the sheet below" : ""}.</div></div>`;

  const history = sheets.length > 1 ? `
    <div class="ams-card"><h3>Evaluation History</h3>
      <table class="tbl"><thead><tr><th>Date</th><th>Evaluator</th><th>A</th><th>B</th><th>C</th><th>D</th><th>Total</th><th>Rating</th></tr></thead><tbody>
      ${sheets.map(s => `<tr><td>${amsFmtDate(s.date)}</td><td>${escA(s.by)}</td>
        ${KPI_SECTIONS.map(x => `<td>${s.sections?.[x.id] || 0}</td>`).join("")}
        <td><b>${s.total}</b></td><td>${escA(s.rating)}</td></tr>`).join("")}
      </tbody></table></div>` : "";

  body.innerHTML = `
    ${summary}
    ${editable ? `<div class="ams-card"><h3>KII Innovator KPI Evaluation Sheet ${latest ? `<span class="sub2">— re-evaluate (previous total ${latest.total}/100)</span>` : ""}</h3>
      <div class="sub2" style="margin-bottom:6px">Enter measurements only — points, subtotals and the total score are calculated automatically per the KII scoring guideline.</div>
      <form id="kpiForm" class="inline-form">
      ${KPI_SECTIONS.map(s => `
        <div class="kpi-sec"><div class="kpi-sec-head"><b>SECTION ${s.id}: ${s.title}</b><span>max ${s.max} pts</span></div>
        ${s.groups.map(g => `
          <div class="kpi-grp"><div class="kpi-grp-title">${g.title}</div>
          <table class="tbl kpi"><thead><tr>${g.cols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>
            ${g.rows.map(r => rowHtml(g, r)).join("")}
            <tr class="kpi-sub"><td colspan="${g.cols.length - 1}"><b>Sub Total</b></td><td><b data-sub="${g.id}">0</b></td></tr>
          </tbody></table></div>`).join("")}
        <div class="kpi-sec-total">Section ${s.id} Grand Total: <b data-sec="${s.id}">0</b> / ${s.max}</div>
        </div>`).join("")}
      <div class="kpi-total-bar">TOTAL SCORE: <b id="kpiGrand">0</b>/100 — <b id="kpiPct">0%</b>
        <span class="chip" id="kpiVerdictChip"></span></div>
      <label>Evaluator notes &amp; evidence rationale <span class="muted">(document sources/evidence for subjective scores)</span></label>
      <textarea name="kpiNotes" rows="2">${escA(latest?.notes || "")}</textarea>
      <button class="abtn sm" style="margin-top:12px">Save KPI Evaluation Sheet</button>
      </form></div>` : ""}
    ${history}`;

  const f = $ams("#kpiForm", body);
  if (!f) return;
  const rawVal = (n) => f.querySelector(`[name="${n}"]`)?.value ?? "";
  const num = (n) => parseFloat(rawVal(n)) || 0;
  const rowPts = (r) => {
    if (r.opts) return r.opts[rawVal("v_" + r.k)] ?? 0;
    if (r.calc) return r.calc(num("v_" + r.k));
    if (r.k.startsWith("c2_")) {
      const imp = num("v_" + r.k + "_cur") - num("v_" + r.k + "_base");
      return (rawVal("v_" + r.k + "_base") === "" && rawVal("v_" + r.k + "_cur") === "") ? 0 : kpiOutcomePts(imp);
    }
    if (r.k === "d2_rate") {
      const plan = num("v_d2_plan");
      return plan ? Math.min(Math.floor(num("v_d2_done") / plan * 100 / 15), 7) : 0;
    }
    return 0;
  };
  const recompute = () => {
    ["c2_o1", "c2_o2"].forEach(k => {
      const b = rawVal("v_" + k + "_base"), c = rawVal("v_" + k + "_cur");
      const cell = f.querySelector(`[data-imp="${k}"]`);
      if (cell) cell.textContent = (b !== "" || c !== "") ? Math.round((parseFloat(c) || 0) - (parseFloat(b) || 0)) + "%" : "—";
    });
    const done = num("v_d2_done"), plan = num("v_d2_plan");
    const rc = f.querySelector('[data-imp="rate"]');
    if (rc) rc.textContent = plan ? Math.round(done / plan * 100) + "%" : "—";
    const secTotals = {}, points = {};
    let grand = 0;
    for (const s of KPI_SECTIONS) {
      let sec = 0;
      for (const g of s.groups) {
        let sub = 0;
        for (const r of g.rows) {
          if (r.ptsMax == null) continue;           // pure input rows (milestone counts) score nothing themselves
          const p = Math.min(rowPts(r), r.ptsMax);
          points[r.k] = p;
          const cell = f.querySelector(`[data-pts="${r.k}"]`);
          if (cell) cell.textContent = p % 1 ? p.toFixed(1) : p;
          sub += p;
        }
        const c = f.querySelector(`[data-sub="${g.id}"]`); if (c) c.textContent = sub % 1 ? sub.toFixed(1) : sub;
        sec += sub;
      }
      sec = Math.min(sec, s.max);
      secTotals[s.id] = sec; grand += sec;
      const c = f.querySelector(`[data-sec="${s.id}"]`); if (c) c.textContent = sec % 1 ? sec.toFixed(1) : sec;
    }
    const pct = Math.round(grand);
    $ams("#kpiGrand", f).textContent = grand % 1 ? grand.toFixed(1) : grand;
    $ams("#kpiPct", f).textContent = pct + "%";
    const chip = $ams("#kpiVerdictChip", f);
    const [txt, fg, bg] = kpiVerdict(pct);
    chip.textContent = txt; chip.style.background = bg; chip.style.color = fg;
    return { secTotals, points, grand, pct };
  };
  f.addEventListener("input", recompute);
  f.addEventListener("change", recompute);
  recompute();
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const { secTotals, points, grand, pct } = recompute();
    const values = {};
    f.querySelectorAll("input[name^='v_'], select[name^='v_']").forEach(el => values[el.name] = el.value);
    const rating = kpiVerdict(pct)[0];
    (a.kpiSheets = a.kpiSheets || []).unshift({
      id: amsUid("kpi"), date: new Date().toISOString(), by: staff.name,
      values, points, sections: secTotals, total: grand, pct, rating,
      notes: f.kpiNotes.value.trim(),
    });
    a.kpis = {
      technical: Math.round(secTotals.A / 30 * 100),
      business: Math.round(secTotals.B / 25 * 100),
      market: Math.round(secTotals.C / 25 * 100),
      team: Math.round(secTotals.D / 20 * 100),
    };
    touch(a, { icon: "eval", title: "KPI evaluation sheet completed", desc: `Total ${grand}/100 (${pct}%) — ${rating}` });
    amsNotifyRole("admin_manager", `KPI evaluation for "${a.name}": ${grand}/100 (${pct}%) — ${rating}.`,
      `admin.html?v=applicant&id=${encodeURIComponent(a.id)}&tab=kpis`);
    saveAndReload(a);
  });
}

/* ----- Evaluations tab: weighted rubric, conflict-of-interest, recommendation ----- */
const RUBRIC = [
  { k: "innovation", label: "Innovation & novelty", w: 20, hint: "How new is the idea compared with existing solutions?" },
  { k: "technical", label: "Technical feasibility & excellence", w: 20, hint: "Is the approach sound and achievable at the stated TRL?" },
  { k: "market", label: "Market potential & business model", w: 20, hint: "Is there a real customer need and a credible path to revenue or sustainability?" },
  { k: "impact", label: "Social / economic impact", w: 15, hint: "Benefit to Kurdistan, communities and the SDGs." },
  { k: "team", label: "Team capacity & leadership", w: 15, hint: "Can the team deliver the milestones?" },
  { k: "fit", label: "Fit with KII scope & value for money", w: 10, hint: "Is the requested budget reasonable for the expected results?" },
];
const RECOMMENDATIONS = ["Strongly recommend", "Recommend", "Recommend with conditions", "Do not recommend"];
const evalTotal = (e) => e.total != null ? e.total : e.score != null ? Math.round(e.score * 20) : null;
function rubricTotal(scores) {
  return Math.round(RUBRIC.reduce((s, c) => s + ((+scores[c.k] || 0) / 5) * c.w, 0));
}

function tabEvals(a, body) {
  const done = (a.evaluations || []).filter(e => e.status === "Completed" && evalTotal(e) != null);
  const mine = (a.evaluations || []).find(e => e.staffId === staff.id);
  const totals = done.map(evalTotal);
  const avg = totals.length ? Math.round(totals.reduce((s, x) => s + x, 0) / totals.length) : null;
  const spread = totals.length > 1 ? Math.max(...totals) - Math.min(...totals) : 0;
  const critAvg = (k) => {
    const xs = done.filter(e => e.scores && e.scores[k] != null).map(e => +e.scores[k]);
    return xs.length ? (xs.reduce((s, x) => s + x, 0) / xs.length).toFixed(1) : "—";
  };

  body.innerHTML = `
    ${done.length ? `<div class="stat-grid" style="grid-template-columns:repeat(3,1fr)">
      ${statCard("#2563eb", "#dbeafe", IC.eval, avg + "/100", "Average Score", done.length + " evaluation(s)")}
      ${statCard(spread > 25 ? "#dc2626" : "#15803d", spread > 25 ? "#fee2e2" : "#d1fae5", IC.alertc, spread, "Score Spread", spread > 25 ? "Reviewers disagree — discuss before deciding" : "Reviewers broadly agree")}
      ${statCard("#7c3aed", "#ede9fe", IC.shield, done.filter(e => /^(Strongly recommend|Recommend)/.test(e.recommendation || "")).length + "/" + done.length, "Recommend", "evaluators recommending support")}
    </div>
    <div class="ams-card"><h3>Score by Criterion (average of 1–5)</h3>
      ${RUBRIC.map(c => pbarRow(`${c.label} (weight ${c.w}%)`, critAvg(c.k) === "—" ? 0 : Math.round(critAvg(c.k) / 5 * 100), "#3b82f6")).join("")}
    </div>` : ""}

    <div class="ams-card">
      <div class="page-head-row"><h3 style="margin:0">Expert Evaluations</h3>
        ${can("evaluate") && !mine ? `<button class="abtn sm" id="toggleEvalForm">${IC.plus} Submit My Evaluation</button>` : ""}
        ${mine ? `<span class="sub2">You ${mine.status === "Recused" ? "declared a conflict of interest" : "submitted your evaluation"} on ${amsFmtDate(mine.date)}.</span>` : ""}</div>
      <div id="evalFormWrap" class="hidden" style="margin-top:12px">${can("evaluate") && !mine ? `<form id="evalForm" class="inline-form">
        <div class="coi-box">
          <b>Conflict of interest declaration</b>
          <label class="inline-check"><input type="radio" name="coi" value="none"> I have no personal, financial or professional relationship with this applicant or project.</label>
          <label class="inline-check"><input type="radio" name="coi" value="conflict"> I have a conflict of interest and will not evaluate this application (recuse).</label>
        </div>
        <div id="rubricFields">
          <table class="tbl rubric"><thead><tr><th>Criterion</th><th>Weight</th><th>Score (1 = poor … 5 = excellent)</th></tr></thead><tbody>
          ${RUBRIC.map(c => `<tr><td><b>${c.label}</b><div class="sub2">${c.hint}</div></td><td>${c.w}%</td>
            <td><div class="score-pick">${[1, 2, 3, 4, 5].map(n => `<label><input type="radio" name="s_${c.k}" value="${n}"><span>${n}</span></label>`).join("")}</div></td></tr>`).join("")}
          </tbody></table>
          <div class="sub2" style="margin:6px 0">Weighted total: <b id="rubricTotal">0</b>/100</div>
          <div class="grid-2">
            <div><label>Recommendation</label><select name="recommendation"><option value="">Select…</option>${RECOMMENDATIONS.map(r => `<option>${r}</option>`).join("")}</select></div>
            <div><label>Suggested support amount ($, optional)</label><input type="number" name="suggestedAmount" min="0"></div>
          </div>
          <label>Strengths</label><textarea name="strengths" rows="2"></textarea>
          <label>Weaknesses / risks</label><textarea name="weaknesses" rows="2"></textarea>
          <label>Comments & recommendations for the applicant / committee</label><textarea name="notes" rows="3"></textarea>
        </div>
        <button class="abtn sm" style="margin-top:10px">Submit Evaluation</button>
      </form>` : ""}</div>
      <table class="tbl"><thead><tr><th>Expert</th><th>Date</th><th>Total</th><th>Recommendation</th><th>Status</th><th>Comments</th></tr></thead><tbody>
      ${(a.evaluations || []).map(e => `<tr>
        <td><b>${escA(e.expert)}</b></td><td>${amsFmtDate(e.date)}</td>
        <td>${evalTotal(e) != null ? `<b>${evalTotal(e)}/100</b>` : "—"}</td>
        <td>${escA(e.recommendation || "—")}</td>
        <td>${chipStatus(e.status)}</td>
        <td class="sub2">${e.strengths ? "<b>+</b> " + escA(e.strengths) + "<br>" : ""}${e.weaknesses ? "<b>−</b> " + escA(e.weaknesses) + "<br>" : ""}${escA(e.notes || "")}</td>
      </tr>`).join("") || '<tr><td colspan="6"><div class="empty-state">No evaluations yet.</div></td></tr>'}
      </tbody></table>
    </div>`;
  const tg = $ams("#toggleEvalForm", body);
  if (tg) tg.addEventListener("click", () => $ams("#evalFormWrap", body).classList.toggle("hidden"));
  const f = $ams("#evalForm", body);
  if (!f) return;
  const readScores = () => Object.fromEntries(RUBRIC.map(c => [c.k, +(f.querySelector(`[name="s_${c.k}"]:checked`)?.value || 0)]));
  f.addEventListener("change", () => {
    $ams("#rubricTotal", f).textContent = rubricTotal(readScores());
    const conflict = f.querySelector('[name="coi"]:checked')?.value === "conflict";
    $ams("#rubricFields", f).classList.toggle("hidden", conflict);
  });
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const coi = f.querySelector('[name="coi"]:checked')?.value;
    if (!coi) { alert("Please complete the conflict-of-interest declaration first."); return; }
    const expert = `${staff.name} (${staff.title || ROLES[staff.role]?.label || ""})`;
    const link = `admin.html?v=applicant&id=${encodeURIComponent(a.id)}&tab=evaluations`;
    if (coi === "conflict") {
      (a.evaluations = a.evaluations || []).unshift({ id: amsUid("e"), staffId: staff.id, expert, date: new Date().toISOString(), status: "Recused", notes: "Declared a conflict of interest." });
      touch(a, { icon: "eval", title: "Evaluator recused (conflict of interest)", desc: expert });
      amsNotifyRole("admin_manager", `${staff.name} declared a conflict of interest on "${a.name}" — please assign another expert.`, link);
      saveAndReload(a); return;
    }
    const scores = readScores();
    if (RUBRIC.some(c => !scores[c.k])) { alert("Please score every criterion."); return; }
    if (!f.recommendation.value) { alert("Please choose a recommendation."); return; }
    const total = rubricTotal(scores);
    (a.evaluations = a.evaluations || []).unshift({
      id: amsUid("e"), staffId: staff.id, expert, date: new Date().toISOString(),
      scores, total, recommendation: f.recommendation.value, suggestedAmount: +f.suggestedAmount.value || null,
      strengths: f.strengths.value.trim(), weaknesses: f.weaknesses.value.trim(), notes: f.notes.value.trim(),
      coi: "none", status: "Completed",
    });
    touch(a, { icon: "eval", title: "Expert evaluation completed", desc: `${total}/100 — ${f.recommendation.value}` });
    amsNotifyRole("admin_manager", `Evaluation completed for "${a.name}": ${total}/100, ${f.recommendation.value}.`, link);
    saveAndReload(a);
  });
}

/* ----- Documents tab ----- */
/* ----- Application tab — full applicant submission (read-only) ----- */
const APP_SEC_LABELS = {
  instruction: "Instructions", personal: "Personal Background", education: "Education History",
  supporting: "Supporting & Project Information", video: "Video Statement",
  nondegree: "Non-Degree Studies & Experiences", interest: "Area of Scientific Interest",
  duration: "Duration of Project", examscore: "Exam Score", examdocs: "Exam Documents",
  travel: "Travel Information", kii: "Relationship with KII", recommendations: "Recommendations",
};
const fmtBytes = n => !n ? "—" : n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";
const camelLbl = k => escA(k.replace(/_?\d+$/, "").replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase()).trim());

const FIELD_LABELS = {
  trl: "Technology readiness (TRL)", ipStatus: "IP status", ipOwner: "IP owner", legalEntity: "Legal entity",
  sdgs: "UN SDGs", milestonesPlan: "12-month milestones", targetCustomers: "Target customers",
  competitors: "Competitors & advantage", explain: "Project explanation", agreeApp: "Accepted application terms",
  agreeFee: "Accepted confirmation fee terms", hsSchool: "High school", fieldOfStudy: "Field of study",
  rcName: "Name", rcEmail: "Email", rcRelation: "Relationship", tmName: "Name", tmEmail: "Email", tmRole: "Role",
  rqItem: "Item", rqType: "Type", rqQty: "Quantity", rqUnit: "Unit", rqCost: "Cost per unit ($)", rqNote: "Purpose",
  passportNo: "Passport number", primaryCitizenship: "Primary citizenship", dualCitizenship: "Dual citizenship",
};
function appScalarRows(obj) {
  return Object.entries(obj || {})
    .filter(([k, v]) => k !== "files" && k !== "application" && k !== "idx" &&
      (v === null || typeof v !== "object" || (Array.isArray(v) && v.every(x => typeof x !== "object"))))
    .map(([k, v]) => {
      const shown = Array.isArray(v) ? v.join(", ") : v;
      const masked = k === "passportNo" && shown && !can("edit_applicants") ? "•••• " + String(shown).slice(-3) : shown;
      return `<div class="detail-row"><span class="k">${FIELD_LABELS[k] || camelLbl(k)}</span>
      <span class="v" style="white-space:pre-wrap">${masked === true ? "Yes" : masked === false ? "No" : masked === "" || masked == null ? "—" : escA(masked)}</span></div>`;
    })
    .join("");
}
function appFileRows(files) {
  const list = Object.entries(files || {}).filter(([, m]) => m && m.name);
  return list.map(([k, m]) => `<div class="detail-row"><span class="k">${camelLbl(k)}</span>
    <span class="v">${m.fileId
      ? `<a href="#" class="view-upload" data-fid="${escA(m.fileId)}" data-name="${escA(m.name)}">${escA(m.name)}</a>`
      : escA(m.name)}
      <span class="sub2">${fmtBytes(m.size)}</span></span></div>`).join("");
}
function appSubBlocks(obj) {
  return Object.entries(obj || {})
    .filter(([k, v]) => Array.isArray(v) && v.length && typeof v[0] === "object")
    .map(([k, arr]) => `<div class="sub2" style="font-weight:600;margin:12px 0 6px">${camelLbl(k)}</div>` +
      arr.map((item, i) => `<div class="sub-block">
        <div class="sub2" style="font-weight:600;margin-bottom:2px">#${i + 1}</div>
        ${appScalarRows(item)}${appFileRows(item.files)}
      </div>`).join("")).join("");
}
function bindUploadViewers(root) {
  root.addEventListener("click", async (e) => {
    const link = e.target.closest(".view-upload");
    if (!link) return;
    e.preventDefault();
    const file = await KII.getFile(link.dataset.fid);
    if (!file) { alert("File not found in local storage (may have been uploaded before this update)."); return; }
    const url = URL.createObjectURL(file);
    const win = window.open(url, "_blank");
    if (!win) { // popup blocked → download instead
      const aEl = document.createElement("a");
      aEl.href = url; aEl.download = link.dataset.name || "file"; aEl.click();
    }
  });
}
function tabApplication(a, body) {
  const app = a.application;
  if (!app || !Object.keys(app).length) {
    body.innerHTML = `<div class="ams-card"><div class="empty-state">No application data — this applicant was not submitted through the applicant portal.</div></div>`;
    return;
  }
  body.innerHTML = `<div class="ams-card" style="border-left:4px solid #166e4a">
      <h3>Submitted Application ${a.portalData?.submitted ? '<span class="chip" style="background:#dcfce7;color:#166534">Submitted</span>' : '<span class="chip" style="background:#fef3c7;color:#92400e">In progress</span>'}</h3>
      <div class="sub2">Full answers exactly as the applicant entered them in the portal. Read-only.</div>
    </div>` +
    (blindReview() ? `<div class="ams-card" style="background:#f5f3ff;border-left:4px solid #7c3aed">
      <b>Blind review is on.</b> Personal details, CV, photo, video and references are hidden so the project is judged on its merits.</div>` : "") +
    Object.entries(app).map(([id, d]) => {
      if (!d || typeof d !== "object" || !Object.keys(d).length) return "";
      if (blindReview() && BLIND_SECTIONS.includes(id)) return "";
      if (blindReview() && d.files) d = { ...d, files: Object.fromEntries(Object.entries(d.files).filter(([k]) => !BLIND_FILES.includes(k))) };
      const inner = appScalarRows(d) + appSubBlocks(d) + appFileRows(d.files);
      if (!inner.trim()) return "";
      return `<div class="ams-card"><h3>${escA(APP_SEC_LABELS[id] || camelLbl(id))}</h3>${inner}</div>`;
    }).join("");
  bindUploadViewers(body);
}

function tabDocs(a, body) {
  const uploads = (a.uploads || []).filter(u => !(blindReview() && (BLIND_FILES.includes(u._key) || /^letter_/.test(u._key))));
  body.innerHTML = `
    ${uploads.length ? `<div class="ams-card"><h3>Uploaded by Applicant</h3>
      <table class="tbl"><thead><tr><th>Field</th><th>File</th><th>Type</th><th>Size</th><th></th></tr></thead><tbody>
      ${uploads.map(u => `<tr>
        <td><b>${camelLbl(u._key)}</b></td>
        <td>${u.fileId ? `<a href="#" class="view-upload" data-fid="${escA(u.fileId)}" data-name="${escA(u.name)}">${escA(u.name)}</a>` : escA(u.name)}</td>
        <td class="sub2">${escA(u.type || "—")}</td><td class="sub2">${fmtBytes(u.size)}</td>
        <td>${u.fileId ? "" : '<span class="sub2">metadata only</span>'}</td>
      </tr>`).join("")}
      </tbody></table></div>` : ""}
    <div class="ams-card">
      <div class="page-head-row"><h3 style="margin:0">Documents</h3>
        ${can("manage_documents") ? `<button class="abtn sm" id="toggleDocForm">${IC.plus} Add Document</button>` : ""}</div>
      <div id="docFormWrap" class="hidden" style="margin-top:12px">${can("manage_documents") ? `<form id="docForm" class="inline-form">
        <div class="grid-2">
          <div><label>Document name</label><input name="name" required></div>
          <div><label>File name</label><input name="file" placeholder="report.pdf" required></div>
          <div><label>Size</label><input name="size" placeholder="1.2 MB"></div>
        </div>
        <button class="abtn sm" style="margin-top:10px">Add Document</button>
      </form>` : ""}</div>
      <table class="tbl"><thead><tr><th>Document</th><th>File</th><th>Date</th><th>Size</th><th></th></tr></thead><tbody>
      ${(a.documents || []).map(d => `<tr><td><b>${docIcon(d.file)} ${escA(d.name)}</b></td><td class="sub2">${escA(d.file)}</td><td>${amsFmtDate(d.date)}</td><td class="sub2">${escA(d.size || "—")}</td><td class="act-dots">${IC.dots}</td></tr>`).join("")
        || '<tr><td colspan="5"><div class="empty-state">No documents.</div></td></tr>'}
      </tbody></table>
    </div>`;
  const tg = $ams("#toggleDocForm", body);
  if (tg) tg.addEventListener("click", () => $ams("#docFormWrap", body).classList.toggle("hidden"));
  const f = $ams("#docForm", body);
  if (f) f.addEventListener("submit", (e) => {
    e.preventDefault();
    (a.documents = a.documents || []).push({
      id: amsUid("d"), name: f.name.value, file: f.file.value,
      date: new Date().toISOString(), size: f.size.value,
    });
    touch(a, { icon: "doc", title: "Document uploaded", desc: f.name.value });
    saveAndReload(a);
  });
  bindUploadViewers(body);
}

/* ----- Procurement tab ----- */
function tabProc(a, body) {
  body.innerHTML = `
    <div class="ams-card">
      <div class="page-head-row"><h3 style="margin:0">Procurement Requests</h3>
        ${can("manage_procurement") ? `<button class="abtn sm" id="togglePrForm">${IC.plus} Create PR</button>` : ""}</div>
      <div id="prFormWrap" class="hidden" style="margin-top:12px">${can("manage_procurement") ? `<form id="prForm" class="inline-form">
        <div class="grid-2">
          <div><label>Title</label><input name="title" required></div>
          <div><label>Amount ($)</label><input type="number" name="amount" min="0" required></div>
        </div>
        <button class="abtn sm" style="margin-top:10px">Create PR</button>
      </form>` : ""}</div>
      <table class="tbl"><thead><tr><th>PR #</th><th>Title</th><th>Amount</th><th>Date</th><th>Status</th>${can("manage_financials") ? "<th>Actions</th>" : ""}</tr></thead><tbody>
      ${(a.procurement || []).map(p => `<tr>
        <td><b>${escA(p.id)}</b></td><td>${escA(p.title)}</td><td>${amsMoney(p.amount)}</td>
        <td>${amsFmtDate(p.date)}</td><td>${chipStatus(p.status)}</td>
        ${can("manage_financials") ? `<td>${p.status === "Pending" ?
          `<button class="abtn sm" data-ap="${p.id}">Approve</button>
           <button class="abtn danger sm" data-rj="${p.id}">Reject</button>` : `<span class="act-dots">${IC.dots}</span>`}</td>` : ""}
      </tr>`).join("") || '<tr><td colspan="6"><div class="empty-state">No procurement requests.</div></td></tr>'}
      </tbody></table>
    </div>`;
  const tg = $ams("#togglePrForm", body);
  if (tg) tg.addEventListener("click", () => $ams("#prFormWrap", body).classList.toggle("hidden"));
  const f = $ams("#prForm", body);
  if (f) f.addEventListener("submit", (e) => {
    e.preventDefault();
    (a.procurement = a.procurement || []).push({
      id: "PR-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 900) + 100),
      title: f.title.value, amount: +f.amount.value,
      status: "Pending", date: new Date().toISOString(),
    });
    touch(a, { icon: "pr", title: "PR submitted", desc: f.title.value });
    saveAndReload(a);
  });
  $$ams("[data-ap]", body).forEach(b => b.addEventListener("click", () => {
    const p = a.procurement.find(x => x.id === b.dataset.ap);
    if (p) { p.status = "Approved"; touch(a, { icon: "pr", title: "PR approved", desc: p.id }); saveAndReload(a); }
  }));
  $$ams("[data-rj]", body).forEach(b => b.addEventListener("click", () => {
    const p = a.procurement.find(x => x.id === b.dataset.rj);
    if (p) { p.status = "Rejected"; touch(a, { icon: "pr", title: "PR rejected", desc: p.id }); saveAndReload(a); }
  }));
}

/* ----- Financials tab ----- */
function tabFin(a, body) {
  if (!can("view_financials")) {
    body.innerHTML = `<div class="ams-card"><div class="empty-state">You do not have permission to view financial information.</div></div>`;
    return;
  }
  const remaining = (a.supportApproved || 0) - (a.spent || 0);
  body.innerHTML = `
    <div class="stat-grid" style="grid-template-columns:repeat(4,1fr)">
      ${statCard("#15803d", "#d1fae5", IC.money, amsMoney(a.supportApproved), "Approved Support")}
      ${statCard("#2563eb", "#dbeafe", IC.doc, amsMoney(a.committed), "Committed (POs)")}
      ${statCard("#b45309", "#fef3c7", IC.pie, amsMoney(a.spent), "Spent")}
      ${statCard("#0f766e", "#ccfbf1", IC.shield, amsMoney(remaining), "Remaining")}
    </div>
    <div class="ams-card"><h3>Spending</h3>
      <div class="pbar"><i style="width:${a.supportApproved ? Math.min(100, a.spent / a.supportApproved * 100) : 0}%;background:#22c55e"></i></div>
      <div class="sub2 text-right">${a.supportApproved ? Math.round(a.spent / a.supportApproved * 100) : 0}% of approved support spent</div>
    </div>
    ${(a.requirements || []).length ? `<div class="ams-card"><h3>Applicant Requirements &amp; Costs</h3>
      <div class="sub2" style="margin:-6px 0 10px">Submitted by the applicant in their application form.</div>
      <table class="tbl"><thead><tr><th>Item</th><th>Type</th><th>Qty</th><th>Est. cost</th><th>Purpose</th></tr></thead><tbody>
      ${a.requirements.map(r => `<tr><td><b>${escA(r.rqItem)}</b></td><td>${escA(r.rqType)}</td>
        <td>${escA(r.rqQty || 1)}${r.rqUnit ? " " + escA(r.rqUnit) : ""}</td><td>${amsMoney((+r.rqCost || 0) * (+r.rqQty || 1))}</td>
        <td class="sub2">${escA(r.rqNote || "—")}</td></tr>`).join("")}
        <tr><td colspan="3"><b>Estimated total</b></td><td><b class="money-green">${amsMoney(a.budgetTotal)}</b></td><td></td></tr>
      </tbody></table>
    </div>` : ""}
    ${can("manage_financials") ? `<div class="ams-card"><h3>Update Financials</h3>
      <form id="finForm" class="inline-form">
        <div class="grid-2">
          <div><label>Approved Support ($)</label><input type="number" name="supportApproved" min="0" value="${a.supportApproved || 0}"></div>
          <div><label>Committed / POs ($)</label><input type="number" name="committed" min="0" value="${a.committed || 0}"></div>
          <div><label>Spent ($)</label><input type="number" name="spent" min="0" value="${a.spent || 0}"></div>
        </div>
        <button class="abtn sm" style="margin-top:10px">Save Financials</button>
      </form></div>` : ""}`;
  const f = $ams("#finForm", body);
  if (f) f.addEventListener("submit", (e) => {
    e.preventDefault();
    a.supportApproved = +f.supportApproved.value;
    a.committed = +f.committed.value;
    a.spent = +f.spent.value;
    touch(a, { icon: "pr", title: "Financials updated", desc: "Support figures updated" });
    saveAndReload(a);
  });
}

/* ----- Decisions tab (structured decisions drive the workflow) ----- */
const DECISION_TYPES = {
  advance: { label: "Approve — move to next stage", tpl: null },
  shortlist: { label: "Shortlist for interview / pitch", tpl: "shortlisted" },
  accept: { label: "Accept for support", tpl: "approved" },
  conditional: { label: "Accept with conditions", tpl: "approved" },
  revision: { label: "Request revision from applicant (reopens the form)", tpl: "revision" },
  hold: { label: "Put on hold", tpl: null },
  reject: { label: "Reject", tpl: "rejected" },
  closeOk: { label: "Close project — successful", tpl: "closure" },
  other: { label: "Other (record only)", tpl: null },
};
/* send a templated message to the applicant and log it */
function sendTemplate(a, tplKey, extra) {
  const t = MSG_TEMPLATES[tplKey];
  if (!t) return;
  const sub = (s) => s.replaceAll("{applicant}", a.applicantName || "Applicant").replaceAll("{project}", a.name);
  const rec = { appId: a.id, appName: a.name, to: a.applicantEmail || a.portalData?.email || "",
    subject: sub(t.subject), body: sub(t.body) + (extra ? "\n\nNote from KII: " + extra : ""), tpl: t.label, by: staff.name };
  amsLogMessage(rec);
  (a.messages = a.messages || []).unshift({ ...rec, date: new Date().toISOString() });
}
/* reopen the applicant's portal form so they can revise and resubmit */
function reopenPortalApplication(a, note) {
  const email = a.applicantEmail || a.portalData?.email;
  const app = email && KII.getApplication(email);
  if (!app) return false;
  app.submitted = false;
  app.status = "InProgress";
  app.revisionNote = note || "Please review and update your application.";
  KII.saveApplication(email, app);
  a.portalData = { ...(a.portalData || {}), submitted: false, revisionNote: app.revisionNote };
  return true;
}
function tabDecisions(a, body) {
  const evals = (a.evaluations || []).filter(e => e.total != null || e.score != null);
  const avg = evals.length ? (evals.reduce((s, e) => s + (e.total ?? e.score * 20), 0) / evals.length) : null;
  body.innerHTML = `
    <div class="ams-card">
      <div class="page-head-row"><h3 style="margin:0">Decisions</h3>
        ${can("make_decisions") ? `<button class="abtn sm" id="toggleDecForm">${IC.plus} Record Decision</button>` : ""}</div>
      ${avg != null ? `<div class="sub2" style="margin-top:6px">Evaluation summary: <b>${avg.toFixed(0)}/100</b> average from ${evals.length} evaluation(s) —
        <a href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=evaluations">view details</a></div>` : ""}
      <div id="decFormWrap" class="hidden" style="margin-top:12px">${can("make_decisions") ? `<form id="decForm" class="inline-form">
        <div class="grid-2">
          <div><label>Decision</label><select name="type">${Object.entries(DECISION_TYPES).map(([k, d]) => `<option value="${k}">${escA(d.label)}</option>`).join("")}</select></div>
          <div><label>Title (optional)</label><input name="decision" placeholder="Short summary of the decision"></div>
        </div>
        <label>Rationale / conditions / requested changes</label><textarea name="notes" rows="3" placeholder="Explain the reason. For revisions, tell the applicant exactly what to change."></textarea>
        <label class="inline-check"><input type="checkbox" name="notify" checked> Send the matching message to the applicant</label>
        <button class="abtn sm" style="margin-top:10px">Record Decision</button>
      </form>` : ""}</div>
      <table class="tbl"><thead><tr><th>Date</th><th>Decision</th><th>By</th><th>Rationale</th></tr></thead><tbody>
      ${(a.decisions || []).map(d => `<tr><td>${amsFmtDate(d.date)}</td><td><b>${escA(d.decision)}</b></td><td>${escA(d.by)}</td><td class="sub2">${escA(d.notes || "")}</td></tr>`).join("")
        || '<tr><td colspan="4"><div class="empty-state">No decisions recorded.</div></td></tr>'}
      </tbody></table>
    </div>`;
  const tg = $ams("#toggleDecForm", body);
  if (tg) tg.addEventListener("click", () => $ams("#decFormWrap", body).classList.toggle("hidden"));
  const f = $ams("#decForm", body);
  if (f) f.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = f.type.value, def = DECISION_TYPES[type], notes = f.notes.value.trim();
    if ((type === "revision" || type === "reject" || type === "conditional") && !notes) {
      alert("Please write the rationale / conditions / requested changes for this decision."); return;
    }
    const setStage = (s) => { a.stage = s; a.stageForced = s; };
    const idxOf = (s) => STAGES.indexOf(s);
    switch (type) {
      case "advance": amsAdvanceStage(a, staff.name); break;
      case "shortlist": setStage("Pitch Deck"); break;
      case "accept": case "conditional":
        a.outcome = "Supported"; a.status = "Active";
        if (idxOf(a.stage) < idxOf("Pitch Deck")) setStage("Pitch Deck");
        amsNotifyRole(STAGE_OWNER["Pitch Deck"], `"${a.name}" was accepted — prepare the pitch / support plan.`, `admin.html?v=applicant&id=${encodeURIComponent(a.id)}`);
        break;
      case "revision":
        if (!reopenPortalApplication(a, notes)) { alert("This applicant has no portal application to reopen."); return; }
        break;
      case "hold": a.status = "Inactive"; break;
      case "reject": a.outcome = "Rejected"; a.status = "Inactive"; break;
      case "closeOk": a.outcome = "Successful"; setStage("Investor / Stakeholder"); break;
    }
    const title = f.decision.value.trim() || def.label;
    (a.decisions = a.decisions || []).unshift({ date: new Date().toISOString(), type, decision: title, by: staff.name, notes });
    touch(a, { icon: "status", title: "Decision: " + title, desc: notes });
    if (f.notify.checked && def.tpl) sendTemplate(a, def.tpl, notes);
    saveAndReload(a);
  });
}

/* ----- Timeline tab ----- */
function tabTimeline(a, body) {
  const events = [
    ...(a.activities || []).map(x => ({ type: "note", date: x.date, title: x.title, desc: x.desc, by: x.by })),
    ...(a.meetings || []).map(m => ({ type: "meet", date: m.date, title: "Meeting: " + m.title, desc: (m.location || "") + (m.time ? " · " + m.time : ""), by: "" })),
    ...(a.decisions || []).map(d => ({ type: "dec", date: d.date, title: "Decision: " + d.decision, desc: d.notes || "", by: d.by })),
    ...(a.tasks || []).map(t => ({ type: "task", date: t.due, title: "Task: " + t.task, desc: (t.desc || "") + " — " + t.status, by: t.assignedTo })),
    ...(a.documents || []).map(d => ({ type: "doc", date: d.date, title: "Document: " + d.name, desc: d.file, by: "" })),
    ...(a.messages || []).map(m => ({ type: "note", date: m.date, title: "Message: " + m.subject, desc: "Sent to applicant", by: m.by })),
  ].sort((x, y) => new Date(x.date) - new Date(y.date));

  body.innerHTML = `
    ${workflowStepper(a)}
    <div class="ams-card"><h3>Project Timeline</h3>
      <div class="tl">
        ${events.map(e => `<div class="ev ${e.type}">
          <div class="et">${escA(e.title)}</div>
          <div class="ed">${escA(e.desc || "")}</div>
          <div class="em">${amsFmtDateTime(e.date)}${e.by ? " · " + escA(e.by) : ""}</div>
        </div>`).join("") || '<div class="empty-state">No events yet.</div>'}
      </div>
    </div>`;
}

/* ----- Communication tab ----- */
function tabCommunication(a, body) {
  const msgs = amsGetMessages().filter(m => m.appId === a.id);
  body.innerHTML = `
    <div class="ams-card ${readOnly ? "hidden" : ""}"><h3>Send Message to Applicant</h3>
      <div class="msg-tpl" id="tplBtns">
        ${Object.entries(MSG_TEMPLATES).map(([k, t], i) =>
          `<button type="button" data-tpl="${k}" class="${i === 0 ? "on" : ""}">${escA(t.label)}</button>`).join("")}
      </div>
      <form id="msgForm" class="inline-form">
        <label>Subject</label><input name="subject" required>
        <label>Message</label><textarea name="body" rows="7" required></textarea>
        <div class="sub2" style="margin-top:6px">Placeholders {applicant} and {project} are replaced automatically. Sending is recorded in the system (email delivery is simulated in this demo).</div>
        <button class="abtn sm" style="margin-top:10px">Send Message</button>
      </form>
    </div>
    <div class="ams-card"><h3>Message History</h3>
      <div class="msg-log">
        ${msgs.map(m => `<div class="mi"><b>${escA(m.subject)}</b>
          <div class="sub2">${amsFmtDateTime(m.date)} · by ${escA(m.by)} · template: ${escA(m.tpl || "custom")}</div>
          <div class="mm">${escA(m.body)}</div></div>`).join("")
          || '<div class="empty-state">No messages sent yet.</div>'}
      </div>
    </div>`;

  const fill = (tplKey) => {
    const t = MSG_TEMPLATES[tplKey];
    if (!t) return;
    const sub = (s) => s.replaceAll("{applicant}", a.applicantName || "Applicant").replaceAll("{project}", a.name);
    const f = $ams("#msgForm", body);
    f.subject.value = sub(t.subject);
    f.body.value = sub(t.body);
    f.dataset.tpl = tplKey;
  };
  fill(Object.keys(MSG_TEMPLATES)[0]);

  $$ams("#tplBtns button", body).forEach(b => b.addEventListener("click", () => {
    $$ams("#tplBtns button", body).forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    fill(b.dataset.tpl);
  }));

  $ams("#msgForm", body).addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const rec = { appId: a.id, appName: a.name, to: a.portalData?.email || a.applicantName || a.name,
      subject: f.subject.value, body: f.body.value, tpl: MSG_TEMPLATES[f.dataset.tpl]?.label, by: staff.name };
    amsLogMessage(rec);
    (a.messages = a.messages || []).unshift({ ...rec, date: new Date().toISOString() });
    touch(a, { icon: "note", title: "Message sent", desc: f.subject.value });
    // notify the assigned staff member too
    if (a.assignedToName) {
      const s = amsGetStaff().find(x => x.name === a.assignedToName);
      if (s && s.id !== staff.id) amsNotify(s.id, `Message sent to ${a.name}: "${f.subject.value}"`, `admin.html?v=applicant&id=${encodeURIComponent(a.id)}&tab=communication`);
    }
    saveAndReload(a);
  });
}

/* ----- Chat tab (team <-> applicant) ----- */
function tabChat(a, body) {
  const msgs = amsGetChat(a.id);
  body.innerHTML = `
    <div class="ams-card"><h3>Chat with Applicant ${a.applicantName ? `(${escA(a.applicantName)})` : ""}</h3>
      <div class="chat-box" id="chatBox">
        ${msgs.map(m => `<div class="chat-msg ${m.from === "staff" ? "mine" : "theirs"}">
          <div class="cm">${escA(m.text)}</div>
          <div class="cm-meta">${escA(m.name)} · ${amsFmtDateTime(m.date)}</div>
        </div>`).join("") || '<div class="empty-state">No messages yet — start the conversation.</div>'}
      </div>
      <form id="chatForm" class="${readOnly ? "hidden" : ""}" style="display:flex;gap:9px;margin-top:12px">
        <input name="text" placeholder="Write a message to the applicant…" required
          style="flex:1;padding:10px 14px;border:1px solid #d6dee6;border-radius:9px;font-family:inherit;font-size:.88rem">
        <button class="abtn">Send</button>
      </form>
      <div class="sub2" style="margin-top:8px">Messages appear instantly in the applicant's dashboard.</div>
    </div>`;
  const box = $ams("#chatBox", body);
  box.scrollTop = box.scrollHeight;
  $ams("#chatForm", body).addEventListener("submit", (e) => {
    e.preventDefault();
    amsPostChat(a.id, { from: "staff", name: staff.name + " (KII)", text: e.target.text.value.trim() });
    saveAndReload(a);
  });
}

/* ============ VIEW: MEETINGS (all) ============ */
function viewMeetings(el) {
  const rows = amsGetApplicants().flatMap(a => (a.meetings || [])
    .map(m => ({ ...m, appId: a.id, appName: a.name })))
    .sort((x, y) => new Date(x.date) - new Date(y.date));
  el.innerHTML = `
    <div class="page-title">Meetings</div>
    <div class="page-sub">All scheduled and past meetings across applicants</div>
    <div class="ams-card" style="padding:8px 20px"><table class="tbl"><thead><tr>
      <th>Applicant</th><th>Meeting</th><th>Date</th><th>Time</th><th>Location</th><th>Status</th><th></th>
    </tr></thead><tbody>
    ${rows.map(m => `<tr class="clickable" data-go="?v=applicant&id=${encodeURIComponent(m.appId)}&tab=meetings">
      <td><b>${escA(m.appName)}</b></td><td>${escA(m.title)}</td>
      <td>${amsFmtDate(m.date)}</td><td>${escA(m.time || "—")}</td>
      <td>${escA(m.location || "—")}</td><td>${chipStatus(m.status)}</td>
      <td class="act-dots">${IC.dots}</td>
    </tr>`).join("") || '<tr><td colspan="7"><div class="empty-state">No meetings.</div></td></tr>'}
    </tbody></table></div>`;
}

/* ============ VIEW: TASKS (all) ============ */
function viewTasks(el) {
  const filter = P.get("f") || "all";
  const fAssignee = P.get("who") || "";
  const all = allTasks().filter(t => !fAssignee || t.assignedTo === fAssignee);
  const counts = {
    all: all.length,
    open: all.filter(t => t.status === "Open").length,
    prog: all.filter(t => t.status === "In Progress").length,
    done: all.filter(t => t.status === "Completed").length,
  };
  const list = all.filter(t =>
    filter === "all" || (filter === "open" && t.status === "Open") ||
    (filter === "prog" && t.status === "In Progress") || (filter === "done" && t.status === "Completed"));

  /* tasks by assignee summary */
  const byAssignee = {};
  allTasks().forEach(t => {
    byAssignee[t.assignedTo] = byAssignee[t.assignedTo] || { open: 0, done: 0 };
    t.status === "Completed" ? byAssignee[t.assignedTo].done++ : byAssignee[t.assignedTo].open++;
  });
  const assignees = [...new Set(allTasks().map(t => t.assignedTo).filter(Boolean))];

  el.innerHTML = `
    <div class="page-head-row">
      <div><div class="page-title">Tasks / Follow-up</div>
      <div class="page-sub">All tasks across applicants</div></div>
      <a class="abtn blue sm" href="?v=applicants">${IC.plus} Add Task (choose applicant)</a>
    </div>

    ${(() => { const at = allTasks().filter(t => t.assignedTo === "Applicant");
      return at.length ? `<div class="ams-card"><h3>Tasks Sent to Applicants <span class="sub2">${at.filter(t => t.status !== "Completed").length} open</span></h3>
        <table class="tbl"><thead><tr><th>Task</th><th>Applicant</th><th>Assigned By</th><th>Due Date</th><th>Status</th></tr></thead><tbody>
        ${at.map(t => `<tr><td><b>${escA(t.task)}</b>${t.desc ? `<div class="sub2">${escA(t.desc)}</div>` : ""}
          ${t.response ? `<div class="sub2" style="color:#166e4a">response received${(t.response.files || []).length ? ` · ${t.response.files.length} file(s)` : ""}</div>` : ""}</td>
          <td><a href="?v=applicant&id=${encodeURIComponent(t.appId)}&tab=tasks">${escA(t.appName)}</a></td>
          <td>${escA(t.by || "—")}</td>
          <td>${daysUntil(t.due) < 0 && t.status !== "Completed" ? `<span style="color:#dc2626">${amsFmtDate(t.due)} (overdue)</span>` : amsFmtDate(t.due)}</td>
          <td>${chipStatus(t.status)}</td></tr>`).join("")}
        </tbody></table></div>` : ""; })()}

    <div class="ams-card"><h3>Tasks by Team Member</h3>
      <div class="filter-chips" style="margin:0">
        <button class="${!fAssignee ? "on" : ""}" data-go="?v=tasks">Everyone</button>
        ${assignees.map(n => `<button class="${fAssignee === n ? "on" : ""}"
          data-go="?v=tasks&who=${encodeURIComponent(n)}">${escA(n)}
          (${byAssignee[n].open} open / ${byAssignee[n].done} done)</button>`).join("")}
      </div>
    </div>

    <div class="ams-card">
      <div class="filter-chips">
        <button data-f="all" class="${filter === "all" ? "on" : ""}">All (${counts.all})</button>
        <button data-f="open" class="${filter === "open" ? "on" : ""}">Open (${counts.open})</button>
        <button data-f="prog" class="${filter === "prog" ? "on" : ""}">In Progress (${counts.prog})</button>
        <button data-f="done" class="${filter === "done" ? "on" : ""}">Completed (${counts.done})</button>
        <span class="spacer"></span>
        <button class="btn-filter">${IC.filter} Filter</button>
      </div>
      <table class="tbl"><thead><tr>
        <th style="width:26px"><input type="checkbox" id="chkAll"></th>
        <th>Task</th><th>Description</th><th>Applicant</th><th>Assigned To</th><th>Due Date</th><th>Status</th><th>Priority</th><th>Actions</th>
      </tr></thead><tbody>
      ${list.map(t => `<tr>
        <td><input type="checkbox" class="chk"></td>
        <td><b>${escA(t.task)}</b></td><td class="sub2">${escA(t.desc || "")}</td>
        <td><a href="?v=applicant&id=${encodeURIComponent(t.appId)}&tab=tasks">${escA(t.appName)}</a></td>
        <td>${t.assignedTo === "Applicant" ? '<span class="chip" style="background:#ede9fe;color:#5b21b6">Applicant</span>' : escA(t.assignedTo)}</td>
        <td>${daysUntil(t.due) < 0 && t.status !== "Completed" ? `<span style="color:#dc2626">${amsFmtDate(t.due)}</span>` : amsFmtDate(t.due)}</td>
        <td>${chipStatus(t.status)}</td><td>${chipPriority(t.priority)}</td>
        <td class="act-dots">${IC.dots}</td>
      </tr>`).join("") || '<tr><td colspan="9"><div class="empty-state">No tasks.</div></td></tr>'}
      </tbody></table>
    </div>`;
  $$ams(".filter-chips button[data-f]", el).forEach(b =>
    b.addEventListener("click", () => {
      const who = fAssignee ? "&who=" + encodeURIComponent(fAssignee) : "";
      go(`?v=tasks&f=${b.dataset.f}${who}`);
    }));
  const ca = $ams("#chkAll", el);
  if (ca) ca.addEventListener("change", () => $$ams(".chk", el).forEach(c => c.checked = ca.checked));
}

/* ============ VIEW: EVALUATIONS (all) ============ */
function viewEvaluations(el) {
  const apps = amsGetApplicants();
  const queue = apps.filter(a => a.stage === "Under Evaluation");
  const rows = apps.flatMap(a => (a.evaluations || [])
    .map(e => ({ ...e, appId: a.id, appName: a.name })))
    .sort((x, y) => new Date(y.date) - new Date(x.date));
  el.innerHTML = `
    <div class="page-title">Expert Evaluations</div>
    <div class="page-sub">Technical review queue and completed evaluations</div>

    <div class="ams-card"><h3>Awaiting Evaluation (${queue.length})</h3>
      <div class="sub2" style="margin:-6px 0 10px">Cases in the Under Evaluation stage — open one to submit your assessment.</div>
      <table class="tbl"><thead><tr><th>Applicant / Project</th><th>Sector</th><th>Assigned</th><th>Evaluations</th><th>Your status</th><th>Days waiting</th><th></th></tr></thead><tbody>
      ${queue.map(a => {
        const mine = (a.evaluations || []).find(e => e.staffId === staff.id);
        const n = (a.evaluations || []).filter(e => e.status === "Completed").length;
        return `<tr>
        <td><b>${escA(a.name)}</b><div class="sub2">${blindReview() ? "Applicant hidden (blind review)" : escA(a.applicantName || "")}</div></td>
        <td>${escA(a.sector)}</td><td>${escA(a.assignedToName || "—")}</td>
        <td>${n}</td>
        <td>${mine ? chipStatus(mine.status) : '<span class="chip chip-pending">To do</span>'}</td>
        <td>${amsDaysSince(a.lastActivity)}</td>
        <td><a class="abtn sm" href="?v=applicant&id=${encodeURIComponent(a.id)}&tab=evaluations">${mine ? "View" : "Review"}</a></td>
      </tr>`; }).join("") || '<tr><td colspan="7"><div class="empty-state">Queue is empty.</div></td></tr>'}
      </tbody></table>
    </div>

    <div class="ams-card" style="padding:8px 20px"><h3 style="padding:10px 0 4px">All Evaluations</h3><table class="tbl"><thead><tr>
      <th>Applicant</th><th>Expert</th><th>Date</th><th>Score</th><th>Status</th><th>Notes</th><th></th>
    </tr></thead><tbody>
    ${rows.map(e => `<tr>
      <td><a href="?v=applicant&id=${encodeURIComponent(e.appId)}&tab=evaluations"><b>${escA(e.appName)}</b></a></td>
      <td>${escA(e.expert)}</td><td>${amsFmtDate(e.date)}</td>
      <td>${evalTotal(e) != null ? `<b>${evalTotal(e)}/100</b>` : "—"}${e.recommendation ? `<div class="sub2">${escA(e.recommendation)}</div>` : ""}</td>
      <td>${chipStatus(e.status)}</td><td class="sub2">${escA(e.notes || "")}</td>
      <td class="act-dots">${IC.dots}</td>
    </tr>`).join("") || '<tr><td colspan="7"><div class="empty-state">No evaluations.</div></td></tr>'}
    </tbody></table></div>`;
}

/* ============ VIEW: PROCUREMENT (all) ============ */
function viewProcurement(el) {
  const rows = amsGetApplicants().flatMap(a => (a.procurement || [])
    .map(p => ({ ...p, appId: a.id, appName: a.name })));
  const pending = rows.filter(p => p.status === "Pending");
  const approved = rows.filter(p => p.status === "Approved");
  el.innerHTML = `
    <div class="page-title">Procurement</div>
    <div class="page-sub">Purchase requests across all applicants</div>
    <div class="stat-grid" style="grid-template-columns:repeat(3,1fr)">
      ${statCard("#b45309", "#fef3c7", IC.box, pending.length, "Pending PRs")}
      ${statCard("#15803d", "#d1fae5", IC.shield, approved.length, "Approved PRs")}
      ${statCard("#0f766e", "#ccfbf1", IC.money, amsMoney(pending.reduce((s, p) => s + p.amount, 0)), "Pending Value")}
    </div>
    <div class="ams-card" style="padding:8px 20px"><table class="tbl"><thead><tr>
      <th>PR #</th><th>Applicant</th><th>Title</th><th>Amount</th><th>Date</th><th>Status</th><th></th>
    </tr></thead><tbody>
    ${rows.map(p => `<tr class="clickable" data-go="?v=applicant&id=${encodeURIComponent(p.appId)}&tab=procurement">
      <td><b>${escA(p.id)}</b></td><td>${escA(p.appName)}</td><td>${escA(p.title)}</td>
      <td>${amsMoney(p.amount)}</td><td>${amsFmtDate(p.date)}</td><td>${chipStatus(p.status)}</td>
      <td class="act-dots">${IC.dots}</td>
    </tr>`).join("") || '<tr><td colspan="7"><div class="empty-state">No procurement requests.</div></td></tr>'}
    </tbody></table></div>`;
}

/* ============ VIEW: REPORTS ============ */
/* portfolio management metrics — aggregate KPI health across all evaluated innovators */
function portfolioBlock(apps) {
  const evald = apps.filter(a => (a.kpiSheets || []).length);
  if (!evald.length) return `
    <div class="ams-card"><h3>Portfolio Health (KPI)</h3>
      <div class="empty-state">No KPI evaluation sheets completed yet — portfolio metrics appear here once innovators are scored.</div></div>`;
  const lat = (a) => a.kpiSheets[0];
  const n = evald.length;
  const avg = Math.round(evald.reduce((s, a) => s + lat(a).pct, 0) / n);
  const goodN = evald.filter(a => lat(a).pct >= 60).length;
  const riskN = evald.filter(a => lat(a).pct < 40).length;
  const goodPct = Math.round(goodN / n * 100), riskPct = Math.round(riskN / n * 100);
  const dist = {};
  const stageDist = {};
  evald.forEach(a => {
    const r = (lat(a).rating || "?").split(" — ")[0];
    dist[r] = (dist[r] || 0) + 1;
    const st = lat(a).values?.v_a1_stage || "Not scored";
    stageDist[st] = (stageDist[st] || 0) + 1;
  });
  const sum = (k) => evald.reduce((s, a) => s + (+lat(a).values?.["v_" + k] || 0), 0);
  const scaled = evald.filter(a => lat(a).values?.v_a1_stage === "Scaling").length;
  const investReady = evald.filter(a => lat(a).pct >= 80).length;
  const tgt = (ok, text) => `<td class="text-right ${ok ? "kpi-ok" : "kpi-bad"}">${ok ? "✓" : "✗"} ${text}</td>`;
  return `
    <div class="grid-2col">
      <div class="ams-card"><h3>Portfolio Health (KPI Framework)</h3>
        <table class="tbl"><tbody>
          <tr><td>Innovators evaluated</td><td class="text-right"><b>${n}</b></td><td></td></tr>
          <tr><td>Average score</td><td class="text-right"><b>${avg}%</b></td>${tgt(avg > 60, "target &gt;60")}</tr>
          <tr><td>% Excellent / Good</td><td class="text-right"><b>${goodPct}%</b></td>${tgt(goodPct > 70, "target &gt;70%")}</tr>
          <tr><td>% At Risk / Critical</td><td class="text-right"><b>${riskPct}%</b></td>${tgt(riskPct < 15, "target &lt;15%")}</tr>
          <tr><td>Rating distribution</td><td colspan="2" class="text-right sub2">
            ${["Excellent", "Good", "Developing", "At Risk", "Critical"].map(r => `${r}: ${dist[r] || 0}`).join(" · ")}</td></tr>
          <tr><td>Development stage distribution</td><td colspan="2" class="text-right sub2">
            ${Object.entries(stageDist).map(([k, v]) => `${escA(k)}: ${v}`).join(" · ")}</td></tr>
        </tbody></table>
      </div>
      <div class="ams-card"><h3>Portfolio Impact <span class="sub2">(from latest KPI sheets)</span></h3>
        <table class="tbl"><tbody>
          <tr><td>Total innovators supported</td><td class="text-right"><b>${apps.length}</b></td></tr>
          <tr><td>Total beneficiaries reached</td><td class="text-right"><b>${sum("c1_direct").toLocaleString()}</b></td></tr>
          <tr><td>Total revenue generated</td><td class="text-right"><b>${amsMoney(sum("b2_revenue"))}</b></td></tr>
          <tr><td>Total jobs created</td><td class="text-right"><b>${sum("c3_jobs")}</b></td></tr>
          <tr><td>Innovations scaled (multi-site)</td><td class="text-right"><b>${scaled}</b></td></tr>
          <tr><td>Investment-ready innovations</td><td class="text-right"><b>${investReady}</b></td></tr>
        </tbody></table>
      </div>
    </div>`;
}

function viewReports(el) {
  const apps = amsGetApplicants();
  const support = apps.reduce((s, a) => s + (a.supportApproved || 0), 0);
  const spent = apps.reduce((s, a) => s + (a.spent || 0), 0);
  const byStage = STAGES.map(s => ({ label: s, value: apps.filter(a => a.stage === s).length, color: STAGE_COLORS[s] }));
  const sectorMap = {};
  apps.forEach(a => sectorMap[a.sector || "Other"] = (sectorMap[a.sector || "Other"] || 0) + 1);
  const secColors = ["#22c55e", "#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899", "#64748b"];
  const sectorSegs = Object.entries(sectorMap).map(([k, v], i) => ({ label: k, value: v, color: secColors[i % secColors.length] }));

  const tasks = allTasks();
  const decisions = apps.reduce((s, a) => s + (a.decisions || []).length, 0);
  const supportReq = {};
  apps.forEach(a => (a.supportRequested || []).forEach(s => supportReq[s] = (supportReq[s] || 0) + 1));
  const byAssignee = {};
  tasks.forEach(t => {
    byAssignee[t.assignedTo] = byAssignee[t.assignedTo] || { open: 0, overdue: 0, done: 0 };
    if (t.status === "Completed") byAssignee[t.assignedTo].done++;
    else { byAssignee[t.assignedTo].open++; if (daysUntil(t.due) < 0) byAssignee[t.assignedTo].overdue++; }
  });

  el.innerHTML = `
    <div class="page-head-row">
      <div><div class="page-title">Reports</div>
      <div class="page-sub">Program summary — generated ${amsFmtDate(new Date().toISOString())}</div></div>
      <div class="qa-row">
        <button class="abtn ghost sm" id="csvApps">${IC.doc} Applicants CSV</button>
        <button class="abtn ghost sm" id="csvTasks">${IC.doc} Tasks CSV</button>
        <button class="abtn ghost sm" id="csvEvals">${IC.doc} Evaluations CSV</button>
        <button class="abtn sm" onclick="window.print()">${IC.report} Print Report</button>
      </div>
    </div>
    <div class="grid-2col">
      <div class="ams-card"><h3>Applications by Stage</h3>${barChart(byStage)}</div>
      <div class="ams-card"><h3>Sector Distribution</h3>${donut(sectorSegs, apps.length, "Total")}</div>
    </div>
    <div class="grid-2col">
      <div class="ams-card"><h3>Financial Summary</h3>
        <table class="tbl"><tbody>
          <tr><td>Total approved support</td><td class="text-right"><b>${amsMoney(support)}</b></td></tr>
          <tr><td>Total spent</td><td class="text-right"><b>${amsMoney(spent)}</b></td></tr>
          <tr><td>Remaining</td><td class="text-right"><b class="money-green">${amsMoney(support - spent)}</b></td></tr>
          <tr><td>Utilization</td><td class="text-right"><b>${support ? Math.round(spent / support * 100) : 0}%</b></td></tr>
        </tbody></table>
      </div>
      <div class="ams-card"><h3>Key Numbers</h3>
        <table class="tbl"><tbody>
          <tr><td>Total applicants</td><td class="text-right"><b>${apps.length}</b></td></tr>
          <tr><td>Active projects</td><td class="text-right"><b>${apps.filter(a => a.status === "Active").length}</b></td></tr>
          <tr><td>Under evaluation</td><td class="text-right"><b>${apps.filter(a => a.stage === "Under Evaluation").length}</b></td></tr>
          <tr><td>Decisions recorded</td><td class="text-right"><b>${decisions}</b></td></tr>
          <tr><td>Open / overdue tasks</td><td class="text-right"><b>${tasks.filter(t => t.status !== "Completed").length} / ${tasks.filter(t => t.status !== "Completed" && daysUntil(t.due) < 0).length}</b></td></tr>
          <tr><td>Support requests</td><td class="text-right"><b>${Object.entries(supportReq).map(([k, v]) => `${k}: ${v}`).join(" · ") || "—"}</b></td></tr>
        </tbody></table>
      </div>
    </div>
    ${portfolioBlock(apps)}
    <div class="grid-2col">
      <div class="ams-card"><h3>Tasks by Team Member</h3>
        <table class="tbl"><thead><tr><th>Member</th><th>Open</th><th>Overdue</th><th>Completed</th></tr></thead><tbody>
        ${Object.entries(byAssignee).map(([n, c]) => `<tr><td><b>${escA(n)}</b></td><td>${c.open}</td><td>${c.overdue ? `<span style="color:#dc2626">${c.overdue}</span>` : 0}</td><td>${c.done}</td></tr>`).join("")
          || '<tr><td colspan="4"><div class="empty-state">No tasks.</div></td></tr>'}
        </tbody></table>
      </div>
      <div class="ams-card"><h3>Applicant Summary</h3>
        <table class="tbl"><thead><tr><th>Applicant</th><th>Sector</th><th>Stage</th><th>Progress</th><th>Approved</th><th>Spent</th></tr></thead><tbody>
        ${apps.map(a => `<tr><td><b>${escA(a.name)}</b></td><td>${escA(a.sector)}</td><td>${escA(a.stage)}</td><td>${a.progress}%</td><td>${amsMoney(a.supportApproved)}</td><td>${amsMoney(a.spent)}</td></tr>`).join("")}
        </tbody></table>
      </div>
    </div>`;

  $ams("#csvApps", el).addEventListener("click", () =>
    downloadCsv("kii-applicants.csv", [
      ["Applicant", "Project", "Sector", "Scope", "Stage", "Status", "Outcome", "Assigned To", "Applied", "Progress %", "Support Requested", "Approved $", "Spent $"],
      ...apps.map(a => [a.applicantName || "", a.name, a.sector, a.inScope ? "In scope" : "Out of scope",
        a.stage, a.status, a.outcome || "", a.assignedToName || "", amsFmtDate(a.appliedDate),
        a.progress, (a.supportRequested || []).join("; "), a.supportApproved || 0, a.spent || 0])]));

  $ams("#csvTasks", el).addEventListener("click", () =>
    downloadCsv("kii-tasks.csv", [
      ["Task", "Description", "Applicant", "Assigned To", "Due Date", "Status", "Priority"],
      ...tasks.map(t => [t.task, t.desc || "", t.appName, t.assignedTo, amsFmtDate(t.due), t.status, t.priority])]));

  $ams("#csvEvals", el).addEventListener("click", () => {
    const rows = apps.flatMap(a => (a.evaluations || []).map(e => [a.name, e.expert, amsFmtDate(e.date),
      evalTotal(e) ?? "", ...RUBRIC.map(c => e.scores?.[c.k] ?? ""), e.recommendation || "", e.status,
      [e.strengths, e.weaknesses, e.notes].filter(Boolean).join(" | ").replace(/\n/g, " ")]));
    downloadCsv("kii-evaluations.csv", [["Applicant", "Expert", "Date", "Total /100", ...RUBRIC.map(c => c.label + " (1-5)"),
      "Recommendation", "Status", "Comments"], ...rows]);
  });
}

/* ============ VIEW: DOCUMENTS (all) ============ */
function viewDocuments(el) {
  const apps = amsGetApplicants();
  const uploads = apps.flatMap(a => (a.uploads || []).map(u => ({ ...u, appId: a.id, appName: a.name, applicant: a.applicantName, date: a.appliedDate })));
  const rows = apps.flatMap(a => (a.documents || [])
    .map(d => ({ ...d, appId: a.id, appName: a.name })))
    .sort((x, y) => new Date(y.date) - new Date(x.date));
  el.innerHTML = `
    <div class="page-title">Documents</div>
    <div class="page-sub">Applicant uploads and staff documents across all applications</div>
    <div class="ams-card"><h3>Uploaded by Applicants (${uploads.length})</h3>
      <table class="tbl"><thead><tr>
      <th>Applicant</th><th>Project</th><th>Field</th><th>File</th><th>Size</th>
    </tr></thead><tbody>
    ${uploads.map(u => `<tr>
      <td><b>${escA(u.applicant || "—")}</b></td>
      <td><a href="?v=applicant&id=${encodeURIComponent(u.appId)}&tab=documents">${escA(u.appName)}</a></td>
      <td>${camelLbl(u._key)}</td>
      <td>${u.fileId ? `<a href="#" class="view-upload" data-fid="${escA(u.fileId)}" data-name="${escA(u.name)}">${escA(u.name)}</a>` : escA(u.name)}</td>
      <td class="sub2">${fmtBytes(u.size)}</td>
    </tr>`).join("") || '<tr><td colspan="5"><div class="empty-state">No applicant uploads yet.</div></td></tr>'}
    </tbody></table></div>
    <div class="ams-card"><h3>Staff Documents (${rows.length})</h3><table class="tbl"><thead><tr>
      <th>Document</th><th>Applicant</th><th>File</th><th>Date</th><th>Size</th>
    </tr></thead><tbody>
    ${rows.map(d => `<tr>
      <td><b>${escA(d.name)}</b></td><td><a href="?v=applicant&id=${encodeURIComponent(d.appId)}&tab=documents">${escA(d.appName)}</a></td>
      <td class="sub2">${escA(d.file)}</td><td>${amsFmtDate(d.date)}</td><td class="sub2">${escA(d.size || "—")}</td>
    </tr>`).join("") || '<tr><td colspan="5"><div class="empty-state">No staff documents.</div></td></tr>'}
    </tbody></table></div>`;
  bindUploadViewers(el);
}

/* ============ VIEW: TEAM & ROLES ============ */
function viewTeam(el) {
  const list = amsGetStaff();
  const canEdit = (s) =>
    s.id !== staff.id &&
    (s.role !== "master_admin" || staff.role === "master_admin");

  el.innerHTML = `
    <div class="page-title">Team &amp; Roles</div>
    <div class="page-sub">Manage staff accounts, roles and permissions. Restricted staff cannot sign in.</div>

    <div class="ams-card"><h3>Add Staff Member</h3>
      <form id="addStaffForm" class="inline-form">
        <div class="grid-2">
          <div><label>Full Name</label><input name="name" required></div>
          <div><label>Email</label><input type="email" name="email" required></div>
          <div><label>Temporary password</label><input type="password" name="password" required minlength="8" autocomplete="new-password">
            <div class="sub2" style="margin-top:3px">The staff member must change it at first sign-in.</div></div>
          <div><label>Job Title</label><input name="title" placeholder="e.g. Technical Engineer"></div>
          <div><label>Role</label><select name="role">
            ${Object.entries(ROLES).filter(([k]) => k !== "master_admin" || staff.role === "master_admin")
              .map(([k, r]) => `<option value="${k}">${r.label}</option>`).join("")}
          </select></div>
        </div>
        <button class="abtn sm" style="margin-top:10px">${IC.plus} Create Staff Account</button>
      </form>
    </div>

    <div class="ams-card"><h3>Staff Members (${list.length})</h3>
      ${list.map(s => {
        const editable = canEdit(s);
        return `<div class="team-row">
          <div class="head">
            <span class="avatar-sm">${escA(s.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase())}</span>
            <div style="flex:1;min-width:180px">
              <b>${escA(s.name)}</b> ${!s.active ? '<span class="chip chip-rejected">Restricted</span>' : '<span class="chip chip-active">Active</span>'}
              <div class="sub2">${escA(s.email)} · ${escA(s.title || ROLES[s.role]?.label || s.role)}</div>
            </div>
            ${editable ? `
              <select data-role-id="${s.id}">
                ${Object.entries(ROLES).filter(([k]) => k !== "master_admin" || staff.role === "master_admin")
                  .map(([k, r]) => `<option value="${k}" ${s.role === k ? "selected" : ""}>${r.label}</option>`).join("")}
              </select>
              <button class="abtn ${s.active ? "danger" : ""} sm" data-toggle="${s.id}">
                ${s.active ? "Restrict" : "Activate"}</button>
              <button class="abtn ghost sm" data-perms="${s.id}">Permissions</button>`
            : '<span class="sub2">(cannot edit)</span>'}
          </div>
          <div class="perm-grid hidden" id="perms-${s.id}">
            ${ALL_PERMS.map(p => `<label><input type="checkbox" data-staff="${s.id}" value="${p}"
              ${(s.perms || []).includes(p) ? "checked" : ""} ${editable ? "" : "disabled"}> ${PERM_LABELS[p]}</label>`).join("")}
          </div>
        </div>`;
      }).join("")}
    </div>`;

  $ams("#addStaffForm", el).addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (amsFindStaff(f.email.value.trim())) { alert("A staff account with this email already exists."); return; }
    const role = f.role.value;
    if (f.password.value.length < 8) { alert("Temporary password must be at least 8 characters."); return; }
    amsAddStaff({
      id: amsUid("st"), name: f.name.value.trim(), email: f.email.value.trim(),
      ...amsPwFields(f.password.value), mustChangePassword: true,
      role, title: f.title.value.trim() || ROLES[role].label,
      active: true, perms: [...ROLES[role].perms], createdAt: new Date().toISOString(),
    });
    amsAudit(staff.name, "Staff account created", `${f.name.value.trim()} <${f.email.value.trim()}> as ${ROLES[role].label}`);
    location.reload();
  });

  $$ams("[data-toggle]", el).forEach(b => b.addEventListener("click", () => {
    const s = amsGetStaff().find(x => x.id === b.dataset.toggle);
    if (!s) return;
    if (s.active && !confirm(`Restrict ${s.name}? They will not be able to sign in.`)) return;
    amsUpdateStaff(s.id, { active: !s.active });
    amsAudit(staff.name, s.active ? "Staff restricted" : "Staff activated", s.name);
    location.reload();
  }));

  $$ams("[data-perms]", el).forEach(b => b.addEventListener("click", () =>
    $ams("#perms-" + b.dataset.perms, el).classList.toggle("hidden")));

  $$ams("[data-role-id]", el).forEach(sel => sel.addEventListener("change", () => {
    const s = amsGetStaff().find(x => x.id === sel.dataset.roleId);
    if (!s) return;
    const title = !s.title || s.title === ROLES[s.role]?.label ? ROLES[sel.value].label : s.title;
    amsUpdateStaff(s.id, { role: sel.value, title, perms: [...ROLES[sel.value].perms] });
    amsAudit(staff.name, "Role changed", `${s.name}: ${ROLES[s.role]?.label} → ${ROLES[sel.value].label}`);
    location.reload();
  }));

  $$ams('input[type="checkbox"][data-staff]', el).forEach(cb => cb.addEventListener("change", () => {
    const s = amsGetStaff().find(x => x.id === cb.dataset.staff);
    if (!s) return;
    const perms = new Set(s.perms || []);
    cb.checked ? perms.add(cb.value) : perms.delete(cb.value);
    amsUpdateStaff(s.id, { perms: [...perms] });
    amsAudit(staff.name, cb.checked ? "Permission granted" : "Permission revoked", `${s.name}: ${PERM_LABELS[cb.value]}`);
  }));
}

/* ============ VIEW: SETTINGS ============ */
function viewSettings(el) {
  el.innerHTML = `
    <div class="page-title">Settings</div>
    <div class="page-sub">Your staff profile</div>
    ${staff.mustChangePassword ? `<div class="ams-card" style="border-left:4px solid #dc2626;background:#fef2f2">
      <b>Please set a new password.</b> For security, you must replace the temporary password before using the system.</div>` : ""}
    <div class="grid-2col">
      <div class="ams-card"><h3>Profile</h3>
        <table class="tbl"><tbody>
          <tr><td>Name</td><td><b>${escA(staff.name)}</b></td></tr>
          <tr><td>Email</td><td>${escA(staff.email)}</td></tr>
          <tr><td>Role</td><td>${escA(ROLES[staff.role]?.label || staff.role)}</td></tr>
          <tr><td>Title</td><td>${escA(staff.title || "—")}</td></tr>
        </tbody></table>
      </div>
      <div class="ams-card"><h3>Change Password</h3>
        <form id="pwForm" class="inline-form" style="margin:0">
          <div><label>New password</label><input type="password" name="pw" minlength="8" required autocomplete="new-password"></div>
          <div><label>Confirm</label><input type="password" name="pw2" required></div>
          <button class="abtn sm" style="margin-top:10px">Update Password</button>
        </form>
      </div>
    </div>
    <div class="ams-card"><h3>Your Permissions</h3>
      <div class="perm-grid">${(staff.perms || []).map(p => `<label>✓ ${PERM_LABELS[p] || p}</label>`).join("") || '<div class="empty-state">No permissions.</div>'}</div>
    </div>
    ${can("manage_staff") ? `<div class="ams-card"><h3>System Settings</h3>
      <form id="sysForm" class="inline-form" style="margin:0">
        <div class="grid-2">
          <div><label>Inactive applicant threshold (days)</label>
            <input type="number" name="inactiveDays" min="7" max="365" value="${amsGetSettings().inactiveDays}">
            <div class="sub2" style="margin-top:3px">Applicants with no activity for this many days are flagged as inactive and trigger alerts/reminders.</div></div>
          <div><label>Automatic reminders</label>
            <select name="reminders">
              <option value="true" ${amsGetSettings().reminders ? "selected" : ""}>Enabled</option>
              <option value="false" ${!amsGetSettings().reminders ? "selected" : ""}>Disabled</option></select></div>
          <div><label>Program call / cohort name</label>
            <input name="callName" value="${escA(amsGetSettings().callName)}" placeholder="e.g. KII Innovation Program 2026 Cohort">
            <div class="sub2" style="margin-top:3px">Shown to applicants on their dashboard.</div></div>
          <div><label>Application deadline</label>
            <input type="date" name="deadline" value="${escA(amsGetSettings().deadline)}">
            <div class="sub2" style="margin-top:3px">Leave empty for rolling applications. After this date applicants cannot submit.</div></div>
          <div><label>Blind review for expert evaluators</label>
            <select name="blindReview">
              <option value="false" ${!amsGetSettings().blindReview ? "selected" : ""}>Off — experts see applicant identity</option>
              <option value="true" ${amsGetSettings().blindReview ? "selected" : ""}>On — hide name, CV, photo, video &amp; references</option></select>
            <div class="sub2" style="margin-top:3px">Reduces bias. Applies to staff with the Evaluator / Expert role.</div></div>
        </div>
        <button class="abtn sm" style="margin-top:10px">Save Settings</button>
      </form></div>
      <div class="ams-card"><h3>System Audit Log <span class="sub2">(sign-ins, staff, roles, permissions, settings)</span></h3>
        <table class="tbl"><thead><tr><th>Date</th><th>By</th><th>Action</th><th>Detail</th></tr></thead><tbody>
        ${amsGetAudit().slice(0, 100).map(x => `<tr><td class="sub2">${amsFmtDateTime(x.date)}</td><td>${escA(x.by)}</td>
          <td><b>${escA(x.action)}</b></td><td class="sub2">${escA(x.detail)}</td></tr>`).join("")
          || '<tr><td colspan="4"><div class="empty-state">No entries yet.</div></td></tr>'}
        </tbody></table>
      </div>` : ""}`;
  $ams("#pwForm", el).addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (f.pw.value !== f.pw2.value) { alert("Passwords do not match."); return; }
    if (f.pw.value.length < 8 || !/[A-Za-z]/.test(f.pw.value) || !/\d/.test(f.pw.value)) { alert("Use at least 8 characters with letters and numbers."); return; }
    if (KII.checkPassword(staff, f.pw.value)) { alert("Please choose a password different from the current one."); return; }
    amsUpdateStaff(staff.id, { ...amsPwFields(f.pw.value), password: undefined, mustChangePassword: false });
    amsAudit(staff.name, "Password changed", "");
    alert("Password updated.");
    location.href = "?v=settings";
  });
  const sys = $ams("#sysForm", el);
  if (sys) sys.addEventListener("submit", (e) => {
    e.preventDefault();
    const next = { ...amsGetSettings(), inactiveDays: +sys.inactiveDays.value, reminders: sys.reminders.value === "true",
      callName: sys.callName.value.trim() || AMS_DEFAULT_SETTINGS.callName, deadline: sys.deadline.value,
      blindReview: sys.blindReview.value === "true" };
    amsSaveSettings(next);
    amsAudit(staff.name, "System settings changed",
      `Inactive ${next.inactiveDays}d · call "${next.callName}" · deadline ${next.deadline || "rolling"} · blind review ${next.blindReview ? "on" : "off"}`);
    alert("Settings saved.");
    location.reload();
  });
}

/* ---------- router ---------- */
const content = $ams("#amsContent");
const ROUTES = {
  dashboard: viewDashboard, applicants: viewApplicants, applicant: viewApplicant,
  meetings: viewMeetings, tasks: viewTasks, evaluations: viewEvaluations,
  procurement: viewProcurement, reports: viewReports, documents: viewDocuments,
  team: viewTeam, settings: viewSettings,
};
const VIEW_PERM = {
  applicants: "view_applicants", applicant: "view_applicants", meetings: "manage_meetings",
  tasks: "manage_tasks", evaluations: "evaluate", procurement: "manage_procurement",
  reports: "view_reports", documents: "view_applicants", team: "manage_staff",
};

/* safe row/button navigation (no inline JS with user-derived ids) */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-go]");
  if (t && !e.target.closest("a,button:not([data-go]),input,select,textarea")) location.href = t.dataset.go;
});
/* "Filter" buttons: quick text filter over the table in the same card */
document.addEventListener("click", (e) => {
  const b = e.target.closest(".btn-filter");
  if (!b) return;
  const card = b.closest(".ams-card");
  let inp = card.querySelector(".tbl-search");
  if (!inp) {
    inp = document.createElement("input");
    inp.className = "tbl-search"; inp.placeholder = "Type to filter rows…";
    b.closest(".filter-chips").after(inp);
    inp.addEventListener("input", () => {
      const q = inp.value.toLowerCase();
      card.querySelectorAll(".tbl tbody tr").forEach(r => r.style.display = fuzzyMatch(inp.value, r.textContent) ? "" : "none");
    });
  }
  inp.focus();
});

try { amsSyncPortal(); } catch (e) { console.error("Portal sync failed:", e); }
const needed = VIEW_PERM[view];
if (staff.mustChangePassword && view !== "settings") {
  location.href = "?v=settings&pw=1";
} else if (needed && !can(needed)) {
  content.innerHTML = `<div class="ams-card"><h3>Access restricted</h3>
    <div class="empty-state">Your role does not have permission to access this section.
    Contact the Application &amp; Administration Manager to request access.</div></div>`;
} else {
  (ROUTES[view] || viewDashboard)(content);
}
