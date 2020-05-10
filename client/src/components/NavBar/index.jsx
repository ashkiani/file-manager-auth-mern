import React from 'react';
import { NavLink } from 'react-router-dom';
import image from "./assets/myApp.png";

export default function index() {
  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center  bg-info text-white my-2">
          <div className="p-2 w-90">
            <NavLink className="nav-item" to="/app">
              <button type="button" className="btn btn-link text-light"><img src={image} alt="RAD-IT icon" width="200" height="50"/></button>
            </NavLink>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse w-10" id="collapsingNavbar3">
            <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
              <NavLink className="nav-item" to="/About">
                <button type="button" className="btn btn-link text-light">About</button>
              </NavLink>
              <NavLink className="nav-item" to="/Help">
                <button type="button" className="btn btn-link text-light">Help</button>
              </NavLink>
              <NavLink className="nav-item" to="/Contact">
                <button type="button" className="btn btn-link text-light">Contact</button>
              </NavLink>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
