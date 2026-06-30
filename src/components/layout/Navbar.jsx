'use client';
import Link from 'next/link';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useState, useEffect } from 'react';

export function Navbar() {
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={isScrolled ? 'glass-nav' : ''}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background-color 0.3s, backdrop-filter 0.3s, border-bottom 0.3s',
        borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
        background: isScrolled ? 'rgba(251, 251, 253, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none'
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1100px',
          height: '60px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <Sparkles size={18} color="var(--primary)" />
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.5px' }}>
            DOCA<span style={{ color: 'var(--primary)' }}>!</span>
          </span>
        </Link>

        <nav style={{ display: 'none', gap: '2.5rem', '@media (minWidth: 768px)': { display: 'flex' } }}>
          <Link href="#menu" style={{ color: 'var(--foreground)', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}>Menu</Link>
          <Link href="#packages" style={{ color: 'var(--foreground)', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}>Packages</Link>
          <Link href="#about" style={{ color: 'var(--foreground)', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}>About</Link>
          <Link href="/tracking" style={{ color: 'var(--foreground)', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}>Track Order</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={openCart}
            style={{ 
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              fontWeight: 600,
              color: 'var(--foreground)',
              fontSize: '0.9rem',
              padding: '0.5rem',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && <span style={{ background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px' }}>{totalItems}</span>}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
