// utils/datetime.js
// Parse/format helpers for timestamps like "YYYYMMDDHHmmss"

function pad(n, w=2){ return String(n).padStart(w, "0"); }

/** Parse "YYYYMMDDHHmmss" (assumed local/KST) to Date */
export function parseCompactTS(ts) {
  if (!ts || typeof ts !== "string" || ts.length < 8) return null;
  const y = Number(ts.slice(0,4));
  const M = Number(ts.slice(4,6)) - 1;
  const d = Number(ts.slice(6,8));
  const hh = Number(ts.slice(8,10) || "0");
  const mm = Number(ts.slice(10,12) || "0");
  const ss = Number(ts.slice(12,14) || "0");
  const dt = new Date(y, M, d, hh, mm, ss);
  return isNaN(dt.getTime()) ? null : dt;
}

/** Format Date to "YYYY-MM-DD HH:mm:ss" */
export function formatPretty(dt) {
  if (!(dt instanceof Date) || isNaN(dt.getTime())) return "";
  return [
    dt.getFullYear(), "-", pad(dt.getMonth()+1), "-", pad(dt.getDate()),
    " ", pad(dt.getHours()), ":", pad(dt.getMinutes()), ":", pad(dt.getSeconds())
  ].join("");
}

/** Convert "YYYYMMDDHHmmss" -> "YYYY-MM-DD HH:mm:ss" */
export function compactToPretty(ts) {
  const dt = parseCompactTS(ts);
  return dt ? formatPretty(dt) : "";
}
