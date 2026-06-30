'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useOrderStore } from '@/store/useOrderStore';
import { formatRupiah } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, QrCode, MapPin, Store, PartyPopper, ArrowRight, Home } from 'lucide-react';

export default function Checkout() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  
  const [step, setStep] = useState(1); // 1: Info, 2: Payment Sim, 3: Success
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', delivery: 'pickup', payment: 'qris' });
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (items.length === 0 && step === 1) {
      router.push('/');
    }
  }, [items, step, router]);

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert('Nama dan No HP wajib diisi!');
    if (formData.delivery === 'delivery' && !formData.address) return alert('Alamat wajib diisi untuk delivery!');
    
    // Create order in store
    const id = createOrder({
      customer: { name: formData.name, phone: formData.phone, address: formData.address },
      deliveryMethod: formData.delivery,
      paymentMethod: formData.payment,
      items: [...items],
      totalItems: items.reduce((sum, item) => sum + item.qty, 0),
      totalPrice: getSubtotal()
    });
    
    setOrderId(id);
    setStep(2); // Go to payment sim
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setStep(3); // Go to success
  };

  if (items.length === 0 && step === 1) return null;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '800px' }}>
      <AnimatePresence mode="wait">
        
        {/* STEP 1: FORM */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--foreground)' }}>
              <CreditCard size={32} color="var(--primary)" /> Checkout
            </h1>
            
            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
              <GlassCard>
                <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--foreground)' }}>Nama Lengkap *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--foreground)' }}>No. WhatsApp *</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--foreground)' }}>Metode Pengambilan</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <label style={{ flex: 1, padding: '1rem', border: formData.delivery === 'pickup' ? '2px solid var(--primary)' : '1px solid var(--glass-border)', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', background: 'rgba(255,255,255,0.5)', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="radio" name="delivery" value="pickup" checked={formData.delivery === 'pickup'} onChange={() => setFormData({...formData, delivery: 'pickup'})} style={{ display: 'none' }} />
                        <Store size={24} color={formData.delivery === 'pickup' ? 'var(--primary)' : 'var(--text-muted)'} />
                        <span style={{ fontWeight: formData.delivery === 'pickup' ? 700 : 500, color: formData.delivery === 'pickup' ? 'var(--primary)' : 'var(--foreground)' }}>Pick-up</span>
                      </label>
                      <label style={{ flex: 1, padding: '1rem', border: formData.delivery === 'delivery' ? '2px solid var(--primary)' : '1px solid var(--glass-border)', borderRadius: '12px', cursor: 'pointer', textAlign: 'center', background: 'rgba(255,255,255,0.5)', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="radio" name="delivery" value="delivery" checked={formData.delivery === 'delivery'} onChange={() => setFormData({...formData, delivery: 'delivery'})} style={{ display: 'none' }} />
                        <MapPin size={24} color={formData.delivery === 'delivery' ? 'var(--primary)' : 'var(--text-muted)'} />
                        <span style={{ fontWeight: formData.delivery === 'delivery' ? 700 : 500, color: formData.delivery === 'delivery' ? 'var(--primary)' : 'var(--foreground)' }}>Delivery</span>
                      </label>
                    </div>
                  </div>

                  {formData.delivery === 'delivery' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--foreground)' }}>Alamat Lengkap *</label>
                      <textarea 
                        required 
                        rows={3}
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        className="input-field"
                      />
                    </motion.div>
                  )}

                  <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', marginTop: '1rem' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>Ringkasan Pesanan</h3>
                    {items.map(item => (
                      <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
                        <span>{item.name} x{item.qty}</span>
                        <span style={{ fontWeight: 600 }}>{formatRupiah(item.price * item.qty)}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px dashed rgba(0,0,0,0.1)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
                      <span>Total</span>
                      <span>{formatRupiah(getSubtotal())}</span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" fullWidth>
                    Lanjut Pembayaran <ArrowRight size={18} />
                  </Button>
                </form>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {/* STEP 2: PAYMENT SIMULATOR */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -50 }} className="flex-center" style={{ minHeight: '60vh' }}>
            <GlassCard style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <QrCode size={48} strokeWidth={1.5} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--foreground)' }}>Scan QRIS (Simulasi)</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Total: <strong style={{ color: 'var(--foreground)' }}>{formatRupiah(getSubtotal())}</strong></p>
              
              <div style={{ width: '200px', height: '200px', background: 'white', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <QrCode size={100} color="var(--primary-light)" strokeWidth={1} />
              </div>
              
              <Button fullWidth onClick={handlePaymentSuccess}>
                Simulasi Pembayaran Berhasil
              </Button>
            </GlassCard>
          </motion.div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex-center" style={{ minHeight: '60vh' }}>
            <GlassCard style={{ textAlign: 'center', maxWidth: '500px', width: '100%', padding: '3rem 2rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <PartyPopper size={64} strokeWidth={1.5} />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--foreground)' }}>Pesanan Berhasil!</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Terima kasih telah memesan di DOCA!</p>
              
              <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px dashed var(--primary)', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Nomor Pesanan</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)', letterSpacing: '2px' }}>{orderId}</div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <Button fullWidth onClick={() => router.push('/tracking')}>
                  <MapPin size={18} /> Lacak Pesanan
                </Button>
                <Button fullWidth variant="secondary" onClick={() => router.push('/')}>
                  <Home size={18} /> Kembali ke Beranda
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
}
