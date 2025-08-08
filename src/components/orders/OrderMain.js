import React, { useState } from "react";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const OrderMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'paid', 'notpaid'
  const [itemsToShow, setItemsToShow] = useState(10); // 20,30,40

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  // 1. Filtrer selon recherche (nom ou email)
  let filteredOrders = orders
    ? orders.filter(
        (order) =>
          order.shippingAdress.adress.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // 2. Filtrer selon status choisi
  if (statusFilter === "paid") {
    filteredOrders = filteredOrders.filter((order) => order.isPaid === true);
  } else if (statusFilter === "notpaid") {
    filteredOrders = filteredOrders.filter((order) => order.isPaid === false);
  }
  // si 'all' on ne filtre pas

  // 3. Pagination: ne garder que les premiers itemsToShow
  filteredOrders = filteredOrders.slice(0, itemsToShow);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Commandes</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            {/* Recherche */}
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                className="form-control p-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtre Status */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="paid">Payé</option>
                <option value="notpaid">Non payé</option>
              </select>
            </div>

            {/* Nombre à afficher */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={itemsToShow}
                onChange={(e) => setItemsToShow(Number(e.target.value))}
              >
                <option value={10}>Afficher 10</option>
                <option value={20}>Afficher 20</option>
                <option value={30}>Afficher 30</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant={"alert-danger"}>{error}</Message>
            ) : (
              <Orders orders={filteredOrders} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
