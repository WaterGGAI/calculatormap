import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getCloudflareEnv() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env;
  } catch {
    return null;
  }
}
