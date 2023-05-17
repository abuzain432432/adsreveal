import { useRouter } from "next/router";
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
const Success = () => {
  const router = useRouter();
  const { amount, email } = router.query;

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Amount Paid: ${amount / 100}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default Success;
