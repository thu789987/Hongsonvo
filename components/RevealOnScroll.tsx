"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  blurAmount?: number; // Thêm prop để tùy chỉnh độ mờ nếu muốn
}

export function RevealOnScroll({
  children,
  className,
  duration = 0.8,
  delay = 0,
  yOffset = 50,
  blurAmount = 10 // Mặc định mờ 10px khi ẩn
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ 
        position: "relative", 
        overflow: "visible",
        zIndex: 10 // 👈 FIX 1: Nâng toàn bộ cái hộp này lên lớp số 10 để không bị PatternGrid đè
      }}
    >
      <motion.div
        variants={{
          hidden: { 
            opacity: 0, 
            y: yOffset,
            filter: `blur(${blurAmount}px)` 
          },
          visible: { 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)" 
          }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ 
          duration: duration, 
          delay: delay,
          ease: [0.25, 0.25, 0, 1] 
        }}
        style={{ 
          width: "100%",
          // 👇 FIX 2: Bắt buộc! Đang ẩn thì tàng hình với chuột, hiện ra thì ăn chuột 100%
          pointerEvents: isInView ? "auto" : "none" 
        }} 
      >
        {children}
      </motion.div>
    </div>
  );
}