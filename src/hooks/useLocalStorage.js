import { useEffect, useState } from 'react';

// useState that persists to localStorage as JSON.
// `normalize` can upgrade data saved by older versions of the app.
export function useLocalStorage(key, initialValue, normalize = (v) => v) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item === null ? initialValue : normalize(JSON.parse(item));
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable — ignore */
    }
  }, [key, value]);

  return [value, setValue];
}
