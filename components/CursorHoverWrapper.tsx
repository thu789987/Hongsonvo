// components/CursorHoverWrapper.tsx
import React, { ReactNode } from 'react';
import { useCursor } from './CursorContext'; // Import hook

interface CursorHoverWrapperProps {
  children: ReactNode; // Nội dung thẻ cha bọc bên trong (là cái Card)
  className?: string; // Giữ lại class từ Plasmic để không mất layout
}

export function CursorHoverWrapper({ children, className }: CursorHoverWrapperProps) {
  // Lấy hàm setCursorMode ra
  const { setCursorMode } = useCursor();

  return (
    <div
      className={className}
      // 👇 1. Khi chuột vào: Báo tin mode 'view'
      onMouseEnter={() => setCursorMode('view')}
      // 👇 2. Khi chuột ra: Báo tin mode 'default'
      onMouseLeave={() => setCursorMode('default')}
    >
      {children}
    </div>
  );
}