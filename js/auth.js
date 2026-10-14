/* ===== Auth logic: signup + login ===== */

function showAlert(msg, ok = false) {
  const a = document.getElementById("alert");
  a.textContent = msg;
  a.className = "alert " + (ok ? "alert-ok" : "alert-error");
  a.classList.remove("hidden");
}

/* ---------- Sign Up ---------- */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  fillCountryCodes(document.getElementById("phoneCode"));

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const secondName = document.getElementById("secondName").value.trim();
    const thirdName = document.getElementById("thirdName").value.trim();
    const dob = document.getElementById("dob").value;
    const phoneCode = document.getElementById("phoneCode").value;
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const organization = document.getElementById("organization").value.trim();
    const website = document.getElementById("website").value.trim();
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (!firstName || !secondName || !thirdName)
      return showAlert("Please enter your full name (first, second and third name).");
    if (!dob) return showAlert("Please enter your date of birth.");
    if (!phoneCode || !phone) return showAlert("Please enter your phone number with country code.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return showAlert("Please enter a valid email address.");
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password))
      return showAlert("Password must be at least 8 characters and include letters and numbers.");
    if (password !== password2) return showAlert("Passwords do not match.");
    if (website && !/^https?:\/\/\S+\.\S+/.test(website))
      return showAlert("Website / LinkedIn must be a full link starting with https://");
    const age = (Date.now() - new Date(dob)) / (365.25 * 86400000);
    if (!(age >= 14 && age <= 100)) return showAlert("Please enter a valid date of birth.");
    if (!document.getElementById("privacyConsent").checked)
      return showAlert("Please accept the privacy notice to create your account.");
    if (KII.findUser(email)) return showAlert("An account with this email already exists. Please sign in.");

    const pw = KII.makePassword(password);
    KII.addUser({
      firstName, secondName, thirdName,
      dob, phone: phoneCode + " " + phone,
      email, organization, website,
      passHash: pw.hash, passSalt: pw.salt,
      privacyConsentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    KII.login(email);
    window.location.href = "dashboard.html";
  });
}

/* ---------- Sign In ---------- */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const mins = KII.isLocked(email);
    if (mins) return showAlert(`Too many failed attempts. Please try again in ${mins} minute(s).`);
    const user = KII.findUser(email);
    if (!user || !KII.checkPassword(user, password)) {
      KII.recordFail(email);
      return showAlert("Invalid email or password.");
    }
    KII.clearFails(email);
    if (!user.passHash) { // migrate legacy plain-text password
      const pw = KII.makePassword(password);
      KII.updateUser(user.email, { passHash: pw.hash, passSalt: pw.salt, password: undefined });
    }
    KII.login(user.email);
    window.location.href = "dashboard.html";
  });
}
