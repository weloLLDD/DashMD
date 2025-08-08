import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header"; 
import AddDepenseMain from "../components/depense/AddDepenseMain";

const AddDepense = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddDepenseMain />
      </main>
    </>
  );
};

export default AddDepense;
 