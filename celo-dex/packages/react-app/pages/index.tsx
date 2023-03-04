import TokenSwap from "@/components/TokenSwap";
import Web3 from "web3";
import { StableToken } from "@celo/contractkit/lib/celo-tokens";
import { StableTokenWrapper } from "@celo/contractkit/lib/wrappers/StableTokenWrapper";
import { Summary } from "@/typings";
import { useCallback, useEffect, useState } from "react";
import { useCelo } from "@celo/react-celo";
import { BigNumber } from "bignumber.js";


const defaultSummary: Summary = {
  name: "",
  address: "",
  celo: new BigNumber(0),
  balances: [],
};


const Home = () => {

   const [summary, setSummary] = useState<Summary>(defaultSummary);
   let { address, kit } = useCelo();

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
    <div className="text-white mx-auto grid grid-cols-1 sm:grid-cols-2 sm:space-x-6  items-center">
      <div className="flex flex-col space-y-4 ">
        <h1 className="text-3xl font-bold">
          The Most User-Friendly{" "}
          <span className="bg-gradient-to-r from-[#FFC947] to-[#FC6739] text-transparent bg-clip-text">
            Token Swap App
          </span>{" "}
          is Here
        </h1>
        <p className="text-sm">
          Do you find yourself constantly navigating through a labyrinth of
          complicated token exchanges and sluggish trade speeds? Say goodbye to
          the hassle and hello to a better trading experience with swiftswap.
        </p>
      </div>
      <div className="">
        <div className="space-x-6">
          <p className=" text-white inline-flex content-center place-items-center rounded-full py-2 px-5 text-md font-medium text-snow ">
            CELO BAL: {Web3.utils.fromWei(summary.celo.toFixed())}
          </p>
        </div>
        <TokenSwap />
      </div>
    </div>
  );
};



export default Home;
