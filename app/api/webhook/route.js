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
    const { reference, amount, customer, metadata } = event.data;

    const name = metadata && metadata.name ? metadata.name : "Not provided";
    const phone = metadata && metadata.phone ? metadata.phone : "Not provided";
    const address = metadata && metadata.address ? metadata.address : "Not provided";
    const deliveryMethod = metadata && metadata.deliveryMethod ? metadata.deliveryMethod : "Not provided";
    const cartItems = metadata && metadata.cart_items ? metadata.cart_items : "Not provided";

    console.log("Payment confirmed:", {
      reference: reference,
      amountPaid: amount / 100,
      email: customer.email,
      name: name,
      phone: phone,
    });

    try {
      const result = await resend.emails.send({
        from: "Farm Gate Orders <onboarding@resend.dev>",
        to: "kareem4real99@gmail.com",
        subject: "New order - " + (amount / 100).toLocaleString(),
        text: "New confirmed payment.\n\nReference: " + reference + "\nAmount: " + (amount / 100).toLocaleString() + "\nCustomer email: " + customer.email + "\nName: " + name + "\nPhone: " + phone + "\nDelivery method: " + deliveryMethod + "\nAddress: " + address + "\nItems: " + cartItems,
      });
      console.log("Resend result:", JSON.stringify(result));
    } catch (err) {
      console.log("Email send failed:", err.message || String(err));
    }

    try {
      const sheetResponse = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        redirect: "follow",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          reference: reference,
          amount: amount / 100,
          email: customer.email,
          name: name,
          phone: phone,
          address: address,
          deliveryMethod: deliveryMethod,
          items: cartItems,
          status: "Order received",
        }),
      });
      const sheetText = await sheetResponse.text();
      console.log("Sheet log status:", sheetResponse.status, "body:", sheetText);
    } catch (err) {
      console.log("Sheet log failed with message:", err.message || String(err));
    }
  }

  return new Response("OK", { status: 200 });
}