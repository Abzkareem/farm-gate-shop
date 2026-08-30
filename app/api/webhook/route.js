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

    // Send email notification
    try {
      const result = await resend.emails.send({
        from: "Farm Gate Orders <onboarding@resend.dev>",
        to: "kareem4real99@gmail.com",
        subject: `New order — ₦${(amount / 100).toLocaleString()}`,
        text: `New confirmed payment!\n\nReference: ${reference}\nAmount: ₦${(amount / 100).toLocaleString()}\nCustomer email: ${customer.email}\n\nReach out to confirm delivery/pickup details.`,
      });
      console.log("Resend result:", JSON.stringify(result));
    } catch (err) {
      console.log("Email send failed:", JSON.stringify(err));
    }

    // Log order to Google Sheet
    try {
      const sheetResponse = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          amount: amount / 100,
          email: customer.email,
        }),
      });
      console.log("Sheet log status:", sheetResponse.status);
    } catch (err) {
      console.log("Sheet log failed:", JSON.stringify(err));
    }
  }

  return new Response("OK", { status: 200 });
}