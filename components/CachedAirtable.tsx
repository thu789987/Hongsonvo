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
  
  // Dùng useEffect để lấy slug một cách an toàn chỉ khi ở Client
  const [slugFromUrl, setSlugFromUrl] = React.useState("");
  
  // Trạng thái dữ liệu
  const [records, setRecords] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Bước 1: Lấy Slug an toàn
  React.useEffect(() => {
    if (router.isReady && typeof router.query.slug === "string") {
      setSlugFromUrl(router.query.slug);
    }
  }, [router.isReady, router.query.slug]);

  // Bước 2: Gọi API
  React.useEffect(() => {
    async function fetchData() {
      // Chặn nếu thiếu BaseID hoặc đang chờ Router nạp
      if (!baseId || !tableName || !router.isReady) return;

      try {
        setLoading(true);
        setError(null);

        const finalFilterValue = filterValue || slugFromUrl;

        const params = new URLSearchParams({
          baseId,
          tableName,
          limit: String(limit),
          t: Date.now().toString() // Chống kẹt Cache
        });

        if (filterField && finalFilterValue) {
          params.set("filterField", filterField);
          params.set("filterValue", finalFilterValue);
        }

        const res = await fetch(`/api/airtable?${params.toString()}`);
        if (!res.ok) throw new Error("API failed");

        const json = await res.json();
        
        // Cập nhật State
        if (json.records && Array.isArray(json.records)) {
          setRecords(json.records);
        } else {
          setRecords([]);
        }
      } catch (err: any) {
        setError(err.message);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [baseId, tableName, limit, filterField, filterValue, slugFromUrl, router.isReady]);

  // Bước 3: Render an toàn
  return (
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
        {/* Chỉ render children khi đã chạy xong trên Client và có Data */}
        <div key={records.length > 0 ? "has-data" : "no-data"} style={{ display: "contents" }}>
          {records.length > 0 ? children : null}
        </div>
      </DataProvider>
    </DataProvider>
  );
}

export { CachedAirtable as CachedAirtableFetcher };