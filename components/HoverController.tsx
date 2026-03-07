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
      <div 
        className={className} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          border: 'none', 
          outline: 'none'
        }}
      >
        
        <div 
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          style={{ width: 'fit-content', border: 'none' }} 
        >
          {trigger}
        </div>

        {/* 👇 BÍ QUYẾT Ở ĐÂY: Dùng {children && ...} để ẩn hoàn toàn thẻ div khi không có nội dung */}
        {children && (
          <div style={{ border: 'none' }}>
             {children}
          </div>
        )}

      </div>
    </DataProvider>
  );
}