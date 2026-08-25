import crypto from "crypto";

export async function POST(req) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const body = await req.text();

  // Verify this request genuinely came from Paystack, not an impersonator
  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
  const signature = req.headers.get("x-paystack-signature");

  if (hash !== signature) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const { reference, amount, customer } = event.data;

    // This is where a real order gets recorded — for now, just log it.
    // Later: save to a database, send yourself an email/WhatsApp alert, etc.
    console.log("✅ Payment confirmed:", {
      reference,
      amountPaid: amount / 100,
      email: customer.email,
    });
  }

  return new Response("OK", { status: 200 });
} 
