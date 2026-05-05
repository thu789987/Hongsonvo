import * as React from "react";
import { DataProvider } from "@plasmicapp/host";
import { useRouter } from "next/router";

export function CachedAirtable({
  baseId,
  tableName,
  limit = 10,
  filterField,
  filterValue,
  children,
}: any) {
  const router = useRouter();
  const [records, setRecords] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Thêm một biến đếm để theo dõi số lần render
  const renderCount = React.useRef(0);
  renderCount.current++;

  React.useEffect(() => {
    // Chỉ chạy khi router đã sẵn sàng (tránh lỗi query rỗng trên Vercel)
    if (!router.isReady) return;

    async function fetchData() {
      if (!baseId || !tableName) return;

      try {
        setLoading(true);
        console.log("🚀 Bắt đầu gọi API cho:", tableName);

        const slugFromUrl = typeof router.query.slug === "string" ? router.query.slug : "";
        const finalFilterValue = filterValue || slugFromUrl;

        const params = new URLSearchParams({
          baseId,
          tableName,
          limit: String(limit),
          t: Date.now().toString(), // Phá cache
        });

        if (filterField && finalFilterValue) {
          params.set("filterField", filterField);
          params.set("filterValue", finalFilterValue);
        }

        const res = await fetch(`/api/airtable?${params.toString()}`);
        const json = await res.json();

        console.log("✅ Dữ liệu nhận được trong Component:", json);

        if (json.records && Array.isArray(json.records)) {
          console.log(`📦 Đang nạp ${json.records.length} records vào State`);
          setRecords([...json.records]);
        } else {
          console.warn("⚠️ Cấu trúc JSON không có trường 'records':", json);
          setRecords([]);
        }
      } catch (err: any) {
        console.error("❌ Lỗi Fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [baseId, tableName, limit, filterField, filterValue, router.isReady, router.query.slug]);

  return (
    <div className="airtable-fetcher-debug-wrapper">
      {/* PHẦN DEBUG HIỂN THỊ TRỰC TIẾP TỪ STATE (KHÔNG QUA PLASMIC) */}
      <div style={{
        padding: '5px', 
        background: '#fff3cd', 
        color: '#856404', 
        fontSize: '10px',
        border: '1px solid #ffeeba',
        marginBottom: '10px',
        zIndex: 9999,
        position: 'relative'
      }}>
        <b>Debug Hệ Thống:</b><br/>
        - Số lần Render: {renderCount.current}<br/>
        - State Records: {records.length} bài viết<br/>
        - Loading: {loading ? "Đang chạy..." : "Xong"}<br/>
        - API URL check: {baseId ? "Có BaseID" : "Thiếu BaseID"}
      </div>

      <DataProvider name="cachedData" data={records}>
        <DataProvider
          name="cachedDataState"
          data={{
            loading,
            error,
            count: records.length,
            firstRecord: records[0] || null,
          }}
        >
          {/* ÉP RENDER LẠI KHI CÓ DỮ LIỆU */}
          <React.Fragment key={records.length > 0 ? "has-data" : "no-data"}>
             {children}
          </React.Fragment>
        </DataProvider>
      </DataProvider>
    </div>
  );
}

export { CachedAirtable as CachedAirtableFetcher };