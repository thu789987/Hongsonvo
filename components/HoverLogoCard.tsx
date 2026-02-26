"use client";

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

  // 🚀 Cấu hình quán tính siêu mượt
  const springConfig = { damping: 15, stiffness: 150, mass: 1.2 };
  
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 👇 1. Hàm xử lý khi vừa chạm chuột vào Card
  const handleMouseEnter = (e: MouseEvent) => {
    setIsHovered(true);
    // Dịch chuyển tức thời (Jump) giá trị gốc và giá trị lò xo đến thẳng tay bạn
    // Tránh việc logo bay từ góc màn hình ra
    mouseX.jump(e.clientX + 15);
    mouseY.jump(e.clientY + 20);
    springX.jump(e.clientX + 15);
    springY.jump(e.clientY + 20);
  };

  // 2. Hàm xử lý khi chuột di chuyển bên trong Card
  const handleMouseMove = (e: MouseEvent) => {
    // Dùng .set() để lò xo hoạt động trơn tru
    mouseX.set(e.clientX + 15); 
    mouseY.set(e.clientY + 20); 
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter} // Thay đổi ở đây
      onMouseLeave={handleMouseLeave} // Thay đổi ở đây
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
            // Hiệu ứng Fade In và Phóng to nhẹ khi xuất hiện
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