import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/logo.css";

const Navbar = ({ userRole, handleLogout }) => {
  const isLoggedIn = !!userRole;

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fa-solid fa-desktop space"></i>
          Job Board
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                <i className="fa-brands fa-searchengin space"></i>
                Jobs
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fa-solid fa-right-to-bracket space"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <i className="fa-solid fa-user-plus space"></i>
                    Signup
                  </Link>
                </li>
              </>
            )}

            {userRole === "employer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Employer Dashboard
                </Link>
              </li>
            )}
            {userRole === "candidate" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Candidate Dashboard
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
