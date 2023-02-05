import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchTokens } from "@/hooks/useTokens";
import TokensList from "@/components/TokensList";

const Home = () => {
  return <TokensList />;
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
