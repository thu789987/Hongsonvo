import React, { useState, ReactElement, cloneElement, Children, isValidElement } from 'react';

export interface HoverVariantWrapperProps {
  children?: React.ReactNode;
  className?: string;
  isStandaloneVariant?: boolean; // THÊM MỚI: Checkbox kiểm tra loại variant
  variantGroupName?: string; 
  baseVariant?: string;      
  hoverVariant?: string;     
}

export function HoverVariantWrapper({
  children,
  className,
  isStandaloneVariant = true, // Giả sử mặc định là không có nhóm
  variantGroupName = 'variant',
  baseVariant = 'base',
  hoverVariant = 'project 1',
}: HoverVariantWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      
      // XỬ LÝ LÔ-GIC TRUYỀN PROPS DỰA TRÊN LOẠI VARIANT
      let variantProps = {};

      if (isStandaloneVariant) {
        // TRƯỜNG HỢP KHÔNG CÓ NHÓM: Bật/Tắt trực tiếp tên variant
        variantProps = {
          // Khi hover thì bật hoverVariant lên (true)
          [hoverVariant]: isHovered,
          // Nếu có baseVariant thì tắt nó khi hover (tuy nhiên Plasmic thường tự hiểu base là mặc định khi mọi thứ khác false)
          ...(baseVariant ? { [baseVariant]: !isHovered } : {}),
        };
      } else {
        // TRƯỜNG HỢP CÓ NHÓM: Đổi giá trị string
        variantProps = {
          [variantGroupName]: isHovered ? hoverVariant : baseVariant,
        };
      }

      return cloneElement(child as ReactElement<any>, variantProps);
    }
    return child;
  });

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'contents' }}
    >
      {childrenWithProps}
    </div>
  );
}