import { readYaml } from "@utils/yaml.js";

function genToken() {
  // DEV: random 32 bytes hex
  const rand = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  return rand.slice(0, 48);
}

export async function requestToken({ userid }) {
  // Load menu data from YAML
  const data = readYaml("doc/tbl_adminmenu.yaml");
  const list = Array.isArray(data.tbl_adminmenu) ? data.tbl_adminmenu : [];
  const row = list.find(r => String(r.userid).toLowerCase() === String(userid).toLowerCase());
  // Defaults if missing
  const univinfo = row?.univinfo ?? { univcd: "", univnm: "", term: "" };
  const menu = Array.isArray(row?.menu) ? row.menu : [];

  // 1 hour expiry from now (seconds since epoch)
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60 * 60;

  return {
    token: genToken(),
    exp,
    payload: { userid, univinfo, menu },
  };
}

// Future: real gRPC example
// export async function requestToken({ userid }) {
//   const client = new RealGrpcClient(...);
//   const res = await client.issueToken({ userid });
//   return { token: res.token, exp: res.exp, payload: res.payload };
// }
