import React from "react";
import Header from "../components/Header"; 
import Sidebar from "../components/sidebar";
import Invoice from "../components/Invoice";

const InvoiceAll = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
    
        <Invoice/>
      </main>
    </>
  );
};

export default InvoiceAll;
