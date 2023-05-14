import React from "react";
// import { useNavigate } from "react-router-dom";
import '../App.css'
function NavBar() {
  // const navigate = useNavigate();
  // const handleGoToMenu = () => navigate("login")
  // const handleGoToMenu1 = () => navigate("signin")
  return (
    <div className="NavBar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">
            Map
          </a>
          <a className="navbar-brand" href="home">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex">
              <input
                className="form-control me-2 mr-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success mr-1" type="submit">
                Search
              </button>
            </form>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <button
                  
                  type="button"
                  className="btn btn-danger mr-1 btn1"
                  
                >
                  Log in
                </button>
              </li>
              <li className="nav-item">
                <button type="button" class="btn btn-danger btn2" >
                  Sign in
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;