// utils/cookies.js
export function parseCookie(header) {
  const out = {};
  if (!header) return out;
  const parts = header.split(/;\s*/);
  for (const p of parts) {
    const i = p.indexOf("=");
    if (i > -1) out[decodeURIComponent(p.slice(0,i))] = decodeURIComponent(p.slice(i+1));
  }
  return out;
}

export function setCookie(name, value, { httpOnly=true, sameSite="Lax", path="/", secure=false, maxAge }={}) {
  const seg = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`, `Path=${path}`, `SameSite=${sameSite}`];
  if (httpOnly) seg.push("HttpOnly");
  if (secure) seg.push("Secure");
  if (Number.isFinite(maxAge)) seg.push(`Max-Age=${maxAge}`);
  return seg.join("; ");
}
