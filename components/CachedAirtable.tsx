import React, { ReactNode, useEffect, useState } from 'react';
import { DataProvider } from '@plasmicapp/loader-nextjs';

export interface CachedAirtableProps {
  children?: ReactNode;
  sheetId?: string;
  sheetName?: string;
  filterField?: string; // Tên cột để lọc (vd: slug)
  filterValue?: string; // Giá trị để lọc (vd: dự án A)
}

export function CachedAirtable({ 
  children, 
  sheetId = "", 
  sheetName = "Sheet1",
  filterField,
  filterValue
}: CachedAirtableProps) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!sheetId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(`https://opensheet.elk.sh/${sheetId}/${sheetName}`);
        const json = await response.json();
        
        if (Array.isArray(json)) {
            // LOGIC ĐA NĂNG:
            // Nếu có điền filterField và filterValue -> Tìm 1 dự án duy nhất (cho trang Detail)
            // Nếu không điền -> Lấy cả danh sách (cho trang List)
            if (filterField && filterValue) {
              const singleItem = json.find(item => String(item[filterField]) === String(filterValue));
              setData(singleItem || null);
            } else {
              setData(json);
            }
        }
      } catch (e) {
        console.error("Lỗi lấy dữ liệu:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [sheetId, sheetName, filterField, filterValue]);

  if (loading) return <div style={{ padding: '20px' }}>⏳ Đang tải dữ liệu...</div>;
  if (!data) return <div style={{ padding: '20px' }}>⚠️ Không tìm thấy dữ liệu phù hợp.</div>;

  return (
    <DataProvider name="cachedData" data={data}>
      {children}
    </DataProvider>
  );
}