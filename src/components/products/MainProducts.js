import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProduct } from "../../Redux/Action/ProductAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: succesDelete } = productDelete;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch, succesDelete]);

  const deletehandler = (id) => {
    if (window.confirm("are you sure??")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Articles</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
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
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
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
                <table className="table">
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
                      <th>Quantite</th>
                      <th>prix</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  {/* Table Data */}

                  <tbody>
                    {products.map((product) => (
                      <tr  key={product._id}>
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
                          <b>{product.name} </b>
                        </td>
                        <td> {product.description} </td>
                        <td> {product.countInStock} </td>
                        <td> {product.price} </td>
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
                                to={`/product/${product._id}/edit`}
                                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                              >
                                <i className="fas fa-pen"></i>
                              </Link>

                              <Link
                                to="#"
                                onClick={() => deletehandler(product._id)}
                                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default MainProducts;
