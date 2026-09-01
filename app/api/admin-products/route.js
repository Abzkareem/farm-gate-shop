export async function POST(req) {
  const body = await req.json();

  const response = await fetch(process.env.GOOGLE_PRODUCTS_URL, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      id: body.id,
      price: body.price,
      inStock: body.inStock,
    }),
  });
  const data = await response.json();
  return Response.json(data);
}