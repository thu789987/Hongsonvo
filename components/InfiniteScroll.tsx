import React from 'react';

interface InfiniteScrollProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number; // Thời gian chạy 1 vòng
  pauseOnHover?: boolean; // Có dừng khi hover chuột không
  gap?: number; // Khoảng cách giữa các Project
}

export function InfiniteScroll({ 
  children, 
  className, 
  speed = 20, 
  pauseOnHover = true,
  gap = 20
}: InfiniteScrollProps) {
  return (
    // Thẻ bọc ngoài cùng: Cắt phần thừa (overflow: hidden)
    <div 
      className={className} 
      style={{ 
        overflow: 'hidden', 
        display: 'flex', 
        width: '100%',
        position: 'relative'
      }}
    >
      {/* CSS Nhúng trực tiếp để tạo hiệu ứng chạy */}
      <style>{`
        @keyframes infinite-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .scroll-track {
          display: flex;
          width: max-content; /* Bắt buộc để nội dung không bị ép rớt dòng */
          animation: infinite-scroll-left ${speed}s linear infinite;
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

      {/* Đường ray chứa nội dung */}
      <div className="scroll-track">
        {/* Bản gốc (Chứa các project của bạn) */}
        <div className="scroll-item">
          {children}
        </div>
        
        {/* Bản nhân bản (Để nối đuôi mượt mà) */}
        <div className="scroll-item" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}