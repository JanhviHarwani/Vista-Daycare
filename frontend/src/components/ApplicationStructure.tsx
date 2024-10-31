import Header from "./Header";
import Footer from "./Footer";
import { Props } from "../types/common";

function ApplicationStructure({ children }:Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default ApplicationStructure;
