import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import { DynamicContextProvider, FilterChain } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";

import { StarknetIcon, EthereumIcon } from "@dynamic-labs/iconic";

import { VoyagerProvider } from "@/context/voyager-context";

function MyApp({ Component, pageProps }: AppProps) {
  const EthWallets = {
    label: { icon: <EthereumIcon /> },
    walletsFilter: FilterChain("EVM"),
    recommandedWallets: [
      {
        walleKey: "metamask",
      },
    ],
  };

  const StarkWallets = {
    label: { icon: <StarknetIcon /> },
    walletsFilter: FilterChain("STARK"),
  };

  const views = [
    {
      type: "wallet-list" as const,
      tabs: {
        items: [EthWallets, StarkWallets],
      },
    },
  ];

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "cd248ddd-a2d4-4c8c-8277-ce03769ebd61",
        walletConnectors: [EthereumWalletConnectors, StarknetWalletConnectors],
        overrides: { views: views },
      }}
    >
      <VoyagerProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </VoyagerProvider>
    </DynamicContextProvider>
  );
}

export default MyApp;
