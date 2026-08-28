import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const body = await req.text();

  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
  const signature = req.headers.get("x-paystack-signature");

  if (hash !== signature) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const { reference, amount, customer } = event.data;

    console.log("✅ Payment confirmed:", {
      reference,
      amountPaid: amount / 100,
      email: customer.email,
    });

    try {
      await resend.emails.send({
        from: "Farm Gate Orders <onboarding@resend.dev>",
        to: "farmgate26@gmail.com",
        subject: `New order — ₦${(amount / 100).toLocaleString()}`,
        text: `New confirmed payment!\n\nReference: ${reference}\nAmount: ₦${(amount / 100).toLocaleString()}\nCustomer email: ${customer.email}\n\nReach out to confirm delivery/pickup details.`,
      });
    } catch (err) {
      console.log("Email send failed:", err);
    }
  }

  return new Response("OK", { status: 200 });
}