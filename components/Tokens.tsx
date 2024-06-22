import axios from "axios";
import React, { useState, useEffect } from "react";
import { Token } from "@/lib/types";
import { useVoyager } from "@/context/voyager-context";
import { truncateAddress } from "@/lib/utils";

import Link from "next/link";
const Tokens: React.FC = () => {
  const { apiUrl, explorerUrl, apiKey } = useVoyager();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [tokens, setTokens] = useState<Token[] | null>(null);

  useEffect(() => {
    fetchTokens();
  }, [apiUrl]);

  const fetchTokens = async () => {
    try {
      const endpoint = "/tokens/";
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      };
      const response = await axios.get(`${apiUrl}${endpoint}${tokenAddress}`, { headers });
      console.log({
        data: response.data,
      });
      if (response?.data?.items) setTokens(response.data.items);
      else setTokens([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const sortTokens = (sortBy: string) => {
    if (tokens) {
      const sortedTokens = tokens.sort((a, b) => {
        if (sortBy === "address") return a.address.localeCompare(b.address);
        if (sortBy === "decimals") return a.decimals - b.decimals;
        if (sortBy === "holders") return Number(b.holders) - Number(a.holders);
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "symbol") return a.symbol.localeCompare(b.symbol);
        if (sortBy === "transfers") return Number(b.transfers) - Number(a.transfers);
        if (sortBy === "type") return a.type.localeCompare(b.type);

        return 0;
      });
      setTokens([...sortedTokens]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center my-8 bg-violet-500/10 p-6 rounded-xl">
      <p className="text-2xl my-4 font-bold">Retrieve Token(s):</p>
      <div className="flex flex-col items-center">
        <input
          className="border-2 border-gray-300 p-2 w-96 rounded-md text-black"
          value={tokenAddress}
          onChange={(e) => {
            setTokenAddress(e.target.value);
          }}
          placeholder="Token address or Leave empty to get last tokens"
          type="text"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
          onClick={() => {
            fetchTokens();
          }}
        >
          Retrieve
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {tokens?.length && (
          <div className="flex items-center justify-end gap-x-3 w-full">
            <p>Sort by</p>
            <select
              className="border-2 border-gray-300 p-2 w-60 rounded-md text-black"
              onChange={(e) => {
                sortTokens(e.target.value);
              }}
            >
              <option value="address">Address</option>
              <option value="decimals">Decimals</option>
              <option value="holders">Holders</option>
              <option value="name">Name</option>
              <option value="symbol">Symbol</option>
              <option value="transfers">Transfers</option>
              <option value="type">Type</option>
            </select>
          </div>
        )}
        <div className="w-full flex flex-wrap items-center justify-evenly">
          {tokens?.map((token, i) => (
            <div key={i} className="mt-4 bg-[#1b1b1b] rounded-md py-2 px-6">
              <p>
                Address:{" "}
                <Link href={`${explorerUrl}/token/${token.address}`} target="_blank" className="text-blue-500">
                  {truncateAddress(token.address)}
                </Link>
              </p>
              <p>
                <span className="text-gray-500 font-light ">Decimals:</span> {token.decimals}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Holders:</span> {token.holders}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Name:</span> {token.name}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Symbol:</span> {token.symbol}
              </p>
              <p>
                <span className="text-gray 500 font-light ">Transfers:</span> {token.transfers}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Type:</span> {token.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tokens;
