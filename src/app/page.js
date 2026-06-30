'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BOX_PACKAGES } from '@/lib/products';
import { formatRupiah } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Flame, ShoppingBag, Info, Package, Banknote, Target, Plus, Loader2, Star, ChevronRight, Sparkles } from 'lucide-react';

export default function Home() {
  const { addItem } = useCartStore();
  const { addToast } = useToastStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addItem(product.id, 1);
    addToast(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleAddPackage = (pkg) => {
    if (products.length === 0) return addToast('Produk belum dimuat, coba lagi!', 'error');
    const perProduct = Math.floor(pkg.qty / products.length);
    const remainder = pkg.qty % products.length;
    
    products.forEach((p, i) => {
      const qty = perProduct + (i < remainder ? 1 : 0);
      if (qty > 0) addItem(p.id, qty);
    });
    addToast(`Paket ${pkg.name} (${pkg.qty} pcs) ditambahkan!`);
  };

  return (
    <div style={{ paddingBottom: '0', paddingTop: '100px' }}>
      {/* Hero Section */}
      <section style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ zIndex: 10 }}
          >
            <Badge variant="primary" style={{ marginBottom: '1.5rem', display: 'inline-flex', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <Flame size={16} style={{ marginRight: '6px' }} />
              Trending #1 di Surakarta
            </Badge>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.03em', color: 'var(--foreground)' }}>
              Donat Pancake <br />Mini <span className="text-gradient">Premium</span> <br />Harga Mahasiswa.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '480px' }}>
              Rasakan kelezatan donat pancake bertekstur <span style={{fontWeight: 700, color: 'var(--foreground)'}}>fluffy</span> dengan 7 varian topping premium lumer. Dipanggang sempurna, bukan digoreng!
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="#menu" style={{ textDecoration: 'none' }}>
                <Button size="lg" style={{ padding: '0 2rem', height: '3.5rem', fontSize: '1.1rem', borderRadius: '99px' }}>
                  <ShoppingBag size={20} /> Pesan Sekarang
                </Button>
              </Link>
              <Link href="#about" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="lg" style={{ padding: '0 2rem', height: '3.5rem', fontSize: '1.1rem', borderRadius: '99px', background: 'white' }}>
                  <Info size={20} /> Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px', aspectRatio: '4/4', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(232, 63, 111, 0.15)' }}>
              <Image src="/images/hero.png" alt="DOCA Donat Pancake Mini" fill style={{ objectFit: 'cover' }} priority />
              
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="glass-panel"
                style={{ position: 'absolute', bottom: '2rem', right: '-1rem', padding: '1rem 1.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.85)' }}
              >
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '4px' }}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary-dark)', lineHeight: 1 }}>Rp 5K</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>/ pcs</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Menu Section */}
      <section id="menu" className="section" style={{ background: 'var(--background-start)' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--foreground)', letterSpacing: '-1px' }}>7 Varian Topping Premium</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Pilih favoritmu dan nikmati sensasi lumer di setiap gigitan.</p>
          </motion.div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0', color: 'var(--primary)' }}>
              <Loader2 size={48} className="animate-spin" />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {products.map((product, i) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card-hover"
                  style={{ 
                    background: 'white', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    border: '1px solid rgba(0,0,0,0.04)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ position: 'relative', height: '240px', background: `linear-gradient(135deg, ${product.color}15, white)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}>
                      <span style={{ background: product.color, color: 'white', padding: '6px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                        {product.badge.toUpperCase()}
                      </span>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}
                    >
                      <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.1))' }} />
                    </motion.div>
                  </div>
                  <div style={{ padding: '1.5rem 1.5rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--foreground)' }}>{product.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, lineHeight: 1.5 }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--primary-dark)' }}>{formatRupiah(product.price)}</div>
                      <Button size="sm" onClick={() => handleAddToCart(product)} style={{ borderRadius: '99px' }}>
                        <Plus size={16} /> Tambah
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,117,151,0.04))', paddingBottom: '8rem' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--foreground)', letterSpacing: '-1px' }}>Makin Banyak, Makin Hemat</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Pilih paket box untuk acara kumpul bareng teman & keluarga.</p>
          </motion.div>

          <div className="hide-scrollbar" style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem', snapType: 'x mandatory', margin: '0 -1rem' }}>
            {BOX_PACKAGES.map((pkg, i) => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover"
                style={{ 
                  minWidth: '300px', 
                  flex: '0 0 auto', 
                  scrollSnapAlign: 'center', 
                  position: 'relative', 
                  background: 'white',
                  borderRadius: '24px',
                  padding: '2.5rem 2rem',
                  border: pkg.popular ? '2px solid var(--primary)' : '1px solid rgba(0,0,0,0.05)',
                  boxShadow: pkg.popular ? '0 20px 40px rgba(232, 63, 111, 0.15)' : '0 10px 30px rgba(0,0,0,0.03)'
                }}
              >
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--primary)', color: 'white', padding: '6px 20px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', boxShadow: '0 4px 12px rgba(232, 63, 111, 0.3)' }}>
                    BEST SELLER
                  </div>
                )}
                <div style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ background: pkg.popular ? 'var(--primary)' : 'var(--primary-glow)', color: pkg.popular ? 'white' : 'var(--primary)', padding: '1.25rem', borderRadius: '20px', marginBottom: '1.5rem', transform: 'rotate(-5deg)' }}>
                    <Package size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.25rem' }}>{pkg.name}</h3>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '1.1rem' }}>Isi {pkg.qty} pcs</div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-dark)', lineHeight: 1 }}>
                    {formatRupiah(pkg.price)}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Hanya {formatRupiah(pkg.price / pkg.qty)}/pcs
                  </div>
                </div>
                <Button fullWidth variant={pkg.popular ? 'primary' : 'secondary'} size="lg" style={{ borderRadius: '99px' }} onClick={() => handleAddPackage(pkg)}>
                  Pilih Paket <ChevronRight size={18} />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" style={{ background: 'var(--foreground)', color: 'white', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', marginTop: '-40px', paddingTop: '6rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-1px' }}>Kenapa DOCA! <br/><span style={{ color: 'var(--primary-light)' }}>Berbeda?</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {[
                { icon: Flame, title: '100% Dipanggang', desc: 'Sama sekali tidak digoreng. Tekstur lebih fluffy, lebih sehat, dan tidak berminyak di mulut.' },
                { icon: Package, title: 'Kemasan Estetik', desc: 'Menggunakan paper box food grade dengan stiker hologram premium yang cantik untuk difoto.' },
                { icon: Banknote, title: 'Harga Mahasiswa', desc: 'Kualitas bahan baku premium (cokelat asli, matcha asli) tapi harga tetap ramah di kantong.' }
              ].map((feature, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--primary-light)', padding: '1rem', borderRadius: '16px' }}>
                    <feature.icon size={28} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.25rem' }}>{feature.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.6 }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div style={{ background: 'linear-gradient(145deg, #2a2a40, #1a1a2e)', padding: '4rem 3rem', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ background: 'var(--primary)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white', boxShadow: '0 10px 20px rgba(232, 63, 111, 0.3)' }}>
                <Target size={40} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Visi Kami</h3>
              <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                "Menjadikan DOCA! sebagai pelopor camilan donat pancake mini berbasis teknologi dengan konsep booth container modern yang paling digemari oleh generasi muda di Surakarta dan sekitarnya."
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '6rem', padding: '3rem 0', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Sparkles size={16} color="var(--primary-light)" />
            <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white' }}>DOCA!</span>
          </div>
          <p>© {new Date().getFullYear()} DOCA! Donat Pancake Mini. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}
