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
      style={{ position: "relative", overflow: "visible", zIndex: 10 }}
    >
      <motion.div
        variants={{
          hidden: { 
            opacity: 0, 
            y: yOffset,
            filter: `blur(${blurAmount}px)`,
            // 🎯 Đưa pointerEvents vào thẳng đây: Đang ẩn thì KHÔNG bắt chuột
            pointerEvents: "none" 
          },
          visible: { 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)",
            // 🎯 Mở khóa ngay lập tức khi Frame animation xuất hiện
            pointerEvents: "auto" 
          }
        }}
        initial="hidden"
        animate={mainControls}
        // 🎯 HIỆU ỨNG PHẢN HỒI CLICK (Chìa khóa chống spam click)
        // Khi người dùng bấm vào thẻ, nó sẽ lún xuống một chút báo hiệu "Đã nhận lệnh!"
        whileTap={{ scale: 0.97 }} 
        transition={{ 
          duration: duration, 
          delay: delay,
          ease: [0.25, 0.25, 0, 1] 
        }}
        style={{ width: "100%" }} 
      >
        {children}
      </motion.div>
    </div>
  );
}