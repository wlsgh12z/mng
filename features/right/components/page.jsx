const titles = {
  dashboard: "대시보드",
  users: "사용자 관리",
  settings: "설정",
};

export default function RightView({ page = "", admin }) {
  if (!page) {
    return <h2 style={{margin:"8px 0"}}>환영합니다 👋</h2>;
  }
  const title = titles[page] || page;
  return (
    <div>
      <h2 style={{margin:"8px 0"}}>{title}</h2>
      <p style={{color:"#6b7280"}}>이 영역에 “{title}” 페이지 콘텐츠를 구성하세요.</p>
    </div>
  );
}
