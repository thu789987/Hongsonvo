import React, { useState, ReactElement, cloneElement, Children, isValidElement } from 'react';

export interface HoverVariantWrapperProps {
  children?: React.ReactNode;
  className?: string;
  variantGroupName?: string; // Tên nhóm variant (mặc định trong Plasmic thường là 'variant')
  baseVariant?: string;      // Tên variant lúc bình thường (VD: 'base')
  hoverVariant?: string;     // Tên variant lúc hover (VD: 'project 1')
}

export function HoverVariantWrapper({
  children,
  className,
  variantGroupName = 'variant',
  baseVariant = 'base',
  hoverVariant = 'project 1',
}: HoverVariantWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Hàm này sẽ "tiêm" variant prop vào các component con
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<any>, {
        // Truyền variant dựa trên trạng thái hover
        [variantGroupName]: isHovered ? hoverVariant : baseVariant,
      });
    }
    return child;
  });

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'contents' }} // Đảm bảo wrapper không làm hỏng layout CSS
    >
      {childrenWithProps}
    </div>
  );
}