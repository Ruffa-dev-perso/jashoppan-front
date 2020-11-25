import React, { useState } from "react";
import "./header.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { RiShoppingCart2Line } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Modal from "react-bootstrap/Modal";

function Header() {
  const [displayNav, setDisplayNav] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);

  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getProductsOnSearch() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("https://rott.schlap.fr/node4000/search?search=" + searchBar, options)
      .then((response) => {
        return response.json();
      })
      .then(
        (products) => {
          setSearchResults(products);
          handleShow();
          setDisplaySearch(!displaySearch);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function renderSearchResults() {
    return searchResults.map((element, index) => {
      return (
        <li>
          <Link to={"/product?id=" + element._id}>
            {element.title} : &nbsp; {element.price.toFixed(2)} €
          </Link>
        </li>
      );
    });
  }

  function showMenuMobile() {
    if (displayNav) {
      return (
        <div className="menu-mobile-global">
          <Nav
            onClick={() => {
              setDisplayNav(false);
            }}
          >
            <Link className="nav-link" to="/">
              Accueil
            </Link>
            <Nav.Link
              className="nav-link"
              onClick={() => {
                setDisplaySearch(!displaySearch);
              }}
            >
              Rechercher
            </Nav.Link>
            {connect()}
            <Link className="nav-link" to="/cart">
              Panier
            </Link>
          </Nav>
        </div>
      );
    }
  }

  function showDisplaySearch() {
    if (displaySearch) {
      return (
        <Form inline>
          <FormControl
            type="text"
            placeholder="Rechercher"
            className="mr-sm-2"
            onChange={function (e) {
              setSearchBar(e.target.value);
            }}
            value={searchBar}
          />
          <Button id="btn" variant="outline-info" onClick={getProductsOnSearch}>
            Rechercher
          </Button>
        </Form>
      );
    }
  }

  function connect() {
    let nom = localStorage.getItem("token");
    if (nom) {
      return (
        <Link className="nav-link" to="/moncompte">
          <MdAccountCircle className="hide-icon" /> Mon compte
        </Link>
      );
    } else {
      return (
        <Link className="nav-link" to="/account">
          <MdAccountCircle className="hide-icon" /> Se connecter
        </Link>
      );
    }
  }

  return (
    <header className="header">
      <GiHamburgerMenu
        className="menu-mobile"
        onClick={() => {
          setDisplayNav(!displayNav);
        }}
      />
      <div className="top">
        <img id="logo" src="./logo.png" alt="logo" />

        <Navbar id="Menu" variant="dark">
          <Nav>
            <Link className="nav-link" to="/">
              <IoIosHome />
              Accueil
            </Link>
            <Nav.Link
              className="nav-link"
              onClick={() => {
                setDisplaySearch(!displaySearch);
              }}
            >
              <FaSearch id="search-logo" />
              Rechercher
            </Nav.Link>
            {connect()}
            <Link className="nav-link" to="/cart">
              <RiShoppingCart2Line />
              Panier
            </Link>
          </Nav>
        </Navbar>
      </div>
      {showMenuMobile()}
      <div id="search-toogle">{showDisplaySearch()}</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Résultat pour : "{searchBar}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>{renderSearchResults()}</ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default Header;
