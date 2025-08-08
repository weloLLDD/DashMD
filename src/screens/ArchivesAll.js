import React, { useEffect, useState } from "react";
import ArchiveForm from "../components/ArchiveForm";

function ArchivesAll() {
  const [archives, setArchives] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔁 Charger les fichiers à l'ouverture
  useEffect(() => {
    fetch("/api/archives")
      .then((res) => res.json())
      .then((data) => {
        console.log("🧾 Données reçues du backend :", data);
        setArchives(data); // ✅ Remplit les archives depuis MongoDB
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des archives :", err);
      });
  }, []);

  // ✅ Ajout local après création
  const handleAddArchive = (archive) => {
    setArchives([...archives, archive]);
  };

  const handleDelete = (index) => {
    const updated = [...archives];
    updated.splice(index, 1);
    setArchives(updated);
  };

  const openModal = (pdfUrl) => {
    setSelectedPDF(pdfUrl);
    const modal = new window.bootstrap.Modal(
      document.getElementById("pdfModal")
    );
    modal.show();
  };

  const filteredArchives = archives.filter((archive) =>
    archive.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📂 Archivage de Dossiers</h1>

      <ArchiveForm onAdd={handleAddArchive} />

      <div className="input-group mt-4 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Rechercher par titre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row mt-3">
        {filteredArchives.length === 0 && (
          <div className="col-12 text-center text-muted">
            Aucun dossier trouvé.
          </div>
        )}

        {filteredArchives.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted mb-1">
                  📁 Catégorie :{" "}
                  <strong>{item.category || "Non précisée"}</strong>
                </p>
                <p className="card-text text-muted mb-1">
                  📅 Ajouté le : {item.date}
                </p>
                <p className="card-text text-muted">📄 Fichier PDF</p>
                <div className="mt-auto d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => openModal(item.pdfUrl)}
                  >
                    Aperçu
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => {
                      const message = `Voici un dossier : ${item.title}%0A📎 Lien : ${item.pdfUrl}`;
                      const whatsappURL = `https://wa.me/?text=${message}`;
                      window.open(whatsappURL, "_blank");
                    }}
                  >
                    WhatsApp
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal PDF */}
      {/* Modal PDF */}
<div
  className="modal fade"
  id="pdfModal"
  tabIndex="-1"
  aria-labelledby="pdfModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">📄 Aperçu du PDF</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Fermer"
        ></button>
      </div>

      <div className="modal-body" style={{ height: "80vh" }}>
     
  {selectedPDF ? (
    <iframe
      src={`https://docs.google.com/gview?url=${selectedPDF}&embedded=true`}
      style={{ width: "100%", height: "100%" }}
     
      title="Aperçu PDF"
    />
  ) : (
    <p className="text-muted">Aucun PDF sélectionné</p>
  )}
 
      </div>

      <div className="modal-footer d-flex justify-content-between">
  <a href={selectedPDF} download className="btn btn-success">
    ⬇️ Télécharger
  </a>
  <button
    className="btn btn-secondary"
    onClick={() => {
      const newWindow = window.open(selectedPDF, "_blank");
      newWindow.focus();
      newWindow.print();
    }}
  >
    🖨️ Imprimer
  </button>
</div>
    </div>
  </div>
</div>

    </div>
  );
}

export default ArchivesAll;
