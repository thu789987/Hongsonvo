"use client";

import React, { useState, useEffect } from "react";

interface GlobalLoadingProps {
  className?: string;
  barColor?: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
  durationMs?: number;
}

export default function GlobalLoading({
  className,
  barColor = "#000000",
  bgColor = "#ffffff",
  textColor = "#000000",
  textSize = "3rem",
  durationMs = 2000,
}: GlobalLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const intervalTime = 30;
    const step = 100 / (durationMs / intervalTime);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + step;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsHidden(true), 500);
          return 100;
        }
        return newProgress;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [durationMs]);

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
      }}
    >
      {/* KHUNG CHỨA RỘNG 80% */}
      <div
        style={{
          width: "80%", 
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px", // BÍ QUYẾT 1: Dùng gap để tạo khoảng cách cố định vĩnh viễn giữa chữ và thanh bar
        }}
      >
        {/* Khối hiển thị số % */}
        <h1
          style={{
            color: textColor,
            fontSize: textSize, 
            fontWeight: "bold",
            lineHeight: 1, // BÍ QUYẾT 2: Ép chiều cao dòng ôm sát vào chữ, không cho đè xuống dưới
            margin: 0, // Xóa bỏ margin mặc định thừa thãi
          }}
        >
          {Math.floor(progress)}%
        </h1>

        {/* Thanh Background Progress */}
        <div
          style={{
            width: "100%", 
            height: "6px",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Thanh chạy màu đậm */}
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: barColor,
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}