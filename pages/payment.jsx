import { useState } from "react";
import { useSession } from "next-auth/react";
import Navigation from "../components/Navigation";
import { loadStripe } from "@stripe/stripe-js";
import StripePricingTable from "../components/StripePricingTable";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

<Head>
<script
      dangerouslySetInnerHTML={{
        __html: `(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`,
      }}
    />
    <script
      async
      src="https://r.wdfl.co/rw.js"
      data-rewardful="6e34fc"
    ></script>
</Head>


const stripePromise = loadStripe("pk_test_key");

const PricingCard = ({ title, description, price }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleClick = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "test-package",
        price: 9000,
        email: session.user.email,
        custom_identifier: Math.floor(Math.random() * 900000000) + 100000000,
      }),
    });
    const stripeUrl = await response.json();
    Router.push(stripeUrl.checkoutUrl);
    //await stripe.redirectToCheckout({ sessionId: session.id });
    setLoading(false);
  };

  // TODO: when someone clicks on "subscribe" script will make an api request to generate a custom url

  return (
    <div className="flex flex-col items-center p-6 border rounded-md shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-4 mb-8 text-gray-500">{description}</p>
      <h3 className="text-3xl font-bold">{price}$</h3>
      <button
        // onClick={handleClick}
        disabled={!session || loading}
        className="mt-8 px-6 py-3 text-lg font-bold text-white uppercase rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
};

// const Payment = () => {
//   return (
//     <>
//       <Navigation />
//       <Head>
//         <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
//       </Head>
//       <br />
//       <h1 className="text-4xl font-extrabold text-center text-gray-400">
//         Choose your plan
//       </h1>
//       <br />
//       <p className="mt-4 max-w-2xl text-xl text-center text-gray-500 mx-auto">
//         Get access to premium features with one of our affordable plans
//       </p>
//       <br />
//       <br />
//       <stripe-pricing-table
//         pricing-table-id="prctbl_1MpdsfA67t01HB1AWQI1bC3s"
//         publishable-key="pk_live_51Meo51A67t01HB1AXFC6Ogm7MeT0hh744Y51yzWNHZz6AxnRSfGPRhg3xqUzJuEu2zJLntCqryrqltKt4P83UY2v00ictVZ3w0"
//       ></stripe-pricing-table>
//       <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-extrabold text-center text-gray-900">
//           Choose your plan
//         </h1>
//         <p className="mt-4 max-w-2xl text-xl text-center text-gray-500 mx-auto">
//           Get access to premium features with one of our affordable plans
//         </p>
//         <div className="mt-12 grid gap-8 lg:grid-cols-3">
//           <PricingCard
//             title="Basic"
//             description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//             price={55}
//           />
//           <PricingCard
//             title="Pro"
//             description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//             price={110}
//           />
//           <PricingCard
//             title="Premium"
//             description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//             price={220}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = async (plan, price, productId) => {
    setLoading(true);
  
    // Retrieve referral ID from Rewardful
    const referralId = Rewardful.referral;
    console.log(referralId);

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: plan,
        price: price,
        email: session.user.email,
        custom_identifier: Math.floor(Math.random() * 900000000) + 100000000,
        productId: productId,
        referralId: referralId, // Include referral ID in POST data
      }),
    });
    const stripeUrl = await response.json();
    router.push(stripeUrl.checkoutUrl);
    setLoading(false);
  };
  
  

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <br />
      <br />
      <div class="flex justify-center">
        <div class="flex w-full max-w-sm flex-col items-center rounded-lg bg-white shadow-md mx-4">
          <div class="px-6 py-8 text-center">
            <h3 class="mb-2 text-lg font-medium text-gray-900">Starter</h3>
            <div class="mb-4 text-4xl font-semibold text-blue-500">$55</div>
            <div class="mb-4 text-gray-600">per month</div>
            <button
              onClick={() => handleClick("starter", 100, "price_1N61WiA67t01HB1AaHncsxjl")}
              class="mb-4 w-full rounded-md bg-blue-500 px-4 py-4 text-white transition-colors duration-150 hover:bg-blue-600"
              id="subscribe-button"
            >
              Subscribe
            </button>
            <ul class="mb-8 space-y-2 text-gray-700">
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">
                  &#10003;
                </i>
                <span class="font-medium">1 Person per Account</span>
              </li>
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">
                  &#10003;
                </i>
                <span class="font-medium">250 Ad Views per Day</span>
              </li>
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">
                  &#10003;
                </i>
                <span class="font-medium">Save Favorited Ads</span>
              </li>
            </ul>
          </div>
          <div class="w-full rounded-b-lg bg-blue-500 py-2 text-center text-white">
            <span class="text-sm font-medium">Most popular</span>
          </div>
        </div>

        <div class="flex w-full max-w-sm flex-col items-center rounded-lg bg-white shadow-md mx-4">
          <div class="px-6 py-8 text-center">
            <h3 class="mb-2 text-lg font-medium text-gray-900">Pro</h3>
            <div class="mb-4 text-4xl font-semibold text-blue-500">$99</div>
            <div class="mb-4 text-gray-600">per month</div>
            <button
              onClick={() => handleClick("pro", 9900)}
              class="mb-4 w-full rounded-md bg-blue-500 px-4 py-4 text-white transition-colors duration-150 hover:bg-blue-600"
              id="subscribe-button"
            >
              Subscribe
            </button>
            <ul class="mb-8 space-y-2 text-gray-700">
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">
                  &#10003;
                </i>
                <span class="font-medium">5 People per Account</span>
              </li>
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">✓</i>
                <span class="font-medium">500 Ad Views per Day</span>
              </li>
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">✓</i>
                <span class="font-medium">Save and Track Favorite Ads</span>
              </li>
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">✓</i>
                <span class="font-medium">Priority Support</span>
              </li>
            </ul>
          </div>
          <div class="w-full rounded-b-lg bg-blue-500 py-2 text-center text-white">
            <span class="text-sm font-medium">Best value</span>
          </div>
        </div>
        <div class="flex w-full max-w-sm flex-col items-center rounded-lg bg-white shadow-md mx-4">
          <div class="px-6 py-8 text-center">
            <h3 class="mb-2 text-lg font-medium text-gray-900">Premium</h3>
            <div class="mb-4 text-4xl font-semibold text-blue-500">$199</div>
            <div class="mb-4 text-gray-600">per month</div>
            <button
              onClick={() => handleClick("premium", 19900)}
              class="mb-4 w-full rounded-md bg-blue-500 px-4 py-4 text-white transition-colors duration-150 hover:bg-blue-600"
              id="subscribe-button"
            >
              Subscribe
            </button>
            <ul class="mb-8 space-y-2 text-gray-700">
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">
                  &#10003;
                </i>
                <span class="font-medium">Unlimited People per Account</span>
              </li>
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">
                  &#10003;
                </i>
                <span class="font-medium">Unlimited Ad Views per Day</span>
              </li>
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">
                  &#10003;
                </i>
                <span class="font-medium">
                  Advanced Ad Tracking and Analytics
                </span>
              </li>
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">
                  &#10003;
                </i>
                <span class="font-medium">Customizable Dashboard</span>
              </li>
              <li class="flex items-center">
                <i class="material-icons mr-2 align-middle text-blue-500">
                  &#10003;
                </i>
                <span class="font-medium">Dedicated Account Manager</span>
              </li>
            </ul>
          </div>
          <div class="w-full rounded-b-lg bg-blue-500 py-2 text-center text-white">
            <span class="text-sm font-medium">For businesses</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
