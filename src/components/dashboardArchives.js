import React from "react";
import { FaUser, FaLock, FaFileAlt, FaHome, FaHistory } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="container-fluid p-0">
      {/* En-tête */}
      <div
        className="p-3 d-flex align-items-center justify-content-between bg-white"
        style={{
          border: "1px solid #dee2e6", // bordure grise claire (Bootstrap border color)
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)", // ombre légère pour relief
        }}
      >
        <div className="text-center flex-grow-1">
          <h4 className="m-0 fs-5 fw-bold text-uppercase text-dark">
            SYSTÈME D'ARCHIVAGE NUMÉRIQUE DE LA PRÉSIDENCE
          </h4>
        </div>
        <div style={{ width: 70 }} />
      </div>

      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 col-lg-2 text-white vh-100 p-4 d-flex flex-column align-items-center"
          style={{ backgroundColor: "#003366" }}
        >
          {/* Image centrée en haut */}
           <img
  src="/images/PresiDoc1.png"
  alt="Logo"
  className="mb-3"
  style={{
  width: "80%", // ou 100% si tu veux qu'elle remplisse toute la largeur
  maxWidth: "150px", // limite la taille maximale
  height: "auto",
  objectFit: "contain",
}}
   
/>

          <h3 className="text-center mb-4">PresiDoc</h3>

          <ul className="nav flex-column w-100">
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <FaHome className="me-2" /> Tableau de bord
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <FaFileAlt className="me-2" /> Documents
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <FaUser className="me-2" /> Utilisateurs
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <FaHistory className="me-2" /> Historique
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h4 className="mb-4">Tableau de bord</h4>

          {/* Filtres */}
          {/* Filtres + Recherche */}
          <div className="card mb-4">
            <div className="card-body d-flex align-items-start justify-content-between">
              {/* Partie filtres */}
              <div style={{ flex: 1, maxWidth: "60%" }}>
                <h5>Filtres par catégorie</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="interieur"
                  />
                  <label className="form-check-label" htmlFor="interieur">
                    Ministère de l’Intérieur
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="economie"
                  />
                  <label className="form-check-label" htmlFor="economie">
                    Ministère de l’Économie
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sante"
                  />
                  <label className="form-check-label" htmlFor="sante">
                    Ministère de la Santé
                  </label>
                </div>
              </div>

              {/* Partie recherche */}
              <div style={{ flex: 1, maxWidth: "35%" }}>
                <h5>Rechercher</h5>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher un document..."
                />
              </div>
            </div>
          </div>

          {/* Documents récents */}
          <div className="row">
            <div className="col-md-6">
              <h5>Documents récents</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  📄 Rapport d’activité - 12/03/2024
                </li>
                <li className="list-group-item">
                  📄 Note de service - 08/01/2024
                </li>
                <li className="list-group-item">
                  📄 Plan stratégique - 20/12/2023
                </li>
                <li className="list-group-item">
                  📄 Décret présidentiel - 08/11/2023
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5>Documents récents</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  📄 Lettre Présientielle - 01/03/2024
                </li>
                <li className="list-group-item">
                  📄 Rapport Annuel - 16/03/2024
                </li>
                <li className="list-group-item">📄 Décret - 10/12/2023</li>
                <li className="list-group-item">
                  📄 Rapport d’activité - 12/02/2024
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
