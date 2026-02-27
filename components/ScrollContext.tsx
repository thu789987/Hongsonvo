"use client";

import React, { useState, useEffect } from "react";
import { DataProvider } from "@plasmicapp/loader-nextjs"; // Hoặc @plasmicapp/host

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Đảm bảo chỉ chạy trên client
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Bạn có thể tùy chỉnh con số 50 (threshold) ở đây
      setIsScrolled(window.scrollY > 50);
    };

    // Chạy ngay lần đầu tiên để lấy trạng thái
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Bơm thẳng biến isScrolled vào DataProvider của Plasmic
    <DataProvider name="isScrolled" data={isScrolled}>
      {children}
    </DataProvider>
  );
}