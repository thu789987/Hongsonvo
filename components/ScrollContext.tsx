import React, { useState, useEffect } from "react";
// 👇 SỬA LỖI Ở ĐÂY: Import đúng từ thư viện host của Plasmic Codegen
import { DataProvider } from "@plasmicapp/host"; 

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Bơm dữ liệu vào đúng "tần số" của giao diện Plasmic
    <DataProvider name="isScrolled" data={isScrolled}>
      {children}
    </DataProvider>
  );
}