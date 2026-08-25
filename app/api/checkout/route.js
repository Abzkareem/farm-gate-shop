export async function POST(req) {
  const { email, cart } = await req.json();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: totalAmount * 100,
      callback_url: "http://localhost:3000/order-success",
    }),
  });

  const data = await response.json();
  return Response.json(data);
}