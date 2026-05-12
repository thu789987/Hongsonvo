import React, { useId } from 'react';

export interface CircularTextProps {
  className?: string;
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
  const pathId = useId(); 
  const repeatedText = text.repeat(4); 

  return (
    <div
      className={className}
      style={{
        // Chỉ giữ lại kích thước và flex để căn giữa SVG, loại bỏ position
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg
        viewBox="0 0 250 250"
        style={{
          width: '100%',
          height: '100%',
          animation: `plasmic-spin ${duration}s linear infinite`,
          transformOrigin: 'center',
          overflow: 'visible' // Tránh bị cắt chữ khi xoay
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
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {repeatedText}
          </textPath>
        </text>
      </svg>

      <style>{`
        @keyframes plasmic-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};