import { FC, ReactNode } from "react";
import Header from "../components/Header";

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-hero-desktop-bg bg-cover bg-no-repeat sm:h-screen h-full">
        <Header />
        <div className="py-16 max-w-7xl mx-auto mt-6 space-y-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
