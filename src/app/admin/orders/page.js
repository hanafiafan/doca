'use client';
import { useState, useEffect } from 'react';
import { useOrderStore, STATUSES } from '@/store/useOrderStore';
import { formatRupiah } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { MapPin, Store, Loader2 } from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus, cancelOrder, fetchOrders, loading } = useOrderStore();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = (orderId, newStatus) => {
    if (newStatus === 'cancelled') {
      if (confirm('Yakin ingin membatalkan pesanan ini?')) {
        cancelOrder(orderId);
        setEditingId(null);
      }
    } else {
      updateOrderStatus(orderId, newStatus);
      setEditingId(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)' }}>Kelola Pesanan</h1>
      </div>

      <GlassCard style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
        {loading && orders.length === 0 ? (
          <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center', color: 'var(--primary)' }}>
            <Loader2 size={48} className="animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Belum ada pesanan.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>ID & Waktu</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>Pelanggan</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>Metode</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>Total</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{order.id}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleString('id-ID')}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--foreground)' }}>{order.customer.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.customer.phone}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ fontSize: '0.85rem', padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'var(--surface)', color: 'var(--foreground)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                        {order.deliveryMethod === 'delivery' ? <><MapPin size={14} /> Delivery</> : <><Store size={14} /> Pick-up</>}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>{formatRupiah(order.totalPrice)}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, 
                        background: order.status === 'delivered' ? '#dcfce7' : order.status === 'cancelled' ? '#fee2e2' : 'var(--primary-glow)',
                        color: order.status === 'delivered' ? '#166534' : order.status === 'cancelled' ? '#991b1b' : 'var(--primary-dark)'
                      }}>
                        {STATUSES.find(s => s.key === order.status)?.label || order.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      {order.status !== 'delivered' && order.status !== 'cancelled' ? (
                        editingId === order.id ? (
                          <select 
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            value={order.status}
                            style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--primary)', outline: 'none', background: 'white', color: 'var(--foreground)' }}
                          >
                            <option value={order.status} disabled>-- Update Status --</option>
                            {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                            <option value="cancelled">Batalkan</option>
                          </select>
                        ) : (
                          <Button size="sm" onClick={() => setEditingId(order.id)}>Update</Button>
                        )
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
