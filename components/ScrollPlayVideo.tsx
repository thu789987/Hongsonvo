"use client"; 

import React, { useEffect, useRef } from 'react';

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

    let scrollyVideoInstance: any = null;

    const initVideo = async () => {
      try {
        // 👇 Bí quyết ép TypeScript đầu hàng nằm ở chữ ": any"
        const module: any = await import('scrolly-video');
        
        const ScrollyVideoClass = module.default?.default || module.default || module;

        scrollyVideoInstance = new ScrollyVideoClass({
          scrollyVideoContainer: containerRef.current,
          src: videoSrc || "https://scrollyvideo.js.org/goldengate.mp4",
          transitionSpeed: 8,
          cover: true,
          sticky: true
        });
      } catch (error) {
        console.error("Không thể tải thư viện ScrollyVideo:", error);
      }
    };

    initVideo();

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