/* ===== AMS data layer: staff, roles, permissions, applicants ===== */

const AMS = {
  STAFF_KEY: "kii_staff",
  SESSION_KEY: "kii_admin_session",
  APPS_KEY: "kii_ams_applicants",
  SEED_FLAG: "kii_ams_seeded_v1",
  CLEAN_FLAG: "kii_ams_clean_v1",
  NOTIF_KEY: "kii_ams_notifs",
  MSG_KEY: "kii_ams_messages",
  SET_KEY: "kii_ams_settings",
};

/* ---------- roles & permissions ---------- */
const ALL_PERMS = [
  "view_applicants", "edit_applicants", "manage_tasks", "manage_meetings",
  "evaluate", "manage_documents", "view_financials", "manage_financials",
  "manage_procurement", "make_decisions", "view_reports", "manage_staff",
];

const PERM_LABELS = {
  view_applicants: "View applicants",
  edit_applicants: "Edit applicant stage/status",
  manage_tasks: "Manage tasks & follow-up",
  manage_meetings: "Schedule meetings",
  evaluate: "Submit expert evaluations",
  manage_documents: "Manage documents",
  view_financials: "View financials",
  manage_financials: "Manage financial support",
  manage_procurement: "Manage procurement (PRs)",
  make_decisions: "Make committee decisions",
  view_reports: "View reports",
  manage_staff: "Manage staff & permissions",
};

const ROLES = {
  master_admin: { label: "Master Admin", perms: ALL_PERMS },
  admin_manager: {
    label: "Application & Administration Manager",
    perms: ["view_applicants", "edit_applicants", "manage_tasks", "manage_meetings",
      "evaluate", "manage_documents", "view_financials", "manage_financials",
      "manage_procurement", "view_reports", "manage_staff"],
  },
  ceo: {
    label: "CEO",
    perms: ["view_applicants", "view_financials", "view_reports", "make_decisions",
      "manage_meetings", "manage_tasks"],
  },
  technical_manager: {
    label: "Technical Manager",
    perms: ["view_applicants", "edit_applicants", "evaluate", "manage_tasks",
      "manage_meetings", "manage_documents", "view_reports"],
  },
  technical_engineer: {
    label: "Technical Engineer",
    perms: ["view_applicants", "evaluate", "manage_tasks", "manage_meetings", "manage_documents"],
  },
  business_coordinator: {
    label: "Business Coordinator",
    perms: ["view_applicants", "manage_tasks", "manage_meetings", "manage_documents"],
  },
  business_developer: {
    label: "Business Developer",
    perms: ["view_applicants", "manage_meetings", "manage_tasks", "view_reports"],
  },
  evaluator: {
    label: "Evaluator / Expert",
    perms: ["view_applicants", "evaluate"],
  },
  focal_point: {
    label: "Workshop / Focal Point",
    perms: ["view_applicants"], // read-only access to full project history
  },
};

/* ---------- workflow stages (approval chain) ---------- */
const STAGES = ["Submitted Form", "Under Evaluation", "Approval", "Pitch Deck",
  "Market Validation", "Prototype Development", "Investor / Stakeholder"];
const STAGE_COLORS = {
  "Submitted Form": "#3b82f6", "Under Evaluation": "#8b5cf6", "Approval": "#f59e0b",
  "Pitch Deck": "#a855f7", "Market Validation": "#2dd4bf",
  "Prototype Development": "#14b8a6", "Investor / Stakeholder": "#22c55e",
};
/* short explanation of each stage, shown to applicants on their dashboard */
const STAGE_INFO = {
  "Submitted Form": "Your application has been received and is awaiting review.",
  "Under Evaluation": "Your application is being reviewed and scored.",
  "Approval": "Your application is awaiting the final approval decision.",
  "Pitch Deck": "You have been invited to pitch your project.",
  "Market Validation": "KII is helping validate your market and business potential.",
  "Prototype Development": "Your project is in development — build and test your prototype.",
  "Investor / Stakeholder": "You are being connected with investors and stakeholders.",
};
/* migrate old stage names */
const STAGE_MIGRATE = {
  "Submitted": "Submitted Form", "Initial Review": "Under Evaluation",
  "Expert Evaluation": "Under Evaluation", "Evaluation": "Under Evaluation",
  "Interview / Pitch": "Pitch Deck", "CEO Approval": "Approval",
  "Team Action": "Market Validation", "Accepted": "Market Validation", "On Hold": "Market Validation",
  "Implementation": "Prototype Development", "Development": "Prototype Development",
  "Ongoing": "Investor / Stakeholder", "Closed": "Investor / Stakeholder",
};
/* which role is responsible at each stage (gets notified on advance) */
const STAGE_OWNER = {
  "Submitted Form": "admin_manager", "Under Evaluation": "technical_manager",
  "Approval": "ceo", "Pitch Deck": "admin_manager",
  "Market Validation": "business_developer", "Prototype Development": "technical_manager",
  "Investor / Stakeholder": "ceo",
};
/* outcome / final status labels */
const OUTCOMES = ["Successful", "Supported", "Rejected", "Withdrawn"];
const OUTCOME_COLORS = { "Successful": "#22c55e", "Supported": "#3b82f6", "Rejected": "#ef4444", "Withdrawn": "#64748b" };

