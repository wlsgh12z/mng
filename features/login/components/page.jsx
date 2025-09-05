import { useState } from "react";

export default function LoginPage({ onLoggedIn }) {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const login = globalThis.utils?.login;
      let result;
      if (login) {
        result = await login({ userid, password });
      } else {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid, password }),
        });
        const data = await res.json();
        if (!res.ok || !data?.ok) throw new Error(data?.error || "로그인 실패");
        result = data;
      }
      onLoggedIn?.(result);
    } catch (err) {
      setError(err.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>로그인</h1>
        <form onSubmit={onSubmit} className="grid">
          <input name="id" placeholder="아이디" value={userid} onChange={e=>setUserid(e.target.value)} />
          <input name="pw" type="password" placeholder="비밀번호" value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="submit" disabled={loading}>{loading ? "로그인 중..." : "로그인"}</button>
        </form>
        {error && <p style={{color:"crimson", marginTop:12}}>{error}</p>}
      </section>
    </main>
  );
}
