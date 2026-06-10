"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollPlayVideoProps {
  videoSrc?: string;
  className?: string;
  transitionSpeed?: number;
  onReady?: () => void;
}

export const ScrollPlayVideo = ({
  videoSrc,
  className,
  transitionSpeed = 8,
  onReady
}: ScrollPlayVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  // Biến kiểm soát màn hình chờ (True = Đang tải, False = Đã tải xong)
  const [isLoading, setIsLoading] = useState(true);

  // 1. Khối tải thư viện (Giữ nguyên)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).ScrollyVideo) {
      setIsScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/scrolly-video@latest/dist/scrolly-video.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  // 2. Khối khởi tạo và THEO DÕI CHÍNH XÁC
  useEffect(() => {
    if (!isScriptLoaded || !containerRef.current || typeof window === 'undefined') return;
    const ScrollyVideoClass = (window as any).ScrollyVideo;
    if (!ScrollyVideoClass) return;

    const scrollyVideoInstance = new ScrollyVideoClass({
scrollyVideoContainer: containerRef.current,
      src: videoSrc || "video/video_timelaspe.mp4", // Đã đổi sang file local
      transitionSpeed: transitionSpeed,
      cover: true,
      sticky: true,
      useWebCodecs: true // 🎯 Kích hoạt bộ giải mã phần cứng thế hệ mới
    });

    // 🎯 VŨ KHÍ BÍ MẬT: Tạo "điệp viên" kiểm tra mỗi 100 mili-giây
    const checkReady = setInterval(() => {
      if (!containerRef.current) return;
      
      // Tìm xem thư viện đã tạo ra thẻ canvas chưa
      const canvas = containerRef.current.querySelector('canvas');
      
      // Nếu canvas đã tồn tại VÀ đã được vẽ hình (width > 0)
      if (canvas && canvas.width > 0) {
        setIsLoading(false); // 1. Tắt màn hình đen ngay lập tức
        if (onReady) onReady(); // 2. Báo cho trang chủ biết "Xong rồi!"
        clearInterval(checkReady); // 3. Hủy điệp viên, không kiểm tra nữa
      }
    }, 100);

    return () => {
      clearInterval(checkReady); // Dọn dẹp điệp viên nếu người dùng thoát trang sớm
      if (scrollyVideoInstance && typeof scrollyVideoInstance.destroy === 'function') {
        scrollyVideoInstance.destroy();
      }
    };
  }, [isScriptLoaded, videoSrc, transitionSpeed, onReady]);

  return (
    <div className={`animate-banner ${className || ''}`} style={{ width: '100%', height: '100%', position: 'relative' }}>
      
      {/* ⏳ MÀN HÌNH CHỜ (LOADING SPINNER) CỰC XỊN */}
      {isLoading && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#000000', // Giữ nền đen cho ngầu
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10 // Đảm bảo đè lên trên mọi thứ
        }}>
          {/* CSS vẽ vòng xoay Loading */}
          <div style={{
            width: '40px', height: '40px',
            border: '3px solid rgba(255,255,255,0.2)',
            borderTop: '3px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* 🎬 CONTAINER CỦA VIDEO */}
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}></div>

    </div>
  );
};