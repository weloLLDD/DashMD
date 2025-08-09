import React from "react";
import Header from "../components/Header"; 
import Sidebar from "./../components/sidebar";
import AddArchive from "../components/AddArchive";

const InsertArchive = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddArchive />
      </main>
    </>
  );
};

export default InsertArchive;
