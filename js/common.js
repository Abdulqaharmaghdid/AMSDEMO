/* ===== Shared helpers: storage, session, countries ===== */

const KII = {
  USERS_KEY: "kii_users",
  SESSION_KEY: "kii_session",

  /* ----- users ----- */
  getUsers() {
    try { return JSON.parse(localStorage.getItem(this.USERS_KEY)) || []; }
    catch { return []; }
  },
  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },
  findUser(email) {
    return this.getUsers().find(u => u.email.toLowerCase() === String(email).toLowerCase());
  },
  addUser(user) {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  },
  updateUser(email, patch) {
    const users = this.getUsers();
    const u = users.find(x => x.email.toLowerCase() === String(email).toLowerCase());
    if (u) { Object.assign(u, patch); this.saveUsers(users); }
    return u;
  },

  /* ----- session ----- */
  login(email) { localStorage.setItem(this.SESSION_KEY, email); },
  logout() { localStorage.removeItem(this.SESSION_KEY); },
  currentEmail() { return localStorage.getItem(this.SESSION_KEY); },
  currentUser() {
    const e = this.currentEmail();
    return e ? this.findUser(e) : null;
  },
  requireAuth(redirect = "login.html") {
    const u = this.currentUser();
    if (!u) { window.location.href = redirect; return null; }
    return u;
  },

  /* ----- per-user application data ----- */
  appKey(email) { return "kii_app_" + String(email).toLowerCase(); },
  getApplication(email) {
    try { return JSON.parse(localStorage.getItem(this.appKey(email))) || null; }
    catch { return null; }
  },
  saveApplication(email, data) {
    try {
      localStorage.setItem(this.appKey(email), JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to save application:", e);
      alert("Could not save your application progress (storage full). Your last changes may be lost.");
      return false;
    }
  },
  deleteApplication(email) {
    localStorage.removeItem(this.appKey(email));
    this.deleteUserFiles(email);
  },

  /* ----- file store (IndexedDB — too big for localStorage) ----- */
  _dbPromise: null,
  openDb() {
    if (!this._dbPromise) {
      this._dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open("kii_db", 1);
        req.onupgradeneeded = () => req.result.createObjectStore("files");
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }
    return this._dbPromise;
  },
  async saveFile(id, file) {
    try {
      const db = await this.openDb();
      await new Promise((res, rej) => {
        const tx = db.transaction("files", "readwrite");
        tx.objectStore("files").put(file, id);
        tx.oncomplete = res;
        tx.onerror = () => rej(tx.error);
      });
      return true;
    } catch (e) {
      console.error("IndexedDB save failed:", e);
      return false;
    }
  },
  async getFile(id) {
    try {
      const db = await this.openDb();
      return await new Promise((res, rej) => {
        const req = db.transaction("files").objectStore("files").get(id);
        req.onsuccess = () => res(req.result || null);
        req.onerror = () => rej(req.error);
      });
    } catch { return null; }
  },
  async deleteUserFiles(email) {
    try {
      const db = await this.openDb();
      const store = db.transaction("files", "readwrite").objectStore("files");
      store.openCursor().onsuccess = (e) => {
        const cur = e.target.result;
        if (!cur) return;
        if (String(cur.key).startsWith(email + "/")) cur.delete();
        cur.continue();
      };
    } catch { /* demo only */ }
  },

  /* ----- file -> dataURL (demo persistence) ----- */
  readFile(input) {
    return new Promise((resolve) => {
      const f = input.files && input.files[0];
      if (!f) return resolve(null);
      const r = new FileReader();
      r.onload = () => resolve({ name: f.name, size: f.size, type: f.type, dataUrl: r.result });
      r.readAsDataURL(f);
    });
  },

  /* ----- password hashing (salted SHA-256; never store plain passwords) ----- */
  sha256(str) {
    const K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
      0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
      0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
      0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
      0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
      0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
      0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
      0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    const bytes = new TextEncoder().encode(str);
    const len = bytes.length, bitLen = len * 8;
    const padded = new Uint8Array(((len + 9 + 63) >> 6) << 6);
    padded.set(bytes); padded[len] = 0x80;
    const dv = new DataView(padded.buffer);
    dv.setUint32(padded.length - 4, bitLen >>> 0);
    dv.setUint32(padded.length - 8, Math.floor(bitLen / 0x100000000));
    const H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    const W = new Uint32Array(64);
    const rotr = (x, n) => (x >>> n) | (x << (32 - n));
    for (let off = 0; off < padded.length; off += 64) {
      for (let i = 0; i < 16; i++) W[i] = dv.getUint32(off + i * 4);
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(W[i-15], 7) ^ rotr(W[i-15], 18) ^ (W[i-15] >>> 3);
        const s1 = rotr(W[i-2], 17) ^ rotr(W[i-2], 19) ^ (W[i-2] >>> 10);
        W[i] = (W[i-16] + s0 + W[i-7] + s1) >>> 0;
      }
      let [a, b, c, d, e, f, g, h] = H;
      for (let i = 0; i < 64; i++) {
        const t1 = (h + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + W[i]) >>> 0;
        const t2 = ((rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      [a, b, c, d, e, f, g, h].forEach((x, i) => H[i] = (H[i] + x) >>> 0);
    }
    return H.map(x => x.toString(16).padStart(8, "0")).join("");
  },
  makePassword(plain) {
    const salt = Array.from(crypto.getRandomValues(new Uint8Array(12)), b => b.toString(16).padStart(2, "0")).join("");
    let h = salt + ":" + plain;
    for (let i = 0; i < 1000; i++) h = this.sha256(h); // key stretching
    return { salt, hash: h };
  },
  checkPassword(record, plain) {
    if (!record) return false;
    if (record.passHash && record.passSalt) {
      let h = record.passSalt + ":" + plain;
      for (let i = 0; i < 1000; i++) h = this.sha256(h);
      return h === record.passHash;
    }
    return record.password === plain; // legacy plain-text record (migrated on next login)
  },

  /* ----- brute-force protection: lock after 5 failed attempts for 5 minutes ----- */
  LOCK_KEY: "kii_login_locks",
  isLocked(id) {
    const l = JSON.parse(localStorage.getItem(this.LOCK_KEY) || "{}")[String(id).toLowerCase()];
    return l && l.until > Date.now() ? Math.ceil((l.until - Date.now()) / 60000) : 0;
  },
  recordFail(id) {
    const all = JSON.parse(localStorage.getItem(this.LOCK_KEY) || "{}");
    const k = String(id).toLowerCase();
    const l = all[k] && all[k].until > Date.now() ? all[k] : { n: 0, until: 0 };
    l.n = (l.n || 0) + 1;
    if (l.n >= 5) { l.until = Date.now() + 5 * 60000; l.n = 0; }
    all[k] = l;
    localStorage.setItem(this.LOCK_KEY, JSON.stringify(all));
  },
  clearFails(id) {
    const all = JSON.parse(localStorage.getItem(this.LOCK_KEY) || "{}");
    delete all[String(id).toLowerCase()];
    localStorage.setItem(this.LOCK_KEY, JSON.stringify(all));
  },

  /* program call settings are configured by staff in the AMS (Settings → Program Call) */
  programSettings() {
    try { return JSON.parse(localStorage.getItem("kii_ams_settings")) || {}; } catch { return {}; }
  },
  deadlinePassed() {
    const d = this.programSettings().deadline;
    return !!d && Date.now() > new Date(d + "T23:59:59").getTime();
  },

  reviewSeason() {
    // Seasons: Spring (Jan-Mar), Summer (Apr-Jun), Fall (Jul-Sep), Winter (Oct-Dec)
    const m = new Date().getMonth();
    const year = new Date().getFullYear();
    if (m <= 2) return "Spring " + year + " Review";
    if (m <= 5) return "Summer " + year + " Review";
    if (m <= 8) return "Fall " + year + " Review";
    return "Winter " + year + " Review";
  },

  fmtDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  },
};

/* ----- Countries (for searchable datalists / selects) ----- */
const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Bulgaria","Burkina Faso","Burundi",
  "Cambodia","Cameroon","Canada","Chad","Chile","China","Colombia","Comoros","Congo",
  "Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti",
  "Dominican Republic","Ecuador","Egypt","El Salvador","Eritrea","Estonia","Eswatini",
  "Ethiopia","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece",
  "Guatemala","Guinea","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq",
  "Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan",
  "Kenya","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya",
  "Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
  "Mauritania","Mauritius","Mexico","Moldova","Mongolia","Montenegro","Morocco",
  "Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua",
  "Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan",
  "Palestine","Panama","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saudi Arabia","Senegal","Serbia","Sierra Leone","Singapore",
  "Slovakia","Slovenia","Somalia","South Africa","South Korea","South Sudan","Spain",
  "Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania",
  "Thailand","Togo","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

const COUNTRY_CODES = [
  "+93 (AF)","+355 (AL)","+213 (DZ)","+54 (AR)","+61 (AU)","+43 (AT)","+973 (BH)",
  "+880 (BD)","+32 (BE)","+55 (BR)","+359 (BG)","+237 (CM)","+1 (CA/US)","+86 (CN)",
  "+57 (CO)","+385 (HR)","+45 (DK)","+20 (EG)","+251 (ET)","+358 (FI)","+33 (FR)",
  "+49 (DE)","+233 (GH)","+30 (GR)","+36 (HU)","+91 (IN)","+62 (ID)","+98 (IR)",
  "+964 (IQ)","+353 (IE)","+972 (IL)","+39 (IT)","+81 (JP)","+962 (JO)","+7 (KZ/RU)",
  "+254 (KE)","+965 (KW)","+961 (LB)","+218 (LY)","+60 (MY)","+52 (MX)","+212 (MA)",
  "+31 (NL)","+64 (NZ)","+234 (NG)","+47 (NO)","+968 (OM)","+92 (PK)","+970 (PS)",
  "+51 (PE)","+63 (PH)","+48 (PL)","+351 (PT)","+974 (QA)","+40 (RO)","+250 (RW)",
  "+966 (SA)","+221 (SN)","+65 (SG)","+252 (SO)","+27 (ZA)","+82 (KR)","+34 (ES)",
  "+94 (LK)","+249 (SD)","+46 (SE)","+41 (CH)","+963 (SY)","+255 (TZ)","+66 (TH)",
  "+216 (TN)","+90 (TR)","+256 (UG)","+380 (UA)","+971 (AE)","+44 (UK)","+84 (VN)",
  "+967 (YE)","+260 (ZM)","+263 (ZW)","+ Other"
];

/* Populate a <datalist> or <select> with countries */
function fillCountries(el) {
  if (!el) return;
  if (el.tagName === "DATALIST") {
    el.innerHTML = COUNTRIES.map(c => `<option value="${c}">`).join("");
  } else {
    el.innerHTML = `<option value="">Select country…</option>` +
      COUNTRIES.map(c => `<option value="${c}">${c}</option>`).join("");
  }
}
function fillCountryCodes(el) {
  if (!el) return;
  el.innerHTML = `<option value="">Code</option>` +
    COUNTRY_CODES.map(c => `<option value="${c}">${c}</option>`).join("");
}
