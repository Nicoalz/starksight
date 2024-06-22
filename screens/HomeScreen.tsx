import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Blocks from "@/components/Blocks";
import Transactions from "@/components/Transactions";
import Contracts from "@/components/Contracts";
import Tokens from "@/components/Tokens";
import { useVoyager } from "@/context/voyager-context";
const HomeScreen: React.FC = () => {
  const { primaryWallet } = useDynamicContext();
  const { setIsMainnet, isMainnet } = useVoyager();
  return (
    <div className="w-full">
      {primaryWallet?.connected ? (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="">Welcome {primaryWallet?.address}</h1>
            <div>
              <select
                className="border-2 border-gray-300 p-2 w-30 rounded-md text-black"
                value={isMainnet ? "true" : "false"}
                onChange={(e) => {
                  console.log({
                    isMainnet: e.target.value === "true",
                  });
                  setIsMainnet(e.target.value === "true");
                }}
              >
                <option value="true">Mainnet</option>
                <option value="false">Testnet</option>
              </select>
            </div>
          </div>
          <Blocks />
          <Transactions />
          <Contracts />
          <Tokens />
        </div>
      ) : (
        <div className="mx-auto w-fit">
          <h1 className="text-2xl font-bold text-center">Please connect your wallet</h1>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
