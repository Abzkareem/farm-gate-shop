export async function GET() {
  const response = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
    cache: "no-store",
    redirect: "follow",
  });
  const data = await response.json();
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const response = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      action: "updateStatus",
      reference: body.reference,
      status: body.status,
    }),
  });
  const data = await response.json();
  return Response.json(data);
}