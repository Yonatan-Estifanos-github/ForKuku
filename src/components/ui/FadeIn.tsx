'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.8,
  className = "",
  ...props 
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
