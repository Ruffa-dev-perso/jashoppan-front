import React, { useState } from "react";
import "./account.css";
import { useHistory } from "react-router-dom";

function Account(props) {
  const [newAccount, setnewAccount] = useState({});

  const [account, setAccount] = useState({});
  const history = useHistory();

  const handleNewAccount = (e) => {
    setnewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const addAccount = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    };
    fetch("https://rott.schlap.fr/node4000/account/create", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const loggingIn = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    };
    fetch("https://rott.schlap.fr/node4000/account/login", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          if (data.token) {
            localStorage.setItem("token", data.token);
            history.push("/");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="account-body">
      <div className="border">
        <h1>Connexion</h1>
        <div>
          <label>Email :</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleAccount}
            value={account.email}
            placeholder=" email"
          ></input>
        </div>
        <label>Mot de passe :</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleAccount}
          value={account.password}
          placeholder=" mot de passe"
        ></input>
        <div className="button">
          <button onClick={loggingIn}>Se connecter</button>
        </div>
        <div className="account-separator">
          <h1>Créer</h1>
          <p>Votre nouveau compte gratuit</p>
          <div>
            <label>Email :</label>
            <br />
            <input
              type="email"
              id="email"
              placeholder=" Email"
              onChange={handleNewAccount}
              name="email"
              value={newAccount.email}
            ></input>
          </div>
          <div>
            <label>Mot de passe :</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder=" Mot de passe"
              onChange={handleNewAccount}
              name="password"
              value={newAccount.password}
            ></input>
          </div>
          <div className="button">
            <button onClick={addAccount}>S'inscrire</button>
            <div>
              <span className="return"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;
