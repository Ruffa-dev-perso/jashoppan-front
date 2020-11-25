import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div>
        <Link to="/"> Conditions générales de vente </Link>
        <Link to="/"> Vos informations personnelles </Link>
        <Link to="/"> Cookies </Link>
        <Link to="/"> Annonces basées sur vos centres d’intérêt </Link>
      </div>
      <p>&copy; 1996-2020, JaShopPan.com</p>
    </div>
  );
}

export default Footer;
