import React, { useState, useEffect } from 'react';
import { DataProvider } from '@plasmicapp/loader-nextjs'; // Hoặc '@plasmicapp/host' tùy dự án

interface ScrollDetectorProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

const ScrollDetector: React.FC<ScrollDetectorProps> = ({ 
  children, 
  threshold = 50,
  className 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return (
    <div className={className}>
      {/* 👇 Đây là phép thuật: Truyền biến isScrolled vào Context của Plasmic */}
      <DataProvider name="scrollData" data={{ isScrolled: isScrolled }}>
        {children}
      </DataProvider>
    </div>
  );
};

export {ScrollDetector};