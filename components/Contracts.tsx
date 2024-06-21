import axios from "axios";
import React, { useState, useEffect } from "react";
import { Contract } from "@/lib/types";
import { useVoyager } from "@/context/voyager-context";
import { truncateAddress } from "@/lib/utils";

import Link from "next/link";
const Contracts: React.FC = () => {
  const { apiUrl, explorerUrl, apiKey } = useVoyager();
  const [contractAddress, setContractAddress] = useState<string>("");
  const [contracts, setContracts] = useState<Contract[] | null>(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const endpoint = "/contracts/";
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      };
      const response = await axios.get(`${apiUrl}${endpoint}${contractAddress}`, { headers });
      console.log({
        data: response.data,
      });
      if (response?.data?.items) setContracts(response.data.items);
      else setContracts([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const sortContracts = (sortBy: string) => {
    if (contracts) {
      const sortedContracts = contracts.sort((a, b) => {
        if (sortBy === "address") return a.address.localeCompare(b.address);
        if (sortBy === "type") return a.type - b.type;
        if (sortBy === "creationTimestamp") return b.creationTimestamp - a.creationTimestamp;
        if (sortBy === "classAlias") return a.classAlias.localeCompare(b.classAlias);
        if (sortBy === "blockNumber") return b.blockNumber - a.blockNumber;
        if (sortBy === "isAccount") return a.isAccount.toString().localeCompare(b.isAccount.toString());
        if (sortBy === "isErcToken") return a.isErcToken.toString().localeCompare(b.isErcToken.toString());
        if (sortBy === "isProxy") return a.isProxy.toString().localeCompare(b.isProxy.toString());
        return 0;
      });
      setContracts([...sortedContracts]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center my-8 bg-blue-500/10 p-6 rounded-xl">
      <p className="text-2xl my-4 font-bold">Retrieve Contract(s):</p>
      <div className="flex flex-col items-center">
        <input
          className="border-2 border-gray-300 p-2 w-96 rounded-md text-black"
          value={contractAddress}
          onChange={(e) => {
            setContractAddress(e.target.value);
          }}
          placeholder="Contract address or Leave empty to get last contracts"
          type="text"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
          onClick={() => {
            fetchContracts();
          }}
        >
          Retrieve
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {contracts?.length && (
          <div className="flex items-center justify-end gap-x-3 w-full">
            <p>Sort by</p>
            <select
              className="border-2 border-gray-300 p-2 w-60 rounded-md text-black"
              onChange={(e) => {
                sortContracts(e.target.value);
              }}
            >
              <option value="address">Address</option>
              <option value="type">Type</option>
              <option value="creationTimestamp">Creation Timestamp</option>
              <option value="classAlias">Class Alias</option>
              <option value="blockNumber">Block Number</option>
              <option value="isAccount">Is Account</option>
              <option value="isErcToken">Is ERC Token</option>
              <option value="isProxy">Is Proxy</option>
            </select>
          </div>
        )}
        <div className="w-full flex flex-wrap items-center justify-evenly">
          {contracts?.map((contract, i) => (
            <div key={i} className="mt-4 bg-[#1b1b1b] rounded-md py-2 px-6">
              <p>
                Address:{" "}
                <Link href={`${explorerUrl}/contract/${contract.address}`} target="_blank" className="text-blue-500">
                  {truncateAddress(contract.address)}
                </Link>
              </p>
              <p>
                <span className="text-gray-500 font-light ">Alias:</span> {contract.classAlias}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Block number:</span> {contract.blockNumber}
              </p>
              <p>
                <span className="text-gray-500 font-light ">is Account:</span> {contract.isAccount.toString()}
              </p>
              <p>
                <span className="text-gray-500 font-light ">is ERC Token:</span> {contract.isErcToken.toString()}
              </p>
              <p>
                <span className="text-gray-500 font-light ">is Proxy:</span> {contract.isProxy.toString()}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Type:</span> {contract.type}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Creation Timestamp:</span> {contract.creationTimestamp}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contracts;
