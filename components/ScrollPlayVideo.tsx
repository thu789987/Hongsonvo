"use client"; // Bắt buộc có vì thư viện này cần truy cập vào 'window' để bắt sự kiện cuộn

import React, { useEffect, useRef } from 'react';
// 👇 Thêm @ts-ignore để TypeScript không bắt bẻ thư viện thiếu file type
import ScrollyVideo from 'scrolly-video';

interface ScrollPlayVideoProps {
  videoSrc?: string;
  className?: string;
}

export const ScrollPlayVideo = ({ 
  videoSrc, 
  className 
}: ScrollPlayVideoProps) => {
  // 1. Tạo một cái Ref (mỏ neo) để thư viện biết nhét video vào đâu
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Chỉ chạy code khi đang ở trình duyệt (Client-side) và đã có container
    if (typeof window === 'undefined' || !containerRef.current) return;

    // 2. Khởi tạo ScrollyVideo bằng code thuần (Vanilla JS)
    const scrollyVideoInstance = new ScrollyVideo({
      scrollyVideoContainer: containerRef.current,
      src: videoSrc || "https://scrollyvideo.js.org/goldengate.mp4",
      transitionSpeed: 8, // Độ mượt quán tính (LERP)
      cover: true, // Tự động kéo giãn video lấp đầy màn hình
      sticky: true // Tự động bám dính vào màn hình khi cuộn
    });

    // 3. Dọn dẹp bộ nhớ khi người dùng rời khỏi trang
    return () => {
      if (scrollyVideoInstance && typeof scrollyVideoInstance.destroy === 'function') {
        scrollyVideoInstance.destroy();
      }
    };
  }, [videoSrc]); // Khởi tạo lại nếu link video thay đổi

  return (
    // THẺ CHA: Bạn có thể set thêm chiều cao (ví dụ: height: "300vh") trên Plasmic 
    // để có khoảng trống cho chuột cuộn
    <div className={className} style={{ width: '100%', position: 'relative' }}>
      
      {/* THẺ CON (Mỏ neo): Thư viện sẽ tự động tiêm Canvas/Video vào cái hộp rỗng này */}
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>

    </div>
  );
};