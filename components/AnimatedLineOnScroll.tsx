"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedLineProps {
  className?: string;
  color?: string;     // Cho phép đổi màu đường line trên Plasmic
  duration?: number;  // Thời gian chạy animation
  delay?: number;     // Độ trễ trước khi chạy
}

export function AnimatedLineOnScroll({
  className,
  color = "#000000", // Mặc định màu đen
  duration = 0.8,
  delay = 0,
}: AnimatedLineProps) {
  // Tạo ref làm "cảm biến" vị trí
  const ref = useRef(null);
  
  // once: true -> Chỉ chạy 1 lần khi cuộn tới. Nếu muốn cuộn lên cuộn xuống chạy lại liên tục thì đổi thành false.
  const isInView = useInView(ref, { once: true, amount: "some" });

  return (
    // Thẻ div bao ngoài đóng vai trò làm khung chứa và cảm biến scroll
    // Nó luôn chiếm 100% chiều rộng của thẻ cha (ví dụ: Container, Stack)
    <div 
      ref={ref} 
      className={className} 
      style={{ width: "100%", display: "flex", alignItems: "center" }}
    >
      <motion.div
        // 1. Trạng thái bắt đầu (Theo đúng ý bạn: width 0, height 0)
        initial={{ width: "0px", height: "0px" }}
        
        // 2. Trạng thái đích khi cuộn tới (width 100%, height 1px)
        animate={isInView ? { width: "100%", height: "1px" } : { width: "0px", height: "0px" }}
        
        // 3. Cấu hình độ mượt
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.25, 1, 0.5, 1], // Ease Out mượt mà
        }}
        
        // 4. Style cứng
        style={{
          backgroundColor: color,
          transformOrigin: "left", // Đảm bảo luôn mọc ra từ bên trái sang phải
        }}
      />
    </div>
  );
}