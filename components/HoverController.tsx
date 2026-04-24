import React, { useState } from 'react';
import { DataProvider } from '@plasmicapp/loader-nextjs'; 

interface HoverControllerProps {
  children?: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
  onHoverChange?: (isHovered: boolean) => void; 
}

export function HoverController({ 
  children, 
  trigger, 
  className,
  onHoverChange
}: HoverControllerProps) {
  
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (status: boolean) => {
    setIsHovered(status);
    if (onHoverChange) {
      onHoverChange(status);
    }
  };

  return (
    <DataProvider name="hoverData" data={{ isHovered: isHovered }}>
      {/* 👇 BÍ QUYẾT SỬA LỖI: Đưa sự kiện bắt chuột lên thẻ div ngoài cùng này */}
      <div 
        className={className} 
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          border: 'none', 
          outline: 'none',
          position: 'relative' // Nên có relative để định vị Card lơ lửng nếu cần
        }}
      >
        
        {/* Thẻ bọc Trigger giờ chỉ làm nhiệm vụ hiển thị */}
        <div style={{ width: '100%', border: 'none' }}>
          {trigger}
        </div>

        {children && (
          <div style={{ border: 'none' }}>
             {children}
          </div>
        )}

      </div>
    </DataProvider>
  );
}