// features/main/components/page.jsx
import { useEffect } from "react";
import Left from "@features/left/components/page.jsx";
import Right from "@features/right/components/page.jsx";
import { loadExp } from "@utils/session.js";
import { refreshToken } from "@utils/http.js";

function formatRemain(remainSec) {
  const s = Math.max(0, Math.floor(remainSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(ss)}`;
}

export default function MainPage({ active = "", onSelectPage, admin, onLogout }) {
  const utils = globalThis.utils || {};
  const useCountdown = utils.useCountdown;
  if (typeof useCountdown !== "function") return null;

  const { exp, setExpiry, remain } = useCountdown(loadExp());

  async function handleExtend() {
    try {
      const res = await refreshToken({ userid: admin.userid });
      if (res?.ok) setExpiry(res.exp);
    } catch {}
  }

  // ✅ 1) 초기 진입/새로고침 시 즉시 연장
  useEffect(() => {
    handleExtend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ 2) 만료되면 자동 로그아웃
  useEffect(() => {
    if (remain <= 0 && exp) onLogout?.();
  }, [remain, exp, onLogout]);

  return (
    <div className="main-layout" style={{display:"grid", gridTemplateRows:"56px 1fr", minHeight:"100vh"}}>
      <header style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px", borderBottom:"1px solid #e5e7eb", background:"#fff"}}>
        <div style={{fontWeight:600}}>관리자 콘솔</div>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <span style={{color:"#6b7280"}}>{admin?.usernm} ({admin?.userid})</span>
          <span title="로그인 유지 시간" style={{fontVariantNumeric:"tabular-nums"}}>{formatRemain(remain)}</span>
          <button type="button"
            onClick={handleExtend}
            style={{border:0, padding:"8px 12px", borderRadius:10, cursor:"pointer", background:"#4b5563", color:"#fff"}}>
            연장
          </button>
          <button type="button"
            onClick={onLogout}
            style={{border:0, padding:"8px 12px", borderRadius:10, cursor:"pointer", background:"#111", color:"#fff"}}>
            로그아웃
          </button>
        </div>
      </header>

      <div style={{display:"grid", gridTemplateColumns:"240px 1fr"}}>
        <aside style={{borderRight:"1px solid #e5e7eb", background:"#fff"}}>
          <Left active={active} onSelectPage={onSelectPage} admin={admin} />
        </aside>
        <section style={{padding:"16px"}}>
          <Right page={active} admin={admin} />
        </section>
      </div>
    </div>
  );
}
