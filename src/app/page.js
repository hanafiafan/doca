'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { BOX_PACKAGES } from '@/lib/products';
import { formatRupiah } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Flame, ShoppingBag, Info, Package, Banknote, Target, Plus, Loader2, Sparkles, MoveRight, CheckCircle2 } from 'lucide-react';

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
    addToast(`${product.name} added to cart!`);
  };

  const handleAddPackage = (pkg) => {
    if (products.length === 0) return addToast('Products loading, please try again!', 'error');
    const perProduct = Math.floor(pkg.qty / products.length);
    const remainder = pkg.qty % products.length;
    
    products.forEach((p, i) => {
      const qty = perProduct + (i < remainder ? 1 : 0);
      if (qty > 0) addItem(p.id, qty);
    });
    addToast(`Package ${pkg.name} (${pkg.qty} pcs) added!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div style={{ paddingBottom: '0', paddingTop: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0.4rem 1rem', background: 'rgba(232, 63, 111, 0.08)', color: 'var(--primary)', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2rem' }}>
              <Sparkles size={14} style={{ marginRight: '6px' }} />
              Pioneering Mini Pancake Donuts in Surakarta
            </div>
            
            <h1 className="tracking-tight" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '1.5rem', color: 'var(--foreground)' }}>
              Pro-Level Pancakes.<br />
              <span className="text-gradient">Miniature Size.</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '600px', fontWeight: 400 }}>
              Fluffy, baked perfection. Topped with premium ingredients. Experience the melt-in-your-mouth sensation that changes everything.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="#menu" style={{ textDecoration: 'none' }}>
                <Button size="lg" style={{ padding: '0 2rem', height: '3.5rem', fontSize: '1.05rem', borderRadius: '99px', fontWeight: 600 }}>
                  Order Now
                </Button>
              </Link>
              <Link href="#packages" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="lg" style={{ padding: '0 2rem', height: '3.5rem', fontSize: '1.05rem', borderRadius: '99px', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', fontWeight: 600 }}>
                  View Packages <MoveRight size={18} style={{ marginLeft: '8px' }} />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
            style={{ width: '100%', maxWidth: '900px', marginTop: '4rem', position: 'relative' }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)', background: 'white' }}>
              <Image src="/images/hero.png" alt="DOCA Donat Pancake Mini" fill style={{ objectFit: 'cover' }} priority />
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
            style={{ textAlign: 'center', marginBottom: '5rem' }}
          >
            <h2 className="tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>
              Seven Premium Flavors.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem' }}>Carefully crafted. Perfectly balanced.</p>
          </motion.div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0', color: 'var(--primary)' }}>
              <Loader2 size={48} className="animate-spin" />
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
            >
              {products.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={itemVariants}
                  className="glass-card-hover"
                  style={{ 
                    background: 'white', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    border: '1px solid rgba(0,0,0,0.02)',
                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ position: 'relative', height: '280px', background: '#f8f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        {product.badge}
                      </span>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}
                    >
                      <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.08))' }} />
                    </motion.div>
                  </div>
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--foreground)', letterSpacing: '-0.5px' }}>{product.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', flex: 1, lineHeight: 1.5 }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--foreground)' }}>{formatRupiah(product.price)}</div>
                      <button 
                        onClick={() => handleAddToCart(product)} 
                        style={{ background: 'var(--foreground)', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="about" className="section" style={{ background: 'white' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 className="tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>
              Engineered for Taste.
            </h2>
          </motion.div>

          <div className="bento-grid">
            {/* Large Bento Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bento-item" 
              style={{ gridColumn: 'span 12', '@media (minWidth: 768px)': { gridColumn: 'span 8' }, background: '#f8f8fa', overflow: 'hidden', position: 'relative', minHeight: '350px' }}
            >
              <div style={{ position: 'relative', zIndex: 10, maxWidth: '60%' }}>
                <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <Flame size={24} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.5px' }}>100% Baked. Never Fried.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Our revolutionary baking process creates a fluffy, melt-in-your-mouth texture that is completely oil-free and healthier than traditional donuts.</p>
              </div>
            </motion.div>

            {/* Small Bento Box 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.1 }}
              className="bento-item" 
              style={{ gridColumn: 'span 12', '@media (minWidth: 768px)': { gridColumn: 'span 4' }, background: 'var(--primary)', color: 'white' }}
            >
              <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Banknote size={24} />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.5px' }}>Student Price.</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: 1.5 }}>Premium quality ingredients like real Belgian chocolate and Kyoto matcha, priced incredibly affordably.</p>
            </motion.div>

            {/* Small Bento Box 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.2 }}
              className="bento-item" 
              style={{ gridColumn: 'span 12', '@media (minWidth: 768px)': { gridColumn: 'span 6' }, background: '#1d1d1f', color: 'white' }}
            >
              <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Package size={24} />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.5px' }}>Aesthetic Packaging.</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.5 }}>Food-grade paper boxes sealed with premium holographic stickers. Designed to look as good as it tastes.</p>
            </motion.div>

            {/* Small Bento Box 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, delay: 0.3 }}
              className="bento-item" 
              style={{ gridColumn: 'span 12', '@media (minWidth: 768px)': { gridColumn: 'span 6' }, background: '#f8f8fa' }}
            >
              <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Target size={24} color="var(--foreground)" />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.5px' }}>Our Vision.</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.5 }}>Pioneering modern mini pancake donuts in Surakarta with innovative technology and modern container booths.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Grid Section */}
      <section id="packages" className="section" style={{ background: 'var(--background-start)' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '5rem' }}
          >
            <h2 className="tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>
              Better Together.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem' }}>Perfect packages for any occasion.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {BOX_PACKAGES.map((pkg, i) => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover"
                style={{ 
                  background: 'white',
                  borderRadius: '24px',
                  padding: '3rem 2rem',
                  border: pkg.popular ? '2px solid var(--primary)' : '1px solid rgba(0,0,0,0.05)',
                  boxShadow: pkg.popular ? '0 20px 40px -10px rgba(232, 63, 111, 0.15)' : '0 10px 30px -10px rgba(0,0,0,0.05)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '6px 16px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                    BEST SELLER
                  </div>
                )}
                
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>{pkg.name}</h3>
                <div style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '1rem', marginBottom: '2.5rem' }}>{pkg.qty} pieces included</div>
                
                <div style={{ marginBottom: '2.5rem', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-1px' }}>{formatRupiah(pkg.price)}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Only {formatRupiah(pkg.price / pkg.qty)} / pc
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={18} color="var(--primary)" /> Mix and match flavors
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={18} color="var(--primary)" /> Premium box packaging
                  </li>
                </ul>
                
                <Button fullWidth variant={pkg.popular ? 'primary' : 'secondary'} size="lg" style={{ borderRadius: '12px', height: '3rem', fontWeight: 600, background: pkg.popular ? 'var(--primary)' : '#f5f5f7', border: 'none', color: pkg.popular ? 'white' : 'var(--foreground)' }} onClick={() => handleAddPackage(pkg)}>
                  Select Package
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#f5f5f7', padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Sparkles size={20} color="var(--foreground)" />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.5px' }}>DOCA!</span>
          </div>
          <p style={{ fontSize: '0.95rem' }}>© {new Date().getFullYear()} DOCA! Donat Pancake Mini. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
