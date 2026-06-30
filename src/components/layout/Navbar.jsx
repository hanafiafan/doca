'use client';
import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

export function Navbar() {
  const { getTotalItems, openCart } = useCartStore();
  const itemCount = getTotalItems();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="glass-panel"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 2rem)',
        maxWidth: '1200px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.5rem',
        borderRadius: '99px'
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
        <span>🍩</span>
        <span>DOCA<span style={{ color: 'var(--primary)' }}>!</span></span>
      </Link>

      <nav style={{ display: 'flex', gap: '2rem', fontWeight: 500, fontSize: '0.9rem' }} className="nav-links">
        <Link href="/#menu" style={{ transition: 'color 0.2s' }}>Menu</Link>
        <Link href="/#packages">Paket Box</Link>
        <Link href="/tracking">Lacak Pesanan</Link>
        <Link href="/admin" style={{ color: 'var(--primary-dark)' }}>Admin</Link>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={openCart}
          className="glass-panel"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.5rem 1rem',
            borderRadius: '99px',
            background: 'white',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <ShoppingCart size={18} />
          {itemCount > 0 && (
            <motion.span 
              key={itemCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '0.1rem 0.5rem',
                borderRadius: '99px',
                fontSize: '0.8rem'
              }}
            >
              {itemCount}
            </motion.span>
          )}
        </button>
      </div>
    </motion.header>
  );
}
