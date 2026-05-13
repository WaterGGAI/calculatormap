import { buildCalculatorIndex } from "@/lib/geo";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildCalculatorIndex(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
