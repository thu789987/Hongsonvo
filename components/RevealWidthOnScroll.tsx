"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface RevealWidthProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function RevealWidthOnScroll({
  children,
  className,
  duration = 0.8, // Thời gian kéo giãn (0.8s cho mượt)
  delay = 0,
}: RevealWidthProps) {
  // 1. Tạo Ref để theo dõi cái khung bao ngoài
  const ref = useRef(null);
  
  // 2. Hook kiểm tra xem khung đã vào màn hình chưa (Ló ra 10% là chạy 1 lần duy nhất)
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // 3. Công cụ điều khiển Animation thủ công
  const mainControls = useAnimation();

  // 4. Lắng nghe thay đổi: Khi vừa thấy -> Ra lệnh mở rộng
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    // Cái thẻ div này là "cảm biến" vị trí, luôn chiếm 100% chiều rộng của thẻ cha chứa nó
    <div ref={ref} className={className} style={{ position: "relative", width: "100%" }}>
      <motion.div
        // 5. Cài đặt trạng thái biến thiên Width
        variants={{
          hidden: { width: "0px" },
          visible: { width: "100%" }
        }}

        // 6. Gán cứng trạng thái ban đầu là "hidden" (0px)
        initial="hidden"
        
        // 7. Nghe lệnh từ biến mainControls
        animate={mainControls}

        // 8. Cấu hình độ mượt
        transition={{ 
          duration: duration, 
          delay: delay,
          ease: [0.25, 0.25, 0, 1] // Ease Out Cubic (Chậm dần ở cuối cho sang trọng)
        }}
        
        // 9. QUAN TRỌNG: Phải có overflow: "hidden" để nội dung bên trong 
        // không bị trào ra ngoài khi width đang ở mức 0px
        style={{ 
          overflow: "hidden", 
          height: "100%", // Đảm bảo bám sát chiều cao của content bên trong
          display: "block"
        }} 
      >
        {/* Khối content bên trong của bạn từ Plasmic sẽ chui vào đây */}
        {children}
      </motion.div>
    </div>
  );
}