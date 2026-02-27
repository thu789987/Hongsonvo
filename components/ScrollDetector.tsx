"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { DataProvider } from '@plasmicapp/loader-nextjs'; // Hoặc @plasmicapp/host tùy dự án của bạn

interface ScrollDetectorProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

export const ScrollDetector: React.FC<ScrollDetectorProps> = ({ 
  children, 
  threshold = 50,
  className = ""
}) => {
  // Khởi tạo mặc định là false để Server và Client đồng nhất 100%
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentScrollY > threshold);
    };
    
    // Đồng bộ trạng thái ngay khi trang load xong
    handleScroll(); 
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // Gói gọn data để tránh re-render vô ích
  const contextData = useMemo(() => ({
    isScrolled: isScrolled
  }), [isScrolled]);

  return (
    <div className={className}>
      <DataProvider name="scrollData" data={contextData}>
        {children}
      </DataProvider>
    </div>
  );
};