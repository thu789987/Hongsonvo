"use client";

import React, { useState, useEffect } from "react";

interface GlobalLoadingProps {
  className?: string;
  barColor?: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string; // Bổ sung prop chỉnh kích thước chữ
  durationMs?: number;
}

export default function GlobalLoading({
  className,
  barColor = "#000000",
  bgColor = "#ffffff",
  textColor = "#000000",
  textSize = "3rem", // Mặc định là 3rem, bạn có thể đổi trên Plasmic
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
        alignItems: "center", // Giữa màn hình theo chiều ngang
        justifyContent: "center", // Giữa màn hình theo chiều dọc
        zIndex: 99999,
        transition: "opacity 0.5s ease-out",
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? "none" : "auto",
      }}
    >
      {/* KHUNG CHỨA RỘNG 80% MÀN HÌNH */}
      <div
        style={{
          width: "80%", // Thanh loading dài 80% viewport
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Ép toàn bộ nội dung bên trong (chữ số) sang lề trái
        }}
      >
        {/* Khối hiển thị số % */}
        <h1
          style={{
            color: textColor,
            fontSize: textSize, // Kích thước chữ tùy chỉnh
            fontWeight: "bold",
            margin: "0 0 20px 0", // Bỏ margin thừa, chỉ cách thanh bar ở dưới 20px
          }}
        >
          {Math.floor(progress)}%
        </h1>

        {/* Thanh Background Progress */}
        <div
          style={{
            width: "100%", // Chiếm trọn 100% của cái khung 80% ở trên
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