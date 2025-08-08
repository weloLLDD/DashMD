import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import { DEPENSE_CREATE_RESET } from "../../Redux/constants/DepenseConstants";
import { createDepense } from "../../Redux/Action/DepenseAction";

const AddDepenseMain = () => {

   

const [name, setname] = useState("");
const [montant, setmontant] = useState(0);
const [description, setdescription] = useState("");

  const dispatch = useDispatch();

  const  depenseCreate = useSelector((state)=>state.depenseCreate);
  const {loading,error,depense} =  depenseCreate;
  


    useEffect(() => {
      if (depense) {
        toast.success("Depense added");
        dispatch({type:DEPENSE_CREATE_RESET})
        setname("") 
        setmontant(0)
        setdescription("") 
      }
    }, [dispatch,depense]);

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createDepense(name,montant,description))
    }
  
 
  return (

    <>
    <Toast/>
        <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/depense" className="btn btn-danger text-white">
             Retour au Liste de Depense
            </Link>
            <h2 className="content-title">Nouveau depense</h2>
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
           

                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant={"alert-danger"}>{error} </Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Depense title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Montant $
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={montant}
                          onChange={(e) => setmontant(e.target.value)}
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
                          onChange={(e) => setdescription(e.target.value)}
                        ></textarea>
                      </div>
                    
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddDepenseMain;
