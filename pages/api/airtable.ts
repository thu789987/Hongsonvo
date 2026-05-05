import type { NextApiRequest, NextApiResponse } from "next";

const CACHE_SECONDS = 60 * 60 * 3; // 3 tiếng

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { baseId, tableName, limit = "10" } = req.query;

    if (!baseId || !tableName) {
      return res.status(400).json({
        error: "Missing baseId or tableName",
      });
    }

    const token = process.env.AIRTABLE_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "Missing AIRTABLE_TOKEN",
      });
    }

    const safeLimit = Math.min(Number(limit) || 10, 100);

    // 1. CHUYỂN PARAMS LÊN ĐÂY (Trước khi gọi fetch)
    const params = new URLSearchParams({
       maxRecords: String(safeLimit),
       "sort[0][field]": "Id",
       "sort[0][direction]": "asc",
    });

    // 2. GẮN PARAMS VÀO URL (Thay vì viết cứng ?maxRecords=...)
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      String(tableName)
    )}?${params.toString()}`;

    const airtableRes = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!airtableRes.ok) {
      const errorText = await airtableRes.text();

      return res.status(airtableRes.status).json({
        error: "Airtable request failed",
        detail: errorText,
      });
    }
    
    const json = await airtableRes.json();

    res.setHeader(
      "Vercel-CDN-Cache-Control",
      `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600`
    );

    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json({
      records: json.records || [],
      cachedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal server error",
      detail: error?.message || String(error),
    });
  }
}