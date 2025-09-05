import { index, route } from "@react-router/dev/routes";

export default [
  index("./view/login.jsx"),                 // 루트(/) 페이지
  route("/api/login", "./api/login.js"),
  route("/api/refresh-token", "./api/refresh-token.js"),
];
