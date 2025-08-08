import React from "react";
import { Link } from "react-router-dom";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";

const LatestOrder = (props) => {

  const {orders, loading, error} =props;

  return (
    <div className="card-body">
      <h5 className="card-title">Dernières commandes </h5>
      {
        loading ? <Loading/> : error ? <Message variant={"alert-danger"} > {error} </Message>:(
          <div className="table-responsive">
          <table className="table">
            <tbody>
              {
                orders.slice(0,5).map((order) =>(
                  <tr>
                  <td>
                    <b> {order.shippingAdress.adress} </b>
                  </td>
                 
                  <td>${order.totalPrice} </td>
                  <td>

                    {
                      order.isPaid ? (
                        <span className="badge rounded-pill alert-success">
                         {moment(order.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                      </span>

                      )
                      :(
                        <span className="badge rounded-pill alert-success">
                       not pay
                      </span>
                      )
                    }
                   
                  </td>
                  <td> {moment(order.createdAt).calendar()}</td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/order/${order._id}`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>

                  
                ))
              }
    
            </tbody>
          </table>
        </div>
        )
      }
    
    </div>
  );
};

export default LatestOrder;
