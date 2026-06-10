"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  blurAmount?: number;
}

export function RevealOnScroll({
  children,
  className,
  duration = 0.8,
  delay = 0,
  yOffset = 50,
  blurAmount = 10
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
      style={{ position: "relative", overflow: "visible" }}
    >
      <motion.div
        variants={{
          hidden: { 
            opacity: 0, 
            y: yOffset,
            filter: `blur(${blurAmount}px)`
            // ❌ Đã xóa pointerEvents ở đây
          },
          visible: { 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)"
            // ❌ Đã xóa pointerEvents ở đây
          }
        }}
        initial="hidden"
        animate={mainControls}
        // 🎯 Hiệu ứng lún xuống khi click vẫn giữ nguyên
        whileTap={{ scale: 0.97 }} 
        transition={{ 
          duration: duration, 
          delay: delay,
          ease: [0.25, 0.25, 0, 1] 
        }}
        style={{ 
          width: "100%", 
          height: "100%",
          // 🎯 VŨ KHÍ 1: Mở khóa click ngay lập tức khi component lọt vào màn hình
          pointerEvents: isInView ? "auto" : "none",
          // 🎯 VŨ KHÍ 2: Vô hiệu hóa tính năng "click đúp để zoom" của Safari, giúp click ăn ngay lập tức
          touchAction: "manipulation" 
        }} 
      >
        {children}
      </motion.div>
    </div>
  );
}