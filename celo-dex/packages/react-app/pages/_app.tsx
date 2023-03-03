import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CeloProvider, Alfajores } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";
import { Outfit } from '@next/font/google'
import Layout from "./Layout";



const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', })

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <CeloProvider
      dapp={{
        name: "celo-composer dapp",
        description: "My awesome celo-composer description",
        url: "https://example.com",
        icon: "https://example.com/favicon.ico",
      }}
      defaultNetwork={Alfajores.name}
      connectModal={{
        providersOptions: { searchable: true },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
        <main className={`${outfit.variable} font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </main>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CeloProvider>
  );
}

export default App;
