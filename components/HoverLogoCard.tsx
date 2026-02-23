import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface HoverLogoCardProps {
  children?: React.ReactNode;
  logoSrc?: string;
  className?: string;
}

export function HoverLogoCard({ children, logoSrc, className }: HoverLogoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 🚀 BÍ QUYẾT TẠO QUÁN TÍNH NẰM Ở ĐÂY:
  // mass: 1.2 -> Cảm giác logo nặng hơn một chút
  // stiffness: 150 -> Lò xo giãn mềm hơn, không bị giật cục
  // damping: 15 -> Ít ma sát, cho phép văng trượt theo quán tính
  const springConfig = { damping: 15, stiffness: 150, mass: 1.2 };
  
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    // Top cách chuột 20px, Left cách 15px
    mouseX.set(e.clientX + 15); 
    mouseY.set(e.clientY + 20); 
  };

  return (
    <div 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', display: 'inline-block', width: '100%', cursor: 'pointer' }}
    >
      {children}

      <AnimatePresence>
        {isHovered && logoSrc && (
          <motion.img 
            src={logoSrc} 
            alt="Floating Logo"
            style={{
              x: springX,
              y: springY,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '150px',
              height: '150px',
              borderRadius: '20px',
              objectFit: 'cover',
              pointerEvents: 'none',
              zIndex: 9999,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}