"use client";

import React, { useState, useEffect } from "react";

interface GlobalLoadingProps {
  className?: string;
  barColor?: string;
  bgColor?: string;
  textColor?: string;
  durationMs?: number; // Tổng thời gian chạy từ 0-100% (tính bằng mili-giây)
}

export default function GlobalLoading({
  className,
  barColor = "#000000",
  bgColor = "#ffffff",
  textColor = "#000000",
  durationMs = 2000, // Mặc định chạy trong 2 giây
}: GlobalLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Chỉ chạy hiệu ứng trên trình duyệt (tránh lỗi Hydration của Next.js)
    if (typeof window === "undefined") return;

    const intervalTime = 30; // Cập nhật mỗi 30ms cho mượt
    const step = 100 / (durationMs / intervalTime);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + step;
        if (newProgress >= 100) {
          clearInterval(timer);
          // Đợi nửa giây ở mốc 100% cho đẹp mắt rồi mới ẩn đi
          setTimeout(() => setIsHidden(true), 500);
          return 100;
        }
        return newProgress;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [durationMs]);

  // Nếu đã ẩn hoàn toàn thì hủy render để không chặn user click vào trang web
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
        zIndex: 99999, // Đảm bảo luôn nằm trên cùng che mọi thứ
        transition: "opacity 0.5s ease-out",
        opacity: progress === 100 ? 0 : 1, // Hiệu ứng fade-out mờ dần khi đạt 100%
        pointerEvents: progress === 100 ? "none" : "auto",
      }}
    >
      {/* Khối hiển thị số % */}
      <h1 style={{ color: textColor, fontSize: "3rem", marginBottom: "20px", fontWeight: "bold" }}>
        {Math.floor(progress)}%
      </h1>

      {/* Thanh Background Progress (màu nhạt) */}
      <div
        style={{
          width: "250px",
          height: "6px",
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Thanh chạy màu đậm (chiều dài dựa theo state progress) */}
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
  );
}