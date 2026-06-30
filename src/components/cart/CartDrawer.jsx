'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { formatRupiah } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, X, Minus, Plus, CreditCard, ShoppingBag } from 'lucide-react';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQty, getSubtotal } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(4px)',
              zIndex: 100
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="glass-panel"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '400px',
              zIndex: 101,
              borderRadius: '24px 0 0 24px',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--foreground)' }}>
                <ShoppingCart size={20} /> Keranjang
              </h2>
              <button onClick={closeCart} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--foreground)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <ShoppingBag size={48} strokeWidth={1} color="var(--primary-light)" />
                  <p>Keranjangmu masih kosong.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {items.map((item) => (
                    <div key={item.productId} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '0.5rem', borderRadius: '16px' }}>
                      <div style={{ width: '60px', height: '60px', position: 'relative', borderRadius: '12px', overflow: 'hidden', background: 'var(--glass-bg)' }}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)' }}>{item.name}</h4>
                        <div style={{ color: 'var(--primary-dark)', fontWeight: 700, fontSize: '0.9rem' }}>
                          {formatRupiah(item.price)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.05)', borderRadius: '99px', padding: '0.2rem' }}>
                        <button onClick={() => updateQty(item.productId, item.qty - 1)} style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'white', color: 'var(--foreground)' }}>
                          <Minus size={14} />
                        </button>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, width: '20px', textAlign: 'center', color: 'var(--foreground)' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.productId, item.qty + 1)} style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'white', color: 'var(--foreground)' }}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--primary-dark)' }}>{formatRupiah(getSubtotal())}</span>
                </div>
                <Button fullWidth size="lg" onClick={handleCheckout}>
                  <CreditCard size={18} /> Checkout Sekarang
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
