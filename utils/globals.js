// utils/globals.js  — 간소화 버전
import { compactToPretty, parseCompactTS, formatPretty } from "@utils/datetime.js";
import { maskPhone, maskEmail, maskIP } from "@utils/mask.js";
import { login, refreshToken } from "@utils/http.js";
// ✅ 훅은 hooks.js에서만 정의/유지
import { useSession, useCountdown } from "@utils/hooks.js";

export const utils = {
  // 포맷/마스킹
  compactToPretty, parseCompactTS, formatPretty,
  maskPhone, maskEmail, maskIP,

  // API
  login, refreshToken,

  // Hooks (그대로 re-export)
  useSession, useCountdown,
};

// 전역 등록(존재 시 병합)
if (globalThis.utils && typeof globalThis.utils === "object") {
  Object.assign(globalThis.utils, utils);
} else {
  globalThis.utils = utils;
}

export default utils;
