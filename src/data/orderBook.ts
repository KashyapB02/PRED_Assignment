export const ORDER_BOOK_DATA = [
  { id: crypto.randomUUID(), price: 38, shares: 14984, progress: 100, type: "sell", current: false },
  { id: crypto.randomUUID(), price: 37, shares: 14984, progress: 74, type: "sell", current: false },
  { id: crypto.randomUUID(), price: 36, shares: 14984, progress: 66, type: "sell", current: false },
  { id: crypto.randomUUID(), price: 35.5, shares: 14984, progress: 51, type: "sell", current: false },
  { id: crypto.randomUUID(), price: 35, shares: 14984, progress: 43, type: "sell", current: false },
  { id: crypto.randomUUID(), price: 34.5, shares: 14984, progress: 0, type: "none", current: true },
  { id: crypto.randomUUID(), price: 34, shares: 14984, progress: 0, type: "buy", current: false },
  { id: crypto.randomUUID(), price: 33.5, shares: 14984, progress: 22, type: "buy", current: false },
  { id: crypto.randomUUID(), price: 33.4, shares: 14984, progress: 37, type: "buy", current: false },
  { id: crypto.randomUUID(), price: 32, shares: 14984, progress: 57, type: "buy", current: false },
  { id: crypto.randomUUID(), price: 30, shares: 14984, progress: 81, type: "buy", current: false },
] as const;

export type OrderBookData = (typeof ORDER_BOOK_DATA)[number];
