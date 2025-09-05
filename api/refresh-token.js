// api/refresh-token.js
import { requestToken } from "@utils/grpc.js";

export async function action({ request }) {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "Method Not Allowed" }, { status: 405 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const { userid } = body || {};
  if (!userid) {
    return Response.json({ ok: false, error: "userid required" }, { status: 400 });
  }

  const tokenRes = await requestToken({ userid });
  return Response.json({
    ok: true,
    token: tokenRes.token,
    exp: tokenRes.exp,
    univinfo: tokenRes.payload.univinfo,
    menu: tokenRes.payload.menu
  }, { status: 200 });
}
