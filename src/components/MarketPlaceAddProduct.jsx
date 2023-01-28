import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MarketPlaceLeftSide from './MarketPlaceLeftSide';
import { useNavigate } from 'react-router-dom';

const MarketPlaceAddProduct = () => {
  
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [contact, setContact] = useState("");
  const navigate = useNavigate();
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));

  //post a product
  async function handleSubmitProduct(e){
    e.preventDefault();
    

    const formData = new FormData();
    formData.append('title', title)
    formData.append('image', image)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('contact', contact)
    formData.append('userId', loginUser.id)

    const response = await fetch("https://quacker-api.onrender.com/products", {
      method: "POST",
      body: formData
    });
    const productRes = await response.json();
    if(productRes){
      setTitle("");
      setImage("");
      setDescription("");
      setPrice(0);
      setContact("");
      navigate("/MarketPlaceAllProducts")
    }
  } 
  return ( 
    <Row>
      <Col md="3">
        <MarketPlaceLeftSide />
      </Col>
      <Col md="9" className='d-flex justify-content-center'>
        
          <Card style={{"width": "50%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}} className="text-start">
            <Card.Body>
              <Form onSubmit={(e) => handleSubmitProduct(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Type a title" onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" placeholder="insert Image" name="image"onChange={(e) => setImage(e.target.files[0])}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Type a description" onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  $<Form.Control type="text" placeholder="enter a price" onChange={(e) => setPrice(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control type="tel" placeholder="enter your number" onChange={(e) => setContact(e.target.value)}/>
                </Form.Group>

                <Button variant="warning" type="submit">
                  Add
                </Button>
              </Form>
            </Card.Body>
          </Card>
        
      </Col>
    </Row>
   );
}
 
export default MarketPlaceAddProduct;