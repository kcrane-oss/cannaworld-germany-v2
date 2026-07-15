import "@testing-library/jest-dom";
import i18n from "@/i18n";
import { beforeAll } from "vitest";

// Node 26 exposes an unusable global localStorage unless a backing file is
// configured, and this jsdom version does not provide one consistently.
// Install a deterministic in-memory Storage implementation for tests only.
const storageValues = new Map<string, string>();
const testStorage: Storage = {
  get length() {
    return storageValues.size;
  },
  clear: () => storageValues.clear(),
  getItem: (key) => storageValues.get(key) ?? null,
  key: (index) => [...storageValues.keys()][index] ?? null,
  removeItem: (key) => {
    storageValues.delete(key);
  },
  setItem: (key, value) => {
    storageValues.set(key, String(value));
  },
};
Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: testStorage,
});
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: testStorage,
});

beforeAll(async () => {
  window.localStorage.clear();
  await i18n.changeLanguage("en");
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Stub IntersectionObserver for components that lazy-mount via it.
class IntersectionObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverStub,
});
