"use client";

import React, { useEffect, useRef, useState } from 'react';

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
  // Biến trạng thái để kiểm tra xem script từ CDN đã tải xong chưa
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 1. Khối useEffect này chịu trách nhiệm tiêm thẻ <script> vào trang web
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Kiểm tra xem thư viện đã có sẵn chưa (tránh tải lại nhiều lần)
    if ((window as any).ScrollyVideo) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    // Lấy link CDN đúng như code mẫu HTML bạn đã tìm được
    script.src = "https://cdn.jsdelivr.net/npm/scrolly-video@latest/dist/scrolly-video.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true); // Khi tải xong, bật cờ báo hiệu
    
    document.body.appendChild(script);

    return () => {
      // Không cần gỡ thẻ script để các component khác có thể dùng chung
    };
  }, []);

  // 2. Khối useEffect này khởi tạo Video SAU KHI script đã tải xong
  useEffect(() => {
    // Nếu chưa tải xong script, hoặc không có container, thì không làm gì cả
    if (!isScriptLoaded || !containerRef.current || typeof window === 'undefined') return;

    // Lấy Constructor trực tiếp từ window (Lách luật Next.js thành công!)
    const ScrollyVideoClass = (window as any).ScrollyVideo;

    if (!ScrollyVideoClass) return;

    const scrollyVideoInstance = new ScrollyVideoClass({
      scrollyVideoContainer: containerRef.current,
      src: videoSrc || "https://scrollyvideo.js.org/goldengate.mp4",
      transitionSpeed: transitionSpeed,
      cover: true,
      sticky: true
    });

    return () => {
      if (scrollyVideoInstance && typeof scrollyVideoInstance.destroy === 'function') {
        scrollyVideoInstance.destroy();
      }
    };
  }, [isScriptLoaded, videoSrc, transitionSpeed]);

  return (
    <div className={className} style={{ width: '100%', position: 'fixed' }}>
      {/* Container rỗng cho thư viện chèn Video vào */}
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};