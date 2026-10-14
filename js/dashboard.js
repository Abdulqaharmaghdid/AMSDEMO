/* ===== Dashboard logic ===== */

const user = KII.requireAuth();
if (user) {
  document.getElementById("userName").textContent =
    user.firstName + " " + user.secondName + " " + user.thirdName;

  document.getElementById("logoutLink").addEventListener("click", (e) => {
    e.preventDefault();
    KII.logout();
    window.location.href = "index.html";
  });

  const CATEGORIES = [
    { id: "education", name: "Education", icon: "🎓" },
    { id: "health", name: "Health", icon: "⚕️" },
    { id: "renewable", name: "Renewable Energy", icon: "☀️" },
    { id: "automation", name: "Automation", icon: "⚙️" },
    { id: "fashion", name: "Fashion", icon: "👗" },
  ];

  let app = KII.getApplication(user.email);
  let chosenCategory = null;

  const catGrid = document.getElementById("catGrid");
  catGrid.innerHTML = CATEGORIES.map(c => `
    <button type="button" class="cat-card" data-id="${c.id}">
      <span class="cat-icon">${c.icon}</span>
      <span class="cat-name">${c.name}</span>
    </button>`).join("");

  catGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".cat-card");
    if (!card) return;
    catGrid.querySelectorAll(".cat-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    chosenCategory = card.dataset.id;
    document.getElementById("startBtn").disabled = false;
  });

  document.getElementById("startBtn").addEventListener("click", () => {
    if (!chosenCategory) return;
    const cat = CATEGORIES.find(c => c.id === chosenCategory);
    app = {
      category: cat.name,
      startedAt: new Date().toISOString(),
      status: "InProgress",
      season: KII.reviewSeason(),
      submitted: false,
      currentSection: "instruction",
      completedSections: [],
      data: {},
    };
    KII.saveApplication(user.email, app);
    render();
  });

  const STATUS_BADGE = {
    "InProgress": "badge-progress",
    "Done": "badge-done",
    "Inactive": "badge-inactive",
    "Delay": "badge-delay",
  };

  const STATUS_LABEL = { InProgress: "In Progress", Done: "Submitted", Inactive: "Inactive", Delay: "Delayed" };

  function countCompleted(a) {
    return (a.completedSections || []).length;
  }

  function render() {
    const has = !!app;
    document.getElementById("categoryCard").classList.toggle("hidden", has);
    document.getElementById("appCard").classList.toggle("hidden", !has);
    if (!has) return;

    document.getElementById("dApplicant").textContent =
      user.firstName + " " + user.secondName + " " + user.thirdName;
    document.getElementById("dCategory").textContent = app.category;
    document.getElementById("dStarted").textContent = KII.fmtDate(app.startedAt);

    const st = document.getElementById("dStatus");
    const withdrawn = app.status === "Withdrawn";
    const revision = !app.submitted && !!app.revisionNote;
    st.textContent = withdrawn ? "Withdrawn" : revision ? "Revision requested" :
      STATUS_LABEL[app.status] || app.status;
    st.className = "badge " + (withdrawn ? "badge-inactive" : revision ? "badge-delay" : STATUS_BADGE[app.status] || "badge-inactive");

    document.getElementById("dSeason").textContent = app.season || KII.reviewSeason();
    renderTracker();

    const done = countCompleted(app);
    const total = 14;
    const pct = app.submitted ? 100 : Math.min(100, Math.round((done / total) * 100));
    document.getElementById("progressFill").style.width = pct + "%";
    document.getElementById("dCompletion").textContent = pct + "%";
    document.getElementById("progressLabel").textContent =
      withdrawn ? "You withdrew this application." :
      app.submitted ? "Application submitted — under review."
        : done + " of " + total + " sections completed.";

    /* notices: revision request, call deadline */
    const ps = KII.programSettings();
    const notes = [];
    if (revision) notes.push(`<div class="alert alert-info"><strong>KII requested changes to your application:</strong><br>${escHtml(app.revisionNote)}<br>
      Open your application, update the requested sections and resubmit.</div>`);
    if (ps.deadline && !app.submitted && !withdrawn) notes.push(KII.deadlinePassed()
      ? `<div class="alert alert-error">The deadline for ${escHtml(ps.callName || "this call")} (${KII.fmtDate(ps.deadline)}) has passed. Submissions are closed.</div>`
      : `<div class="alert alert-info">Submission deadline for ${escHtml(ps.callName || "this call")}: <strong>${KII.fmtDate(ps.deadline)}</strong>.</div>`);
    document.getElementById("noticeBox").innerHTML = notes.join("");

    const cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.textContent = app.submitted ? "Withdraw Application" : "Cancel Application";
    cancelBtn.classList.toggle("hidden", withdrawn);
    document.getElementById("openBtn").textContent = app.submitted || withdrawn ? "View Application" : "Open Application";
  }

  document.getElementById("openBtn").addEventListener("click", () => {
    window.open("application.html", "_blank");
  });

  document.getElementById("cancelBtn").addEventListener("click", () => {
    if (app.submitted) {
      // submitted applications are kept for the record — mark as withdrawn instead of deleting
      const reason = prompt("Withdraw your application? The KII team will be informed.\n\nReason (optional):", "");
      if (reason === null) return;
      app.status = "Withdrawn";
      app.submitted = false;
      app.withdrawnAt = new Date().toISOString();
      app.withdrawReason = reason;
      KII.saveApplication(user.email, app);
      render();
      return;
    }
    if (!confirm("Cancel this application? All entered data will be removed.")) return;
    KII.deleteApplication(user.email);
    app = null;
    chosenCategory = null;
    catGrid.querySelectorAll(".cat-card").forEach(c => c.classList.remove("selected"));
    document.getElementById("startBtn").disabled = true;
    render();
  });

  /* ===== progress tracking, tasks, notifications, chat ===== */
  const escHtml = s => String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const recId = "portal:" + String(user.email).toLowerCase();

  function getRec() {
    try { amsSyncPortal(); } catch { }
    return amsGetApplicants().find(x => x.id === recId) || null;
  }

  function renderTracker() {
    const wrap = document.getElementById("trackerWrap");
    const rec = app && getRec();
    wrap.classList.toggle("hidden", !rec);
    if (!rec) return;

    // --- stage stepper ---
    const idx = Math.max(0, STAGES.indexOf(rec.stage));
    document.getElementById("stageStepper").innerHTML = STAGES.map((s, i) => `
      <div class="step ${i < idx ? "done" : ""} ${i === idx ? "active" : ""}">
        <div class="sdot">${i < idx ? "✓" : i + 1}</div>
        <div class="slab">${s}</div>
      </div>${i < STAGES.length - 1 ? '<div class="sline"></div>' : ""}`).join("");
    const stg = document.getElementById("dStage");
    stg.textContent = rec.stage + (STAGE_INFO[rec.stage] ? " — " + STAGE_INFO[rec.stage] : "");
    stg.style.color = STAGE_COLORS[rec.stage] || "";
    stg.style.fontWeight = "600";
    document.getElementById("dOutcome").textContent = rec.outcome || "—";
    if (rec.outcome) document.getElementById("dOutcome").style.color = OUTCOME_COLORS[rec.outcome] || "";

    // --- milestones & progress reports ---
    const ms = rec.milestones || [];
    document.getElementById("msCard").classList.toggle("hidden", !ms.length);
    document.getElementById("msList").innerHTML = ms.map(m => {
      const canReport = m.status === "Planned" || m.status === "Revision needed";
      return `<div class="ms-line">
        <div class="ms-head"><b>${escHtml(m.title)}</b>
          <span class="tbadge ${m.status === "Approved" ? "done" : ""}">${escHtml(m.status)}</span></div>
        <div class="sub2">Due ${KII.fmtDate(m.due)}${m.tranche ? " · Tranche $" + Number(m.tranche).toLocaleString() : ""}${m.deliverable ? " · Evidence: " + escHtml(m.deliverable) : ""}</div>
        ${m.reviewNote ? `<div class="alert alert-info" style="margin:8px 0 0">KII feedback: ${escHtml(m.reviewNote)}</div>` : ""}
        ${m.report ? `<div class="sub2" style="margin-top:6px"><i>Your report (${KII.fmtDate(m.report.date)}):</i> ${escHtml(m.report.text)}</div>` : ""}
        ${canReport ? `<form class="ms-form" data-ms="${escHtml(m.id)}">
          <textarea name="text" required placeholder="What did you achieve? Include results, evidence links and any problems."></textarea>
          <button class="btn btn-sm">Submit progress report</button></form>` : ""}
      </div>`;
    }).join("");

    // --- tasks assigned to applicant ---
    const myTasks = (rec.tasks || []).filter(t => t.assignedTo === "Applicant");
    document.getElementById("taskList").innerHTML = myTasks.length
      ? myTasks.map(t => `<div class="task-item">
          <label class="task-line ${t.status === "Completed" ? "done" : ""}">
            <input type="checkbox" data-task="${t.id}" ${t.status === "Completed" ? "checked" : ""}>
            <span class="tt">${escHtml(t.task)}</span>
            ${t.desc ? `<span class="td">${escHtml(t.desc)}</span>` : ""}
            <span class="tbadge ${t.status === "Completed" ? "done" : ""}">${t.status}</span>
            <span class="tdue">Due ${KII.fmtDate(t.due)}</span>
          </label>
          ${t.response ? `<div class="task-resp">
              <div class="sub2"><b>Your response</b> · ${KII.fmtDate(t.response.date)}</div>
              ${t.response.text ? `<div class="tr-text">${escHtml(t.response.text)}</div>` : ""}
              ${(t.response.files || []).map(f => f.fileId
                ? `<a href="#" class="view-upload tr-file" data-fid="${escHtml(f.fileId)}" data-name="${escHtml(f.name)}">${escHtml(f.name)}</a>`
                : `<span class="tr-file">${escHtml(f.name)}</span>`).join(" ")}
            </div>` : ""}
          <details class="task-resp-details" ${t.response ? "" : "open"}>
            <summary>${t.response ? "Send an updated response" : "Respond — text, report, image, video or file"}</summary>
            <form class="task-resp-form" data-task="${t.id}">
              <textarea name="text" rows="2" placeholder="Write your response or report… (optional if you attach a file)"></textarea>
              <div class="trf-row">
                <input type="file" name="file" multiple accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip">
                <button class="btn btn-sm">Submit response</button>
              </div>
            </form>
          </details>
        </div>`).join("")
      : '<p class="sub" style="margin:0">No tasks assigned to you yet.</p>';

    // --- notifications / sent emails ---
    const msgs = amsGetMessages().filter(m => m.appId === rec.id).slice(0, 6);
    document.getElementById("notifList").innerHTML = msgs.length
      ? msgs.map(m => `<div class="notif-line">
          <span class="nico">✉</span>
          <div><b>${escHtml(m.subject)}</b>
            <div class="sub2">${escHtml(m.tpl || "")} · sent ${KII.fmtDate(m.date)} by KII</div>
          </div></div>`).join("")
      : '<p class="sub" style="margin:0">No notifications yet.</p>';

    // --- chat ---
    const chat = amsGetChat(rec.id);
    const box = document.getElementById("chatBox");
    box.innerHTML = chat.length
      ? chat.map(m => `<div class="chat-msg ${m.from === "applicant" ? "mine" : "theirs"}">
          <div class="cm">${escHtml(m.text)}</div>
          <div class="cm-meta">${escHtml(m.from === "applicant" ? m.name : "KII")} · ${new Date(m.date).toLocaleString()}</div>
        </div>`).join("")
      : '<p class="sub" style="margin:0">No messages yet — say hello to the KII team.</p>';
    box.scrollTop = box.scrollHeight;
  }

  // applicant completes a task -> update AMS record + activity + notify
  document.getElementById("taskList").addEventListener("change", (e) => {
    const cb = e.target.closest("input[data-task]");
    if (!cb) return;
    const list = amsGetApplicants();
    const rec = list.find(x => x.id === recId);
    const t = rec && (rec.tasks || []).find(x => x.id === cb.dataset.task);
    if (!t) return;
    t.status = cb.checked ? "Completed" : "Open";
    const fullName = user.firstName + " " + user.secondName + " " + user.thirdName;
    (rec.activities = rec.activities || []).unshift({
      date: new Date().toISOString(), icon: "task",
      title: cb.checked ? "Applicant completed a task" : "Applicant reopened a task",
      desc: t.task, by: "Applicant",
    });
    rec.lastActivity = new Date().toISOString();
    amsSaveApplicants(list);
    amsGetStaff().forEach(s => { if (s.active && (s.name === rec.assignedToName || (s.perms || []).includes("manage_tasks")))
      amsNotify(s.id, `${fullName} ${cb.checked ? "completed" : "reopened"} task "${t.task}" (${rec.name})`, `admin.html?v=applicant&id=${encodeURIComponent(rec.id)}&tab=tasks`); });
    renderTracker();
  });

  // applicant submits a task response (text and/or files) -> AMS record + notify staff
  document.getElementById("taskList").addEventListener("submit", async (e) => {
    const form = e.target.closest(".task-resp-form");
    if (!form) return;
    e.preventDefault();
    const text = form.text.value.trim();
    const files = Array.from(form.file.files || []);
    if (!text && !files.length) { alert("Write a response or attach a file first."); return; }
    const list = amsGetApplicants();
    const rec = list.find(x => x.id === recId);
    const t = rec && (rec.tasks || []).find(x => x.id === form.dataset.task);
    if (!t) return;
    const btn = form.querySelector("button[type=submit], button");
    if (btn) { btn.disabled = true; btn.textContent = "Uploading…"; }
    const metas = [];
    for (const f of files) {
      const meta = { name: f.name, size: f.size, type: f.type };
      const fid = `taskresp/${rec.id}/${t.id}/${Date.now()}_${metas.length}`;
      if (await KII.saveFile(fid, f)) meta.fileId = fid;
      metas.push(meta);
    }
    t.response = { text, date: new Date().toISOString(), files: metas };
    t.status = "Completed";
    const fullName = user.firstName + " " + user.secondName + " " + user.thirdName;
    (rec.activities = rec.activities || []).unshift({
      date: new Date().toISOString(), icon: "task",
      title: "Applicant submitted a task response",
      desc: t.task + (metas.length ? ` — ${metas.length} file(s)` : ""), by: "Applicant",
    });
    rec.lastActivity = new Date().toISOString();
    amsSaveApplicants(list);
    amsGetStaff().forEach(s => { if (s.active && (s.name === rec.assignedToName || (s.perms || []).includes("manage_tasks")))
      amsNotify(s.id, `${fullName} submitted a response for task "${t.task}" (${rec.name})`, `admin.html?v=applicant&id=${encodeURIComponent(rec.id)}&tab=tasks`); });
    renderTracker();
  });

  // open an uploaded task-response file
  document.getElementById("taskList").addEventListener("click", async (e) => {
    const link = e.target.closest(".view-upload");
    if (!link) return;
    e.preventDefault();
    const file = await KII.getFile(link.dataset.fid);
    if (!file) { alert("File not found in local storage."); return; }
    const url = URL.createObjectURL(file);
    const win = window.open(url, "_blank");
    if (!win) { const a = document.createElement("a"); a.href = url; a.download = link.dataset.name || "file"; a.click(); }
  });

  // applicant submits a milestone progress report -> AMS record + notify responsible staff
  document.getElementById("msList").addEventListener("submit", (e) => {
    const form = e.target.closest(".ms-form");
    if (!form) return;
    e.preventDefault();
    const text = form.text.value.trim();
    if (!text) return;
    const list = amsGetApplicants();
    const rec = list.find(x => x.id === recId);
    const m = rec && (rec.milestones || []).find(x => x.id === form.dataset.ms);
    if (!m) return;
    m.report = { text, date: new Date().toISOString() };
    m.status = "Report submitted";
    rec.lastActivity = m.report.date;
    (rec.activities = rec.activities || []).unshift({ date: m.report.date, icon: "doc",
      title: "Milestone progress report submitted", desc: m.title, by: "Applicant" });
    amsSaveApplicants(list);
    const link = `admin.html?v=applicant&id=${encodeURIComponent(rec.id)}&tab=milestones`;
    amsGetStaff().filter(s => s.active && (s.name === rec.assignedToName || (s.perms || []).includes("manage_financials")))
      .forEach(s => amsNotify(s.id, `Progress report submitted for milestone "${m.title}" (${rec.name})`, link));
    renderTracker();
  });

  document.getElementById("chatForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const rec = getRec();
    const text = e.target.text.value.trim();
    if (!rec || !text) return;
    const fullName = user.firstName + " " + user.secondName + " " + user.thirdName;
    amsPostChat(rec.id, { from: "applicant", name: fullName, text });
    const s = rec.assignedToName && amsGetStaff().find(x => x.name === rec.assignedToName);
    if (s) amsNotify(s.id, `New chat message from ${fullName} (${rec.name})`, `admin.html?v=applicant&id=${encodeURIComponent(rec.id)}&tab=chat`);
    e.target.text.value = "";
    renderTracker();
  });

  render();
}
