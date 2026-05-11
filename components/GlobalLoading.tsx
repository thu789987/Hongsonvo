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
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null); // Để giữ ảnh cũ
  const [isReady, setIsReady] = useState(false);

  // 1. PRELOAD ẢNH
  useEffect(() => {
    if (!images || images.length === 0) {
      setIsReady(true);
      return;
    }
    let loadedCount = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) setIsReady(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) setIsReady(true);
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

  // 3. ĐỔI ẢNH (Có lưu lại index ảnh cũ để làm hiệu ứng Fade Out)
  useEffect(() => {
    if (!isReady || images.length === 0) return;
    const imgTimer = setInterval(() => {
      setCurrentImageIndex((prev) => {
        setPrevImageIndex(prev); // Lưu ảnh vừa hiện thành ảnh cũ
        return (prev + 1) % images.length;
      });
    }, 600); // Tốc độ đổi ảnh (200ms để thấy rõ hiệu ứng fade)
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
        zIndex: 99999, // Màn hình loading
        transition: "opacity 0.5s ease-out",
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? "none" : "auto",
        color: textColor,
        fontFamily: "serif",
        cursor: "none", // Ẩn chuột hệ thống để hiện Custom Cursor của bạn
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .img-fade-in {
          animation: fadeIn 0.6s ease-in-out forwards;
        }
        .img-fade-out {
          animation: fadeOut 0.6s ease-in-out forwards;
          position: absolute;
          top: 0;
          left: 0;
        }
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
          .logo-mobile-left {
            position: relative !important;
            left: 0 !important;
            transform: none !important;
            font-size: 2.5rem !important;
          }
        }
      `}</style>

      <div style={{ width: "90%", maxWidth: "1440px", position: "relative" }}>
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "12px", position: "relative" }}>
          <div className="hide-on-mobile" style={{ fontSize: "1.2rem" }}>
            From <i>Vision</i> to <i>Value.</i>
          </div>
          <div className="logo-mobile-left" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "3.5rem", fontWeight: 900 }}>
            son vo
          </div>
          <div style={{ fontSize: "1.3rem" }}>{Math.floor(progress)}%</div>
        </div>

        {/* LINE */}
        <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", position: "relative" }}>
          <div style={{ width: `${progress}%`, height: "100%", backgroundColor: barColor, transition: "width 0.1s linear" }} />
        </div>

        {/* IMAGE CONTAINER */}
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
              overflow: "hidden",
            }}
          >
            {/* Hiển thị ảnh cũ để mờ dần (Fade Out) */}
            {prevImageIndex !== null && (
              <img
                key={`prev-${prevImageIndex}`}
                src={images[prevImageIndex]}
                className="img-fade-out"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}

            {/* Hiển thị ảnh mới để hiện dần lên (Fade In) */}
            <img
              key={`curr-${currentImageIndex}`}
              src={images[currentImageIndex]}
              className="img-fade-in"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}