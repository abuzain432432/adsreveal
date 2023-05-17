import { useRouter } from "next/router";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { setCookie } from "nookies";
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

export default function Register() {
  const router = useRouter();

  
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

  useEffect(() => {
    if (router.query.ref) {
      // set the ref parameter as a cookie
      setCookie(null, "ref", router.query.ref, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      // redirect to sign-in page
      signIn("credentials", { ref: router.query.ref }); // use signIn function
    } else {
      // redirect to home page
      router.replace("/");
    }
  }, [router.query.ref]); // run the effect whenever router.query.ref changes

  return (
    <div>
      <p>Redirecting to sign-in...</p>
    </div>
  );
}
