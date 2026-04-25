import { NextResponse } from "next/server";
import { getCloudflareEnv } from "@/lib/cloudflare";
import { listRecentAutomationRunsFromDb, upsertAutomationSettingsInDb, type SeoAutomationSettings } from "@/lib/site-settings";

type SaveAutomationSettingsRequest = Partial<SeoAutomationSettings>;

export async function POST(request: Request) {
  const env = await getCloudflareEnv();
  const db = env?.DB;

  if (!db) {
    return NextResponse.json({ success: false, error: "D1 binding is not configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => ({}))) as SaveAutomationSettingsRequest;
  const settings = await upsertAutomationSettingsInDb(db, body);
  const recentRuns = await listRecentAutomationRunsFromDb(db);

  return NextResponse.json({
    success: true,
    data: {
      settings,
      recentRuns
    }
  });
}
