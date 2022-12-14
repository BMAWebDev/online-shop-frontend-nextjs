// Styles
import "../styles/globals.scss";

// Types
import type { AppProps } from "next/app";

// Components
import { Layout } from "src/components";

// Modules
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isPrivate = router.pathname.includes("/admin");

  return (
    <>
      <Head>
        <title>Next Online Shop</title>
      </Head>

      <Layout isPrivate={isPrivate}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
