import React from "react";

const OrderDetailInfo = (props) => {

  const {order} = props;
  
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Agent</h6>
            <p className="mb-1">
              {order.user.name} <br />
              <a href={`mailto:${order.user.email}`}>{order.user.email} </a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Order info</h6>
            <p className="mb-1">
              LIVRAISON: {order.shippingAdress.country} <br /> Pay method: Cash en espece
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Lieu de vente</h6>
            <p className="mb-1">
              Address: {order.shippingAdress.adress} 
              <br />
              {order.shippingAdress.city} 
              <br />{order.shippingAdress.postalcode} 
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