/* default checklist items per stage */
const STAGE_CHECKLISTS = {
  "Submitted Form": ["Application received", "Documents complete", "Scope check done"],
  "Under Evaluation": ["Experts assigned (no conflict of interest)", "At least 2 evaluations submitted", "Scores reviewed"],
  "Approval": ["Decision made", "Applicant notified"],
  "Pitch Deck": ["Pitch scheduled", "Pitch held", "Panel feedback recorded"],
  "Market Validation": ["Market analysis completed", "Customer validation done", "Business model confirmed"],
  "Prototype Development": ["Prototype plan agreed", "Milestones set", "Prototype delivered & tested"],
  "Investor / Stakeholder": ["Investment readiness assessed", "Investor introductions made", "Final report archived"],
};

/* support types an applicant can request */
const SUPPORT_TYPES = ["Financial support", "Technical support", "Workshop support",
  "Equipment", "Software / subscriptions", "Mentorship", "Other"];

/* sectors considered inside KII scope (auto-categorization) */
const KII_SECTORS = ["Agriculture", "Energy", "Renewable Energy", "Water", "Health",
  "Education", "Automation", "Fashion", "Technology", "Computer and AI", "Health Tech", "Education Tech"];

/* email/message templates per trigger */
const MSG_TEMPLATES = {
  received: { label: "Application received", subject: "Your KII application was received",
    body: "Dear {applicant},\n\nThank you for submitting your application to the KII Innovation Program. Our team will review it shortly.\n\nBest regards,\nKII Team" },
  info_required: { label: "Additional information required", subject: "Additional information required – {project}",
    body: "Dear {applicant},\n\nDuring the review of your application “{project}”, we found that additional information is required. Please update your application at your earliest convenience.\n\nBest regards,\nKII Team" },
  meeting: { label: "Meeting invitation", subject: "Meeting invitation – {project}",
    body: "Dear {applicant},\n\nWe would like to invite you to a meeting regarding your project “{project}”. Details will follow.\n\nBest regards,\nKII Team" },
  rejected: { label: "Rejected", subject: "Update on your application – {project}",
    body: "Dear {applicant},\n\nThank you for your interest in the KII Innovation Program. After careful review, we are unable to move forward with your application “{project}” at this time.\n\nBest regards,\nKII Team" },
  task_reminder: { label: "Task reminder", subject: "Task reminder – {project}",
    body: "Dear {applicant},\n\nThis is a reminder that you have pending tasks related to your project “{project}”.\n\nBest regards,\nKII Team" },
  followup: { label: "Follow-up reminder", subject: "Follow-up – {project}",
    body: "Dear {applicant},\n\nWe are following up on your project “{project}”. Please let us know if you need any support.\n\nBest regards,\nKII Team" },
  shortlisted: { label: "Shortlisted for interview", subject: "You have been shortlisted – {project}",
    body: "Dear {applicant},\n\nCongratulations — your application “{project}” has been shortlisted. You are invited to present your project to the KII selection panel (a short pitch followed by questions). We will send the date, time and format shortly.\n\nBest regards,\nKII Team" },
  approved: { label: "Accepted for support", subject: "Your application has been accepted – {project}",
    body: "Dear {applicant},\n\nWe are pleased to inform you that your project “{project}” has been accepted into the KII Innovation Program. The KII team will contact you about the next steps, your support plan and your project milestones.\n\nBest regards,\nKII Team" },
  revision: { label: "Revision requested", subject: "Please update your application – {project}",
    body: "Dear {applicant},\n\nThank you for your application “{project}”. Before we can continue the review, we need you to update some parts of your application. Your application has been reopened — please sign in, make the requested changes and resubmit.\n\nBest regards,\nKII Team" },
  closure: { label: "Project closure", subject: "Project closure – {project}",
    body: "Dear {applicant},\n\nYour project “{project}” has reached the closure stage. Thank you for your work with the KII Innovation Program.\n\nBest regards,\nKII Team" },
};

