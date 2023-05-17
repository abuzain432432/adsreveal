import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";



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
//////////// remove this one

export default function Profile({ user }) {
  const [userData, setUserData] = useState(user?.userData || {});
  console.log("Profile page debug:\n", user);

  useEffect(() => {
    setUserData(user.userData || {});
  }, [user]);
  console.log("user data: ", userData);
  const referredBy =
    userData.referredBy === user.email ? "Yourself" : userData?.referredBy;

  return (
    <div className="min-h-screen bg-light-gray" >
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Profile</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Referral URL
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  https://app.adsreveal.com/register?code={userData?.userReferralId}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Referred By
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{referredBy}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Account Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {userData?.isActive ? "paid" : "free"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Credits</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {userData?.credits}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

//////////// UNcommit this after changes

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
