import React, { useRef, useEffect } from 'react';

interface ScrollScrubVideoProps {
  videoSrc?: string;
  className?: string;
  scrollHeight?: string; // Độ dài của thanh cuộn để tua hết video
}

export const ScrollPlayVideo = ({ 
  videoSrc, 
  className, 
  // Mặc định container dài gấp 3 lần màn hình để có đủ không gian cuộn và tua video
  scrollHeight = "800vh" 
}: ScrollScrubVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let animationFrameId: number;
    // Khai báo 2 biến: Thời gian mục tiêu (theo chuột) và Thời gian thực tế của video
    let targetTime = 0;
    let currentTime = 0;

    const handleLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // 1. Hàm tính toán phần trăm cuộn (Chỉ cập nhật targetTime)
    const handleScroll = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      
      if (scrollableDistance <= 0) return;
      
      let scrollFraction = -rect.top / scrollableDistance;
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));
      
      // Gán thời gian mục tiêu mà video CẦN phải tới
      targetTime = video.duration * scrollFraction;
    };

    // 2. Vòng lặp Render 60fps tạo quán tính (LERP)
    const renderLoop = () => {
      // Công thức thần thánh: Cộng thêm 8% khoảng cách còn lại mỗi khung hình.
      // Số 0.08 càng nhỏ -> Quán tính càng lớn, video tua càng chậm và mượt.
      // Số này tiến gần về 1 -> Video tua gắt theo chuột.
      currentTime += (targetTime - currentTime) * 0.08;

      // Cập nhật frame video nếu khoảng cách đủ lớn (chống rung lắc)
      if (Math.abs(targetTime - currentTime) > 0.001) {
        video.currentTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Kích hoạt tính toán lần đầu và khởi động vòng lặp
    handleScroll();
    renderLoop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return (
    // THẺ CHA: Tạo không gian dài (scrollHeight) để lấy chỗ cuộn chuột
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height: scrollHeight, 
        width: '100%',
      }}
    >
      // THẺ CON: Bám dính (Sticky) trên màn hình trong lúc người dùng cuộn qua thẻ cha
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh', 
        width: '100%',
        overflow: 'hidden'
      }}>
        <video
          ref={videoRef}
          src={videoSrc || "https://cdn.jsdelivr.net/gh/thu789987/Hongsonvo/public/video/video_time%20laspe.mp4"}
          muted
          playsInline
          // BẮT BUỘC: Phải báo cho trình duyệt tải trước video, nếu không sẽ không có frame để tua
          preload="auto" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
  );
};