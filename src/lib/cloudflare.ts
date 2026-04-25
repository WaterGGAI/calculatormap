import { getCloudflareContext } from "@opennextjs/cloudflare";

export type AppCloudflareEnv = {
  DB?: D1Database;
  AI?: Ai;
  MEDIA_BUCKET?: R2Bucket;
};

export async function getCloudflareEnv(): Promise<AppCloudflareEnv | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env as AppCloudflareEnv;
  } catch {
    return null;
  }
}
