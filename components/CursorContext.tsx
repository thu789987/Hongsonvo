// components/CursorContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Định nghĩa các kiểu cursor có thể có
type CursorMode = 'default' | 'view'; 

interface CursorContextType {
  cursorMode: CursorMode;
  setCursorMode: (mode: CursorMode) => void;
}

// 2. Tạo Context
const CursorContext = createContext<CursorContextType | undefined>(undefined);

// 3. Tạo Provider Component (Cái hộp bao bọc toàn bộ App)
export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');

  return (
    <CursorContext.Provider value={{ cursorMode, setCursorMode }}>
      {children}
    </CursorContext.Provider>
  );
}

// 4. Tạo Custom Hook để sử dụng Context nhanh hơn ở các file khác
export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};