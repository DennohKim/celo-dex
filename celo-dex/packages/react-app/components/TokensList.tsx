import { useTokens } from "@/hooks/useTokens";
import Image from "next/image";

type Token = {
  name: string;
};

export default function TokensList() {
  const { data, isLoading, isError } = useTokens();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center h-full text-white">
      <div className="bg-[#12141D] w-full rounded-lg">
        <form action="" className="flex flex-col space-y-4 p-8">
          <h2>Convert</h2>
          <div className="flex justify-between bg-[#343434] py-5 px-4 mb-2 rounded-md">
            <p>0.20032</p>
            <select className="bg-[#404040]" name="" id="">
             
            </select>
          </div>
          <div className="flex py-3">
            <Image
              src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1675786860/bg/Frame_49_bhbdbd.svg"
              alt="swap"
              width={600}
              height={40}
            />
          </div>
          <div className="flex justify-between bg-[#343434] py-5 px-4 mt-2 rounded-md">
            <p>0.20032</p>
            <select className="bg-[#404040]"  name="" id="">
            
            </select>
          </div>
          <div className="py-5 flex justify-between items-center">
            <p>Transaction Cost</p>
            <button className="bg-gradient-to-r from-[#2B59FF] to-[#BB2BFF] py-2 px-6 rounded-md">Swap</button>
          </div>
        </form>
      </div>
    </div>
  );
}
