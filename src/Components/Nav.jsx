import React, { useEffect, useState } from "react";
import logo from "../Assets/Icon/logo-280x60.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ChangeStatus } from "../RestoSlice/RestoSlice";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStaus] = useState();
  const RestoData = useSelector((state) => state.RestoData.LoginStatus);
  useEffect(() => {
    if (RestoData != null) {
      setStaus(RestoData);
    }
  });

  const LogoutUser = () => {
    dispatch(ChangeStatus(true));
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light my-navbar-main">
        <div className="container">
          <Link to="/" className="navbar-brand " href="#">
            <img src={logo} alt="" className="img-fluid my-navbar-brand" />
          </Link>{" "}
          <button
            className="navbar-toggler my-navbar-toogle"
            // type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <FaBars />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto my-navbar-ul">
              <li className="nav-item pe-3">
                <Link to="/" className="nav-link active" aria-current="page">
                  home
                </Link>
              </li>

              <li className="nav-item myli">
                <Link to="/addRestaurant" className="nav-link" href="#">
                  Add Restaurant
                </Link>
              </li>
              <li className="nav-item myli">
                <Link to="/restaurant" className="nav-link" href="#">
                  Restaurant
                </Link>
              </li>
              <li className="nav-item myli">
                <Link to="/manageRestaurant" className="nav-link" href="#">
                  Manage Restaurant
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 my-navbar-ul">
              <li className="nav-item">
                {status == false ? (
                  <Link className="nav-link" onClick={LogoutUser}>
                    Logout
                  </Link>
                ) : (
                  <Link className="nav-link" to="/login">
                    LogIn
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start my-navbar-responsive"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <Link to="/" className="navbar-brand " href="#">
            <img src={logo} alt="" className="img-fluid my-navbar-brand" />
          </Link>{" "}
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active my-nav-link  text-reset"
                aria-current="page"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/addRestaurant"
                className="nav-link active my-nav-link  text-reset"
                aria-current="page"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Add Restaurant
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/restaurant"
                className="nav-link active my-nav-link  text-reset"
                aria-current="page"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Restaurant
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/manageRestaurant"
                className="nav-link  my-nav-link  text-reset"
                aria-current="page"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Manage Restaurant
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 my-navbar-ul">
            <li className="nav-item">
              {status == false ? (
                <Link
                  className="nav-link my-nav-link fw-bold "
                  aria-current="page"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={LogoutUser}
                >
                  Logout
                </Link>
              ) : (
                <Link
                  className="nav-link my-nav-link fw-bold"
                  aria-current="page"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  to="/login"
                >
                  LogIn
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
