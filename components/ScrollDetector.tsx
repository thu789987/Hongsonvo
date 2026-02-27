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
    // 🔍 THEO DÕI 1: Xem Component có thực sự được chạy trên Trình duyệt không
    console.log("🟢 [ScrollDetector] Đã Mounted thành công trên Client!");
    setMounted(true); 

    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const newIsScrolled = currentScrollY > threshold;

      setIsScrolled((prev) => {
        // 🔍 THEO DÕI 2: Chỉ in ra khi trạng thái thực sự thay đổi (tránh spam)
        if (prev !== newIsScrolled) {
          console.warn(`📉 [ScrollDetector] Trạng thái cuộn thay đổi: ${prev} ➡️ ${newIsScrolled} (Tọa độ: ${currentScrollY})`);
        }
        return newIsScrolled;
      });
    };
    
    handleScroll(); 
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const contextData = useMemo(() => {
    const data = { isScrolled: mounted ? isScrolled : false };
    // 🔍 THEO DÕI 3: Xem DataProvider có nhận được dữ liệu mới để đẩy đi không
    console.log("📦 [ScrollDetector] Context Data chuẩn bị đẩy vào Plasmic:", data);
    return data;
  }, [mounted, isScrolled]);

  return (
    <div className={className}>
      <DataProvider name="scrollData" data={contextData}>
        {children}
      </DataProvider>
    </div>
  );
};