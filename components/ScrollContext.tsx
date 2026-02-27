// 1. Thêm dòng này lên đầu cùng nếu bạn dùng Next.js App Router (Next 13+)
"use client"; 

import React, { useState, useEffect, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho props
type ScrollContextProps = {
  children?: ReactNode;
  className?: string; // Plasmic luôn cần className để thiết kế giao diện
};

export default function ScrollContext({ children, className }: ScrollContextProps) {
  // Trạng thái lưu trữ việc người dùng đã cuộn hay chưa
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Trạng thái để kiểm tra xem component đã render trên trình duyệt (client) chưa
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Khi useEffect chạy, tức là code đang ở Client (trình duyệt)
    setIsMounted(true);

    // Hàm xử lý cuộn an toàn
    const handleScroll = () => {
      // Chỉ thay đổi state nếu vượt qua mốc (ví dụ: 50px)
      setIsScrolled(window.scrollY > 50);
    };

    // Kiểm tra window một lần nữa cho chắc chắn trước khi gắn sự kiện
    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll);
      
      // Cleanup function: Xóa sự kiện khi component không còn sử dụng
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 2. NGĂN LỖI HYDRATION
  // Nếu code đang chạy trên máy chủ (chưa mounted), trả về giao diện gốc 
  // để khớp với HTML tĩnh được gửi về từ Vercel.
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  // 3. CODE ĐÃ CHẠY TRÊN CLIENT
  // Thêm class động (ví dụ: 'is-scrolled') khi người dùng cuộn
  return (
    <div className={`${className || ''} ${isScrolled ? 'is-scrolled' : ''}`}>
      {children}
    </div>
  );
}

export { ScrollContext as ScrollProvider };