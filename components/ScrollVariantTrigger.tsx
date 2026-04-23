"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { DataProvider } from "@plasmicapp/loader-nextjs"; // Hoặc @plasmicapp/host

interface ScrollVariantTriggerProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function ScrollVariantTrigger({
  children,
  className,
  once = true,
  threshold = 0.2,
}: ScrollVariantTriggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div ref={ref} className={className}>
      {/* LUÔN LUÔN bọc DataProvider. 
          Nếu chưa mount xong (trên server) thì ép giá trị isReached = false 
      */}
      <DataProvider 
        name="scrollStatus" 
        data={{ isReached: isMounted ? isInView : false }}
      >
        {children}
      </DataProvider>
    </div>
  );
}