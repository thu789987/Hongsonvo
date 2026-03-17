import React, { useState, useEffect } from 'react';

export function CustomCursor() {
  // 1. Khởi tạo state để lưu tọa độ x, y của chuột
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 2. useEffect để lắng nghe sự kiện chuột di chuyển (mousemove)
  useEffect(() => {
    // Chỉ chạy trên trình duyệt (tránh lỗi SSR của Next.js)
    if (typeof window === 'undefined') return;

    // Hàm callback sẽ chạy mỗi khi chuột di chuyển
    const handleMouseMove = (event: MouseEvent) => {
      // clientX, clientY là tọa độ chuột so với cửa sổ trình duyệt
      setPosition({ x: event.clientX, y: event.clientY });
    };

    // Gắn listener lắng nghe sự kiện trên toàn bộ cửa sổ (window)
    window.addEventListener('mousemove', handleMouseMove);

    // Hàm dọn dẹp (clean up) để gỡ bỏ listener khi component bị tắt
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Chỉ chạy 1 lần duy nhất khi component được mount

  return (
    <>
      {/* 3. Thẻ <style> để ẩn con trỏ chuột mặc định của trình duyệt trên toàn web */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Ép buộc ẩn con trỏ chuột mặc định bằng !important */
        * {
          cursor: none !important;
        }
      `}} />

      {/* 4. Thẻ div làm con trỏ tùy chỉnh của chúng ta */}
      <div
        style={{
          // Kích thước và hình dáng đúng yêu cầu
          width: '8px', // Hình vuông 2x2px
          height: '8px',
          borderRadius: '2px', // Radius 2px

          // Style cơ bản cho con trỏ
          backgroundColor: 'black', // Màu sắc con trỏ (bạn có thể đổi màu tùy thích)
          position: 'fixed', // Giữ vị trí cố định trên màn hình (không bị cuộn)
          pointerEvents: 'none', // Cho phép bấm xuyên qua nó (để còn bấm được link, nút bấm ở dưới)
          zIndex: 9999, // Đảm bảo nó luôn nằm trên cùng mọi thứ

          // 👇 BÍ QUYẾT Ở ĐÂY: Vị trí động đi theo tọa độ chuột
          // Chúng ta offset -1px để con trỏ chuột thật sự nằm ở tâm của hình vuông 2x2.
          left: `${position.x - 1}px`,
          top: `${position.y - 1}px`,
        }}
      />
    </>
  );
}