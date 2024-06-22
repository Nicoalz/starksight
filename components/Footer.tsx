import Image from "next/image";
const Footer: React.FC = () => {
  return (
    <footer className="w-full flex justify-center items-center py-6 px-4 sm:px-12 sticky top-0 backdrop-blur-lg bg-[#121212]">
      <div className="flex flex-col justify-center items-center">
        <p className="mb-2 text-gray-500">Built with:</p>
        <div className="flex items-center justify-center gap-x-4">
          <div className="flex flex-col items-center justify-center">
            <Image className="rounded-md" src="/dynamic.png" alt="Starkware logo" width={50} height={50} />
            <p>Dynamic</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image className="rounded-md" src="/voyager.png" alt="Starkware logo" width={50} height={50} />
            <p>Voyager</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
