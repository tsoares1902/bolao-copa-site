type CacheItem<T> = {
  data: T;
  expiresAt?: number;
};

const memoryCache = new Map<string, CacheItem<unknown>>();

export function getCache<T>(key: string): T | null {
  const memoryItem = memoryCache.get(key) as CacheItem<T> | undefined;

  if (memoryItem) {
    if (!memoryItem.expiresAt || memoryItem.expiresAt > Date.now()) {
      return memoryItem.data;
    }

    memoryCache.delete(key);
  }

  if (typeof window === 'undefined') {
    return null;
  }

  const rawItem = localStorage.getItem(key);

  if (!rawItem) {
    return null;
  }

  const item = JSON.parse(rawItem) as CacheItem<T>;

  if (item.expiresAt && item.expiresAt <= Date.now()) {
    localStorage.removeItem(key);
    return null;
  }

  memoryCache.set(key, item);

  return item.data;
}

export function setCache<T>(
  key: string,
  data: T,
  ttlInMs?: number,
): void {
  const item: CacheItem<T> = {
    data,
    expiresAt: ttlInMs ? Date.now() + ttlInMs : undefined,
  };

  memoryCache.set(key, item);

  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(item));
  }
}

export function clearCache(key: string): void {
  memoryCache.delete(key);

  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}