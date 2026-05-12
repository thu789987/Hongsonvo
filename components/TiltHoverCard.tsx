import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

export interface TiltHoverCardProps {
  className?: string; // Bắt buộc cho Plasmic
  children?: React.ReactNode; // Slot để thả content vào
  rotationRange?: number; // Độ nghiêng tối đa
  popOutZ?: number; // Độ nổi 3D của content bên trong
}

export const TiltHoverCard: React.FC<TiltHoverCardProps> = ({
  className = "",
  children,
  rotationRange = 32.5,
  popOutZ = 50,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  // Thêm perspective vào để tạo độ sâu 3D thực tế
  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * rotationRange;
    const mouseY = (e.clientY - rect.top) * rotationRange;

    const rX = (mouseY / height - (rotationRange / 2)) * -1;
    const rY = mouseX / width - (rotationRange / 2);

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0); // Trả về vị trí cũ khi chuột rời đi
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
    >
      {/* Vùng chứa Content bên trong, được đẩy nổi lên với translateZ */}
      <div
        style={{
          transform: `translateZ(${popOutZ}px)`,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};