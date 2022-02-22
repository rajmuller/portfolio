import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";
import { useApollo } from "../lib/apolloClient";

import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
      <Toaster position="bottom-center" />
    </ApolloProvider>
  );
};

export default MyApp;
