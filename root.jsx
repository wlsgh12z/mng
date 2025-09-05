// root.jsx
import { Outlet, Scripts, ScrollRestoration, Links, Meta } from "react-router";
import "@css/global.css";         // 전역 CSS는 여기서 한 번만
import "@utils/globals.js";       // 전역 유틸 등록은 여기에서만

export default function Root() {
  return (
    <html lang="ko">
      <head>
        <Meta />
        <Links />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>관리자</title>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
