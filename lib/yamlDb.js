import { readYaml } from "@utils/yaml.js";

export function getAdmins() {
  const data = readYaml("doc/tbl_admin.yaml");
  return Array.isArray(data.tbl_admin) ? data.tbl_admin : [];
}

export function findAdminByUserId(userid) {
  const list = getAdmins();
  const key = String(userid||"").toLowerCase();
  return list.find(a => String(a.userid).toLowerCase() === key) || null;
}

export function verifyPassword(admin, password) {
  // DEV ONLY: plain-text comparison
  return admin && String(admin.password) === String(password);
}
