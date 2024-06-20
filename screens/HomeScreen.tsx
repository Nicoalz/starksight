import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const HomeScreen: React.FC = () => {
  const { primaryWallet } = useDynamicContext();
  return (
    <div className="w-full">
      {primaryWallet?.connected ? (
        <div>
          <h1 className="">Welcome {primaryWallet?.address}</h1>
        </div>
      ) : (
        <div>
          <h1 className="">Please connect your wallet</h1>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
