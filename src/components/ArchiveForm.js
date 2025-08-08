import React, { useState } from 'react';

function ArchiveForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !file || !category) return;

    const fileURL = URL.createObjectURL(file);
    onAdd({ title, fileURL, category });

    setTitle('');
    setFile(null);
    setCategory('');
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm mb-4">
      <div className="form-group mb-3">
        <label>Titre du dossier</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label>Catégorie</label>
        <input
          type="text"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="ex: Administration"
          required
        />
      </div>

      <div className="form-group mb-3">
        <label>Fichier (PDF)</label>
        <input
          type="file"
          className="form-control"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Ajouter</button>
    </form>
  );
}

export default ArchiveForm;
