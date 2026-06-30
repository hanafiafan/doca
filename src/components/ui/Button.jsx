import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  onClick, 
  type = 'button',
  fullWidth = false,
  ...props 
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "btn", 
        `btn-${variant}`, 
        `btn-${size}`, 
        fullWidth ? "btn-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
