"use client";

import React, { useState, useEffect } from "react";

interface GlobalLoadingProps {
  className?: string;
  barColor?: string;
  bgColor?: string;
  textColor?: string;
  durationMs?: number;
  images?: string[]; // Mảng chứa các link ảnh để lật liên tục
}

export default function GlobalLoading({
  className,
  barColor = "#ffffff", // Đổi màu thanh bar thành trắng cho nổi trên nền tối
  bgColor = "#161616", // Nền đen/xám tối như trong ảnh
  textColor = "#ffffff",
  durationMs = 3000,
  images = [
    // Bạn hãy thay các link này bằng ảnh thật dự án của bạn
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300",
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=300",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=300",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300"
  ],
}: GlobalLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 1. XỬ LÝ THANH PHẦN TRĂM (Chạy từ 0 đến 100)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const intervalTime = 30;
    const step = 100 / (durationMs / intervalTime);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + step;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsHidden(true);
            document.body.classList.add("page-loaded");
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [durationMs]);

  // 2. XỬ LÝ ĐỔI ẢNH LIÊN TỤC (Tạo hiệu ứng Stop-motion)
  useEffect(() => {
    if (!images || images.length === 0) return;
    
    // Cứ mỗi 150ms sẽ chuyển sang ảnh tiếp theo trong mảng
    const imgTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 150); 
    
    return () => clearInterval(imgTimer);
  }, [images]);

  if (isHidden) return null;

  return (
    <div
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Căn giữa toàn bộ theo chiều dọc
        zIndex: 99999,
        transition: "opacity 0.5s ease-out",
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? "none" : "auto",
        color: textColor,
        // Dùng font Serif để ra được chất cổ điển như thiết kế
        fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif", 
      }}
    >
      {/* Khung chứa nội dung rộng 90%, căn giữa */}
      <div style={{ width: "90%", maxWidth: "1200px", position: "relative" }}>
        
        {/* HÀNG TOP: Layout 3 cột (Text trái - Logo giữa - Phần trăm phải) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end", // Căn đáy cho các chữ ngang hàng nhau
            marginBottom: "12px",
            position: "relative",
          }}
        >
          {/* Cột Trái */}
          <div style={{ fontSize: "1.2rem", letterSpacing: "0.5px" }}>
            From <i style={{ fontStyle: "italic" }}>Vision</i> to <i style={{ fontStyle: "italic" }}>Value.</i>
          </div>

          {/* Cột Giữa: Logo (Dùng absolute để luôn nằm chính giữa màn hình bất chấp độ dài chữ 2 bên) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "3.5rem",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 0.8,
            }}
          >
            charmer
          </div>

          {/* Cột Phải: Phần trăm */}
          <div style={{ fontSize: "1.3rem", fontWeight: "normal" }}>
            {Math.floor(progress)}%
          </div>
        </div>

        {/* THANH LOADING BAR: Đường line siêu mỏng */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.15)", // Line nền mờ
            position: "relative",
          }}
        >
          {/* Vạch chạy */}
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: barColor,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* HÌNH ẢNH ĐI THEO THANH LOADING */}
        <div
          style={{
            width: "100%",
            position: "relative",
            marginTop: "12px", // Khoảng cách từ thanh line xuống ảnh
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              // Công thức siêu quan trọng: Chạy theo % và lùi lại một khoảng bằng chính % đó
              // Giúp ảnh căn mép trái khi ở 0%, căn giữa khi ở 50% và căn sát mép phải khi 100%
              left: `${progress}%`,
              transform: `translateX(-${progress}%)`,
              transition: "left 0.1s linear, transform 0.1s linear",
            }}
          >
            {images && images.length > 0 && (
              <img
                src={images[currentImageIndex]}
                alt="Dynamic tracking"
                style={{
                  width: "140px", 
                  height: "180px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}