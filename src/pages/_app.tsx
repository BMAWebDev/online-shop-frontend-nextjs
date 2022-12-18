// Styles
import "../styles/globals.scss";

// Types
import type { AppProps } from "next/app";

// Components
import { Layout } from "src/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
