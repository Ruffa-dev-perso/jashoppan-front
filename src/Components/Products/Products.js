import React, { useEffect, useState } from "react";
import "./products.css";
import { useHistory, useLocation } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { RiShoppingCart2Line } from "react-icons/ri";
import { HashLink } from "react-router-hash-link";

function Products() {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");

  const [oneProduct, setOneProduct] = useState({
    characteristics: [],
    price: 0,
  });
  const history = useHistory();

  useEffect(() => {
    getOneProduct();
  }, []);

  function getOneProduct() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://rott.schlap.fr/node4000/product/detail?id=" + id, options)
      .then((response) => {
        return response.json();
      })
      .then((oneProduct) => {
        setOneProduct(oneProduct);
      });
  }

  const buyProduct = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ id, quantity: 1 }),
    };

    fetch("https://rott.schlap.fr/node4000/account/cart", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          history.push("/cart");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="products">
      <Row>
        <Col sm={12} lg={6}>
          <img
            className="product-pic"
            src={"https://rott.schlap.fr/node4000/" + oneProduct.image}
            alt="none"
          />
        </Col>
        <Col sm={12} lg={6}>
          <div className="text-content">
            <h1 className="title">{oneProduct.title}</h1>
            <h2 className="price">
              Prix du produit : {oneProduct.price.toFixed(2)} €
            </h2>
            <p className="characteristics">
              <h4 className="title4">Caractéristiques :</h4>

              <ul className="characteristics-list">
                {oneProduct.characteristics.map((value, index) => {
                  return <p key={index}>{value}</p>;
                })}
              </ul>
            </p>
            <div className="button-cart">
              <Button id="cart" variant="outline-warning" onClick={buyProduct}>
                <RiShoppingCart2Line className="logo-cart" />
                Acheter
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Products;
