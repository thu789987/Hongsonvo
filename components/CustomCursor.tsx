import React, { useState, useEffect } from 'react';
import { useCursor } from './CursorContext';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { cursorMode } = useCursor(); 

  // Kiểm tra xem có đang ở chế độ View không
  const isViewMode = cursorMode === 'view';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `* { cursor: none !important; }`}} />
      
      {/* CHỈ DÙNG 1 THẺ DIV DUY NHẤT ĐỂ ANIMATION HOẠT ĐỘNG */}
      <div
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // Ẩn chữ đi khi con trỏ đang thu nhỏ thành 2px

          // 👇 LINH HỒN CỦA ANIMATION: Chuyển động mượt mà cho mọi thay đổi (0.3s)
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',

          // 👇 THAY ĐỔI KÍCH THƯỚC VÀ HÌNH DÁNG ĐỘNG
          width: isViewMode ? '80px' : '8px',
          height: isViewMode ? '32px' : '8px',
          borderRadius: isViewMode ? '20px' : '2px',
          backgroundColor: isViewMode ? '#1a1a1a' : 'black',

          // 👇 XỬ LÝ TỌA ĐỘ TÂM CỦA CON TRỎ
          // Nếu là view mode (80x32) -> lùi lại 40px và 16px
          // Nếu là default mode (2x2) -> lùi lại 1px và 1px
          transform: `translate(${position.x - (isViewMode ? 40 : 1)}px, ${position.y - (isViewMode ? 16 : 1)}px)`,
        }}
      >
        {/* NỘI DUNG CHỮ VÀ ICON BÊN TRONG */}
        <span 
          style={{
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            whiteSpace: 'nowrap', // Không cho chữ rớt dòng
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            
            // 👇 HIỆU ỨNG CỦA CHỮ: Từ từ hiện ra sau khi cái khung đã phình to
            opacity: isViewMode ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
            transitionDelay: isViewMode ? '0.1s' : '0s' // Khi hover vào thì chờ 0.1s mới hiện chữ
          }}
        >
          VIEW ↗
        </span>
      </div>
    </>
  );
}