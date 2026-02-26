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
  scrollHeight = "300vh" 
}: ScrollScrubVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // Khi load xong dữ liệu nền, ép video dừng ở giây số 0
    const handleLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    let animationFrameId: number;

    const handleScroll = () => {
      // Đợi video tải xong thông tin thời lượng (duration) mới tính toán
      if (!video.duration || Number.isNaN(video.duration)) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Tính toán quãng đường có thể cuộn (tổng chiều cao container trừ đi màn hình)
      const scrollableDistance = rect.height - viewportHeight;
      if (scrollableDistance <= 0) return;

      // Tính % cuộn (Bắt đầu tua khi mép trên container chạm đỉnh màn hình)
      let scrollFraction = -rect.top / scrollableDistance;

      // Khóa giới hạn % từ 0 (đầu video) đến 1 (cuối video)
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));

      // Dùng requestAnimationFrame để việc tua frame mượt mà, không bị giật lag
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        // Thay đổi frame của video tương ứng với % thanh cuộn
        video.currentTime = video.duration * scrollFraction;
      });
    };

    // Lắng nghe sự kiện cuộn
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Gọi hàm 1 lần lúc web vừa load để set đúng frame ban đầu
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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