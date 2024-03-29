import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { AuthProvider } from "features/auth/stores/context/authContext";
import Head from "components/layouts/Head";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "config/apolloClient";
// css
import "tailwindcss/tailwind.css";
import "styles/globals.css";
import "styles/custom-antd.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <ThemeProvider enableSystem={true} attribute="class">
        <AuthProvider>
          <ApolloProvider client={createApolloClient()}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
