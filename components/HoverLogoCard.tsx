import React, { useState, MouseEvent } from 'react';

interface HoverLogoCardProps {
  children?: React.ReactNode; // Slot để bạn nhét Card vào từ Plasmic
  logoSrc?: string;           // Link ảnh logo
  className?: string;
}

export function HoverLogoCard({ children, logoSrc, className }: HoverLogoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Cập nhật tọa độ chuột liên tục khi di chuyển bên trong Card
  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', display: 'inline-block', width: '100%' }}
    >
      {/* Đây là chỗ chứa cái Card gốc của bạn */}
      {children}

      {/* Cái Logo sẽ nổi lên và chạy theo chuột */}
      {isHovered && logoSrc && (
        <img 
          src={logoSrc} 
          alt="Floating Logo"
          style={{
            position: 'fixed', // Cố định theo màn hình để khớp với tọa độ e.clientX/Y
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(15px, 15px)', // Đẩy xích ra một chút để không che mất con trỏ chuột
            pointerEvents: 'none', // CỰC KỲ QUAN TRỌNG: Không để logo cản trở chuột
            zIndex: 9999,
            width: '80px', // Bạn có thể chỉnh kích thước logo ở đây
            height: '80px',
            objectFit: 'contain',
            borderRadius: '50%', // Làm tròn logo nếu muốn
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            transition: 'opacity 0.2s ease', // Hiệu ứng mờ dần khi xuất hiện
          }}
        />
      )}
    </div>
  );
}