import TokenSwap from "@/components/TokenSwap";

const Home = () => {
    
  return (
    <div className="text-white w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 sm:space-x-6 space-y-10  items-center ">
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
      <div>
        <TokenSwap />
      </div>
    </div>
  );
};



export default Home;
