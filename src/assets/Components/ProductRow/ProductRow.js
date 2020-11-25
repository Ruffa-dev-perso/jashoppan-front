import React from "react";
import { Link } from "react-router-dom";
import "./productrow.css";
import { Card, Button, Col, Row } from "react-bootstrap";

function ProductRow(props) {
  let renderProducts = () => {
    let productsJSX = [];

    props.products.forEach((product, index) => {
      productsJSX.push(
        <Col key={index} sm={6} md={4} lg={3} className="product-row-col">
          <Card className="product-card">
            <Card.Img
              variant="top"
              src={"https://rott.schlap.fr/node4000/" + product.imagexs}
            />
            <Card.Body>
              <Card.Title className="card-title">
                {product.title.length > 15
                  ? product.title.substring(0, 12) + "..."
                  : product.title}
              </Card.Title>
              <Card.Text>{product.price.toFixed(2)} €</Card.Text>
              <Link to={"/product?id=" + product._id}>
                <Button id="product-button" variant="primary">
                  Voir Produit
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    return productsJSX;
  };

  return <Row>{renderProducts()}</Row>;
}

export default ProductRow;
