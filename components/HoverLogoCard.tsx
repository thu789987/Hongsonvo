import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface HoverLogoCardProps {
  children?: React.ReactNode;
  logoSrc?: string;
  className?: string;
}

export function HoverLogoCard({ children, logoSrc, className }: HoverLogoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 1. Khởi tạo giá trị theo dõi tọa độ chuột
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Thiết lập thông số Vật lý (Physics) đúng như bạn yêu cầu
  const springConfig = { damping: 100, stiffness: 300, mass: 1 };
  
  // Áp dụng physics vào tọa độ
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Cập nhật tọa độ chuột liên tục
  const handleMouseMove = (e: MouseEvent) => {
    // Đẩy X sang phải một xíu để logo không đè lên con trỏ chuột
    mouseX.set(e.clientX + 15); 
    // Top cách chuột 20px (Y + 20)
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
      {/* Khung Card của bạn */}
      {children}

      {/* Hiệu ứng Logo xuất hiện / biến mất */}
      <AnimatePresence>
        {isHovered && logoSrc && (
          <motion.img 
            src={logoSrc} 
            alt="Floating Logo"
            // Gắn tọa độ vật lý vào Logo
            style={{
              x: springX,
              y: springY,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '150px',       // Kích thước fix cứng 150x150
              height: '150px',
              borderRadius: '20px', // Bo góc 20px
              objectFit: 'cover',   // Giữ tỷ lệ ảnh đẹp, không bị méo
              pointerEvents: 'none',// Tránh gián đoạn chuột
              zIndex: 9999,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            // Hiệu ứng Fade-in / Zoom-in nhẹ khi bắt đầu hover
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }} // Thời gian xuất hiện (không ảnh hưởng tới physics di chuyển)
          />
        )}
      </AnimatePresence>
    </div>
  );
}