/* ---------- staff store ---------- */
function amsGetStaff() {
  try { return JSON.parse(localStorage.getItem(AMS.STAFF_KEY)) || []; } catch { return []; }
}
function amsSaveStaff(list) { localStorage.setItem(AMS.STAFF_KEY, JSON.stringify(list)); }
function amsFindStaff(email) {
  return amsGetStaff().find(s => s.email.toLowerCase() === String(email).toLowerCase());
}
function amsAddStaff(s) { const l = amsGetStaff(); l.push(s); amsSaveStaff(l); }
function amsUpdateStaff(id, patch) {
  const l = amsGetStaff();
  const s = l.find(x => x.id === id);
  if (s) { Object.assign(s, patch); amsSaveStaff(l); }
  return s;
}

function amsPwFields(plain) { const p = KII.makePassword(plain); return { passHash: p.hash, passSalt: p.salt }; }

/* staff session (auto sign-out after 60 minutes of inactivity) */
const AMS_IDLE_MS = 60 * 60000;
let amsSessionExpired = false;
function amsStaffLogin(id) {
  localStorage.setItem(AMS.SESSION_KEY, id);
  localStorage.setItem(AMS.SESSION_KEY + "_seen", String(Date.now()));
}
function amsStaffLogout() { localStorage.removeItem(AMS.SESSION_KEY); localStorage.removeItem(AMS.SESSION_KEY + "_seen"); }
function amsCurrentStaff() {
  const id = localStorage.getItem(AMS.SESSION_KEY);
  if (!id) return null;
  const seen = +localStorage.getItem(AMS.SESSION_KEY + "_seen") || 0;
  if (Date.now() - seen > AMS_IDLE_MS) { amsStaffLogout(); amsSessionExpired = true; return null; }
  localStorage.setItem(AMS.SESSION_KEY + "_seen", String(Date.now()));
  return amsGetStaff().find(s => s.id === id) || null;
}

/* ---------- system audit log (staff/permission/settings changes) ---------- */
const AUDIT_KEY = "kii_ams_audit";
function amsAudit(by, action, detail) {
  let l = [];
  try { l = JSON.parse(localStorage.getItem(AUDIT_KEY)) || []; } catch { }
  l.unshift({ date: new Date().toISOString(), by, action, detail: detail || "" });
  localStorage.setItem(AUDIT_KEY, JSON.stringify(l.slice(0, 2000)));
}
function amsGetAudit() { try { return JSON.parse(localStorage.getItem(AUDIT_KEY)) || []; } catch { return []; } }
function amsRequireStaff() {
  const s = amsCurrentStaff();
  if (!s || !s.active) {
    const expired = amsSessionExpired;
    window.location.href = "admin-login.html" + (expired ? "?expired=1" : "");
    throw new Error("Not signed in"); // stop the page script
  }
  return s;
}
function amsCan(staff, perm) {
  return !!(staff && staff.active && (staff.perms || []).includes(perm));
}

/* ---------- applicants store ---------- */
function amsGetApplicants() {
  let list = [];
  try { list = JSON.parse(localStorage.getItem(AMS.APPS_KEY)) || []; } catch { }
  // migrate old stage names + fill new fields
  list.forEach(a => {
    if (STAGE_MIGRATE[a.stage]) a.stage = STAGE_MIGRATE[a.stage];
    if (!STAGES.includes(a.stage)) a.stage = "Submitted Form";
    if (a.stageForced && STAGE_MIGRATE[a.stageForced]) a.stageForced = STAGE_MIGRATE[a.stageForced];
    if (!a.kpis) a.kpis = { technical: 0, business: 0, market: 0, team: 0 };
    if (!a.checklist) a.checklist = {};
    if (!a.supportRequested) a.supportRequested = [];
    if (!a.messages) a.messages = [];
    if (a.inScope === undefined) a.inScope = KII_SECTORS.includes(a.sector);
  });
  return list;
}
function amsSaveApplicants(list) { localStorage.setItem(AMS.APPS_KEY, JSON.stringify(list)); }
function amsGetApplicant(id) { return amsGetApplicants().find(a => a.id === id); }
function amsUpdateApplicant(id, patch) {
  const l = amsGetApplicants();
  const a = l.find(x => x.id === id);
  if (a) { Object.assign(a, patch); amsSaveApplicants(l); }
  return a;
}
function amsTouch(id, activity) {
  const l = amsGetApplicants();
  const a = l.find(x => x.id === id);
  if (a) {
    a.lastActivity = new Date().toISOString();
    if (activity) (a.activities = a.activities || []).unshift({
      date: new Date().toISOString(), ...activity,
    });
    amsSaveApplicants(l);
  }
  return a;
}

