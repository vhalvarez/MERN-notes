import React from "react";
import { Link } from "react-router-dom";

function Navegation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div className="container">
        <Link to="/" className="navbar-brand">
          NotesApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
                <Link 
                    to="/"
                    className="nav-link"
                >
                    Notes
                </Link>
            </li>
            <li className="nav-item">
                <Link 
                    to="/create"
                    className="nav-link"
                >
                    Create Note
                </Link>
            </li>
            <li className="nav-item">
                <Link 
                    to="/user"
                    className="nav-link"
                >
                    Create User
                </Link>
            </li>
            
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navegation;
