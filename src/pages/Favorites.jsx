// src/pages/Favorites.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      {/* Header */}
      <div className="row bg-black py-3 border-bottom border-secondary">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-warning" onClick={() => navigate('/')}>
              ← Back to Databank
            </button>
            <h1 className="text-warning mb-0">MY FAVORITES</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="card bg-secondary border-warning">
              <div className="card-body py-5">
                <h3 className="text-warning mb-4">⭐ Favorites Feature</h3>
                <p className="text-light mb-4">
                  Esta funcionalidad permite guardar tus personajes, planetas y vehículos favoritos de Star Wars.
                </p>
                <p className="text-light mb-4">
                  <strong>Próximamente:</strong> Sistema de favoritos con Context API
                </p>
                <button className="btn btn-warning" onClick={() => navigate('/')}>
                  Explore Databank
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};