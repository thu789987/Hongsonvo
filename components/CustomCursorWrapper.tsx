import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorWrapperProps {
  children?: React.ReactNode;
  cursorIcon?: string; // Link ảnh icon (Ví dụ: Nút Play)
  className?: string;
}

export function CustomCursorWrapper({ children, cursorIcon, className }: CustomCursorWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Thông số vật lý mượt mà, bám sát chuột hơn cái Logo lúc nãy
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    // Kích thước icon là 80px, nên ta trừ đi 40px để tâm của Icon nằm chính giữa con trỏ chuột thật
    mouseX.set(e.clientX - 40);
    mouseY.set(e.clientY - 40);
  };

  return (
    <div 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        position: 'relative', 
        width: '100%', 
        // 🚨 BÍ QUYẾT LÀ ĐÂY: Ẩn con chuột thật đi khi hover vào
        cursor: isHovered ? 'none' : 'auto' 
      }}
    >
      {/* Khung chứa Video Card của bạn */}
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
              width: '80px', // Bạn có thể chỉnh to nhỏ ở đây
              height: '80px',
              objectFit: 'contain',
              pointerEvents: 'none', // Bắt buộc để không chặn click vào video
              zIndex: 9999,
            }}
            // Hiệu ứng Pop-up: Phóng to và rõ dần ra khi vừa đưa chuột vào
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