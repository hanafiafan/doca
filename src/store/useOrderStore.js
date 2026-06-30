import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const STATUSES = [
  { key: 'pending', label: 'Pesanan Diterima', icon: '📋' },
  { key: 'confirmed', label: 'Dikonfirmasi', icon: '✅' },
  { key: 'baking', label: 'Sedang Dipanggang', icon: '🔥' },
  { key: 'topping', label: 'Pemberian Topping', icon: '🍫' },
  { key: 'packing', label: 'Dikemas', icon: '📦' },
  { key: 'ready', label: 'Siap Dikirim/Diambil', icon: '🚀' },
  { key: 'delivered', label: 'Selesai', icon: '🎉' }
];

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (orderData) => {
        const id = 'DOCA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const newOrder = {
          ...orderData,
          id,
          status: 'pending',
          statusHistory: [{
            status: 'pending',
            timestamp: new Date().toISOString()
          }],
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders]
        }));
        
        return id;
      },

      updateOrderStatus: (orderId, newStatus) => {
        set((state) => ({
          orders: state.orders.map(order => {
            if (order.id === orderId) {
              return {
                ...order,
                status: newStatus,
                statusHistory: [...order.statusHistory, {
                  status: newStatus,
                  timestamp: new Date().toISOString()
                }]
              };
            }
            return order;
          })
        }));
      },

      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map(order => {
            if (order.id === orderId) {
              return {
                ...order,
                status: 'cancelled',
                statusHistory: [...order.statusHistory, {
                  status: 'cancelled',
                  timestamp: new Date().toISOString()
                }]
              };
            }
            return order;
          })
        }));
      }
    }),
    {
      name: 'doca-orders-storage'
    }
  )
);
