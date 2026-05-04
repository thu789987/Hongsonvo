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

  React.useEffect(() => {
    async function fetchData() {
      if (!baseId || !tableName) return;

      const token = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

      if (!token) {
        console.warn("Missing Airtable token");
        return;
      }

      const res = await fetch(
        `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
          tableName
        )}?maxRecords=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      setRecords(json.records || []);
    }

    fetchData();
  }, [baseId, tableName, limit]);

  return (
    <DataProvider name="airtableRecords" data={records}>
      {children}
    </DataProvider>
  );
}

export { CachedAirtable as CachedAirtableFetcher };