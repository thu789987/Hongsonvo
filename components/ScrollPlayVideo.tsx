import React, { useRef, useEffect } from 'react';
// 👇 1. Import GSAP và ScrollTrigger
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 👇 2. Đăng ký Plugin (Bắt buộc)
gsap.registerPlugin(ScrollTrigger);

interface ScrollScrubVideoProps {
  videoSrc?: string;
  className?: string;
  scrollHeight?: string;
}

export const ScrollPlayVideo = ({ 
  videoSrc, 
  className, 
  scrollHeight = "300vh" 
}: ScrollScrubVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Hàm thiết lập GSAP sau khi video đã tải xong thông tin
    const setupScrollAnimation = () => {
      // Dọn dẹp các Trigger cũ để tránh lỗi chồng chéo khi React re-render
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // 👇 3. PHÉP THUẬT CỦA GSAP NẰM Ở ĐÂY
      gsap.to(video, {
        currentTime: video.duration, // Mục tiêu: Chạy đến giây cuối cùng của video
        ease: "none", // Đảm bảo tốc độ chạy đều đặn, không bị nhanh/chậm ở hai đầu
        scrollTrigger: {
          trigger: container,
          start: "top top", // Bắt đầu chạy khi mép trên container chạm đỉnh màn hình
          end: "bottom bottom", // Kết thúc chạy khi mép dưới chạm đáy màn hình
          scrub: 0.5, // QUAN TRỌNG: Kích hoạt tua theo chuột. Số 0.5 là độ trễ (LERP) giúp tua siêu mượt
        }
      });
    };

    // Kiểm tra xem video đã tải xong thông tin (duration) chưa
    if (video.readyState >= 1) {
      setupScrollAnimation();
    } else {
      video.addEventListener('loadedmetadata', setupScrollAnimation);
    }

    // Dọn dẹp bộ nhớ khi người dùng rời khỏi trang
    return () => {
      video.removeEventListener('loadedmetadata', setupScrollAnimation);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [videoSrc]); // Chạy lại nếu bạn thay đổi link video

  return (
    <div
      ref={containerRef}
      className={className}
      // Vẫn dùng scrollHeight để lấy không gian cuộn chuột
      style={{ position: 'relative', height: scrollHeight, width: '100%' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src={videoSrc || "https://cdn.jsdelivr.net/gh/thu789987/Hongsonvo/public/video/video_time%20laspe.mp4"}
          muted
          playsInline
          preload="auto" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
};