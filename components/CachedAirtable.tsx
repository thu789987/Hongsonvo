import React, { ReactNode, useEffect, useState } from 'react';
import { DataProvider } from "@plasmicapp/react-web/lib/host";

export interface CachedAirtableProps {
  children?: ReactNode;
  sheetId?: string;
  sheetName?: string;
  filterField?: string;
  filterValue?: string;
}

export function CachedAirtable({ 
  children, 
  sheetId, 
  sheetName = "Sheet1",
  filterField,
  filterValue
}: CachedAirtableProps) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      // 1. Kiểm tra nếu chưa nhập ID
      if (!sheetId || sheetId.trim() === "") {
        setError("CHƯA NHẬP ID: Vui lòng dán Google Sheet ID vào ô bên phải.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const url = `https://opensheet.elk.sh/${sheetId}/${encodeURIComponent(sheetName)}`;
        const response = await fetch(`https://opensheet.elk.sh/${sheetId}/${encodeURIComponent(sheetName)}`);
        
        // 2. Kiểm tra nếu API trả về lỗi (thường do sai ID hoặc chưa bật Share)
        if (!response.ok) {
          throw new Error(`LỖI KẾT NỐI: Không thể đọc file. Hãy kiểm tra lại ID hoặc đảm bảo Sheet đã chọn "Anyone with the link can view".`);
        }

        const json = await response.json();

        // 3. Kiểm tra nếu dữ liệu rỗng hoặc sai tên Sheet
        if (!json || (Array.isArray(json) && json.length === 0)) {
          setError(`TRỐNG: Sheet "${sheetName}" không có dữ liệu hoặc bạn gõ sai tên Sheet.`);
          setLoading(false);
          return;
        }

        // 4. Xử lý logic Lọc (Filter)
        if (filterField && filterValue) {
          const singleItem = json.find((item: any) => String(item[filterField]) === String(filterValue));
          if (!singleItem) {
            setError(`LỌC THẤT BẠI: Không tìm thấy dòng nào có cột "${filterField}" khớp với giá trị "${filterValue}".`);
          } else {
            setData(singleItem);
          }
        } else {
          setData(json);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [sheetId, sheetName, filterField, filterValue]);

  // Giao diện hiển thị trạng thái Lỗi/Loading
  const errorStyle = {
    padding: '15px',
    margin: '10px',
    border: '2px solid #ff4d4f',
    borderRadius: '8px',
    backgroundColor: '#fff2f0',
    color: '#cf1322',
    fontFamily: 'sans-serif'
  };

  if (loading) return <div style={{ padding: '20px' }}>⏳ Đang hút dữ liệu từ Google Sheets...</div>;

  if (error) {
    return (
      <div style={errorStyle}>
        <strong style={{fontSize: '16px'}}>⚠️ THÔNG BÁO TỪ HỆ THỐNG:</strong>
        <p style={{marginTop: '8px'}}>{error}</p>
        <ul style={{fontSize: '12px', marginTop: '10px', color: '#666'}}>
          <li>ID hiện tại: {sheetId || "(Trống)"}</li>
          <li>Tên Sheet: {sheetName}</li>
          <li>Bộ lọc: {filterField || "Tắt"}</li>
        </ul>
      </div>
    );
  }

  return (
    <DataProvider name="cachedData" data={data}>
      {children}
    </DataProvider>
  );
}