"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { DataProvider } from '@plasmicapp/loader-nextjs'; 

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 

    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentScrollY > threshold);
    };
    
    handleScroll(); 
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // 🚀 BÍ QUYẾT 1: Đóng gói Data bằng useMemo. 
  // Chỉ báo cho Plasmic biết khi nào giá trị THỰC SỰ thay đổi.
  const contextData = useMemo(() => ({
    isScrolled: mounted ? isScrolled : false
  }), [mounted, isScrolled]);

  // 🚀 BÍ QUYẾT 2: Tự động gắn thêm class 'is-scrolled' khi cuộn qua threshold.
  // Đây là lớp bảo vệ cuối cùng, không phụ thuộc vào Context của Plasmic.
  const wrapperClass = `${className} ${mounted && isScrolled ? 'is-scrolled' : ''}`.trim();

  return (
    <div className={wrapperClass}>
      <DataProvider name="scrollData" data={contextData}>
        {children}
      </DataProvider>
    </div>
  );
};