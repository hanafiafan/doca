'use client';
import { useOrderStore } from '@/store/useOrderStore';
import { formatRupiah } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export default function AdminOverview() {
  const { orders } = useOrderStore();
  
  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
  const revenue = todayOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalPrice : 0), 0);
  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const itemsSold = todayOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalItems : 0), 0);

  const stats = [
    { label: 'Pesanan Hari Ini', value: todayOrders.length, icon: '📋', color: '#3b82f6' },
    { label: 'Pendapatan (Hari Ini)', value: formatRupiah(revenue), icon: '💰', color: '#10b981' },
    { label: 'Item Terjual (Hari Ini)', value: itemsSold, icon: '🍩', color: '#f59e0b' },
    { label: 'Pesanan Aktif', value: activeOrders.length, icon: '🔥', color: '#ef4444' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Ringkasan</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
                <div style={{ width: '40px', height: '4px', background: stat.color, borderRadius: '2px' }} />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>{stat.value}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{stat.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Pesanan Terbaru</h2>
      <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
        {orders.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Belum ada pesanan.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>ID Pesanan</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Pelanggan</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Total</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>{order.id}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{order.customer.name}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{formatRupiah(order.totalPrice)}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, background: 'var(--glass-bg)' }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GlassCard>
    </div>
  );
}
