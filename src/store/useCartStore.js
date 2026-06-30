import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getProductById } from '../lib/products';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addItem: (productId, qty = 1) => {
        set((state) => {
          const existing = state.items.find(i => i.productId === productId);
          if (existing) {
            return {
              items: state.items.map(i => 
                i.productId === productId ? { ...i, qty: i.qty + qty } : i
              ),
              isCartOpen: true
            };
          }
          const product = getProductById(productId);
          if (!product) return state;

          return {
            items: [...state.items, {
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              qty
            }],
            isCartOpen: true
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(i => i.productId !== productId)
        }));
      },

      updateQty: (productId, qty) => {
        set((state) => {
          if (qty <= 0) {
            return { items: state.items.filter(i => i.productId !== productId) };
          }
          return {
            items: state.items.map(i => 
              i.productId === productId ? { ...i, qty } : i
            )
          };
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.qty), 0);
      }
    }),
    {
      name: 'doca-cart-storage'
    }
  )
);
