'use client';
import Link from 'next/link';
import { ShoppingCart, LayoutDashboard, Search, Gift, Package, Home, CircleDot } from 'lucide-react';
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
        borderRadius: 'var(--radius-full)'
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
        <CircleDot size={24} color="var(--primary)" strokeWidth={3} />
        <span>DOCA<span style={{ color: 'var(--primary)' }}>!</span></span>
      </Link>

      <nav style={{ display: 'flex', gap: '2.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }} className="nav-links">
        <Link href="/#menu" style={{ transition: 'color 0.2s' }} className="hover:text-foreground">Menu</Link>
        <Link href="/#packages" className="hover:text-foreground">Paket Box</Link>
        <Link href="/tracking" className="hover:text-foreground">Lacak Pesanan</Link>
        <Link href="/admin" style={{ color: 'var(--primary)', fontWeight: 700 }}>Admin</Link>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={openCart}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--foreground)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ShoppingCart size={18} strokeWidth={2.5} />
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
