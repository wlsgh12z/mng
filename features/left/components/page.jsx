// features/left/components/page.jsx (patched)
import { useEffect, useMemo, useState } from "react";
import { loadMngMenu } from "@utils/menuDb.js";

export default function Left({ active, onSelectPage, admin }) {
  const [allowed, setAllowed] = useState(() => Array.isArray(admin?.menu) ? admin.menu : []);

  useEffect(() => {
    if (Array.isArray(admin?.menu)) return;
    if (typeof window === "undefined") return;
    try {
      const s = sessionStorage.getItem("menu");
      if (s) setAllowed(JSON.parse(s));
    } catch {}
  }, [admin]);

  const allMenus = loadMngMenu();

  const filtered = useMemo(() => {
    if (!Array.isArray(allowed) || allowed.length === 0) return allMenus;
    const set = new Set(allowed.map(String));
    return allMenus.filter(m => set.has(String(m.menucd)));
  }, [allMenus, allowed]);

  const menus = useMemo(() => [{ id: "__home", menucd: "", menunm: "홈(Welcome)" }, ...filtered], [filtered]);

  const activeKey = String(active ?? "");
  const isActive = (menucd) => activeKey === String(menucd ?? "");

  return (
    <nav aria-label="주 메뉴">
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {menus.map(m => {
          const activeHere = isActive(m.menucd);
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => onSelectPage(m.menucd)}
                aria-current={activeHere ? "page" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "10px 14px",
                  textAlign: "left",
                  background: activeHere ? "#e5e7eb" : "transparent",
                  fontWeight: activeHere ? 700 : 400,
                  border: "none",
                  cursor: "pointer",
                  borderLeft: activeHere ? "3px solid #111827" : "3px solid transparent"
                }}
              >
                <span style={{opacity: activeHere ? 1 : 0.2}}>•</span>
                <span>{m.menunm}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
