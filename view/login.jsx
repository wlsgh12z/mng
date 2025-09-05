import LoginPage from "@features/login/components/page.jsx";
import MainPage from "@features/main/components/page.jsx";

export default function Home() {
  const utils = globalThis.utils || {};
  const useSession = utils.useSession;
  if (typeof useSession !== "function") {
    return <div style={{padding:16, color:"crimson"}}>globals 초기화 실패: useSession 미정의</div>;
  }
  const { admin, active, onLoggedIn, onSelectPage, onLogout } = useSession();
  return admin
    ? <MainPage admin={admin} active={active} onSelectPage={onSelectPage} onLogout={onLogout} />
    : <LoginPage onLoggedIn={onLoggedIn} />;
}
