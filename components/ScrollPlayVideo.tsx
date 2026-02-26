import React, { useRef, useEffect } from 'react';

interface ScrollPlayVideoProps {
  videoSrc?: string;
  className?: string;
}

export const ScrollPlayVideo = ({ videoSrc, className }: ScrollPlayVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;

      // 1. Nếu video đang dừng thì cho chạy
      if (videoRef.current.paused) {
        videoRef.current.play().catch((e) => console.log("Trình duyệt chặn autoplay:", e));
      }

      // 2. Xóa bộ đếm ngược cũ nếu người dùng vẫn đang cuộn
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 3. Đặt bộ đếm: Sau khi ngừng cuộn 150ms thì dừng video
      timeoutRef.current = setTimeout(() => {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
      <video
        ref={videoRef}
        src={videoSrc || "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"}
        loop
        muted // BẮT BUỘC PHẢI CÓ: Trình duyệt chỉ cho code tự động Play khi video tắt tiếng
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Giúp video tràn đầy khung hình, làm background cực đẹp
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none' // Không cản trở việc click chuột của các thẻ bên trên
        }}
      />
    </div>
  );
};