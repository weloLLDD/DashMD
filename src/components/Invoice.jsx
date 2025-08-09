import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import Loading from "./LoadingError/Loading";
import Message from "./LoadingError/Error";
import moment from "moment";

const Invoice = () => {
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
      filename: `rapport_produits_${selectedMonth}.pdf`,
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

  // ⬇️ Regrouper les ventes par produit
  const productMap = {};

  filteredOrders.forEach((order) => {
    order.orderItems.forEach((item) => {
      const key = item.name;
      if (!productMap[key]) {
        productMap[key] = {
          name: item.name,
          totalQty: 0,
          totalRevenue: 0,
        };
      }
      productMap[key].totalQty += item.qty;
      productMap[key].totalRevenue += item.qty * item.price;
    });
  });

  const productReport = Object.values(productMap);
  const totalGeneral = productReport.reduce((acc, p) => acc + p.totalRevenue, 0);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Rapport de Vente par Produit</h4>
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
        {/* --- En-tête --- */}
        <div className="d-flex align-items-center mb-4">
          <img
            src="images/favicon1.png"
            alt="Logo entreprise"
            style={{ width: "80px", marginRight: "15px" }}
          />
          <div>
            <h5 className="mb-1">Mudilux Boutique</h5>
            <p className="mb-0">Rapport mensuel par produit</p>
            <small>Période : {selectedMonth}</small>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-primary text-center">
                <tr>
                  <th>Produit</th>
                  <th>Quantité totale</th>
                  <th>Chiffre d’affaires</th>
                </tr>
              </thead>
              <tbody>
                {productReport.map((item, index) => (
                  <tr className="text-center" key={index}>
                    <td>{item.name}</td>
                    <td>{item.totalQty}</td>
                    <td>{item.totalRevenue.toLocaleString()} $</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-light text-center fw-bold">
                <tr>
                  <td colSpan="2">Total Général</td>
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

export default Invoice;
