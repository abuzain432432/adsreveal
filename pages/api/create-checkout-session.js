const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log("stripe key", process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log(req.body);
  const { productId, referralId } = req.body; // Retrieve referral ID from POST data
  console.log(productId);
  console.log(referralId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: productId,
        quantity: 1,
      },
    ],
    metadata: {
      custom_identifier: req.body.custom_identifier,
      email: req.body.email,
      productId: productId,
    },
    success_url: `http://app.adsreveal.com/success`,
    cancel_url: "http://app.adsreveal.com/payment",
    // Pass referral ID as client_reference_id
    client_reference_id: referralId, // Include referral ID in Stripe API call
  });
  const checkoutUrl = session.url;
  console.log(checkoutUrl);

  res.status(200).json({ checkoutUrl });
}
