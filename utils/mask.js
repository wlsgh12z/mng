// utils/mask.js
export function maskPhone(p) {
  const s = String(p||"");
  return s.replace(/(\d{3})[- ]?(\d{3,4})[- ]?(\d{4})/, (m,a,b,c)=>`${a}-${b[0]}***-${c.slice(0,1)}***`);
}
export function maskEmail(e) {
  const s = String(e||"");
  const [id, dom] = s.split("@");
  if (!id || !dom) return s;
  const head = id.slice(0,2);
  return `${head}${"*".repeat(Math.max(id.length-2,0))}@${dom}`;
}
export function maskIP(ip) {
  const s = String(ip||"");
  const parts = s.split(".");
  if (parts.length !== 4) return s;
  return `${parts[0]}.${parts[1]}.***.${parts[3]}`;
}
