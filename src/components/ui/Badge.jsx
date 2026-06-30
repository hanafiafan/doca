import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Badge({ children, variant = 'primary', className }) {
  const variants = {
    primary: "bg-primary/10 text-primary-dark border border-primary/20",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    danger: "bg-red-100 text-red-800 border border-red-200",
    neutral: "bg-gray-100 text-gray-800 border border-gray-200"
  };

  return (
    <motion.span 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
      style={{
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        whiteSpace: 'nowrap'
      }}
    >
      {children}
    </motion.span>
  );
}
