import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { deleteDepense, listDepense } from "../../Redux/Action/DepenseAction";

const MainDepense = () => {
  const dispatch = useDispatch();

  const depenseList = useSelector((state) => state.depenseList);
  const { loading, error, depenses } = depenseList;

  const depenseDelete = useSelector((state) => state.depenseDelete);
  const { error: errorDelete, success: succesDelete } = depenseDelete;

  useEffect(() => {
    dispatch(listDepense());
  }, [dispatch, succesDelete]);

  const deletehandler = (id) => {
    if (window.confirm("are you sure??")) {
      dispatch(deleteDepense(id));
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Liste de Depenses</h2>
        <div>
          <Link to="/adddepenses" className="btn btn-primary">
            Créer un nouveau
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
        
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant={"alert-danger"}>{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant={"alert-danger"}>{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}

              {/*   <Product product={product} key={product._id} />*/}

              <div className="col-md-12 col-lg-12">
                <table className="table table-bordered table-striped table-bordered table-hover table-sm">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                        </div>
                      </th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Montant</th>
                      <th>Date</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  {/* Table Data */}

                  <tbody>
                    {Array.isArray(depenses) ? (
                      depenses.map((depense) => (
                        <tr key={depense._id}>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                              />
                            </div>
                          </td>
                          <td>1</td>
                          <td>
                            <b>{depense.name} </b>
                          </td>
                          <td> {depense.description} </td>
                          <td> {depense.montant} </td>
                          <td> {depense.date} </td>
                          <td className="text-end">
                            <div className="dropdown">
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                className="btn btn-light"
                              >
                                <i className="fas fa-ellipsis-h"></i>
                              </Link>
                              <div className="dropdown-menu">
                                <Link
                                  to={`/depense/${depense._id}/edit`}
                                  className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                                >
                                  <i className="fas fa-pen"></i>
                                </Link>

                                <Link
                                  to="#"
                                  onClick={() => deletehandler(depense._id)}
                                  className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <Message variant="alert-warning">
                        Aucune dépense trouvée.
                      </Message>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Data */}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainDepense;
