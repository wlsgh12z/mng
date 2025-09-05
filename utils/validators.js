// utils/validators.js
export const isNonEmpty = (v) => v != null && String(v).trim() !== "";
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||""));
export const isKoreaPhone = (v) => /^(01\d-?\d{3,4}-?\d{4})$/.test(String(v||""));
export const isIP = (v) => /^(\d{1,3}\.){3}\d{1,3}$/.test(String(v||""));
export const isUserId = (v) => /^[a-zA-Z0-9_\-]{4,32}$/.test(String(v||""));
