'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Lock, User, X, Loader2 } from 'lucide-react';
import { Button } from './Button';

export function AdminLoginModal({ isOpen, onClose }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login network request
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        router.push('/admin');
        onClose();
      } else {
        setError('Username atau password salah.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              zIndex: 99999,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              width: '100%',
              maxWidth: '400px',
              zIndex: 100000,
              padding: '2rem',
            }}
          >
            <div className="glass-panel" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.95)' }}>
              <button 
                onClick={onClose}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
              
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Lock size={24} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)' }}>Admin Access</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Silakan masuk untuk mengelola pesanan.</p>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      placeholder="Username (admin)" 
                      className="input-field"
                      style={{ paddingLeft: '2.75rem', background: '#f8f8fa' }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="password" 
                      placeholder="Password (admin123)" 
                      className="input-field"
                      style={{ paddingLeft: '2.75rem', background: '#f8f8fa' }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                {error && <div style={{ color: 'var(--primary)', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}
                
                <Button fullWidth type="submit" style={{ marginTop: '0.5rem', height: '3rem', borderRadius: '12px' }} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Masuk Dashboard'}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
