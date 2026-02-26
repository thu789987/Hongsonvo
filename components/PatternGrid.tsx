import React, { isValidElement, ReactElement, ReactNode } from 'react';

// 👇 1. Cập nhật Props: Tách gap thành rowGap và columnGap
interface PatternGridProps {
  children: ReactNode;
  className?: string;
  rowGap?: number;    // Khoảng cách dọc (giữa các hàng)
  columnGap?: number; // Khoảng cách ngang (giữa các cột)
}

export function PatternGrid({ 
  children, 
  className,
  rowGap = 16,      // Giá trị mặc định là 16
  columnGap = 16    // Giá trị mặc định là 16
}: PatternGridProps) {

  const getFlattenedChildren = (nodes: ReactNode): ReactNode[] => {
    const array = React.Children.toArray(nodes);
    
    if (array.length === 1 && isValidElement(array[0])) {
      const child = array[0] as ReactElement<{ children?: ReactNode }>;

      if (child.type === React.Fragment) {
        return getFlattenedChildren(child.props.children);
      }

      if (child.props && child.props.children) {
         const innerChildren = React.Children.toArray(child.props.children);
         if (innerChildren.length > 1) return innerChildren;
      }
    }
    return array;
  };

  const items = getFlattenedChildren(children);

  const getSpanStyle = (index: number) => {
    const positionInCycle = index % 9;
    if (positionInCycle === 1 || positionInCycle === 5 || positionInCycle === 6) {
      return { gridColumn: 'span 2' };
    }
    return { gridColumn: 'span 1' };
  };

  const safeClassName = className || 'pattern-grid';
  const selector = `.${safeClassName.split(' ')[0]}`; 

  return (
    <div 
      className={safeClassName}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', 
        // 👇 2. Áp dụng khoảng cách riêng biệt vào CSS
        rowGap: `${rowGap}px`,
        columnGap: `${columnGap}px`,
        width: '100%',
      }}
    >
      {items.map((child, index) => (
        <div 
          key={index} 
          style={{
            ...getSpanStyle(index),
            display: 'flex',
            flexDirection: 'column',
            minHeight: '200px'
          }}
        >
          {child}
        </div>
      ))}
      
      {/* Style Responsive - Mobile về 1 cột */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          ${selector} {
            grid-template-columns: 1fr !important;
          }
          ${selector} > div {
            grid-column: span 1 !important;
          }
        }
      `}} />
    </div>
  );
}