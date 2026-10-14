# KII AMS — Demo

Application Management System demo for the **KII Innovation Program**
(Kurdistan Innovation Institute). Pure HTML/CSS/JavaScript — no backend, no
build step. All data is stored in the browser (`localStorage` for records,
`IndexedDB` for uploaded files).

## Live demo

The site is deployed on GitHub Pages. Two entry points:

- **Applicant portal:** `index.html` — create an account, pick a category,
  complete the 14-section application wizard, submit, then track progress,
  tasks, milestones and chat from the dashboard.
- **Staff portal (AMS):** `admin-login.html` — sign in as staff to manage
  applicants, evaluations, meetings, tasks, KPIs, procurement, financials,
  decisions and team roles.

### Demo credentials

| Portal | Email | Password |
|---|---|---|
| Staff / Admin | `admin@kii.org` | `admin123` |

The seeded staff account is a **Master Admin** and is forced to set a new
password on first sign-in. Additional staff accounts (Evaluator, Technical
Manager, CEO, Business roles, Focal Point…) can be created inside the AMS via
**Team & Roles**.

## Run locally

```bat
start.bat
```

or with any static file server:

```bash
python -m http.server 8090
# then open http://localhost:8090/index.html
```

## Important demo caveats

- **Per-browser data.** Because there is no server, every browser profile has
  its own isolated copy of the data. Applicants, staff actions, chat and files
  are NOT shared between visitors — each reviewer gets a fresh instance.
- **Authentication is simulated.** Sessions and password records live in
  `localStorage` (salted SHA-256, 1000 iterations). This demonstrates the
  workflow and UX only — it is not production-grade security.
- **Email delivery is simulated.** Notification/"email" messages are recorded
  in the AMS message log and shown on the applicant dashboard; nothing is
  actually sent.
- Uploaded files persist in the browser's `IndexedDB` and open via `blob:`
  URLs.

## Structure

```
index.html         Landing / applicant portal entry
login.html         Applicant sign in
signup.html        Applicant registration
dashboard.html     Applicant dashboard (progress, tasks, chat, milestones)
application.html   14-section application wizard
admin-login.html   Staff sign in
admin.html         AMS shell (all staff views)
js/common.js       Shared helpers: storage, session, hashing, countries
js/auth.js         Signup / login logic
js/application.js  Application wizard engine + section definitions
js/dashboard.js    Applicant dashboard logic
js/ams.js          AMS data layer: staff, roles, permissions, sync, seeds
js/admin.js        AMS views (dashboard, applicants, evals, KPIs, …)
css/style.css      Portal + shared styles
css/admin.css      AMS styles
```
