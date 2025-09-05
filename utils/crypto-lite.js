// utils/crypto-lite.js
// Light-weight hashing (development only). For production use bcrypt/argon2.
import crypto from "node:crypto";

export function sha256(str) {
  return crypto.createHash("sha256").update(String(str)).digest("hex");
}
