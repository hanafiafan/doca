'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isClient) return null;

  return (
    <motion.div
      animate={{
        x: mousePosition.x - 300,
        y: mousePosition.y - 300,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232, 63, 111, 0.08) 0%, rgba(255, 117, 151, 0.03) 40%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'multiply'
      }}
    />
  );
}
