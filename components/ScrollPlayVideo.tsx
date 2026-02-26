"use client"; 

import React, { useEffect, useRef } from 'react';

interface ScrollPlayVideoProps {
  videoSrc?: string;
  className?: string;
  transitionSpeed?: number;
}

export const ScrollPlayVideo = ({ 
  videoSrc, 
  className,
  transitionSpeed = 8 
}: ScrollPlayVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    let scrollyVideoInstance: any = null;

    const initVideo = async () => {
      try {
        // 👇 Đã đổi tên biến từ 'module' thành 'scrollyModule' để Next.js không phàn nàn
        const scrollyModule: any = await import('scrolly-video');
        
        // Cập nhật lại tên biến ở đây tương ứng
        const ScrollyVideoClass = scrollyModule.default?.default || scrollyModule.default || scrollyModule;

        scrollyVideoInstance = new ScrollyVideoClass({
          scrollyVideoContainer: containerRef.current,
          src: videoSrc || "https://scrollyvideo.js.org/goldengate.mp4",
          transitionSpeed: transitionSpeed, 
          cover: true,   
          sticky: true,  
        });
      } catch (error) {
        console.error("Lỗi khởi tạo ScrollyVideo:", error);
      }
    };

    initVideo();

    return () => {
      if (scrollyVideoInstance && typeof scrollyVideoInstance.destroy === 'function') {
        scrollyVideoInstance.destroy();
      }
    };
  }, [videoSrc, transitionSpeed]); 

  return (
    <div className={className} style={{ width: '100%', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};