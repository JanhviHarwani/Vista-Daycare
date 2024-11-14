import Header from "./Header";
import Footer from "./Footer";
import { Props } from "../types/common";
import ChatBot from "./Chatbot";

function ApplicationStructure({ children }:Props) {
  return (
    <>
      <Header />
      {children}
      <ChatBot />
      <Footer />
    </>
  );
}

export default ApplicationStructure;
