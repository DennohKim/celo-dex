import React from "react";
// import { dehydrate, QueryClient } from "@tanstack/react-query";
// import { fetchTokens } from "@/hooks/useTokens";
import TokensList from "@/components/TokensList";
import { Token } from "@/typings";

const Home = ({tokens}: {tokens: Array<Token>}) => {
  return (
    <div className="text-white mx-auto grid grid-cols-1 sm:grid-cols-2 sm:space-x-6 items-center">
      <div className="flex flex-col space-y-4 ">
        <h1 className="text-3xl font-bold">
          The Most User-Friendly <span className="bg-gradient-to-r from-[#FFC947] to-[#FC6739] text-transparent bg-clip-text">Token Swap App</span> is Here
        </h1>
        <p className="text-sm">
          Do you find yourself constantly navigating through a labyrinth of
          complicated token exchanges and sluggish trade speeds? Say goodbye to
          the hassle and hello to a better trading experience with swiftswap.
        </p>
      </div>
      <div className="">
        <TokensList tokens={tokens} />
      </div>
    </div>
  );
};


export async function getStaticProps() {
  
  const res = await fetch('http://localhost:3000/api/tokens');
  const tokens = await res.json()
  


  return {
    props: {
      tokens,
    },
  }
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["tokens"],
//     queryFn: () => fetchTokens(),
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default Home;
