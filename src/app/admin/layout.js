'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: '📊 Ringkasan' },
    { href: '/admin/orders', label: '📋 Pesanan' },
    { href: '/', label: '🏠 Kembali ke Toko' },
  ];

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      
      {/* Sidebar */}
      <GlassCard style={{ width: '250px', padding: '1.5rem', position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Admin Panel</h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DOCA! System</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {links.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? 'white' : 'var(--foreground)',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </GlassCard>

      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {children}
      </div>

    </div>
  );
}
