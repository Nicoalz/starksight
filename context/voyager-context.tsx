/* eslint-disable no-undef */
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface VoyagerContextType {
  isMainnet: boolean;
  setIsMainnet: (isMainnet: boolean) => void;
  apiUrl: string;
  explorerUrl: string;
  apiKey: string;
}

const VoyagerContext = createContext<VoyagerContextType | undefined>(undefined);

interface VoyagerProviderProps {
  children: ReactNode; // This defines that the provider expects children elements
}

export const VoyagerProvider: React.FC<VoyagerProviderProps> = ({ children }) => {
  const voyagertMainnetAPIurl = "https://api.voyager.online/beta";
  const voyagerTestnetAPIurl = "https://sepolia-api.voyager.online/beta";
  const voyagerMainnerExplorer = "https://voyager.online";
  const voyagerTestnetExplorer = "https://sepolia.voyager.online";
  const [isMainnet, setIsMainnet] = useState<boolean>(true);
  const [apiUrl, setApiUrl] = useState<string>(voyagertMainnetAPIurl);
  const [explorerUrl, setExplorerUrl] = useState<string>(voyagerMainnerExplorer);

  const apiKey = "DRS0zJC99jUazzfNMP909ixZxDe63r15uZwObZp4";

  useEffect(() => {
    if (isMainnet) {
      console.log("Mainnet, url is ", voyagertMainnetAPIurl);
      setApiUrl(voyagertMainnetAPIurl);
      setExplorerUrl(voyagerMainnerExplorer);
    } else {
      console.log("Testnet, url is ", voyagerTestnetAPIurl);
      setApiUrl(voyagerTestnetAPIurl);
      setExplorerUrl(voyagerTestnetExplorer);
    }
  }, [isMainnet]);

  return <VoyagerContext.Provider value={{ isMainnet, setIsMainnet, apiUrl, explorerUrl, apiKey }}>{children}</VoyagerContext.Provider>;
};

export const useVoyager = (): VoyagerContextType => {
  const context = useContext(VoyagerContext);

  if (context === undefined) {
    throw new Error("useVoyager must be used within a VoyagerProvider");
  }

  return context;
};
