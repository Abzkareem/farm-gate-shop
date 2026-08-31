export async function GET() {
  try {
    const response = await fetch(process.env.GOOGLE_PRODUCTS_URL, {
      cache: "no-store",
      redirect: "follow",
    });
    const text = await response.text();
    console.log("Products raw response:", text);
    const data = JSON.parse(text);
    return Response.json(data);
  } catch (err) {
    console.log("Products fetch failed:", err.message || String(err));
    return Response.json({ error: "Failed to load products" }, { status: 500 });
  }
}