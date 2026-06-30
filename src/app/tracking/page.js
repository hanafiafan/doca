'use client';
import { useState } from 'react';
import { useOrderStore, STATUSES } from '@/store/useOrderStore';
import { formatRupiah } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

export default function Tracking() {
  const { orders } = useOrderStore();
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.id === search.trim().toUpperCase());
    setOrder(found || 'not_found');
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Lacak Pesanan</h1>
        <p style={{ color: 'var(--text-muted)' }}>Masukkan nomor pesananmu untuk mengetahui status terkini.</p>
      </div>

      <GlassCard style={{ marginBottom: '3rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Contoh: DOCA-ABC123" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', letterSpacing: '1px' }}
          />
          <Button type="submit" size="lg">🔍 Cari</Button>
        </form>
      </GlassCard>

      {order === 'not_found' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤷‍♂️</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Pesanan Tidak Ditemukan</h3>
          <p style={{ color: 'var(--text-muted)' }}>Cek kembali nomor pesanan yang kamu masukkan.</p>
        </motion.div>
      )}

      {order && order !== 'not_found' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px dashed var(--glass-border)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)', letterSpacing: '1px' }}>{order.id}</h2>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{new Date(order.createdAt).toLocaleString('id-ID')}</div>
              </div>
              <Badge variant="primary" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                {STATUSES.find(s => s.key === order.status)?.label || order.status}
              </Badge>
            </div>

            {/* Timeline */}
            <div style={{ paddingLeft: '1rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '23px', top: '24px', bottom: '24px', width: '2px', background: 'var(--glass-border)', zIndex: 0 }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {STATUSES.map((status, i) => {
                  const isCompleted = order.statusHistory.some(h => h.status === status.key);
                  const isCurrent = order.status === status.key;
                  const history = order.statusHistory.find(h => h.status === status.key);
                  const isCancelled = order.status === 'cancelled';

                  if (isCancelled && status.key !== 'pending') return null;

                  return (
                    <div key={status.key} style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1, opacity: isCompleted || isCurrent ? 1 : 0.4 }}>
                      <div style={{ 
                        width: '32px', height: '32px', borderRadius: '50%', 
                        background: isCurrent ? 'var(--primary)' : isCompleted ? 'var(--primary-light)' : 'white',
                        border: isCompleted || isCurrent ? 'none' : '2px solid var(--glass-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: isCurrent ? '0 0 0 4px rgba(245, 166, 35, 0.2)' : 'none',
                        fontSize: '14px', zIndex: 2
                      }}>
                        {status.icon}
                      </div>
                      <div style={{ paddingTop: '5px' }}>
                        <div style={{ fontWeight: isCurrent ? 800 : 600, fontSize: '1.1rem', color: isCurrent ? 'var(--primary-dark)' : 'inherit' }}>
                          {status.label}
                        </div>
                        {history && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            {new Date(history.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {order.status === 'cancelled' && (
                  <div style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                      ❌
                    </div>
                    <div style={{ paddingTop: '5px' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ef4444' }}>Dibatalkan</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Pesanan ini telah dibatalkan</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
