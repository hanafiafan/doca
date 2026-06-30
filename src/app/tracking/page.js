'use client';
import { useState, useEffect } from 'react';
import { useOrderStore, STATUSES } from '@/store/useOrderStore';
import { formatRupiah } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import { Search, MapPin, XCircle, SearchX, Loader2 } from 'lucide-react';

export default function Tracking() {
  const { orders, fetchOrders, loading } = useOrderStore();
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.id === search.trim().toUpperCase());
    setOrder(found || 'not_found');
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>Lacak Pesanan</h1>
        <p style={{ color: 'var(--text-muted)' }}>Masukkan nomor pesananmu untuk mengetahui status terkini.</p>
      </div>

      <GlassCard style={{ marginBottom: '3rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Contoh: DOCA-ABC123" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field"
            style={{ flex: 1, fontSize: '1.1rem', letterSpacing: '1px' }}
          />
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />} Cari
          </Button>
        </form>
      </GlassCard>

      {order === 'not_found' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <SearchX size={64} strokeWidth={1} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>Pesanan Tidak Ditemukan</h3>
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
              <div style={{ position: 'absolute', left: '31px', top: '24px', bottom: '24px', width: '2px', background: 'var(--glass-border)', zIndex: 0 }} />
              
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
                        width: '48px', height: '48px', borderRadius: '50%', 
                        background: isCurrent ? 'var(--primary)' : isCompleted ? 'var(--primary-light)' : 'white',
                        color: isCompleted || isCurrent ? 'white' : 'var(--text-muted)',
                        border: isCompleted || isCurrent ? 'none' : '2px solid var(--glass-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: isCurrent ? '0 0 0 4px var(--primary-glow)' : 'none',
                        zIndex: 2
                      }}>
                        <span style={{ fontWeight: 800 }}>{i + 1}</span>
                      </div>
                      <div style={{ paddingTop: '8px' }}>
                        <div style={{ fontWeight: isCurrent ? 800 : 600, fontSize: '1.1rem', color: isCurrent ? 'var(--primary-dark)' : 'var(--foreground)' }}>
                          {status.label}
                        </div>
                        {history && (
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            {new Date(history.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {order.status === 'cancelled' && (
                  <div style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                      <XCircle size={24} />
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ef4444' }}>Dibatalkan</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Pesanan ini telah dibatalkan</div>
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
