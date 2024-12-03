import Header from "./Header";
import Footer from "./Footer";
import { Props } from "../types/common";
import ChatBot from "./Chatbot";
import styles from "./ApplicationStructure.module.css"; // Create this new file

function ApplicationStructure({ children }:Props) {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <ChatBot />
      <Footer />
    </div>
  );
}

export default ApplicationStructure;