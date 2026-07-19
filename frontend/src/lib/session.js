export const STORAGE_KEYS = {
  session: "cargoflux-session",
};

export function readStorage(key, fallback) {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function clearStorage(key) {
  window.sessionStorage.removeItem(key);
}
