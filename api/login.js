import { findAdminByUserId, verifyPassword } from "@lib/yamlDb.js";
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
  const { userid, password } = body || {};
  if (!userid || !password) {
    return Response.json({ ok: false, error: "userid and password required" }, { status: 400 });
  }

  const admin = findAdminByUserId(userid);
  if (!admin || !verifyPassword(admin, password)) {
    return Response.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  // Omit password, enrich with token + claims
  const { password: _omit, ...safeAdmin } = admin;
  const tokenRes = await requestToken({ userid: admin.userid });

  return Response.json({
    ok: true,
    admin: safeAdmin,
    token: tokenRes.token,
    exp: tokenRes.exp,              // epoch seconds when it expires
    univinfo: tokenRes.payload.univinfo,
    menu: tokenRes.payload.menu
  }, { status: 200 });
}
