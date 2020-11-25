import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./content.css";
import ProductRow from "../../assets/Components/ProductRow/ProductRow";
import Sidebar from "../../assets/Components/Sidebar/Sidebar";

function Content() {
  const [mangas, setMangas] = useState([]);
  const [videoGames, setVideoGames] = useState([]);
  const [goodies, setGoodies] = useState([]);

  useEffect(() => {
    getContentProducts();
  }, []);

  function getContentProducts() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://rott.schlap.fr/node4000/product/content", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (products) => {
          setMangas(
            products.filter(function (product) {
              return product.category === "mangas";
            })
          );

          setVideoGames(
            products.filter((product) => {
              return product.category === "videoGames";
            })
          );

          setGoodies(
            products.filter((product) => {
              return product.category === "goodies";
            })
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }
  return (
    <div className="content-container">
      <Row>
        <Col className="content-col" sm={12} lg={9}>
          <div className="middle">
            <h2 id="link-mangas">Catégorie Mangas</h2>
            <hr />
            <ProductRow products={mangas} />
            <h2 id="link-jeuvideo">Catégorie Jeux Vidéo</h2>
            <hr />
            <ProductRow products={videoGames} />
            <h2 id="link-goodies">Catégorie Goodies</h2>
            <hr />
            <ProductRow products={goodies} />
          </div>
        </Col>

        <Col sm={0} lg={3}>
          <div className="sidebar">
            <Sidebar
              category1={mangas}
              category2={videoGames}
              category3={goodies}
              category4={videoGames}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Content;
