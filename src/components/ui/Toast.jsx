'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';

export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
}));

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: 9999
    }}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="glass-panel"
            style={{
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: toast.type === 'error' ? 'rgba(254, 226, 226, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              borderLeft: `4px solid ${toast.type === 'error' ? '#ef4444' : '#F5A623'}`
            }}
          >
            <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}</span>
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)}
              style={{ marginLeft: '12px', opacity: 0.5 }}
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
