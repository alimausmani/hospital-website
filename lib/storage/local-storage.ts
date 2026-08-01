type StorageTarget = 'local' | 'session';

const getStorage = (target: StorageTarget): Storage | null => {
  if (typeof window === 'undefined') return null;
  return target === 'local' ? window.localStorage : window.sessionStorage;
};

export const getStorageItem = <T>(
  key: string,
  fallback: T,
  target: StorageTarget = 'local',
): T => {
  const storage = getStorage(target);
  if (!storage) return fallback;

  const value = storage.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const setStorageItem = <T>(
  key: string,
  value: T,
  target: StorageTarget = 'local',
): void => {
  const storage = getStorage(target);
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
};

export const removeStorageItem = (
  key: string,
  target: StorageTarget = 'local',
): void => {
  const storage = getStorage(target);
  if (!storage) return;
  storage.removeItem(key);
};
