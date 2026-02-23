import React, { useState, useEffect, useRef } from 'react';

const LETTERS = "QWERTYUIOPASDFGHJKLZXCVBNM";

interface HackerTextProps {
  text?: string;
  className?: string;
  defaultColor?: string; // Màu lúc bình thường
  hoverColor?: string;   // Màu lúc rê chuột vào
}

export default function HackerText({ 
  text = "MENU ITEM", 
  className,
  defaultColor = "#ffffff", // Mặc định là màu trắng
  hoverColor = "#00ff00"    // Mặc định là xanh Neon (Hacker)
}: HackerTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false); // Theo dõi trạng thái chuột
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    setIsHovered(true); // Đổi màu khi chuột bắt đầu vào
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => 
        text
          .split("")
          .map((_letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return LETTERS[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3; 
    }, 30);
  };

  const stopScramble = () => {
    setIsHovered(false); // Trả lại màu cũ khi chuột rời đi
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <div 
      className={className}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      style={{ 
        fontFamily: 'Orbitron, sans-serif', 
        cursor: 'pointer',
        color: isHovered ? hoverColor : defaultColor, // Logic đổi màu
        transition: 'color 0.2s ease-in-out' // Chuyển màu mượt mà không bị giật
      }}
    >
      {displayText}
    </div>
  );
}