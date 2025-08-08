import React, { useState } from "react";

const AddArchive = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Veuillez remplir tous les champs");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("file", file); // le fichier PDF

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/archives/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('Status:', res.status);
      console.log('Headers:', [...res.headers.entries()]);

      const data = await res.json();
      console.log('Response data:', data);
      if (res.ok) {
        alert("📤 Dossier ajouté avec succès !");
        setTitle("");
        setFile(null);
        setCategory("");
      } else {
        alert("❌ Erreur : " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’envoi du fichier.");
    }
  };

  return (
    <div className="container mt-4">
      <h4>📁 Ajouter un nouveau dossier PDF</h4>
      <form onSubmit={handleSubmit} className="p-3 shadow-sm bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Titre du dossier</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Catégorie (facultatif)</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fichier PDF</label>
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          📤 Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddArchive;
