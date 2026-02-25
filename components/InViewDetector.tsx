import React, { useState, useEffect, useRef } from 'react';
import { DataProvider } from '@plasmicapp/loader-nextjs'; // Hoặc '@plasmicapp/host' tùy dự án

interface InViewDetectorProps {
  children: React.ReactNode;
  threshold?: number;   // Từ 0 đến 1 (vd: 0.5 nghĩa là cuộn thấy 50% thẻ thì mới kích hoạt)
  triggerOnce?: boolean; // Nếu true, hiệu ứng chỉ chạy 1 lần khi cuộn tới
  className?: string;
}

const InViewDetector: React.FC<InViewDetectorProps> = ({ 
  children, 
  threshold = 0.1, // Mặc định: Ló ra 10% là kích hoạt
  triggerOnce = false,
  className 
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    // Camera giám sát phần tử
    const observer = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting = true khi phần tử bắt đầu lọt vào màn hình
        if (entry.isIntersecting) {
          setIsInView(true);
          // Nếu chỉ muốn chạy 1 lần, lọt vào rồi thì tắt camera luôn
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else {
          // Nếu cuộn qua rồi (không thấy nữa), reset lại biến (nếu triggerOnce = false)
          if (!triggerOnce) {
            setIsInView(false);
          }
        }
      },
      {
        threshold: threshold // Mức độ ló ra (0 đến 1)
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, triggerOnce]);

  return (
    <div ref={containerRef} className={className}>
      {/* 👇 Phép thuật mới: Truyền biến isInView vào Context của Plasmic */}
      <DataProvider name="inViewData" data={{ isInView: isInView }}>
        {children}
      </DataProvider>
    </div>
  );
};

export { InViewDetector };