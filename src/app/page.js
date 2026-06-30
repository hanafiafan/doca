'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PRODUCTS, BOX_PACKAGES } from '@/lib/products';
import { formatRupiah } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export default function Home() {
  const { addItem } = useCartStore();
  const { addToast } = useToastStore();

  const handleAddToCart = (product) => {
    addItem(product.id, 1);
    addToast(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleAddPackage = (pkg) => {
    // Add multiple items based on package qty (spread across available products)
    const perProduct = Math.floor(pkg.qty / PRODUCTS.length);
    const remainder = pkg.qty % PRODUCTS.length;
    
    PRODUCTS.forEach((p, i) => {
      const qty = perProduct + (i < remainder ? 1 : 0);
      if (qty > 0) addItem(p.id, qty);
    });
    addToast(`Paket ${pkg.name} (${pkg.qty} pcs) ditambahkan!`);
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(245, 166, 35, 0.1), transparent 50%), radial-gradient(circle at bottom left, rgba(212, 137, 10, 0.05), transparent 50%)', zIndex: -1 }} />
        
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="primary" className="mb-6">🔥 Trending di Surakarta</Badge>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Donat Pancake Mini <span className="text-gradient">Premium</span> Harga Mahasiswa.
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '500px' }}>
              Nikmati kelezatan donat pancake mini bertekstur fluffy dengan 7 varian topping premium. Dipanggang sempurna, bukan digoreng!
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="#menu">
                <Button size="lg">🍩 Pesan Sekarang</Button>
              </Link>
              <Link href="#about">
                <Button variant="secondary" size="lg">Tentang DOCA!</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px', aspectRatio: '1/1' }}>
              <Image src="/images/hero.png" alt="DOCA Donat Pancake Mini" fill style={{ objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }} priority />
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="glass-panel"
                style={{ position: 'absolute', bottom: '10%', right: '0', padding: '1rem 1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>Rp 5K</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>/ pcs</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Menu Section */}
      <section id="menu" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Badge variant="neutral" className="mb-4">Menu Kami</Badge>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>7 Varian Topping Premium</h2>
            <p style={{ color: 'var(--text-muted)' }}>Pilih favoritmu dan nikmati sensasi lumer di setiap gigitan.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {PRODUCTS.map((product, i) => (
              <GlassCard key={product.id} hover style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '240px', background: `${product.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
                    <Badge style={{ background: product.color, color: 'white' }}>{product.badge}</Badge>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain' }} />
                  </div>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{product.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{product.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{formatRupiah(product.price)}</div>
                    <Button size="sm" onClick={() => handleAddToCart(product)}>+ Tambah</Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section" style={{ background: 'rgba(255,255,255,0.5)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Badge variant="neutral" className="mb-4">Paket Box</Badge>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Makin Banyak, Makin Hemat</h2>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '2rem', snapType: 'x mandatory' }}>
            {BOX_PACKAGES.map((pkg) => (
              <GlassCard key={pkg.id} hover style={{ minWidth: '280px', flex: '0 0 auto', scrollSnapAlign: 'start', position: 'relative', border: pkg.popular ? '2px solid var(--primary)' : undefined }}>
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>
                    BEST SELLER
                  </div>
                )}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{pkg.name}</h3>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{pkg.qty} pcs</div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                  {formatRupiah(pkg.price)}
                </div>
                <Button fullWidth variant={pkg.popular ? 'primary' : 'secondary'} onClick={() => handleAddPackage(pkg)}>
                  Pilih Paket
                </Button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* About & Process */}
      <section id="about" className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <Badge variant="neutral" className="mb-4">Tentang DOCA!</Badge>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Kenapa Harus DOCA?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: '🔥', title: '100% Dipanggang', desc: 'Tidak digoreng, lebih sehat dan tidak berminyak.' },
                { icon: '📦', title: 'Kemasan Estetik', desc: 'Paper box food grade + stiker hologram premium.' },
                { icon: '💰', title: 'Harga Terjangkau', desc: 'Kualitas premium dengan harga ramah mahasiswa.' }
              ].map((feature, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.5rem', background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '12px' }}>{feature.icon}</div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{feature.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <GlassCard style={{ padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(245,166,35,0.1), rgba(245,166,35,0.02))' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍩</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Visi Kami</h3>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              "Menjadikan DOCA! sebagai pelopor camilan donat pancake mini berbasis teknologi dengan konsep booth container modern yang paling digemari oleh generasi muda di Surakarta."
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
