"use client";

import React, { useState, useEffect, useRef } from "react";

interface GlobalLoadingProps {
  className?: string;
  barColor?: string;
  bgColor?: string;
  textColor?: string;
  durationMs?: number;
  images?: string[];
}

export default function GlobalLoading({
  className,
  barColor = "#ffffff",
  bgColor = "#161616",
  textColor = "#ffffff",
  durationMs = 3000,
  images = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300",
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=300",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=300",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300"
  ],
}: GlobalLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false); // Trạng thái đã tải xong hết ảnh

  // 1. QUAN TRỌNG NHẤT: PRELOAD ẢNH
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsReady(true); // Chỉ khi tải xong toàn bộ ảnh mới cho phép bắt đầu hiệu ứng
        }
      };
      img.onerror = () => {
        loadedCount++; // Vẫn đếm nếu lỗi để tránh kẹt loading mãi mãi
        if (loadedCount === totalImages) setIsReady(true);
      };
    });
  }, [images]);

  // 2. XỬ LÝ THANH PHẦN TRĂM (Chỉ chạy khi ảnh đã Ready)
  useEffect(() => {
    if (typeof window === "undefined" || !isReady) return;

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
  }, [durationMs, isReady]);

  // 3. XỬ LÝ ĐỔI ẢNH (Dùng useRef để tránh setInterval bị reset)
  useEffect(() => {
    if (!isReady || images.length === 0) return;
    
    const imgTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 60); // 60ms là tốc độ "vàng" cho stop-motion
    
    return () => clearInterval(imgTimer);
  }, [isReady, images.length]); // Chỉ phụ thuộc vào số lượng ảnh

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
        justifyContent: "center",
        zIndex: 99999,
        transition: "opacity 0.5s ease-out",
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? "none" : "auto",
        color: textColor,
        fontFamily: "serif",
      }}
    >
      <div style={{ width: "90%", maxWidth: "1440px", position: "relative" }}>
        
        {/* TOP LAYOUT */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "12px", position: "relative" }}>
          <div style={{ fontSize: "1rem" }}>Hong Son / Portfolio</div>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "3rem", fontWeight: 900, textTransform: "lowercase" }}>son vo</div>
          <div style={{ fontSize: "1.2rem" }}>{Math.floor(progress)}%</div>
        </div>

        {/* LOADING LINE */}
        <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)", position: "relative" }}>
          <div style={{ width: `${progress}%`, height: "100%", backgroundColor: barColor, transition: "width 0.1s linear" }} />
        </div>

        {/* TRACKING IMAGE */}
        <div style={{ width: "100%", position: "relative", marginTop: "15px" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${progress}%`,
              transform: `translateX(-${progress}%)`,
              transition: "left 0.1s linear, transform 0.1s linear",
              // Chống nháy ảnh bằng cách giữ nguyên kích thước khung
              width: "160px",
              height: "200px",
              backgroundColor: "#222", // Màu nền tạm khi ảnh chưa hiện
            }}
          >
            {/* Hiển thị ảnh hiện tại */}
            <img
              src={images[currentImageIndex]}
              alt="loading"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                // Chống việc ảnh bị khựng khi load
                imageRendering: "auto",
              }}
            />
            
            {/* MẸO TÀI TÌNH: Render lén tất cả ảnh còn lại nhưng ẩn đi để trình duyệt giữ trong Cache */}
            <div style={{ display: "none" }}>
              {images.map((src, i) => (
                <img key={i} src={src} alt="preload" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}