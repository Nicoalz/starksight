import axios from "axios";
import React, { useState, useEffect } from "react";
import { Transaction } from "@/lib/types";
import { useVoyager } from "@/context/voyager-context";
import { truncateAddress } from "@/lib/utils";
import { formatEther } from "viem";
import Link from "next/link";
const Transactions: React.FC = () => {
  const { apiUrl, explorerUrl, apiKey } = useVoyager();
  const [txnHash, setTxnHash] = useState<string>("");
  const [txns, setTxns] = useState<Transaction[] | null>(null);

  useEffect(() => {
    fetchTxns();
  }, []);

  const fetchTxns = async () => {
    try {
      const endpoint = "/txns/";
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      };
      const response = await axios.get(`${apiUrl}${endpoint}${txnHash}`, { headers });
      if (response?.data?.items) setTxns(response.data.items);
      else setTxns([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const sortTxns = (sortBy: string) => {
    if (txns) {
      const sortedTxns = txns.sort((a, b) => {
        if (sortBy === "timestamp") return b.timestamp - a.timestamp;
        if (sortBy === "status") return b.status.localeCompare(a.status);
        if (sortBy === "blockNumber") return b.blockNumber - a.blockNumber;
        if (sortBy === "actualFee") return b.actualFee.localeCompare(a.actualFee);
        return 0;
      });
      setTxns([...sortedTxns]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center my-8 bg-violet-500/10 p-6 rounded-xl">
      <p className="text-2xl my-4 font-bold">Retrieve Transaction(s):</p>
      <div className="flex flex-col items-center">
        <input
          className="border-2 border-gray-300 p-2 w-96 rounded-md text-black"
          value={txnHash}
          onChange={(e) => {
            setTxnHash(e.target.value);
          }}
          placeholder="Tx hash or Leave empty to get last txs"
          type="text"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
          onClick={() => {
            fetchTxns();
          }}
        >
          Retrieve
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {txns?.length && (
          <div className="flex items-center justify-end gap-x-3 w-full">
            <p>Sort by</p>
            <select
              className="border-2 border-gray-300 p-2 w-60 rounded-md text-black"
              onChange={(e) => {
                sortTxns(e.target.value);
              }}
            >
              <option value="timestamp">Timestamp</option>
              <option value="status">Status</option>
              <option value="blockNumber">Block Number</option>
              <option value="actualFee">Actual Fee</option>
            </select>
          </div>
        )}
        <div className="w-full flex flex-wrap items-center justify-evenly">
          {txns?.map((txn, i) => (
            <div key={i} className="mt-4 bg-[#1b1b1b] rounded-md py-2 px-6">
              <p>
                Hash:{" "}
                <Link href={`${explorerUrl}/tx/${txn.hash}`} target="_blank" className="text-blue-500">
                  {truncateAddress(txn.hash)}
                </Link>
              </p>

              <p>
                <span className="text-gray-500 font-light ">Status:</span> {txn.status}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Type:</span> {txn.type}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Block Number:</span> {txn.blockNumber}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Timestamp:</span> {txn.timestamp}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Actual Fee:</span> {formatEther(BigInt(txn.actualFee))}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Contract Address:</span> {truncateAddress(txn.contractAddress)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
