import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorWrapperProps {
  children?: React.ReactNode;
  cursorIcon?: string;
  className?: string;
}

export function CustomCursorWrapper({ children, cursorIcon, className }: CustomCursorWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    // Trừ đi một nửa kích thước icon (80/2 = 40) để tâm icon ngay mũi chuột
    mouseX.set(e.clientX - 40);
    mouseY.set(e.clientY - 40);
  };

  return (
    <div 
      className={`custom-cursor-container ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* Vũ khí ép tàng hình con chuột mặc định */}
      {isHovered && (
        <style>{`
          .custom-cursor-container,
          .custom-cursor-container * {
            cursor: none !important;
          }
        `}</style>
      )}

      {children}

      <AnimatePresence>
        {isHovered && cursorIcon && (
          <motion.img 
            src={cursorIcon} 
            alt="Custom Cursor"
            style={{
              x: springX,
              y: springY,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '80px',
              height: '80px',
              objectFit: 'contain',
              pointerEvents: 'none',
              zIndex: 9999,
              
              // 👇 PHÉP THUẬT ĐẢO MÀU Ở ĐÂY 👇
              mixBlendMode: 'difference',
              
              // (Tùy chọn) Nếu icon của bạn có màu sắc và bạn muốn nó thành trắng tinh 
              // để hiệu ứng Difference hoạt động tốt nhất, hãy mở comment dòng dưới:
              // filter: 'brightness(0) invert(1)',
            }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.15 }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}