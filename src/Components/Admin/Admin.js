/**
 * Components/Admin/Admin.js - Admin component
 * Admin backoffice for products management
 */

/* Modules and components imports */
import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Form, InputGroup } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

/* Style import */
import "./style.css";

/**
 * Admin component
 */
function Admin() {
  /* State */
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});

  /* Use effect */
  /* TODO:
        - Ajouter le ou les useEffect
        - Ajouter dans la callback l'appel de la (des) méthode(s) appropriée(s)
    */
  useEffect(() => {
    getProducts();
  }, []);
  /**
   * Get Products
   */
  function getProducts() {
    /* TODO:
            - Récupérer les produits
            - Ajouter les données dans le state
        */
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("https://rott.schlap.fr/node4000/admin", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (products) => {
          setProducts(products);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**
   * Handle new product input
   */
  const handleNewProductInput = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  /**
   * Add product
   */
  const addProduct = (e) => {
    e.preventDefault();

    console.log(newProduct);

    /* TODO:
           - Ajouter le fetch d'ajout du produit
           - recharger la liste des produits à jour
        */
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    };
    fetch("https://rott.schlap.fr/node4000/admin", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          getProducts();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /**
   * Delete product
   */

  const deleteProduct = (id) => {
    /* TODO:
           - Ajouter le fetch de suppression du produit
           - Recharger la liste des produits à jour
        */
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://rott.schlap.fr/node4000/admin?_id=" + id, options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          getProducts();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /**
   * Render products
   */
  const renderProducts = () => {
    if (Array.isArray(products)) {
      if (products.length > 0) {
        return products.map((product, index) => (
          <tr key={index}>
            <td>{product.title}</td>
            <td>{product.category}</td>
            <td>{product.price.toFixed(2)} €</td>
            <td>
              <Button onClick={() => deleteProduct(product._id)}>
                <MdDelete />
              </Button>
            </td>
          </tr>
        ));
      }
    }

    return (
      <tr>
        <td colSpan="4" className="center-align">
          Aucun produit
        </td>
      </tr>
    );
  };

  return (
    <div id="adminContainer" className="content-container">
      <h1 className="center-align main-title">Gestion des produits</h1>
      {/* Products section */}
      <section>
        <h2 className="title center-align">Produits</h2>

        <Table striped bordered hover>
          <thead>
            <th>Produit</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th></th>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </Table>
      </section>

      {/* Add product section */}
      <section>
        <h2 className="title center-align">Ajouter un produit</h2>

        <Form>
          <Row>
            <Col sm={12} lg={6}>
              <Form.Group controlId="productName">
                <Form.Label>Nom du produit</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nom du produit"
                  onChange={handleNewProductInput}
                  name="title"
                  value={newProduct.title}
                />
              </Form.Group>
            </Col>
            <Col sm={12} lg={6}>
              <Form.Group controlId="productCategory">
                <Form.Label>Catégorie</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleNewProductInput}
                  name="category"
                >
                  <option value="">Choisir une catégorie</option>
                  <option
                    selected={newProduct.category === "mangas"}
                    value="mangas"
                  >
                    Manga
                  </option>
                  <option
                    selected={newProduct.category === "videoGames"}
                    value="videoGames"
                  >
                    Jeux vidéos
                  </option>
                  <option
                    selected={newProduct.category === "goodies"}
                    value="goodies"
                  >
                    Goodies
                  </option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12} lg={6}>
              <Form.Group controlId="productPrice">
                <Form.Label>Prix</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Prix"
                    onChange={handleNewProductInput}
                    name="price"
                    value={newProduct.price}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>€</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={6}>
              <Form.Group controlId="productImage">
                <Form.Label>Lien de l'image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lien de l'image"
                  onChange={handleNewProductInput}
                  name="image"
                  value={newProduct.image}
                />
              </Form.Group>
            </Col>
            <Col sm={12} lg={6}>
              <Form.Group controlId="productImageXs">
                <Form.Label>Lien de l'image xs</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lien de l'image xs"
                  onChange={handleNewProductInput}
                  name="imagexs"
                  value={newProduct.imagexs}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="center-align">
            <Button variant="primary" type="submit" onClick={addProduct}>
              Valider
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
}

export default Admin;
