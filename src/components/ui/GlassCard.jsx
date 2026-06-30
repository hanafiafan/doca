import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function GlassCard({ children, className, hover = false, ...props }) {
  const Component = hover ? motion.div : 'div';
  
  const hoverProps = hover ? {
    whileHover: { y: -5, scale: 1.01 },
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  } : {};

  return (
    <Component 
      className={cn("glass-panel p-6", className)}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
}
