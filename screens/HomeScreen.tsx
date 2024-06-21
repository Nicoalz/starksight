import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Blocks from "@/components/Blocks";
import Transactions from "@/components/Transactions";
import Contracts from "@/components/Contracts";
import Tokens from "@/components/Tokens";
const HomeScreen: React.FC = () => {
  const { primaryWallet } = useDynamicContext();
  return (
    <div className="w-full">
      {primaryWallet?.connected ? (
        <div>
          <h1 className="">Welcome {primaryWallet?.address}</h1>
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
