import { NextResponse } from "next/server";
import { runSeoAutomation } from "@/lib/ai-automation";
import { getCloudflareEnv } from "@/lib/cloudflare";

type ManualAutomationRunRequest = {
  force?: boolean;
  batchSizeOverride?: number;
};

export async function POST(request: Request) {
  const env = await getCloudflareEnv();
  const db = env?.DB;
  const ai = env?.AI;

  if (!db || !ai) {
    return NextResponse.json({ success: false, error: "Cloudflare D1 or AI binding is not configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => ({}))) as ManualAutomationRunRequest;
  const summary = await runSeoAutomation(
    {
      DB: db,
      AI: ai
    },
    {
      triggerSource: "manual",
      force: body.force === true,
      batchSizeOverride: body.batchSizeOverride
    }
  );

  return NextResponse.json({
    success: true,
    data: summary
  });
}
