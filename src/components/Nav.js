import React, { useEffect, useState } from "react";
import "./styles/Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => navigate("/")}
          className="nav__logo"
          src="/images/netflix_logo.png"
          alt="logo"
        />
        <img
          onClick={() => navigate("/profile")}
          className="nav__avatar"
          src="/images/netflix_avatar.png"
          alt="avatar"
        />
      </div>
    </div>
  );
}

export default Nav;
