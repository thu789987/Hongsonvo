import * as React from "react";
import { DataProvider } from "@plasmicapp/host";

type CachedAirtableProps = {
  baseId?: string;
  tableName?: string;
  limit?: number;
  children?: React.ReactNode;
};

export function CachedAirtable({
  baseId,
  tableName,
  limit = 10,
  children,
}: CachedAirtableProps) {
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
  }, [baseId, tableName, limit]);

  return (
    <DataProvider
      name="cachedData"
      data={records}
    >
      <DataProvider
        name="cachedDataState"
        data={{
          loading,
          error,
          count: records.length,
        }}
      >
        {children}
      </DataProvider>
    </DataProvider>
  );
}

export { CachedAirtable as CachedAirtableFetcher };