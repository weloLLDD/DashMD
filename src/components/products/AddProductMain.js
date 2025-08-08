import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../Redux/Action/ProductAction";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/constants/ProductConstant";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";

const AddProductMain = () => {

   

  const [name,setname] = useState("")
  const [image,setimage] = useState("https://res.cloudinary.com/dalqqdgod/image/upload/v1744636478/f89d18be-895c-4baa-88ce-e96415ab6796.png")
  const [description,setdescription] = useState("")
  const [price,setprice] = useState(0)
  const [countInStock,setcountInStock] = useState(0) 

  const dispatch = useDispatch();

  const  productCreate = useSelector((state)=>state.productCreate);
  const {loading,error,product} =  productCreate;


    useEffect(() => {
      if (product) {
        toast.success("Product added");
        dispatch({type:PRODUCT_CREATE_RESET})
        setname("")
        setdescription("")
        setcountInStock(0)
        setimage("")
        setprice(0)
      }
    }, [dispatch,product]);

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createProduct(name,image, description,price,countInStock))
    }
  
 
  return (

    <>
    <Toast/>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {
                    error && ( <Message variant={"alert-danger"} >{"Verifier le nom ne peut pas entre double"} </Message> )
                  }

                  {loading && (<Loading/>)}

                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e)=>setname(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e)=>setprice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e)=>setcountInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e)=>setdescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inter Image URL"
                      value={image}
                      onChange={(e)=>setimage(e.target.value)}

                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
