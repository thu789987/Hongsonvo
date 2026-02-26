"use client";

import React, { useState, MouseEvent, useEffect } from 'react';
// 👇 1. Import thêm createPortal từ thư viện react-dom
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface HoverLogoCardProps {
  children?: React.ReactNode;
  logoSrc?: string;
  className?: string;
}

export function HoverLogoCard({ children, logoSrc, className }: HoverLogoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 👇 2. Thêm biến mounted để tránh lỗi giao diện của Next.js (Hydration error)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 1.2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseEnter = (e: MouseEvent) => {
    setIsHovered(true);
    mouseX.jump(e.clientX + 15);
    mouseY.jump(e.clientY + 20);
    springX.jump(e.clientX + 15);
    springY.jump(e.clientY + 20);
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX + 15); 
    mouseY.set(e.clientY + 20); 
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', display: 'inline-block', width: '100%', cursor: 'pointer' }}
    >
      {/* Giữ nguyên nội dung Card */}
      {children}

      {/* 👇 3. BỌC LOGO BẰNG CREATE PORTAL ĐỂ THOÁT KHỎI THẺ CHA */}
      {mounted && typeof document !== 'undefined' && createPortal(
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
                zIndex: 99999, // Cho số to lên để nó luôn đè lên trên cùng
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }} 
            />
          )}
        </AnimatePresence>,
        document.body // Đưa hẳn element này ra ngoài thẻ body
      )}
    </div>
  );
}