'use client';
import { useState } from 'react';
import { useOrderStore, STATUSES } from '@/store/useOrderStore';
import { formatRupiah } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export default function AdminOrders() {
  const { orders, updateOrderStatus, cancelOrder } = useOrderStore();
  const [editingId, setEditingId] = useState(null);

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
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Kelola Pesanan</h1>
      </div>

      <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
        {orders.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Belum ada pesanan.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>ID & Waktu</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Pelanggan</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Metode</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Total</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Aksi</th>
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
                      <div style={{ fontWeight: 600 }}>{order.customer.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.customer.phone}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ fontSize: '0.85rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0,0,0,0.05)' }}>
                        {order.deliveryMethod === 'delivery' ? '🚚 Delivery' : '🏪 Pick-up'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>{formatRupiah(order.totalPrice)}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, 
                        background: order.status === 'delivered' ? '#dcfce7' : order.status === 'cancelled' ? '#fee2e2' : 'var(--primary-light)',
                        color: order.status === 'delivered' ? '#166534' : order.status === 'cancelled' ? '#991b1b' : 'var(--foreground)'
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
                            style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--primary)', outline: 'none' }}
                          >
                            <option value={order.status} disabled>-- Update Status --</option>
                            {STATUSES.map(s => <option key={s.key} value={s.key}>{s.icon} {s.label}</option>)}
                            <option value="cancelled">❌ Batalkan</option>
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
