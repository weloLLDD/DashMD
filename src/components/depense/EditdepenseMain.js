import React, { useEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { toast } from "react-toastify";
import { DEPENSE_UPDATE_RESET } from "../../Redux/constants/DepenseConstants";
import { editDepense, updateDepense } from "../../Redux/Action/DepenseAction";

const Toastobjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditdepenseMain = (props) => {
  const { depenseId } = props;

  const [name, setname] = useState("");
  const [montant, setmontant] = useState(0);
  const [description, setdescription] = useState("");

  const dispatch = useDispatch();

  const depenseEdit = useSelector((state) => state.depenseEdit);
  const { loading, error, depense } = depenseEdit;

  const depenseUpdate = useSelector((state) => state.depenseUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = depenseUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DEPENSE_UPDATE_RESET });
      toast.success("Product Updated", Toastobjects);
    } else {
      if (!depense || !depense.name || depense._id !== depenseId) {
        dispatch(editDepense(depenseId));
      } else {
        setname(depense.name);
        setmontant(depense.montant);
        setdescription(depense.description);
      }
    }
  }, [dispatch, depense, depenseId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDepense({
        _id: depenseId,
        name,
        montant,
        description, 
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/depense" className="btn btn-danger text-white">
             Retour au Liste de Depense
            </Link>
            <h2 className="content-title">Update Depense</h2>
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
                  {errorUpdate && (
                    <Message variant={"alert-danger"}>
                      {"erreur update"}{" "}
                    </Message>
                  )}
                  {loadingUpdate && <Loading />}

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

export default EditdepenseMain;
