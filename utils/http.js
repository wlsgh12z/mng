async function request(path, { method="GET", json, headers } = {}) {
  const res = await fetch(path, {
    method,
    headers: {
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...(headers || {}),
    },
    body: json ? JSON.stringify(json) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || res.statusText || "Request failed";
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function login({ userid, password }) {
  const data = await request("/api/login", { method: "POST", json: { userid, password } });
  // data: { ok, admin, token, exp, univinfo, menu }
  return data;
}

export async function refreshToken({ userid }) {
  const data = await request("/api/refresh-token", { method: "POST", json: { userid } });
  // { ok, token, exp, univinfo, menu }
  return data;
}

export const http = { request, login, refreshToken };
