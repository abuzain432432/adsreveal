import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../lib/mongodb";
import { randomUUID } from "uuid";
import { randomBytes } from "crypto";
import { v4 as uuid } from "uuid";

function generateReferralId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function updateUserPermissions(email, referralId) {
  const client = await clientPromise;
  const usersCollection = client.db().collection("users");
  const newApiKey = uuid();

  const userReferralId = generateReferralId();
  const result = await usersCollection.findOneAndUpdate(
    { email: email },
    {
      $set: {
        userData: {
          stripeData: [],
          referredBy: referralId ? referralId : "none",
          userReferralId,
          credits: 25,
          apiKey: newApiKey,
          favorites: [],
        },
      },
    }
  );

  if (result.ok) {
    console.log(`User with email ${email} updated successfully.`);
  } else {
    console.log(
      `User with email ${email} not found or already has permissions set.`
    );
  }
}

// import clientPromise from "../lib/mongodb";

// const insertDocument = async (collectionName, email, data) => {
//   const client = await clientPromise;
//   const collection = client.db().collection(collectionName);
//   const result = await collection.updateOne(
//     { email },
//     { $set: data },
//     { upsert: true }
//   );
//   console.log(
//     `${result.matchedCount} document(s) matched the filter criteria.`
//   );
//   console.log(`${result.modifiedCount} document(s) were updated.`);
//   console.log(`${result.upsertedCount} document(s) were upserted.`);
// };

export default NextAuth({
  debug: true,
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // Passwordless / email sign in
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: "NextAuth.js <support@adsreveal.com>",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, {
    dbName: "Main",
    collectionName: "Users",
  }),
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async session({ session, user, req }) {
      if (!user.userData) {
        await updateUserPermissions(user.email, "");
      }
      session.user.userData = user.userData;
      return session;
    },
  },
  secret: process.env.SECRET,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "database",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
});
