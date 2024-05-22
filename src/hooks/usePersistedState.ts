import { useState, useEffect } from 'react';

export function usePersistedState<T>(key: string, defaultValue: T) {
  const [get, set] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  console.log(get, set)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(get));
  }, [get, key]);

  return {get, set};
}

