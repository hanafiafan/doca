'use client';
import { useEffect } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { formatRupiah } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { ClipboardList, Wallet, PackageOpen, Activity, Loader2 } from 'lucide-react';

export default function AdminOverview() {
  const { orders, fetchOrders, loading } = useOrderStore();
  
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
  const revenue = todayOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalPrice : 0), 0);
  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const itemsSold = todayOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalItems : 0), 0);

  const stats = [
    { label: 'Pesanan Hari Ini', value: todayOrders.length, icon: ClipboardList, color: '#3b82f6' },
    { label: 'Pendapatan (Hari Ini)', value: formatRupiah(revenue), icon: Wallet, color: '#10b981' },
    { label: 'Item Terjual (Hari Ini)', value: itemsSold, icon: PackageOpen, color: '#f59e0b' },
    { label: 'Pesanan Aktif', value: activeOrders.length, icon: Activity, color: '#ef4444' }
  ];

  if (loading && orders.length === 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0', color: 'var(--primary)' }}><Loader2 size={48} className="animate-spin" /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)' }}>Ringkasan</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard style={{ padding: '1.5rem', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ color: stat.color }}>
                  <stat.icon size={32} strokeWidth={1.5} />
                </div>
                <div style={{ width: '40px', height: '4px', background: stat.color, borderRadius: '2px', opacity: 0.5 }} />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--foreground)' }}>{stat.value}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{stat.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)' }}>Pesanan Terbaru</h2>
      <GlassCard style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
        {orders.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Belum ada pesanan.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>ID Pesanan</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>Pelanggan</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>Total</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{order.id}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--foreground)' }}>{order.customer.name}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--foreground)' }}>{formatRupiah(order.totalPrice)}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, background: 'var(--glass-bg)', color: 'var(--foreground)' }}>
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
