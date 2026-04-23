"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { DataProvider } from "@plasmicapp/loader-nextjs"; // Hoặc @plasmicapp/host

interface ScrollVariantTriggerProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;    // Chạy 1 lần hay mỗi lần scroll tới?
  threshold?: number; // Thấy bao nhiêu % thì kích hoạt (0.1 đến 1)
}

export function ScrollVariantTrigger({
  children,
  className,
  once = true,
  threshold = 0.2,
}: ScrollVariantTriggerProps) {
  const ref = useRef(null);
  
  // Kiểm tra xem component đã hiện ra trên màn hình chưa
  const isInView = useInView(ref, { 
    once: once, 
    amount: threshold 
  });

  // Tránh lỗi Hydration cho Next.js
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {/* Cung cấp biến "isReached" vào hệ thống Data của Plasmic. 
         Component con nằm trong slot sẽ đọc được biến này.
      */}
      <DataProvider name="scrollStatus" data={{ isReached: isInView }}>
        {children}
      </DataProvider>
    </div>
  );
}