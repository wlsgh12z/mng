// utils/hooks.js
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadAdmin, loadActivePage, saveActivePage,
  loadExp, applyAuthPayload, clearAll, extendOneHour
} from "@utils/session.js";
import { refreshToken } from "@utils/http.js";

export function useCountdown(initialExp) {
  const [exp, setExp] = useState(initialExp || loadExp());
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  const remain = useMemo(() => (exp ? exp - now : 0), [exp, now]);
  const setExpiry = useCallback((nextExp) => setExp(nextExp || loadExp()), []);

  return { exp, setExpiry, remain };
}

export function useSession() {
  const [admin, setAdmin] = useState(() => loadAdmin());
  const [active, setActive] = useState(() => loadActivePage());

  const onLoggedIn = useCallback((result) => {
    const payload = result?.admin ? result : { admin: result };
    applyAuthPayload(payload);
    setAdmin(payload.admin);
  }, []);

  const onSelectPage = useCallback((key) => {
    saveActivePage(key || "");
    setActive(key || "");
    // auto-extend on activity
    const userid = (admin && admin.userid) || loadAdmin()?.userid;
    if (userid) extendOneHour(userid, refreshToken).catch(()=>{});
  }, [admin]);

  const onLogout = useCallback(() => {
    clearAll();
    setAdmin(null);
    setActive("");
  }, []);

  // best-effort refresh on mount if expired
  useEffect(() => {
    const a = loadAdmin();
    if (!a) return;
    const exp = loadExp();
    if (!exp || exp < Math.floor(Date.now()/1000)) {
      extendOneHour(a.userid, refreshToken).catch(()=>{});
    }
  }, []);

  return { admin, active, onLoggedIn, onSelectPage, onLogout };
}
