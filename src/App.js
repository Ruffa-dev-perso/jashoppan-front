import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import Account from "./Components/Account/Account";
import Cart from "./Components/Cart/Cart";
import Accueil from "./Components/Accueil/Accueil";
import Content from "./Components/Content/Content";
import Footer from "./Components/Footer/Footer";
import Products from "./Components/Products/Products";
import Moncompte from "./Components/Moncompte/Moncompte";
import Admin from "./Components/Admin/Admin";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <HashRouter basename="/">
      <Header />
      <div className="main-content">
        <Switch>
          <Route path="/account" component={Account} exact />
          <Route path="/moncompte" component={Moncompte} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/" component={Accueil} exact />
          <Route path="/content" component={Content} exact />
          <Route path="/product" component={Products} exact />
          <Route path="/admin" component={Admin} exact />
        </Switch>
      </div>
      <Footer />
    </HashRouter>
  );
}

export default App;
