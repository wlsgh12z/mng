// utils/yaml.js
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

/** Read YAML file at a project-relative path (e.g., "doc/admin.yaml") */
export function readYaml(relPath) {
  const file = path.resolve(process.cwd(), relPath);
  const raw = fs.readFileSync(file, "utf-8");
  return YAML.parse(raw) || {};
}
