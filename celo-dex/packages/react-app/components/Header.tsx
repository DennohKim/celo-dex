import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { shortenAddress } from "@/utils/shortenAddress";
import { StableToken } from "@celo/contractkit/lib/celo-tokens";
import { StableTokenWrapper } from "@celo/contractkit/lib/wrappers/StableTokenWrapper";
import { Summary } from "@/typings";
import { useCallback, useEffect, useState } from "react";
import { useCelo } from "@celo/react-celo";
import { BigNumber } from "bignumber.js";
import Web3 from "web3";

const defaultSummary: Summary = {
  name: "",
  address: "",
  celo: new BigNumber(0),
  balances: [],
};



export default function Header() {
  let [componentInitialized, setComponentInitialized] = useState(false);
  let { initialised, address, connect, disconnect, kit } = useCelo();

  useEffect(() => {
    if (initialised) {
      setComponentInitialized(true);
    }
  }, [initialised]);

   const [summary, setSummary] = useState<Summary>(defaultSummary);
  

   async function getBalances(
     stableTokens: {
       symbol: StableToken;
       contract: StableTokenWrapper | null;
     }[],
     address: string
   ) {
     return Promise.all(
       stableTokens.map(async (stable) => {
         let value, error;
         if (stable.contract) {
           value = await stable.contract.balanceOf(address);
         } else {
           error = "not deployed in network";
         }
         return {
           symbol: stable.symbol,
           value: value,
           error: error,
         };
       })
     );
   }

   const fetchSummary = useCallback(async () => {
     if (!address) {
       setSummary(defaultSummary);
       return;
     }

     const [accounts, goldToken, stableTokens] = await Promise.all([
       kit.contracts.getAccounts(),
       kit.contracts.getGoldToken(),
       Promise.all(
         Object.values(StableToken).map(async (stable) => {
           let contract;
           try {
             contract = await kit.contracts.getStableToken(stable);
           } catch (e) {
             contract = null;
             console.error(e);
           }
           return {
             symbol: stable,
             contract: contract,
           };
         })
       ),
     ]);

     const [accountSummary, celo, balances] = await Promise.all([
       accounts.getAccountSummary(address).catch((e) => {
         console.error(e);
         return defaultSummary;
       }),
       goldToken.balanceOf(address),
       getBalances(stableTokens, address),
     ]);

     setSummary({
       ...accountSummary,
       celo,
       balances,
     });
   }, [address, kit]);

   useEffect(() => {
     void fetchSummary();
   }, [fetchSummary]);



  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative w-11/12 mx-auto flex h-16 justify-between">
              <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <p className="bg-gradient-to-r from-[#FFC947] to-[#FC6739] text-transparent bg-clip-text">
                    SwiftSwap
                  </p>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {componentInitialized && address ? (
                  <div className="flex space-x-6">
                    <div className="">
                      <p className=" text-white inline-flex content-center place-items-center rounded-full py-2 px-5 text-md font-medium text-snow bg-gray-500/30">
                        CELO BAL: {Web3.utils.fromWei(summary.celo.toFixed())}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="bg-blue-600 text-white inline-flex content-center place-items-center rounded-full py-2 px-5 text-md font-medium text-snow "
                      onClick={disconnect}
                    >
                      {shortenAddress(address)}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="bg-blue-600 text-white inline-flex content-center place-items-center rounded-full py-2 px-5 text-md font-medium text-snow"
                    onClick={() =>
                      connect().catch((e) => console.log((e as Error).message))
                    }
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
