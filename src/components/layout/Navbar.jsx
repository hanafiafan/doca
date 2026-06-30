'use client';
import Link from 'next/link';
import { ShoppingBag, Menu, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

export function Navbar() {
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '0',
        right: '0',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1.5rem'
      }}
    >
      <div 
        className="glass-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '900px',
          height: '70px',
          padding: '0 1.5rem',
          borderRadius: '99px',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '50%', color: 'var(--primary)' }}>
            <Sparkles size={20} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--foreground)', letterSpacing: '-0.5px' }}>
            DOCA<span style={{ color: 'var(--primary)' }}>!</span>
          </span>
        </Link>

        <nav style={{ display: 'none', gap: '2rem', '@media (minWidth: 768px)': { display: 'flex' } }}>
          <Link href="#menu" style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', transition: 'color 0.2s' }}>Menu</Link>
          <Link href="#packages" style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', transition: 'color 0.2s' }}>Paket Hemat</Link>
          <Link href="/tracking" style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', transition: 'color 0.2s' }}>Lacak Pesanan</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={openCart}
            style={{ 
              background: 'white', 
              border: '1px solid var(--glass-border)',
              padding: '0.6rem 1.2rem',
              borderRadius: '99px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontWeight: 700,
              color: 'var(--primary-dark)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && <span>{totalItems}</span>}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
