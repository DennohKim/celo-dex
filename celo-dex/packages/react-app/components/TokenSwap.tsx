import { Token } from "@/typings";
import React, { useState } from "react";
import TokensModal from "./TokensModal";

export default function TokenSwap() {
  const [tokenFrom, setTokenFrom] = useState<Token>({
    id: "celo-dollar",
    symbol: "cusd",
    name: "Celo Dollar",
    platforms: {
      "celo": "0x765de816845861e75a25fca122bb6898b8b1282a",
      "near-protocol": "cusd.token.a11bd.near",
    },
  });

  const [tokenTo, setTokenTo] = useState<Token>({
    id: "",
    symbol: "",
    name: "",
    platforms: {},
  });

  // Prices +
  const [amountEntered, setAmountEntered] = useState<number>(0);
  const [amountTo, setAmountTo] = useState<null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [choice, setChoice] = useState<string>("to");

  const open = (choiceType: string) => {
    setChoice(choiceType);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const selectToken = (token: Token, choice: string) => {
    if (choice === "from") {
      setTokenFrom(token);
      setIsOpen(false);
    } else {
      setTokenTo(token);
      setIsOpen(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmountEntered(value);
  };

  return (
    <>
      {tokenFrom.symbol === tokenTo.symbol && (
        <div className="flex text-red-400 font-medium flex-row self-center bg-red-50 px-4 py-2 text-sm rounded-md mb-3 border-2 border-red-400">
          <h4>Swap tokens can not be the same</h4>
        </div>
      )}
      <div className="flex flex-1 w-full h-full items-center justify-center ">
        <div className="p-2 px-8 py-4 shadow-md  bg-[#10121a] w-full rounded-lg">
          <h1 className="font-medium">SWAP</h1>

          <div className="w-full p-2 bg-[#464646]/30 rounded-md my-8">
            <div className="flex px-2 py-3 flex-row items-center justify-between">
              <h1 className="text-2xl font-medium">{tokenFrom.symbol}</h1>

              <button
                onClick={() => open("from")}
                className="text-white text-xs bg-blue-500  rounded-full px-2 py-1"
              >
                Change
              </button>
            </div>

            <input
              type="number"
              placeholder="0.0"
              value={amountEntered}
              onChange={handleAmountChange}
              className="bg-[#464646]  text-xl outline-none my-3 w-full rounded-md p-2"
            />
          </div>

          <div className="w-full p-2 bg-[#464646]/30 rounded-md my-4">
            <div className="flex px-2 py-3 flex-row items-center justify-between">
              {!tokenTo.symbol ? (
                <button
                  onClick={() => open("to")}
                  className="text-lg bg-blue-500 text-white rounded-full px-4 py-2 font-medium"
                >
                  Select a token
                </button>
              ) : (
                <>
                  <h1 className="text-2xl font-medium">{tokenTo.symbol}</h1>

                  <button
                    onClick={() => open("to")}
                    className="text-white text-xs bg-blue-500 rounded-full px-2 py-1"
                  >
                    Change
                  </button>
                </>
              )}
            </div>

            <input
              type="number"
              placeholder="0.0"
              disabled
              value={amountTo ? amountTo : 0.0}
              className="bg-[#464646] text-xl outline-none cursor-not-allowed my-3 w-full rounded-md p-2"
            />
          </div>

          {tokenFrom.symbol != tokenTo.symbol && (
            <>
              <p className="text-gray-400 text-sm">Estimated gas fee: 0.0001</p>

              {amountEntered && tokenTo.symbol ? (
                <button
                  onClick={() => {}}
                  className="w-full p-3 my-3 bg-blue-600 rounded-md text-white"
                >
                  Swap
                </button>
              ) : (
                <button
                  disabled
                  className="w-full p-3 my-3 cursor-not-allowed bg-[#464646]/30  rounded-md text-gray-600"
                >
                  Swap
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <TokensModal
        isOpen={isOpen}
        close={close}
        choice={choice}
        selectToken={selectToken}
      />
    </>
  );
}