/* flatten every uploaded file found in application data (any nesting depth) */
function amsCollectUploads(data) {
  const out = [];
  (function walk(o) {
    if (!o || typeof o !== "object") return;
    if (o.files && typeof o.files === "object")
      for (const [key, meta] of Object.entries(o.files))
        if (meta && meta.name) out.push({ _key: key, ...meta });
    Object.values(o).forEach(walk);
  })(data);
  return out;
}

/* pull real portal applicants into the AMS store */
function amsSyncPortal() {
  const list = amsGetApplicants();
  let changed = false;
  const users = KII.getUsers();
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k || !k.startsWith("kii_app_")) continue;
    const email = k.slice("kii_app_".length);
    const user = users.find(u => String(u.email).toLowerCase() === email.toLowerCase());
    const app = KII.getApplication(email);
    if (!user || !app) continue;

    const id = "portal:" + email;
    const fullName = [user.firstName, user.secondName, user.thirdName].filter(Boolean).join(" ");
    const projTitle = app.data?.supporting?.title || fullName + "'s Project";
    const stage = "Submitted Form";
    const progress = app.submitted ? 5 : Math.round(((app.completedSections || []).length / 14) * 5);
    const location = app.data?.personal?.city && app.data?.personal?.country
      ? app.data.personal.city + ", " + app.data.personal.country : "—";

    const reqList = app.data?.supporting?.requirements || [];
    const budgetTotal = reqList.reduce((s, r) => s + ((+r.rqCost || 0) * (+r.rqQty || 1)), 0);
    // full application copy for staff viewing — strip any inline file bytes (they live in IndexedDB)
    const appCopy = JSON.parse(JSON.stringify(app.data || {}, (k, v) => k === "dataUrl" ? undefined : v));
    const extras = {
      requirements: reqList,
      budgetTotal,
      innovationPoint: app.data?.supporting?.innovationPoint || "",
      businessPotential: app.data?.supporting?.businessPotential || "",
      businessDetail: app.data?.supporting?.businessDetail || "",
      applicantEmail: email,
      applicantOrg: user.organization || "",
      applicantPhone: app.data?.personal ? (app.data.personal.phoneCode || "") + " " + (app.data.personal.phone || "") : user.phone,
      application: appCopy,
      uploads: amsCollectUploads(app.data),
    };

    const existing = list.find(a => a.id === id);
    const justSubmitted = app.submitted && !(existing && existing.portalData?.submitted);
    const pd = { email, submitted: !!app.submitted, category: app.category,
      revisionNote: app.revisionNote || "", withdrawn: app.status === "Withdrawn",
      declarations: app.declarations || null, submittedAt: app.submittedAt || null,
      resubmittedAt: app.resubmittedAt || null };
    if (existing) {
      existing.name = projTitle;
      existing.applicantName = fullName;
      existing.sector = app.data?.supporting?.category || app.category;
      existing.location = location;
      existing.stage = existing.stageForced || stage;
      // once staff take over the case, their progress/status values win
      if (!existing.stageForced) {
        existing.progress = Math.max(existing.progress || 0, progress);
        existing.status = app.status === "Inactive" ? "Inactive" : "Active";
      }
      existing.appliedDate = app.submittedAt || app.startedAt;
      Object.assign(existing, extras);
      if (app.status === "Withdrawn" && !existing.portalData?.withdrawn) {
        existing.outcome = "Withdrawn";
        existing.status = "Inactive";
        existing.lastActivity = new Date().toISOString();
        (existing.activities = existing.activities || []).unshift({ date: existing.lastActivity, icon: "status",
          title: "Application withdrawn by applicant", desc: app.withdrawReason ? "Reason: " + app.withdrawReason : "No reason given.", by: "Applicant" });
        ["master_admin", "admin_manager"].forEach(r => amsNotifyRole(r, `"${projTitle}" was withdrawn by ${fullName}.`,
          `admin.html?v=applicant&id=${encodeURIComponent(id)}`));
      }
      existing.portalData = { ...pd };
      changed = true;
    } else {
      list.push({
        id, portal: true,
        name: projTitle, applicantName: fullName,
        tagline: app.data?.supporting?.explain?.slice(0, 80) || "Applicant project",
        sector: app.data?.supporting?.category || app.category || "Other",
        location,
        appliedDate: app.submittedAt || app.startedAt, lastActivity: app.startedAt,
        status: "Active", stage, progress,
        supportApproved: 0, spent: 0, committed: 0,
        kpis: { technical: 0, business: 0, market: 0, team: 0 },
        activities: [{ date: app.startedAt, icon: "doc", title: "Application started",
          desc: "Applicant began their application (" + (app.category || "") + ").", by: "Portal" }],
        meetings: [], tasks: [], evaluations: [], documents: [], procurement: [], decisions: [],
        ...extras,
        portalData: { ...pd },
      });
      changed = true;
    }
    if (justSubmitted) {
      const rec = list.find(a => a.id === id);
      const re = !!(app.revisionHistory || []).length;
      rec.lastActivity = new Date().toISOString();
      (rec.activities = rec.activities || []).unshift({ date: rec.lastActivity, icon: "doc",
        title: re ? "Application resubmitted after revision" : "Application submitted",
        desc: `${fullName} ${re ? "resubmitted" : "submitted"} "${projTitle}".`, by: "Applicant" });
      const link = `admin.html?v=applicant&id=${encodeURIComponent(id)}&tab=application`;
      const owners = ["master_admin", "admin_manager"];
      owners.forEach(r => amsNotifyRole(r, `${re ? "Revised application resubmitted" : "New application submitted"}: "${projTitle}" by ${fullName}`, link));
      const assignee = rec.assignedToName && amsGetStaff().find(s => s.name === rec.assignedToName);
      if (re && assignee && !owners.includes(assignee.role)) amsNotify(assignee.id, `Revised application resubmitted: "${projTitle}"`, link);
    }
  }
  if (changed) amsSaveApplicants(list);
  return list;
}

