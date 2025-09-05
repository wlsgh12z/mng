// utils/session.js
// Centralized session helpers (no React inside).
// Storage: sessionStorage keys
const K = {
  admin: "admin",
  activePage: "activePage",
  token: "token",
  tokenExp: "tokenExp",
  univinfo: "univinfo",
  menu: "menu",
};

export const sessionKeys = K;

export function loadAdmin() {
  try { const s = sessionStorage.getItem(K.admin); return s ? JSON.parse(s) : null; } catch { return null; }
}
export function saveAdmin(admin) {
  try { sessionStorage.setItem(K.admin, JSON.stringify(admin)); } catch {}
}
export function clearAll() {
  try {
    Object.values(K).forEach((k) => sessionStorage.removeItem(k));
  } catch {}
}

export function loadActivePage() {
  try { return sessionStorage.getItem(K.activePage) || ""; } catch { return ""; }
}
export function saveActivePage(page) {
  try { sessionStorage.setItem(K.activePage, page || ""); } catch {}
}

export function loadToken() {
  try { return sessionStorage.getItem(K.token) || ""; } catch { return ""; }
}
export function saveToken(token) {
  try { sessionStorage.setItem(K.token, token || ""); } catch {}
}

export function loadExp() {
  try { return Number(sessionStorage.getItem(K.tokenExp) || 0); } catch { return 0; }
}
export function saveExp(exp) {
  try { sessionStorage.setItem(K.tokenExp, String(exp || 0)); } catch {}
}

export function loadUnivinfo() {
  try { const s = sessionStorage.getItem(K.univinfo); return s ? JSON.parse(s) : null; } catch { return null; }
}
export function saveUnivinfo(u) {
  try { sessionStorage.setItem(K.univinfo, JSON.stringify(u || null)); } catch {}
}

export function loadMenu() {
  try { const s = sessionStorage.getItem(K.menu); return s ? JSON.parse(s) : []; } catch { return []; }
}
export function saveMenu(m) {
  try { sessionStorage.setItem(K.menu, JSON.stringify(Array.isArray(m) ? m : [])); } catch {}
}

// After login/refresh apply payload at once
export function applyAuthPayload({ admin, token, exp, univinfo, menu }) {
  if (admin) saveAdmin(admin);
  if (token) saveToken(token);
  if (exp) saveExp(exp);
  if (univinfo) saveUnivinfo(univinfo);
  if (menu) saveMenu(menu);
}

// Extend helper via utils.refreshToken (injected globally or import)
export async function extendOneHour(userid, refreshTokenFn) {
  if (!userid || typeof refreshTokenFn !== "function") return null;
  const res = await refreshTokenFn({ userid });
  if (res?.ok) {
    applyAuthPayload({
      token: res.token,
      exp: res.exp,
      univinfo: res.univinfo,
      menu: res.menu,
    });
    return res;
  }
  return null;
}
