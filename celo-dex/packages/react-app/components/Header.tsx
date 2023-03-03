import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCelo } from "@celo/react-celo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { shortenAddress } from "@/utils/shortenAddress";

export default function Header() {
  let [componentInitialized, setComponentInitialized] = useState(false);
  let { initialised, address, connect, disconnect } = useCelo();

  useEffect(() => {
    if (initialised) {
      setComponentInitialized(true);
    }
  }, [initialised]);

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <p className="text-white">SwiftSwap</p>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {componentInitialized && address ? (
                  <button
                    type="button"
                    className="bg-gradient-to-r from-[#2B59FF] to-[#BB2BFF]  inline-flex content-center place-items-center rounded-md py-2 px-5 text-md font-medium text-snow "
                    onClick={disconnect}
                  >
                    {shortenAddress(address)}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-gradient-to-r from-[#2B59FF] to-[#BB2BFF]  inline-flex content-center place-items-center rounded-md py-2 px-5 text-md font-medium text-snow"
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
