import React from 'react';

interface InfiniteScrollProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number; 
  pauseOnHover?: boolean; 
  gap?: number;
  direction?: "left" | "right";
  repeatCount?: number; // 👇 Thêm biến số lượng nhân bản
}

export function InfiniteScroll({ 
  children, 
  className, 
  speed = 20, 
  pauseOnHover = true,
  gap = 20,
  direction = "left",
  repeatCount = 4 // Mặc định nhân lên 4 lần cho chắc ăn
}: InfiniteScrollProps) {
  
  const animationName = direction === "right" ? "infinite-scroll-right" : "infinite-scroll-left";

  // 👇 Phép thuật nhân bản: Tạo ra một mảng chứa N lần children của bạn
  const repeatedContent = Array.from({ length: repeatCount }).map((_, index) => (
    <React.Fragment key={index}>
      {children}
    </React.Fragment>
  ));

  return (
    <div 
      className={className} 
      style={{ 
        overflow: 'hidden', 
        display: 'flex', 
        width: '100%',
        position: 'relative'
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
        {/* Nhóm 1: Chứa N bản sao */}
        <div className="scroll-item">
          {repeatedContent}
        </div>
        
        {/* Nhóm 2: Chứa N bản sao (Để nối đuôi mượt mà) */}
        <div className="scroll-item" aria-hidden="true">
          {repeatedContent}
        </div>
      </div>
    </div>
  );
}