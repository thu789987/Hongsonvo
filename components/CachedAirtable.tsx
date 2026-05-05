import * as React from "react";
import { DataProvider } from "@plasmicapp/host";
import { useRouter } from "next/router";

type CachedAirtableProps = {
  baseId?: string;
  tableName?: string;
  limit?: number;
  filterField?: string;
  filterValue?: string;
  children?: React.ReactNode;
};

export function CachedAirtable({
  baseId,
  tableName,
  limit = 10,
  filterField,
  filterValue,
  children,
}: CachedAirtableProps) {
  const router = useRouter();

  const slugFromUrl =
    typeof router.query.slug === "string" ? router.query.slug : "";

  const finalFilterValue = filterValue || slugFromUrl;

  const [records, setRecords] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // 1. THÊM BIẾN isMounted Ở ĐÂY (Giải quyết Thủ phạm số 3)
  const [isMounted, setIsMounted] = React.useState(false);

  // 2. BẬT CỜ BÁO HIỆU COMPONENT ĐÃ XUẤT HIỆN TRÊN TRÌNH DUYỆT
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      if (!baseId || !tableName) return;

      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          baseId,
          tableName,
          limit: String(limit),
        });

        if (filterField && finalFilterValue) {
          params.set("filterField", filterField);
          params.set("filterValue", finalFilterValue);
        }

        const res = await fetch(`/api/airtable?${params.toString()}`);

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const json = await res.json();

        setRecords(json.records || []);
      } catch (err: any) {
        console.error("CachedAirtable error:", err);
        setError(err?.message || "Unknown error");
        setRecords([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [baseId, tableName, limit, filterField, finalFilterValue]);

  // 3. CHẶN ĐỨNG RENDER TRÊN SERVER Ở ĐÂY
  // Nếu web chưa load xong trên trình duyệt, không render gì cả để tránh lỗi hụt data
  if (!isMounted) {
    return null; 
  }

  return (
    <DataProvider name="cachedData" data={records}>
      <DataProvider
        name="cachedDataState"
        data={{
          loading,
          error,
          count: records.length,
          firstRecord: records[0] || null,
          slug: slugFromUrl,
        }}
      >
        {children}
      </DataProvider>
    </DataProvider>
  );
}

export { CachedAirtable as CachedAirtableFetcher };