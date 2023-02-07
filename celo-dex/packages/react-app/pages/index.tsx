import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchTokens } from "@/hooks/useTokens";
import TokensList from "@/components/TokensList";

const Home = () => {
  return (
    <div className="text-white grid grid-cols-1 md:grid-cols-2 md:space-x-6 items-center">
      <div className="flex flex-col ">
        <h1 className="text-3xl">
          The Most User-Friendly <span>Token Swap App</span> is Here
        </h1>
        <p>
          Do you find yourself constantly navigating through a labyrinth of
          complicated token exchanges and sluggish trade speeds? Say goodbye to
          the hassle and hello to a better trading experience with swiftswap.
        </p>
      </div>
      <div className="">
        <TokensList />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tokens"],
    queryFn: () => fetchTokens(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
