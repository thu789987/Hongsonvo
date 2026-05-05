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

  const slugFromUrl = typeof router.query.slug === "string" ? router.query.slug : "";
  const finalFilterValue = filterValue || slugFromUrl;

  const [records, setRecords] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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

        if (filterField && finalFilterValue && filterField !== "undefined" && finalFilterValue !== "undefined") {
          params.set("filterField", filterField);
          params.set("filterValue", finalFilterValue);
        }
        
        // Chống kẹt Cache của Vercel
        params.set("t", Date.now().toString());

        const res = await fetch(`/api/airtable?${params.toString()}`);

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const json = await res.json();
        
        // TẠO MẢNG MỚI HOÀN TOÀN để React nhận diện sự thay đổi trạng thái
        const newData = json.records ? [...json.records] : [];
        setRecords(newData);

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
        {/* CÚ ĐẤM THÉP: Dùng key để ép React đập đi xây lại UI khi độ dài mảng data thay đổi. */}
        {/* style={{display: 'contents'}} giúp cái thẻ div này tàng hình, không làm vỡ bố cục Card của bạn */}
        <div key={`airtable-render-${records.length}`} style={{ display: "contents" }}>
          {children}
        </div>
      </DataProvider>
    </DataProvider>
  );
}

export { CachedAirtable as CachedAirtableFetcher };