import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

export type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, qty: item.qty ?? 1 }] };
    }),
  updateQuantity: (id, qty) =>
    set((state) => {
      if (qty < 1) {
        return { items: state.items.filter((i) => i.id !== id) };
      }
      return {
        items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
      };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
}));
