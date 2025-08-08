import React from "react";

const TopTotal = (props) => {
  const { orders, products, depenses } = props;
  let totalSale = 0;
  let totaldepense =0;
  if (orders) {
    orders.map((order) =>
      order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null
    );
  }

  if(depenses){
    depenses.map((depense) =>
      depense.montant > 0 ? (totaldepense = totaldepense + depense.montant):0
    );
  }

  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm alert-primary">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle bg-white">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Ventes totales</h6>{" "}
              <span>${totalSale.toFixed(0)-totaldepense.toFixed(0)} </span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm alert-success ">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle  bg-white">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total des commandes</h6>

              {orders ? <span> {orders.length} </span> : <span> 0 </span>}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm alert-danger ">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle bg-white">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total des produits</h6>

              {products ? <span> {products.length} </span> : <span> 0 </span>}
            </div>
          </article>
        </div>
      </div>

       <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm alert-warning ">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle bg-white">
              <i className="text-warning fas fa-money-bill-wave"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Montant Total depense</h6>
              ${totaldepense.toFixed(0)}  
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
