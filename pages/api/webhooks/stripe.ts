import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id, type, data, livemode, created, request, api_version } =
      req.body;

    console.log("Webhook received with the following data:");
    console.log(`- Type: ${type}`);
    console.log(`- Livemode: ${livemode}`);
    console.log(`- metadata: ${data.object.metadata.custom_identifier}`);
    console.log(`- data object test: ${JSON.stringify(data.object, null, 2)}`);

    // Extract necessary data from Stripe webhook payload
    let customerId, paymentAmount, paymentMethod;

    if (type === "checkout.session.completed") {
      customerId = data.object.customer_details.email;
      paymentAmount = data.object.amount_total;
      paymentMethod = data.object.payment_method;
    } else if (type === "invoice.payment_succeeded") {
      customerId = data.object.customer_email;
      paymentAmount = data.object.amount_paid;
      paymentMethod = data.object.payment_intent.payment_method;
    }

    try {
      // Retrieve user's profile from MongoDB
      console.log("Retrieving User Profile");
      const client = await clientPromise;
      const collection = client.db().collection("users");
      const user = await collection.findOne({
        email: customerId.toLowerCase(),
      });

      if (!user) {
        console.log(
          `User with email ${data.object.metadata.email} not found in MongoDB`
        );
        return res.status(404).end();
      }

      // Verify that the user object retrieved from MongoDB is a valid ObjectId
      if (!ObjectId.isValid(user._id)) {
        console.log(`Invalid ObjectId ${user._id} retrieved from MongoDB`);
        return res.status(500).json({ message: "Invalid user ID" });
      }
      console.log({ amount: paymentAmount, method: paymentMethod });
      // Update user's profile with new payment information
      user.userData.stripeData.push(data.object);

      // Add credits to the user's account based on the plan
      // 5500 = $55
      if (paymentAmount === 100) {
        user.userData.credits += 1000;
      } else if (paymentAmount === 10000) {
        // 10000 = $100
        user.userData.credits += 5000;
      } else if (paymentAmount === 15000) {
        // $150 = 15000
        user.userData.credits += 10000;
      }

      await collection.updateOne({ _id: user._id }, { $set: user });

      console.log(
        `User with Email ${data.object.metadata.email} updated in MongoDB with payment:`,
        { amount: paymentAmount, method: paymentMethod }
      );
      res.status(200).json({ received: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error updating user profile in MongoDB." });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhookHandler;
