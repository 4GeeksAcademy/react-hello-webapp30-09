import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-warning">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <span className="text-warning fw-bold">STAR WARS</span> DATABANK
        </Link>

        <div className="navbar-nav ms-auto">
          <Link to="/" className="nav-link text-warning">
            Home
          </Link>
          {/* ✅ Ruta en minúsculas */}
          <Link to="/favorites" className="nav-link text-warning">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};
