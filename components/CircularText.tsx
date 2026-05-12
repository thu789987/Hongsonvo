import React, { useId } from 'react';

// Khai báo kiểu dữ liệu cho các props có thể chỉnh sửa trên Plasmic
export interface CircularTextProps {
  className?: string; // Bắt buộc phải có cho Plasmic
  text?: string;
  size?: number;
  duration?: number;
  fontSize?: number;
  letterSpacing?: number;
  color?: string;
}

export const CircularText: React.FC<CircularTextProps> = ({
  className = '',
  text = "WANT TO JOIN THE CREW? • ",
  size = 300,
  duration = 20,
  fontSize = 24,
  letterSpacing = 2,
  color = "currentColor"
}) => {
  // Tạo ID duy nhất cho thẻ path để tránh xung đột nếu có nhiều cục xoay trên cùng 1 trang
  const pathId = useId(); 
  
  // Tự động lặp text để đảm bảo nó chạy kín vòng tròn (bạn có thể tuỳ chỉnh số lần lặp)
  const repeatedText = text.repeat(4); 

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <svg
        viewBox="0 0 250 250"
        style={{
          width: '100%',
          height: '100%',
          animation: `plasmic-spin ${duration}s linear infinite`,
          transformOrigin: 'center'
        }}
      >
        <defs>
          <path
            id={pathId}
            d="M 25, 125 a 100, 100 0 1, 1 200, 0 a 100, 100 0 1, 1 -200, 0"
          />
        </defs>
        <text
          fill={color}
          fontSize={fontSize}
          letterSpacing={`${letterSpacing}px`}
          // Font family sẽ được thừa kế từ setting của Plasmic thông qua className
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {repeatedText}
          </textPath>
        </text>
      </svg>

      {/* Inline style cho keyframes để đảm bảo animation luôn chạy mà không cần file CSS ngoài */}
      <style>{`
        @keyframes plasmic-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};