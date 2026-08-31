export async function GET() {
  const response = await fetch(process.env.GOOGLE_PRODUCTS_URL, {
    cache: "no-store",
    redirect: "follow",
  });
  const data = await response.json();
  return Response.json(data);
}