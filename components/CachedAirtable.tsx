import React, { useState, useEffect } from 'react';
import { DataProvider } from '@plasmicapp/loader-nextjs';

const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3 tiếng

interface CachedAirtableProps {
  children?: React.ReactNode;
  className?: string;
  baseId: string;
  tableName: string;
  limit?: number;
}

export function CachedAirtable({ 
  children, 
  className, 
  baseId, 
  tableName, 
  limit = 10 
}: CachedAirtableProps) {
  
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!baseId || !tableName) return;

    const cacheKey = `plasmic_airtable_${baseId}_${tableName}_${limit}`;
    const now = Date.now();

    // 1. KIỂM TRA TRONG Ổ CỨNG TRÌNH DUYỆT (localStorage)
    const cachedString = window.localStorage.getItem(cacheKey);
    
    if (cachedString) {
      const cachedItem = JSON.parse(cachedString);
      
      // Nếu có dữ liệu VÀ chưa quá 3 tiếng
      if (now - cachedItem.timestamp < CACHE_DURATION) {
        console.log("💎 Dùng dữ liệu từ LocalStorage (Bất tử F5)");
        setData(cachedItem.data);
        return; 
      }
    }

    // 2. NẾU QUÁ 3 TIẾNG HOẶC CHƯA CÓ: Gọi Airtable
    const fetchData = async () => {
      try {
        console.log("🚀 Vượt quá 3h hoặc chưa có data, đang gọi API mới...");
        const token = process.env.NEXT_PUBLIC_AIRTABLE_PAT; 
        
        const res = await fetch(
          `https://api.airtable.com/v0/${baseId}/${tableName}?maxRecords=${limit}`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error("Lỗi gọi dữ liệu Airtable");

        const json = await res.json();
        
        // 3. CẬP NHẬT VÀO LOCALSTORAGE
        window.localStorage.setItem(cacheKey, JSON.stringify({
          data: json.records,
          timestamp: Date.now()
        }));
        
        setData(json.records);

      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, [baseId, tableName, limit]);

  return (
    <DataProvider name="cachedData" data={data}>
      <div className={className}>
        {error ? <p style={{color: 'red'}}>{error}</p> : children}
      </div>
    </DataProvider>
  );
}