import { useState } from "react";
import { Card, Row, Col, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Products({ products, fetchProducts }) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleAddNewProduct = () => {
    navigate("/new-product");
  };
  const handleEditProduct = (product) => {
    navigate("/edit-product", { state: { product } });
  };

  const handleShowDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`https://e-commerce-app-server-fl98.onrender.com/products/${productToDelete._id}`);
      fetchProducts(); // Refresh the products list
      handleCloseDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1 className="display-1">Welcome to ShopStop</h1>
      <p className="lead">
        Explore the wide range of products here and elevate your shopping
        experience 🚀
      </p>
      <Row>
        {products.map((product) => (
          <Col
            md={3}
            className="d-flex justify-content-center my-2"
            key={product._id}
          >
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={product.imageURL}
                style={{ width: "100px", objectFit: "cover" }}
                className="mx-auto"
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>₹{product.price}.00</Card.Text>
                <Card.Text>
                  {[...new Array(product.rating)].map((rating, index) => (
                    <span key={index}>⭐</span>
                  ))}
                </Card.Text>
                <Button
                  variant="warning"
                  style={{ marginRight: "5px" }}
                  onClick={() => handleEditProduct(product)}
                >
                  Edit Product
                </Button>
                <Button variant="danger" onClick={() => handleShowDeleteModal(product)}>
                  Delete Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="primary" onClick={handleAddNewProduct}>
        Add New Product
      </Button>

       {/* Delete Confirmation Modal */}
       <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToDelete && (
            <>
              <p>Are you sure you want to delete this product?</p>
              <p><strong>{productToDelete.name}</strong></p>
              <img 
                src={productToDelete.imageURL} 
                alt={productToDelete.name} 
                style={{ width: "100px", objectFit: 'cover' }}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Products;
