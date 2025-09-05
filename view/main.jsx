// view/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

// Pages용 라우트만 사용
import routes from "../routes.spa";

// GitHub Pages 경로(basepath) 지정
const router = createBrowserRouter(routes, { basename: "/mng" });

const el = document.getElementById("root");
createRoot(el).render(<RouterProvider router={router} />);