/* ---------- seed data ---------- */
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString(); }
function daysAhead(n) { return daysAgo(-n); }

function seedStaff() {
  if (amsGetStaff().length) return;
  const mk = (name, email, pass, role, title) => ({
    id: "st_" + Math.random().toString(36).slice(2, 9),
    name, email, ...amsPwFields(pass), mustChangePassword: true, role, title,
    active: true, perms: [...ROLES[role].perms],
    createdAt: new Date().toISOString(),
  });
  amsSaveStaff([
    mk("Master Admin", "admin@kii.org", "admin123", "master_admin", "Master Administrator"),
  ]);
}


/* ---------- helpers ---------- */
function amsDaysSince(iso) {
  if (!iso) return 999;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}
function amsFmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
function amsFmtDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) +
    "  " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}
function amsMoney(n) {
  return "$" + Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
}
function amsUid(p) { return (p || "x") + "_" + Math.random().toString(36).slice(2, 9); }

/* ---------- notifications ---------- */
function amsGetNotifs() {
  try { return JSON.parse(localStorage.getItem(AMS.NOTIF_KEY)) || []; } catch { return []; }
}
function amsSaveNotifs(l) { localStorage.setItem(AMS.NOTIF_KEY, JSON.stringify(l)); }
function amsNotify(staffId, text, link) {
  const l = amsGetNotifs();
  l.unshift({ id: amsUid("n"), staffId, text, link: link || "", date: new Date().toISOString(), read: false });
  amsSaveNotifs(l);
}
function amsNotifyRole(role, text, link) {
  amsGetStaff().filter(s => s.active && s.role === role)
    .forEach(s => amsNotify(s.id, text, link));
}
function amsNotifsFor(staffId) { return amsGetNotifs().filter(n => n.staffId === staffId); }
function amsUnreadCount(staffId) { return amsNotifsFor(staffId).filter(n => !n.read).length; }
function amsMarkRead(id) {
  const l = amsGetNotifs();
  const n = l.find(x => x.id === id);
  if (n) { n.read = true; amsSaveNotifs(l); }
}

