import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import Loading from "./LoadingError/Loading";
import Message from "./LoadingError/Error";
import moment from "moment";

const Invoices = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const [selectedMonth, setSelectedMonth] = useState("2025-07");
  const reportRef = useRef();

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const exportPDF = () => {
    const element = reportRef.current;
    const opt = {
      margin: 0.5,
      filename: `rapport_ventes_${selectedMonth}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = moment(order.createdAt);
    return orderDate.format("YYYY-MM") === selectedMonth;
  });

  const totalGeneral = filteredOrders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Rapport de Vente</h4>
        <div className="d-flex gap-2">
          <input
            type="month"
            className="form-control"
            value={selectedMonth}
            onChange={handleMonthChange}
          />
          <button onClick={exportPDF} className="btn btn-success">
            Exporter en PDF
          </button>
        </div>
      </div>

      <div ref={reportRef} className="card shadow p-4">
        {/* --- LOGO + EN-TÊTE --- */}
        <div className="d-flex align-items-center mb-4">
          <img
            src="images/favicon1.png" // Ou lien public
            alt="Logo entreprise"
            style={{ width: "80px", marginRight: "15px" }}
          />
          <div>
            <h5 className="mb-1">Mudilux Boutique</h5>
            <p className="mb-0">Rapport mensuel de ventes</p>
            <small>Période : {selectedMonth}</small>
          </div>
        </div>

        {/* --- TABLEAU DES VENTES --- */}

        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant={"alert-danger"}> {error} </Message>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-primary text-center">
                <tr>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Produit & Quantité</th>
                  <th>Prix</th>
                  <th>Total($)</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr className="text-center" key={order._id}>
                    <td>
                      {order.isPaid ? (
                        <span className="badge rounded-pill alert-success">
                          {moment(order.createdAt).format(
                            "DD-MM-YYYY hh:mm:ss"
                          )}
                        </span>
                      ) : (
                        <span className="badge rounded-pill alert-danger">
                          Non payé
                        </span>
                      )}
                    </td>
                    <td>
                      <b>{order.shippingAdress.adress}</b>
                    </td>
                    <td>
                      {order.orderItems?.map((item, index) => (
                        <div key={index}>
                          {item.name} - ({item.qty}pcs)
                        </div>
                      ))}
                    </td>
                    <td>
                      {order.orderItems?.map((item, index) => (
                        <div key={index}>${item.price}</div>
                      ))}
                    </td>
                    <td>${order.totalPrice}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="table-light">
                <tr className="fw-bold text-center">
                  <td colSpan="4">Total des Ventes</td>
                  <td>{totalGeneral.toLocaleString()} $</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
