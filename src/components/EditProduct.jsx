import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


function EditProduct({ fetchProducts }) {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { product } = location.state || {};


  const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);


  // Initialize state with the product data
 const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || 0.00);
  const [imageURL, setImageURL] = useState(product?.imageURL || '');
  const [rating, setRating] = useState(product?.rating || 0);


  const backToAllProducts = () => {
      navigate('/')
  }

  const updateProduct = async (e) => {
    try {
      e.preventDefault();
      await axios.patch(`https://e-commerce-app-server-fl98.onrender.com/products/${product._id}`, {
        name,
        description,
        price,
        imageURL,
        rating
      });
      fetchProducts();
      setName('');
      setDescription('');
      setPrice('');
      setImageURL('');
      setRating('');
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    setShow(false)
  }

  return (
    <>


    <Button variant="success" onClick={backToAllProducts} className='m-5 '>Back To All Products</Button>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                autoComplete='false'
                value={name}
                onInput={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}  
                value={description}
                onInput={(e) => setDescription(e.target.value)} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                autoFocus
                autoComplete='false'
                value={price}
                onInput={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image URL"
                autoFocus
                autoComplete='false'
                value={imageURL}
                onInput={(e) => setImageURL(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Rating"
                autoFocus
                autoComplete='false'
                value={rating}
                onInput={(e) => setRating(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={updateProduct}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProduct;