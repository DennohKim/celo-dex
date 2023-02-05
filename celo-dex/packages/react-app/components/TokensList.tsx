import { useTokens } from "@/hooks/useTokens";

type Token = {
    name: string,
}

export default function TokensList() {
  const { data, isLoading, isError } = useTokens();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {data.tokens.map((token: Token) => (
          <li key={token.name}>{token.name}</li>
        ))}
      </ul>
    </div>
  );
}
