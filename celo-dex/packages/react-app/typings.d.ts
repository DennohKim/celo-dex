type Platform = {
  [key: string]: string;
};

export interface Token {
  id?: string;
  symbol?: string;
  name?: string;
  platforms: Platform;
}

export interface ModalProps {
  isOpen: boolean;
  close: () => void;
  choice: string;
  selectToken: (token: Token, choice: string) => void;
}

export interface Summary {
  name: string;
  address: string;
  celo: BigNumber;
  balances: { symbol: StableToken; value?: BigNumber; error?: string }[];
}

type AbiItem = {
  constant: boolean;
  inputs: { name: string; type: string }[];
  name: string;
  outputs: { name: string; type: string }[];
  payable: boolean;
  stateMutability: string;
  type: string;
  anonymous?: boolean;
};

export type Abi = AbiItem[];