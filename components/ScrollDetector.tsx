"use client";

import React, { useState, useEffect } from 'react';
// 👇 1. BẮT BUỘC: Trả lại import từ loader-nextjs hoặc react-web
import { DataProvider } from '@plasmicapp/loader-nextjs'; 

interface ScrollDetectorProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

export const ScrollDetector: React.FC<ScrollDetectorProps> = ({ 
  children, 
  threshold = 50,
  className 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // 👇 2. Cờ đánh dấu để báo Next.js biết Component đã lên Trình duyệt an toàn
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Bật cờ khi đã ở Client

    const handleScroll = () => {
      // Dùng window.scrollY (hoặc document.documentElement.scrollTop để an toàn hơn)
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentScrollY > threshold);
    };
    
    handleScroll(); 
    
    // Thêm passive: true giúp trình duyệt cuộn mượt hơn và bắt sự kiện tốt hơn
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return (
    <div className={className}>
      {/* 👇 3. Chỉ truyền giá trị thật khi đã mounted, tránh Next.js SSR bị loạn */}
      <DataProvider name="scrollData" data={{ isScrolled: mounted ? isScrolled : false }}>
        {children}
      </DataProvider>
    </div>
  );
};