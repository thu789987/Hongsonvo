import React from 'react';
// 👇 Nhúng Component React đã được thư viện cấu hình sẵn
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo';

interface ScrollPlayVideoProps {
  videoSrc?: string;
  className?: string;
}

export const ScrollPlayVideo = ({ 
  videoSrc,
  className 
}: ScrollPlayVideoProps) => {
  return (
    <div className={className} style={{ width: '100%', position: 'relative' }}>
      {/* Thư viện sẽ tự động tính toán chiều cao và làm hiệu ứng bám dính (sticky) cho bạn */}
      <ScrollyVideo 
        src={videoSrc || "https://scrollyvideo.js.org/goldengate.mp4"} 
        transitionSpeed={8} // Điểm LERP: Độ mượt của quán tính (Càng cao thì video phản hồi càng nhanh)
      />
    </div>
  );
};