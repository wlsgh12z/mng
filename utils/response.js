// utils/response.js
export const ok = (data, status=200) => Response.json({ ok: true, ...data }, { status });
export const fail = (error, status=400) => Response.json({ ok: false, error }, { status });
