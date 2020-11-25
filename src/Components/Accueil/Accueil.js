import React, { useEffect, useState } from "react";
import "./accueil.css";
import { Col, Row, Carousel } from "react-bootstrap";
import ProductRow from "../../assets/Components/ProductRow/ProductRow";
import Sidebar from "../../assets/Components/Sidebar/Sidebar";
import { HashLink } from "react-router-hash-link";

function Accueil() {
  const [mangas, setMangas] = useState([]);
  const [videoGames, setVideoGames] = useState([]);
  const [goodies, setGoodies] = useState([]);

  useEffect(() => {
    getHomeProducts();
  }, []);

  function getHomeProducts() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://rott.schlap.fr/node4000/home?category=mangas", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (products) => {
          setMangas(products);
        },
        (error) => {
          console.log(error);
        }
      );

    fetch("https://rott.schlap.fr/node4000/home?category=videoGames", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (products) => {
          setVideoGames(products);
        },
        (error) => {
          console.log(error);
        }
      );

    fetch("https://rott.schlap.fr/node4000/home?category=goodies", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (products) => {
          setGoodies(products);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <section className="test">
      <div className="essai">
        <Carousel className="content">
          <Carousel.Item>
            <img className="d-block w-100" src="bienvenue.png" alt=" " />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="Halloween.png" alt=" " />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="one piece 2.jpg" alt=" " />
          </Carousel.Item>
        </Carousel>
      </div>
      <br />
      <div className="home-container">
        <Row>
          <Col sm={12} lg={9}>
            <div className="middle">
              <HashLink id="content-link" to="/content#link-mangas">
                <h2>Figurines Mangas</h2>
              </HashLink>
              <hr />
              <ProductRow products={mangas} />
              <br />
              <HashLink id="content-link" to="/content#link-jeuvideo">
                <h2>Figurines Jeux Vidéo</h2>
              </HashLink>
              <hr />
              <ProductRow products={videoGames} />
              <br />
              <HashLink id="content-link" to="/content#link-goodies">
                <h2>Goodies</h2>
              </HashLink>
              <hr />
              <ProductRow products={goodies} />
            </div>
          </Col>
          <Col sm={0} lg={3}>
            <Sidebar
              category1={mangas}
              category2={videoGames}
              category3={goodies}
              category4={videoGames}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Accueil;
