import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

type PersistedStateArgs<T = unknown> = {
  initialValue: T;
  key: string;
};

export function usePersistedState<T = unknown>(args: PersistedStateArgs<T>) {
  const { initialValue, key } = args;
  const { getStorageItem, setStorageItem } = useLocalStorage<T>(key);

  const [value, setValue] = useState<T>(() => {
    const storageItem = getStorageItem();

    if (storageItem && typeof storageItem === "object" && "code" in storageItem) {
      return initialValue;
    }

    return storageItem;
  });

  useEffect(() => {
    setStorageItem(value);
  }, [setStorageItem, value]);

  return [value, setValue] as const;
}
