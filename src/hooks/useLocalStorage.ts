import { StorageError } from "@/enums";

function isQuotaExceededError(err: unknown) {
  return (
    err instanceof DOMException &&
    (err.code === 22 ||
      err.code === 1014 ||
      err.name === "QuotaExceededError" ||
      err.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
}

function isStorageSupported() {
  let storage: Storage | undefined;

  try {
    storage = window.localStorage;
    if (!storage) {
      return false;
    }

    const __storageTest__ = "__storage_test__";
    storage.setItem(__storageTest__, __storageTest__);
    storage.removeItem(__storageTest__);

    return true;
  } catch (err: unknown) {
    if (!storage) {
      return false;
    }

    const isValidQuotaExceededError = isQuotaExceededError(err) && storage.length > 0;
    return isValidQuotaExceededError;
  }
}

function parseStorageError(err: unknown) {
  if (!isStorageSupported()) {
    return {
      code: StorageError.StorageNotSupported,
      message: "Local storage is not supported.",
    };
  }

  if (isQuotaExceededError(err)) {
    return {
      code: StorageError.StorageOutOfSpace,
      message: "No enough space to store the item in local storage.",
    };
  }

  return {
    code: StorageError.UnknownError,
    message: "Something went wrong while accessing the local storage",
  };
}

export function useLocalStorage<D>(key: string) {
  function getStorageItem() {
    try {
      const item = window.localStorage.getItem(key);
      return item
        ? (JSON.parse(item) as D)
        : {
            code: StorageError.ItemNotFound,
            message: `The item with "${key}" key is not found in local storage.`,
          };
    } catch (err: unknown) {
      console.error("Error getting storage item: ", err);

      const error = parseStorageError(err);
      return error;
    }
  }

  function removeStorageItem() {
    try {
      window.localStorage.removeItem(key);
    } catch (err: unknown) {
      console.error("Error removing storage item: ", err);

      const error = parseStorageError(err);
      return error;
    }
  }

  function setStorageItem(data: D) {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (err: unknown) {
      console.error("Error setting storage item: ", err);

      const error = parseStorageError(err);
      return error;
    }
  }

  return { getStorageItem, removeStorageItem, setStorageItem } as const;
}
