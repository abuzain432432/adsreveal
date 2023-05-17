import { SessionProvider } from "next-auth/react";
import "./custom.css";
import "../styles/globals.css";
import "../styles/globals.css";
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
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
