// Styles
import "../styles/globals.scss";

// Types
import type { AppProps } from "next/app";

// Components
import { Layout } from "src/components";

// Modules
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isPrivate = router.pathname.includes("/admin");

  return (
    <Layout isPrivate={isPrivate}>
      <Component {...pageProps} />
    </Layout>
  );
}
