import { useQuery } from "@tanstack/react-query";

const fetchTokens = async () => {
  const results = await fetch("https://tokens.coingecko.com/uniswap/all.json");
  return results.json();
};

const useTokens = () => {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: () => fetchTokens(),
  });
};

export { useTokens, fetchTokens };
