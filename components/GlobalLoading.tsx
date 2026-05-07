"use client";

import React, { useState, useEffect } from "react";

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
    // Thay các link này bằng ảnh thực tế của bạn
    "https://cdn.jsdelivr.net/gh/thu789987/Hongsonvo/public/img/bbcincorp-portal/01.png?q=300&w=300",
    "https://cdn.jsdelivr.net/gh/thu789987/Hongsonvo/public/img/gleads-website/01.png?q=300&w=300",
    "https://cdn.jsdelivr.net/gh/thu789987/Hongsonvo/public/img/incorpsec-branding/01.png?q=300&w=300",
    "https://cdn.jsdelivr.net/gh/thu789987/Gamma@main/public/img/Gleads-Mascot/01.png?q=300&w=300"
  ],
}: GlobalLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // 1. PRELOAD TOÀN BỘ ẢNH (Chống kẹt)
  useEffect(() => {
    if (!images || images.length === 0) {
      setIsReady(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) setIsReady(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) setIsReady(true);
      };
    });
  }, [images]);

  // 2. CHẠY THANH PHẦN TRĂM
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

  // 3. ĐỔI ẢNH LIÊN TỤC
  useEffect(() => {
    if (!isReady || images.length === 0) return;
    
    const imgTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 600); 
    
    return () => clearInterval(imgTimer);
  }, [isReady, images.length]);

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
        fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif",
      }}
    >
      {/* 💡 BÍ QUYẾT TẠI ĐÂY: Thêm khối style chứa Media Queries cho Mobile */}
      <style>{`
        @keyframes fadeInEffect {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .loading-text-left {
          font-size: 1.2rem;
          letter-spacing: 0.5px;
          display: block;
        }

        .loading-logo-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 0.8;
        }

        /* Khi xuống màn hình điện thoại (dưới 768px) */
        @media (max-width: 768px) {
          .loading-text-left {
            display: none !important; /* Ẩn dòng chữ phụ */
          }
          .loading-logo-center {
            position: relative !important; /* Gỡ bỏ ghim ở giữa */
            left: 0 !important;
            transform: none !important; /* Tự động đẩy sang mép trái */
            font-size: 2.8rem !important; /* Thu nhỏ logo lại một xíu */
          }
        }
      `}</style>

      <div style={{ width: "90%", position: "relative" }}>
        
        {/* TOP LAYOUT: Text - Logo - Progress */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "12px", position: "relative" }}>
          
          {/* Cột trái (Bị ẩn trên Mobile nhờ class loading-text-left) */}
          <div className="loading-text-left">
            From <i style={{ fontStyle: "italic" }}>Vision</i> to <i style={{ fontStyle: "italic" }}>Value.</i>
          </div>
          
          {/* Cột giữa (Nhảy sang trái trên Mobile nhờ class loading-logo-center) */}
          <div className="loading-logo-center">
            son vo
          </div>
          
          {/* Cột phải: Phần trăm (%) */}
          <div style={{ fontSize: "1.3rem" }}>
            {Math.floor(progress)}%
          </div>
        </div>

        {/* THIN PROGRESS BAR */}
        <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", position: "relative" }}>
          <div style={{ width: `${progress}%`, height: "100%", backgroundColor: barColor, transition: "width 0.1s linear" }} />
        </div>

        {/* DYNAMIC TRACKING IMAGE */}
        <div style={{ width: "100%", position: "relative", marginTop: "15px" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${progress}%`,
              transform: `translateX(-${progress}%)`,
              transition: "left 0.1s linear, transform 0.1s linear",
              width: "160px",
              height: "160px",
              backgroundColor: "transparent",
              overflow: "hidden",
            }}
          >
            {images && images.length > 0 && (
              <img
                key={currentImageIndex} 
                src={images[currentImageIndex]}
                alt="Dynamic tracking"
                style={{
                  width: "100%", 
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  opacity: 0, 
                  animation: "fadeInEffect 0.3s ease-in-out forwards", 
                }}
              />
            )}

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