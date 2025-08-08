import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header"; 
import MainDepense from "../components/depense/MainDepense";

const DepenseScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainDepense/>
      </main>
    </>
  );
};

export default DepenseScreen;
