import React, { useState, useEffect } from "react";
import "./moncompte.css";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FcPhone, FcFeedback, FcRules } from "react-icons/fc";
import { CgLogOff } from "react-icons/cg";
import { FiEdit, FiBox } from "react-icons/fi";
import { RiAccountBoxFill, RiUserSettingsFill } from "react-icons/ri";
import { ImAddressBook } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";
import { MdPayment } from "react-icons/md";

function Moncompte() {
  const history = useHistory();
  const [tabOrder, setTabOrder] = useState("");
  const [user, setUser] = useState("");

  const [showEditAddress, setShowEditAddress] = useState("");
  const [address, setAddress] = useState([]);

  const [showEditSecurity, setShowEditSecurity] = useState("");
  const [security, setSecurity] = useState({});

  const [showEditInfos, setShowEditInfos] = useState("");
  const [infos, setInfos] = useState([]);

  const handleSelect = (value) => {
    setTabOrder(value);
  };

  const handleAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSecurity = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };

  const handleInfos = (e) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };

    fetch("https://rott.schlap.fr/node4000/account/profile", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setUser(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  const addAddress = (e) => {
    e.preventDefault();

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(address),
    };

    fetch("https://rott.schlap.fr/node4000/account/profile", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          getUser();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const editInfos = (e) => {
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(infos),
    };

    fetch("https://rott.schlap.fr/node4000/account/profile", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          getUser();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const editSecurity = (e) => {
    e.preventDefault();

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(security),
    };

    fetch("https://rott.schlap.fr/node4000/account/profile", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          getUser();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function displayEditAddress() {
    if (showEditAddress) {
      return (
        <div>
          <div className="label-input">
            <label>Adresse :</label>
            <br />
            <input
              type="text"
              placeholder=" Adresse"
              name="address"
              value={address.address}
              onChange={handleAddress}
            ></input>
          </div>
          <div className="label-input">
            <label>Code Postal :</label>
            <br />
            <input
              type="text"
              placeholder=" Code postal"
              name="postcode"
              value={address.postcode}
              onChange={handleAddress}
            ></input>
          </div>
          <div className="label-input">
            <label>Ville :</label>
            <br />
            <input
              type="text"
              placeholder=" Ville"
              name="city"
              value={address.city}
              onChange={handleAddress}
            ></input>
          </div>
          <div className="moncompte-button-modifier">
            <button onClick={addAddress}>Modifier</button>
          </div>
        </div>
      );
    }
  }

  function displayEditInfos() {
    if (showEditInfos) {
      return (
        <div>
          <div className="label-input">
            <label>Nom :</label>
            <br />
            <input
              type="text"
              placeholder=" Nom"
              name="lastname"
              value={infos.lastname}
              onChange={handleInfos}
            ></input>
          </div>
          <div className="label-input">
            <label>Prénom :</label>
            <br />
            <input
              type="text"
              placeholder=" Prénom"
              name="firstname"
              value={infos.firstname}
              onChange={handleInfos}
            ></input>
          </div>
          <div className="label-input">
            <label>Date de naissance :</label>
            <br />
            <input
              type="text"
              placeholder=" Date de naissance"
              name="birthday"
              value={infos.birthday}
              onChange={handleInfos}
            ></input>
          </div>
          <div className="label-input">
            <label>Tel :</label>
            <br />
            <input
              type="tel"
              placeholder=" Numéro de téléphone"
              name="phone"
              value={infos.phone}
              onChange={handleInfos}
            ></input>
          </div>
          <div className="moncompte-button-modifier">
            <button onClick={editInfos}>Modifier</button>
          </div>
        </div>
      );
    }
  }

  function displayEditSecurity() {
    if (showEditSecurity) {
      return (
        <div>
          <div className="label-input">
            <label>Email :</label>
            <br />
            <input
              type="email"
              id="email"
              placeholder=" Email"
              name="email"
              value={security.email}
              onChange={handleSecurity}
            ></input>
          </div>
          <div className="label-input">
            <label>Mot de passe :</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder=" Mot de passe"
              name="password"
              value={security.password}
              onChange={handleSecurity}
            ></input>
          </div>
          <div className="moncompte-button-modifier">
            <button onClick={editSecurity}>Modifier</button>
          </div>
        </div>
      );
    }
  }

  function Tabselect() {
    switch (tabOrder) {
      case "order":
        return (
          <div className="title-moncompte">
            <h2>Commandes</h2>
          </div>
        );

      case "setting":
        return (
          <div className="title-moncompte">
            <h2>Sécurité</h2>
            <FiEdit
              onClick={() => {
                setShowEditSecurity(!showEditSecurity);
              }}
            />
            <Row>
              <Col className="display-edit">Email: {user.email}</Col>
              <Col>{displayEditSecurity()}</Col>
            </Row>
          </div>
        );

      case "address":
        return (
          <div className="title-moncompte">
            <h2> Adresses</h2>
            <FiEdit
              onClick={() => {
                setShowEditAddress(!showEditAddress);
              }}
            />
            <Row>
              <Col className="display-edit">
                Adresse: {user.address} <br /> Code postal: {user.postcode}{" "}
                <br /> Ville: {user.city}
              </Col>
              <Col>{displayEditAddress()}</Col>
            </Row>
          </div>
        );

      case "payment":
        return (
          <div className="title-moncompte">
            <h2>
              Paiements <FiEdit />
            </h2>
          </div>
        );

      case "infos":
        return (
          <div className="title-moncompte">
            <h2>Infos perso</h2>
            <FiEdit
              onClick={() => {
                setShowEditInfos(!showEditInfos);
              }}
            />
            <Row>
              <Col className="display-edit">
                Prénom: {user.firstname} <br /> Nom: {user.lastname} <br /> Date
                de naissance: {user.birthday}
                <br /> Tél: {user.phone}
              </Col>
              <Col>{displayEditInfos()}</Col>
            </Row>
          </div>
        );

      case "contact":
        return (
          <div className="title-moncompte">
            <h2>Nous Contacter</h2>
            <div className="moncompte-contact">
              <p>
                <FcPhone className="fcicone" /> Tel: +33000000000
              </p>
              <p>
                <FcFeedback className="fcicone" /> Email:
                jashoppan@lebocal.academy
              </p>
              <p>
                <FcRules className="fcicone" /> JaShopPan
              </p>
              <p>18 rue du bocal</p>
              <p>06000 Nice</p>
            </div>
          </div>
        );

      default:
    }
  }

  function Disconnect() {
    let nom = localStorage.getItem("token");
    if (nom) {
      localStorage.removeItem("token");
      history.push("/");
    }
  }

  return (
    <div className="moncompte-body">
      <button className="moncompte-button" onClick={Disconnect}>
        <CgLogOff className="moncompte-icon" />
        Déconnexion
      </button>
      <br />
      <Col sm={12} className="moncompte-array">
        <Row className="mon-compte-row">
          <Col
            className="mon-compte-col"
            onClick={() => {
              handleSelect("order");
            }}
          >
            <h3>
              <FiBox /> Commandes
            </h3>
          </Col>
          <Col
            className="mon-compte-col"
            onClick={() => {
              handleSelect("payment");
            }}
          >
            <h3>
              <MdPayment />
              Paiements
            </h3>
          </Col>
          <Col
            className="mon-compte-col"
            onClick={() => {
              handleSelect("contact");
            }}
          >
            <h3>
              <HiOutlineMail />
              Nous Contacter
            </h3>
          </Col>
        </Row>
        <Row className="mon-compte-row">
          <Col
            className="mon-compte-col"
            onClick={() => {
              handleSelect("address");
            }}
          >
            <h3>
              <ImAddressBook />
              Adresses
            </h3>
          </Col>
          <Col
            className="mon-compte-col"
            onClick={() => {
              handleSelect("setting");
            }}
          >
            <h3>
              <RiUserSettingsFill />
              Sécurité
            </h3>
          </Col>
          <Col
            className="mon-compte-col"
            onClick={() => {
              handleSelect("infos");
            }}
          >
            <h3>
              <RiAccountBoxFill />
              Infos perso
            </h3>
          </Col>
        </Row>
      </Col>
      <div>{Tabselect()}</div>
    </div>
  );
}

export default Moncompte;
