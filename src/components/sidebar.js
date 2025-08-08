import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/admin1.png"
              style={{ height: "35px" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Tableau de bord</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/products"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Produits</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/addproduct"
              >
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Ajouter un produit</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Commandes</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Utilisateur</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/depense"
              >
                <i className="icon fas fa-money-bill-wave"></i>

                <span className="text">Depense</span>
              </NavLink>
            </li>

            {/* drownliste ajouter*/}
            <li className="menu-item has-submenu">
              <a
                href="#!"
                className="menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  const submenu = document.getElementById("submenu-gestion");
                  submenu.classList.toggle("open");
                }}
              >
                <i className="icon fas fa-cogs"></i>
                <span className="text">Gestion des Repports</span>
                <i className="fas fa-chevron-down float-end ms-auto"></i>
              </a>
              <ul className="submenu collapse" id="submenu-gestion">
                <li>
                  <NavLink
                    activeClassName="active"
                    className="submenu-link"
                    to="/Invoice"
                  >
                    Rapport de Vente par Produit
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    activeClassName="active"
                    className="submenu-link"
                    to="/Invoices"
                  >
                    Rapport mensuel de ventes
                  </NavLink>
                </li>
 
              
                
              </ul>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
