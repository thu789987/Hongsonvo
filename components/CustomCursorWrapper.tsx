"use client";

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

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    // 👇 CHÌA KHÓA: Nếu đây là lần đầu tiên hover (giá trị đang là 0)
    // thì cho nó "nhảy vọt" tới vị trí chuột thay vì chạy từ 0 lên.
    if (mouseX.get() === 0 && mouseY.get() === 0) {
      mouseX.jump(e.clientX - 40);
      mouseY.jump(e.clientY - 40);
    } else {
      mouseX.set(e.clientX - 40);
      mouseY.set(e.clientY - 40);
    }
  };

  // Khi rời khỏi, reset về 0 để chuẩn bị cho lần hover tiếp theo
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = (e: MouseEvent) => {
    setIsHovered(true);
    // Cập nhật vị trí ngay lập tức khi vừa chạm vào
    mouseX.jump(e.clientX - 40);
    mouseY.jump(e.clientY - 40);
  };

  return (
    <div 
      className={`custom-cursor-container ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
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
              mixBlendMode: 'difference',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}