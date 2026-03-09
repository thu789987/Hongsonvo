"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Bắt sự kiện đổi link của Next.js

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Chỉ chạy trên trình duyệt
    if (typeof window !== "undefined") {
      // Ép trình duyệt cuộn lên tọa độ (0, 0) ngay lập tức
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" // Dùng "instant" để lên ngay lập tức, không bị trượt (smooth) gây nhức mắt
      });
    }
  }, [pathname]); // Mỗi khi 'pathname' (đường link) thay đổi, code bên trong sẽ chạy lại

  // Component này tàng hình, chỉ chạy logic ngầm nên không render ra thẻ HTML nào cả
  return null; 
}