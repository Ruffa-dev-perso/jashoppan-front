import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ImCross } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import "./cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  const showCartProducts = cart.map((product, index) => (
    <div className="showCart-content">
      <Row key={index} className="showCart">
        <Col>
          <img
            className="product-pic"
            src={"https://rott.schlap.fr/node4000/" + product.imagexs}
            alt="none"
          />
        </Col>
        <Col>
          <p>{product.name}</p>
        </Col>

        <Col>
          <p>{product.price.toFixed(2)} €</p>
        </Col>
        <Col>
          <p>Quantité: {product.quantity}</p>
        </Col>
        <Col>
          <button onClick={() => deleteProduct(product.productId)}>
            <MdDelete id="cart-icon" />
          </button>
        </Col>
      </Row>
      <hr />
    </div>
  ));

  useEffect(() => {
    getCart();
  }, []);

  function getCart() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };

    fetch("https://rott.schlap.fr/node4000/account/cart", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setCart(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const deleteProduct = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };

    fetch(
      "https://rott.schlap.fr/node4000/account/cart?productId=" + id,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          getCart();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return <div>{showCartProducts}</div>;
}

export default Cart;
