/// <reference types="@cloudflare/workers-types" />

import { runSeoAutomation } from "../../src/lib/ai-automation";
import { getAutomationSettingsFromDb, listRecentAutomationRunsFromDb } from "../../src/lib/site-settings";

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
  "access-control-allow-headers": "content-type,authorization"
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

function json<T>(payload: ApiResponse<T>, init?: ResponseInit) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...init?.headers
    }
  });
}

function notFound(pathname: string) {
  return json({ success: false, error: `No route for ${pathname}` }, { status: 404 });
}

type WorkerEnv = {
  DB: D1Database;
  AI: Ai;
};

export default {
  async fetch(request: Request, env: WorkerEnv) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: jsonHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/healthz") {
      const settings = await getAutomationSettingsFromDb(env.DB);
      const recentRuns = await listRecentAutomationRunsFromDb(env.DB, 3);

      return json({
        success: true,
        data: {
          ok: true,
          automationEnabled: settings.enabled,
          batchSize: settings.batchSize,
          minDaysBetweenRefresh: settings.minDaysBetweenRefresh,
          lastRunAt: settings.lastRunAt,
          lastStatus: settings.lastStatus,
          recentRuns
        }
      });
    }

    return notFound(url.pathname);
  },
  async scheduled(controller: ScheduledController, env: WorkerEnv, ctx: ExecutionContext) {
    ctx.waitUntil(
      runSeoAutomation(
        {
          DB: env.DB,
          AI: env.AI
        },
        {
          triggerSource: "cron"
        }
      ).then((summary) => {
        console.log(
          JSON.stringify({
            type: "seo-automation",
            cron: controller.cron,
            status: summary.status,
            selectedCount: summary.selectedCount,
            successCount: summary.successCount,
            failureCount: summary.failureCount,
            appliedSlugs: summary.appliedSlugs
          })
        );
      })
    );
  }
} satisfies ExportedHandler<WorkerEnv>;
