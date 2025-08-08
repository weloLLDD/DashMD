import React from "react"; 
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Invoices from "../components/Invoices";

const factureAll = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
    
        <Invoices/>
      </main>
    </>
  );
};

export default factureAll;
