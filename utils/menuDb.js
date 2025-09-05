// utils/menuDb.js
import fs from "fs";
import path from "path";
import YAML from "yaml";

/**
 * Load master menu list from doc/tbl_mngmenu.yaml
 * Returns: [{ id, menucd, menunm }]
 */
export function loadMngMenu() {
  try {
    const file = path.resolve("doc/tbl_mngmenu.yaml");
    if (!fs.existsSync(file)) {
      console.warn("[loadMngMenu] file not found:", file);
      return [];
    }
    const raw = fs.readFileSync(file, "utf8");
    const data = YAML.parse(raw);
    const list = Array.isArray(data?.tbl_mngmenu) ? data.tbl_mngmenu : [];
    return list.map(r => ({
      id: r.id,
      menucd: String(r.menucd ?? ""),
      menunm: String(r.menunm ?? ""),
    }));
  } catch (err) {
    console.error("[loadMngMenu] error:", err);
    return [];
  }
}
