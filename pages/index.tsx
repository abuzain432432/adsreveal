import Head from "next/head";
import Image from "next/image";
import clientPromise from "./api/lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import LoginButton from "../components/LoginButton";
import Link from "next/link";
import { GrFormCheckmark } from 'react-icons/gr'
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import nookie from "nookies";
import ContactUs from '../components/ContactUs'
import FAQ from '../components/FAQ.jsx'
import Footer from "../components/Footer";

const loadingSpinnerStyles = `
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      const ref = nookie.get(null, "ref");
      const email = nookie.get(null, "email");

      console.log("referral id:", { referral: ref });
      console.log("user email:", { email });

    }
  }, []);

  return (
    <>
      <Navigation />
      <div className="flex flex-col  items-center">
        <div className="w-full">
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
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
          <main className="flex flex-col lg:-mt-20 justify-center items-center w-full flex-1 ">
            <div className="lg:flex block container px-2 lg:py-0 sm:py-2 sm:pb-20 pb-10 lg:px-10 sm:mt-6 mt-4 mx-auto lg:min-h-screen items-center  gap-2">
              <div className="lg:w-[55%] w-full">
                <p className="xl:text-2xl lg:text-xl lg:text-start text-center sm:text-xl uppercase lg:mb-0 sm:mb-4 mb-2 ">Snapchat Ad Spy Tool</p>
                <h1 className="xl:text-5xl lg:text-4xl sm:text-3xl text-2xl lg:text-left text-center font-extrabold text-gray-900  xl:leading-[1.15] leading-[1.1]">Discover Competitor's Ads and Winning Products on the Snapchat Ad Network</h1>
                <ul className="flex flex-col xl:gap-3 lg:gap-2 justify-start items-start xl:text-xl lg:text-lg font-medium text-gray-700 xl:mt-8 lg:mt-5 sm:mt-4 mt-3 lg:p-0 sm:pl-10 pl-6">
                  <li className="flex items-center gap-1"><span><GrFormCheckmark className="text-4xl text-red-600 " /></span> The One and Only Snapchat Ad Spy Tool</li>
                  <li className="flex items-center gap-1"><span><GrFormCheckmark className="text-4xl text-red-600 " /></span> The largest Snapchat Ads Library</li>
                  <li className="flex items-center gap-1"><span><GrFormCheckmark className="text-4xl text-red-600 " /></span> Unleash Your Advertising Potential with Snapchat</li>
                  <li className="flex items-center gap-1"><span><GrFormCheckmark className="text-4xl text-red-600 " /></span> Winning Products & Top Performing Ads</li>
                </ul>
                <p className="xl:mt-9 lg:mt-6 mt-8 lg:text-left text-center">Sign up for free today and gain access to our cutting-edge Snapchat Ad Spy Tool. Find winning products and advertisements directly on the Snapchat Ad Network</p>
                <div className="mt-3 lg:block flex justify-center">
                  {!session && <button onClick={() => signIn("magiclink")} className="button">
                    <span>Get started for free</span>
                  </button>}
                  {session && <Link href={'/toplist'}>
                    <button className="button">
                      <span>Get started for free</span>
                    </button>
                  </Link>}
                </div>
              </div>
              <div className="w-[45%] lg:block hidden relative">
                <Image className="w-full" alt="It's nice to be here" width={1000} height={500} src={'/images/banner.jpg'} />
              </div>
            </div>
            <FAQ />
            <ContactUs></ContactUs>
            {/* <Testimonial /> */}
            {isConnected ? (
              <>
                {/* <span>Connected to MongoDB</span> */}
                {/* <LoginButton /> */}
              </>
            ) : (
              <h2 className="text-2xl mt-4 text-center mb-16 text-red-600">
                Database connection error, please contact support at
                support@adsreveal.com
              </h2>
            )}
            <div className="bg-light-gray w-full xl:py-28 lg:py-20 sm:py-20 py-14">
              <div className="container mx-auto px-2 sm:px-6 lg:px-10 flex items-center flex-col">
                <h3 className='text-center font-bold xl:text-5xl lg:text-4xl sm:text-4xl text-3xl text-gray-800 xl:mb-6 lg:mb-0 leading-[1.15]'> Everything you need for the <br />  best  ads experience</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-2xl">
                  <a
                    href="#"
                    className="border border-gray-300 rounded p-6 hover:text-blue-600 hover:border-blue-600"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      Paid Membership &rarr;
                    </h3>
                    <p>
                      Unlock powerful insights into competitor advertising
                      strategies by becoming a paid member.
                    </p>
                  </a>
                  <a
                    href="#"
                    className="border border-gray-300 rounded p-6 hover:text-blue-600 hover:border-blue-600"
                  >
                    <h3 className="text-xl font-semibold mb-4">Tutorials &rarr;</h3>
                    <p>
                      Master the art of ad spying and outperform your competitors by
                      learning how to use the ad spy tool.
                    </p>
                  </a>
                  <a
                    href="#"
                    className="border border-gray-300 rounded p-6 hover:text-blue-600 hover:border-blue-600"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      Top Performers &rarr;
                    </h3>
                    <p>
                      Get ahead of the competition by accessing the top-performing
                      ads of the month.
                    </p>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-300 rounded p-6 hover:text-blue-600 hover:border-blue-600"
                  >
                    <h3 className="text-xl font-semibold mb-4">Community &rarr;</h3>
                    <p >
                      Join our Discord community of successful dropshippers and take
                      your business to the next level.
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-primary w-full xl:py-20 lg:py-16 py-12 am:py-20">
              <div className="mx-auto container px-2 w-full xl:w-[60%] lg:w-[90%] sm:px-6 lg:px-10">
                <h3 className="text-center text-white leading-[1.15] xl:text-5xl lg:text-3xl sm:text-4xl text-3xl">The largest  Ads Library will become
                  your best  creative center</h3>
                <div className="text-center xl:mt-9 xl:mb-6 lg:mt-6  mt-4 mb-2 lg:mb-4">
                  {!session &&
                    <button onClick={() => signIn("magiclink")} className="text-secondary hover:opacity-90 duration-200 font-semibold lg:text-xl text-base xl:px-10 lg:px-7 lg:py-3 px-5 py-2 rounded-lg bg-white">Get started - it's free</button>

                  }
                  {session &&
                    <Link href={'/toplist'}>
                      <button onClick={() => signIn("magiclink")} className="text-secondary hover:opacity-90 duration-200 font-semibold lg:text-xl text-base xl:px-10 lg:px-7 lg:py-3 px-5 py-2 rounded-lg bg-white">Get started - it's free</button>

                    </Link>
                  }
                </div>
                <p className="text-white text-center lg:text-lg text-base">Find your first viral ads & product. No credit card required. No Commitmen</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>

      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