/* ---------- chat (applicant <-> team) ---------- */
const CHAT_KEY = "kii_ams_chat";
function amsGetChat(appId) {
  try { return (JSON.parse(localStorage.getItem(CHAT_KEY)) || {})[appId] || []; }
  catch { return []; }
}
function amsPostChat(appId, msg) {
  let all = {};
  try { all = JSON.parse(localStorage.getItem(CHAT_KEY)) || {}; } catch { }
  (all[appId] = all[appId] || []).push({ id: amsUid("c"), date: new Date().toISOString(), ...msg });
  localStorage.setItem(CHAT_KEY, JSON.stringify(all));
}

/* ---------- message log (simulated email) ---------- */
function amsGetMessages() {
  try { return JSON.parse(localStorage.getItem(AMS.MSG_KEY)) || []; } catch { return []; }
}
function amsLogMessage(m) {
  const l = amsGetMessages();
  l.unshift({ id: amsUid("msg"), date: new Date().toISOString(), ...m });
  localStorage.setItem(AMS.MSG_KEY, JSON.stringify(l));
}

/* ---------- AMS settings ---------- */
const AMS_DEFAULT_SETTINGS = { inactiveDays: 60, reminders: true, callName: "KII Innovation Program", deadline: "", blindReview: false };
function amsGetSettings() {
  try { return { ...AMS_DEFAULT_SETTINGS, ...(JSON.parse(localStorage.getItem(AMS.SET_KEY)) || {}) }; }
  catch { return { ...AMS_DEFAULT_SETTINGS }; }
}
function amsSaveSettings(s) { localStorage.setItem(AMS.SET_KEY, JSON.stringify(s)); }

/* ---------- workflow helpers ---------- */
function amsNextStage(stage) {
  const i = STAGES.indexOf(stage);
  return i >= 0 && i < STAGES.length - 1 ? STAGES[i + 1] : null;
}
function amsStageOwner(stage) { return STAGE_OWNER[stage] || null; }
function amsAdvanceStage(app, byName) {
  const next = amsNextStage(app.stage);
  if (!next) return null;
  app.stage = next;
  app.stageForced = next;
  (app.activities = app.activities || []).unshift({
    date: new Date().toISOString(), icon: "status",
    title: "Stage advanced", desc: `Moved to “${next}”`, by: byName,
  });
  app.lastActivity = new Date().toISOString();
  const owner = amsStageOwner(next);
  if (owner) amsNotifyRole(owner, `Case "${app.name}" moved to ${next} — action required.`, `admin.html?v=applicant&id=${encodeURIComponent(app.id)}`);
  return next;
}

/* checklist accessor */
function amsChecklist(app) {
  const def = STAGE_CHECKLISTS[app.stage] || [];
  const saved = app.checklist?.[app.stage] || [];
  return def.map((label, i) => ({ label, done: !!saved[i] }));
}

/* one-time cleanup: remove demo staff/applicants seeded by earlier versions */
function amsCleanupDemoData() {
  if (localStorage.getItem(AMS.CLEAN_FLAG)) return;
  const SEED_EMAILS = ["manager@kii.org", "ceo@kii.org", "huda@kii.org",
    "shary@kii.org", "workshop@kii.org", "expert@kii.org"];
  amsSaveStaff(amsGetStaff().filter(s => !SEED_EMAILS.includes(s.email)));
  if (!amsFindStaff("admin@kii.org"))
    amsAddStaff({ id: "st_" + Math.random().toString(36).slice(2, 9),
      name: "Master Admin", email: "admin@kii.org", ...amsPwFields("admin123"), mustChangePassword: true,
      role: "master_admin", title: "Master Administrator",
      active: true, perms: [...ROLES.master_admin.perms], createdAt: new Date().toISOString() });

  const kept = amsGetApplicants().filter(a => String(a.id).startsWith("portal:"));
  const removedIds = new Set(amsGetApplicants().filter(a => !String(a.id).startsWith("portal:")).map(a => a.id));
  amsSaveApplicants(kept);
  if (removedIds.size) {
    try {
      const chats = JSON.parse(localStorage.getItem(CHAT_KEY)) || {};
      removedIds.forEach(id => delete chats[id]);
      localStorage.setItem(CHAT_KEY, JSON.stringify(chats));
      const msgs = amsGetMessages().filter(m => !removedIds.has(m.appId));
      localStorage.setItem(AMS.MSG_KEY, JSON.stringify(msgs));
    } catch { }
  }
  localStorage.setItem(AMS.CLEAN_FLAG, "1");
}

function amsInit() {
  amsCleanupDemoData();
  seedStaff();
  amsSyncPortal();
}
