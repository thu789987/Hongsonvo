"use client"; 

import React, { useEffect, useRef } from 'react';
import ScrollyVideo from 'scrolly-video';

interface ScrollPlayVideoProps {
  videoSrc?: string;
  className?: string;
}

export const ScrollPlayVideo = ({ 
  videoSrc, 
  className 
}: ScrollPlayVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // 👇 CHÌA KHÓA SỬA LỖI Ở ĐÂY 👇
    // Trích xuất Class chuẩn xác bất chấp Next.js đóng gói kiểu gì
    const ScrollyVideoConstructor = (ScrollyVideo as any).default || ScrollyVideo;
    // Khởi tạo video bằng biến Constructor vừa lấy được
    const scrollyVideoInstance = new ScrollyVideoConstructor({
      scrollyVideoContainer: containerRef.current,
      src: videoSrc || "https://scrollyvideo.js.org/goldengate.mp4",
      transitionSpeed: 8,
      cover: true,
      sticky: true
    });

    return () => {
      if (scrollyVideoInstance && typeof scrollyVideoInstance.destroy === 'function') {
        scrollyVideoInstance.destroy();
      }
    };
  }, [videoSrc]);

  return (
    <div className={className} style={{ width: '100%', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};