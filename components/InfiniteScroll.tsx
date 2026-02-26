import React from 'react';

interface InfiniteScrollProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number; 
  pauseOnHover?: boolean; 
  gap?: number;
  direction?: "left" | "right";
  repeatCount?: number;
  showFade?: boolean; // 👇 Thêm option bật/tắt mờ 2 bên
}

export function InfiniteScroll({ 
  children, 
  className, 
  speed = 20, 
  pauseOnHover = true,
  gap = 20,
  direction = "left",
  repeatCount = 4,
  showFade = true // Mặc định là có mờ cho đẹp
}: InfiniteScrollProps) {
  
  const animationName = direction === "right" ? "infinite-scroll-right" : "infinite-scroll-left";

  const repeatedContent = Array.from({ length: repeatCount }).map((_, index) => (
    <React.Fragment key={index}>
      {children}
    </React.Fragment>
  ));

  // 👇 Tạo style cho hiệu ứng mờ bằng Linear Gradient
  const fadeStyle: React.CSSProperties = showFade ? {
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
  } : {};

  return (
    <div 
      className={className} 
      style={{ 
        overflow: 'hidden', 
        display: 'flex', 
        width: '100%',
        position: 'relative',
        ...fadeStyle // Áp dụng hiệu ứng mờ vào đây
      }}
    >
      <style>{`
        @keyframes infinite-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        @keyframes infinite-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); } 
        }

        .scroll-track {
          display: flex;
          width: max-content;
          animation: ${animationName} ${speed}s linear infinite;
          gap: ${gap}px;
        }
        
        .scroll-track:hover {
          animation-play-state: ${pauseOnHover ? 'paused' : 'running'};
        }
        
        .scroll-item {
          display: flex;
          gap: ${gap}px;
        }
      `}</style>

      <div className="scroll-track">
        <div className="scroll-item">
          {repeatedContent}
        </div>
        <div className="scroll-item" aria-hidden="true">
          {repeatedContent}
        </div>
      </div>
    </div>
  );
}