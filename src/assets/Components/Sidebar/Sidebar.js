import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { AiFillFire } from "react-icons/ai";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [category4, setCategory4] = useState([]);

  useEffect(() => {
    getSidebar();
  }, []);

  let renderRandomProduct = (products) => {
    const randomIndex = Math.floor(Math.random() * products.length);
    let product = products[randomIndex];
    if (product) {
      return (
        <Card className="product-card">
          <Card.Img
            variant="top"
            src={"https://rott.schlap.fr/node4000/" + product.imagexs}
          />
          <Card.Body>
            <Card.Title>
              {product.title.length > 20
                ? product.title.substring(0, 17) + "..."
                : product.title}
            </Card.Title>
            <Link to={"/product?id=" + product._id}>
              <Button variant="primary">Voir Produit</Button>
            </Link>
          </Card.Body>
        </Card>
        /*<div className="sidebar-product">
        <img src={product.imagexs} />
        <p>{product.title}</p>
        <p>{product.price}</p>
      </div>*/
      );
    }
  };

  function getSidebar() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("https://rott.schlap.fr/node4000/sidebar", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (products) => {
          setCategory1(
            products.filter(function (product) {
              return product.category === "mangas";
            })
          );
          setCategory2(
            products.filter(function (product) {
              return product.category === "videoGames";
            })
          );
          setCategory3(
            products.filter(function (product) {
              return product.category === "goodies";
            })
          );
          setCategory4(
            products.filter(function (product) {
              return product.category === "mangas";
            })
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="Toptendance">
      <h3>
        <AiFillFire />
        Top Tendance
        <AiFillFire />
      </h3>

      <hr />
      {renderRandomProduct(category1)}
      {renderRandomProduct(category2)}
      {renderRandomProduct(category3)}
      {renderRandomProduct(category4)}
    </div>
  );
}

export default Sidebar;
