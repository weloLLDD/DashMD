import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain from "./../components/products/EditproductMain";
import { useParams } from 'react-router-dom'; 
//import products from "./../data/Products";

const ProductEditScreen = () => {

   const {id} = useParams();  
  const productId = id;



  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen;
