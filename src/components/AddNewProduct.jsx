import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AddNewProduct({ fetchProducts }) {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.00);
  const [imageURL, setImageURL] = useState('');
  const [rating, setRating] = useState(0);


  const backToAllProducts = () => {
      navigate('/')
  }

  const createProduct = async (e) => {
    try {
      e.preventDefault()
      await axios.post('http://localhost:4000/products', {
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
    } catch (error) {
      console.log(error)
    }
    setShow(false)
  }

  return (
    <>


    <Button variant="success" onClick={backToAllProducts} className='m-5 '>All Products</Button>
      <Button variant="dark" onClick={handleShow} className='m-5'>
        + Add new product
      </Button>

      <Modal show={show} onHide={handleClose}>
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
          <Button variant="success" onClick={createProduct}>
            Create Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewProduct;