export async function POST(req) {
  const { email, cart, name, phone, address, deliveryMethod } = await req.json();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.PAYSTACK_SECRET_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      amount: totalAmount * 100,
      callback_url: "https://farm-gate-shop-pi.vercel.app/order-success",
      metadata: {
        name: name,
        phone: phone,
        address: address,
        deliveryMethod: deliveryMethod,
        cart_items: cart.map(function(item) { return item.name + " x" + item.qty; }).join(", "),
      },
    }),
  });

  const data = await response.json();
  return Response.json(data);
}