type Listener = () => void;

class LocalStore<T> {
  private key: string;
  private value: T;
  private listeners = new Set<Listener>();

  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.value = this.read(defaultValue);

    if (typeof window !== "undefined") {
      window.addEventListener("storage", (event) => {
        if (event.key === this.key) {
          this.value = this.read(defaultValue);
          this.emit();
        }
      });
    }
  }

  private read(defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    try {
      const raw = window.localStorage.getItem(this.key);
      return raw ? (JSON.parse(raw) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private emit() {
    this.listeners.forEach((listener) => listener());
  }

  getSnapshot = (): T => this.value;

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  setValue = (updater: T | ((prev: T) => T)) => {
    const next =
      typeof updater === "function"
        ? (updater as (prev: T) => T)(this.value)
        : updater;
    this.value = next;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(this.key, JSON.stringify(next));
      } catch {
        // localStorage no disponible o cuota excedida: se ignora silenciosamente
      }
    }
    this.emit();
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stores = new Map<string, LocalStore<any>>();

export function getLocalStore<T>(key: string, defaultValue: T): LocalStore<T> {
  if (!stores.has(key)) {
    stores.set(key, new LocalStore<T>(key, defaultValue));
  }
  return stores.get(key) as LocalStore<T>;
}
