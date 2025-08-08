import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header"; 
import { useParams } from 'react-router-dom'; 
import EditdepenseMain from "../components/depense/EditdepenseMain";
//import products from "./../data/Products";

const DepenseEditScreen = () => {

   const {id} = useParams();  
  const depenseId = id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditdepenseMain depenseId={depenseId} />
      </main>
    </>
  );
};
export default DepenseEditScreen;
