"use client"; // 👇 BẮT BUỘC PHẢI CÓ DÒNG NÀY ĐẦU TIÊN

import React, { useState, useEffect } from 'react';
// Chuyển sang dùng @plasmicapp/host để tương thích tốt nhất với Plasmic Studio
import { DataProvider } from '@plasmicapp/host'; 

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

  useEffect(() => {
    // Chỉ chạy trên Client, an toàn tuyệt đối với Next.js
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };
    
    // Kích hoạt ngay lần đầu tiên đề phòng trường hợp user đã cuộn sẵn khi F5
    handleScroll(); 

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return (
    <div className={className}>
      <DataProvider name="scrollData" data={{ isScrolled: isScrolled }}>
        {children}
      </DataProvider>
    </div>
  );
};