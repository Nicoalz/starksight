import axios from "axios";
import React, { useState, useEffect } from "react";
import { Block } from "@/lib/types";
import { useVoyager } from "@/context/voyager-context";
import { truncateAddress } from "@/lib/utils";
import Link from "next/link";
const Blocks: React.FC = () => {
  const { apiUrl, explorerUrl, apiKey } = useVoyager();
  const [blockHash, setBlockHash] = useState<string>("");
  const [blocks, setBlocks] = useState<Block[] | null>(null);

  useEffect(() => {
    fetchBlocks();
  }, [apiUrl]);

  const fetchBlocks = async () => {
    try {
      const endpoint = "/blocks/";
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      };
      const response = await axios.get(`${apiUrl}${endpoint}${blockHash}`, { headers });
      if (response?.data?.items) setBlocks(response.data.items);
      else setBlocks([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const sortBlocks = (sortBy: string) => {
    if (blocks) {
      const sortedBlocks = blocks.sort((a, b) => {
        if (sortBy === "timestamp") return b.timestamp - a.timestamp;
        if (sortBy === "txnCount") return b.txnCount - a.txnCount;
        if (sortBy === "messageCount") return b.messageCount - a.messageCount;
        if (sortBy === "eventCount") return b.eventCount - a.eventCount;
        return 0;
      });
      setBlocks([...sortedBlocks]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center my-8 bg-blue-500/10 p-6 rounded-xl">
      <p className="text-2xl my-4 font-bold">Retrieve Block(s):</p>
      <div className="flex flex-col items-center">
        <input
          className="border-2 border-gray-300 p-2 w-96 rounded-md text-black"
          value={blockHash}
          onChange={(e) => {
            setBlockHash(e.target.value);
          }}
          placeholder="Block hash or Leave empty to get last blocks"
          type="text"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
          onClick={() => {
            fetchBlocks();
          }}
        >
          Retrieve
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {blocks?.length && (
          <div className="flex items-center justify-end gap-x-3 w-full">
            <p>Sort by</p>
            <select
              className="border-2 border-gray-300 p-2 w-60 rounded-md text-black"
              onChange={(e) => {
                sortBlocks(e.target.value);
              }}
            >
              <option value="timestamp">Timestamp</option>
              <option value="txnCount">Transaction Count</option>
              <option value="messageCount">Message Count</option>
              <option value="eventCount">Event Count</option>
            </select>
          </div>
        )}
        <div className="w-full flex flex-wrap items-center justify-evenly">
          {blocks?.map((block, i) => (
            <div key={i} className="mt-4 bg-[#1b1b1b] rounded-md py-2 px-6">
              {block.blockNumber && <p>Block Number: {block.blockNumber}</p>}
              <p>
                Hash:{" "}
                <Link href={`${explorerUrl}/block/${block.hash}`} target="_blank" className="text-blue-500">
                  {truncateAddress(block.hash)}
                </Link>
              </p>
              <p>
                <span className="text-gray-500 font-light ">Timestamp:</span> {block.timestamp}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Transaction Count:</span> {block.txnCount}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Message Count:</span> {block.messageCount}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Event Count:</span> {block.eventCount}
              </p>
              <p>
                <span className="text-gray-500 font-light ">Status:</span> {block.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blocks;
