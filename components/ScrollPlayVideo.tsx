"use client"; 

import React, { useEffect, useRef } from 'react';

interface ScrollPlayVideoProps {
  videoSrc?: string;
  className?: string;
  transitionSpeed?: number; // 👇 Thêm biến chỉnh tốc độ mượt
}

export const ScrollPlayVideo = ({ 
  videoSrc, 
  className,
  transitionSpeed = 8 // Mặc định là 8
}: ScrollPlayVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    let scrollyVideoInstance: any = null;

    const initVideo = async () => {
      try {
        // Tải thư viện ngầm để không bị Next.js bắt bẻ
        const module: any = await import('scrolly-video');
        
        // Lột vỏ Next.js để lấy Class gốc
        const ScrollyVideoClass = module.default?.default || module.default || module;

        scrollyVideoInstance = new ScrollyVideoClass({
          scrollyVideoContainer: containerRef.current,
          src: videoSrc || "https://scrollyvideo.js.org/goldengate.mp4",
          transitionSpeed: transitionSpeed, // Áp dụng tốc độ tùy chỉnh
          cover: true,   // Tự động kéo giãn lấp đầy màn hình
          sticky: true,  // Tự động bám dính khi cuộn
        });
      } catch (error) {
        console.error("Lỗi khởi tạo ScrollyVideo:", error);
      }
    };

    initVideo();

    // Dọn dẹp bộ nhớ khi chuyển trang
    return () => {
      if (scrollyVideoInstance && typeof scrollyVideoInstance.destroy === 'function') {
        scrollyVideoInstance.destroy();
      }
    };
  }, [videoSrc, transitionSpeed]); // Chạy lại nếu bạn đổi link hoặc đổi tốc độ

  return (
    // THẺ CHA: Plasmic sẽ kiểm soát khối này
    <div className={className} style={{ width: '100%', position: 'relative' }}>
      
      {/* THẺ CON: Mỏ neo để thư viện nhúng khung hình Video vào */}
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>

    </div>
  );
};