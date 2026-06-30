import { create } from 'zustand';

export const STATUSES = [
  { key: 'pending', label: 'Menunggu Pembayaran' },
  { key: 'process', label: 'Diproses' },
  { key: 'ready', label: 'Siap Diambil/Dikirim' },
  { key: 'delivering', label: 'Sedang Diantar' },
  { key: 'delivered', label: 'Selesai' }
];

export const useOrderStore = create(
  (set) => ({
    orders: [],
    loading: false,
    
    fetchOrders: async () => {
      set({ loading: true });
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        set({ orders: Array.isArray(data) ? data : [], loading: false });
      } catch (error) {
        console.error('Failed to fetch orders', error);
        set({ loading: false });
      }
    },
    
    createOrder: async (orderData) => {
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
        const data = await res.json();
        
        // Optimistic update
        const newOrder = {
          ...orderData,
          id: data.id,
          status: 'pending',
          createdAt: new Date().toISOString(),
          statusHistory: [{ status: 'pending', timestamp: new Date().toISOString() }]
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        
        return data.id;
      } catch (error) {
        console.error('Failed to create order', error);
        throw error;
      }
    },
    
    updateOrderStatus: async (id, status) => {
      // Optimistic update
      set((state) => ({
        orders: state.orders.map((o) => {
          if (o.id === id) {
            const history = [...o.statusHistory, { status, timestamp: new Date().toISOString() }];
            return { ...o, status, statusHistory: history };
          }
          return o;
        })
      }));
      
      try {
        await fetch(`/api/orders/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
      } catch (error) {
        console.error('Failed to update order status', error);
      }
    },
    
    cancelOrder: async (id) => {
      // Optimistic update
      set((state) => ({
        orders: state.orders.map((o) => o.id === id ? { ...o, status: 'cancelled' } : o)
      }));
      
      try {
        await fetch(`/api/orders/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'cancelled' })
        });
      } catch (error) {
        console.error('Failed to cancel order', error);
      }
    }
  })
);
