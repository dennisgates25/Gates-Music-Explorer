export async function GET() {
  return Response.json(
    {
      key: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    },
    { headers: { "Cache-Control": "public, max-age=300" } },
  );
}
