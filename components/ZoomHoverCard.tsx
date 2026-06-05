import React, { useState } from "react";
import { motion } from "framer-motion";

export interface ZoomHoverCardProps {
  className?: string; // Bắt buộc cho Plasmic
  children?: React.ReactNode; // Slot để thả content vào
}

export const ZoomHoverCard: React.FC<ZoomHoverCardProps> = ({
  className = "",
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      // 👇 Chỉ giữ lại hiệu ứng Zoom (scale)
      animate={{
        scale: isHovered ? 1.07 : 1, 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "inherit",
        position: "relative", // BẮT BUỘC: Để lớp màn đen lấy đây làm gốc tọa độ
        overflow: "hidden",   // BẮT BUỘC: Tránh lớp màn đen bị tràn ra ngoài viền bo góc
      }}
    >
      {/* 1. Nội dung thật của tấm thẻ (Hình ảnh, chữ...) */}
      {children}

      {/* 2. LỚP MÀN ĐEN OVERLAY NẰM ĐÈ LÊN TRÊN CÙNG */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.2 : 0, // 0.5 tương đương lớp đen mờ 50%. (Đổi số này tùy ý từ 0.1 đến 1)
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: "absolute", // Nổi lơ lửng
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black", // Màu nền đen
          pointerEvents: "none", // BÍ QUYẾT: Cho phép chuột "bấm xuyên" qua màn đen này để không làm kẹt nút bấm ở dưới
          zIndex: 10, // Đảm bảo nó luôn nằm đè lên nội dung
        }}
      />
    </motion.div>
  );
};