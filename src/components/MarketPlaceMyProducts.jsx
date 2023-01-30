import { useState, useEffect } from 'react';
import MarketPlaceLeftSide from './MarketPlaceLeftSide';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import { RiDeleteBin7Line } from "react-icons/ri";
import CellPhoneMarketPlace from './CellPhoneMarketPlace';
import { useMediaQuery } from 'react-responsive';

const MarketPlaceMyProducts = () => {
  const [products, setProducts] = useState([]);
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  const isMobile = useMediaQuery({ maxWidth: 767 });

  async function getMyProducts() {
    const response = await fetch("https://quacker-api.onrender.com/products/" + loginUser.id , {
      method: "GET"
    })
    const myProductsRes = await response.json();
    console.log(myProductsRes)
    setProducts(myProductsRes)
  }

  async function handleDelete(product) {
  
    const response = await fetch(`https://quacker-api.onrender.com/products/${product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const deleteRes = await response.json();
    alert("item deleted")
    setProducts(products.filter(newProduct => newProduct.id !== product.id))
   }
  useEffect(() => {
    getMyProducts();
  },[])
  return ( 
    <div>
      {isMobile ? (
        <div>
          <Row>
            <Col  className="d-flex flex-wrap justify-content-center">
              {products && products.map(product => (
                <Card key={product.id} style={{"width": "18rem", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}} className="mx-2 mb-4">
                  <Card.Header><b className="text-warning">{moment(product.createdAt).fromNow()}</b></Card.Header>
                  <Image variant="top" src={`https://quacker-api.onrender.com${product.image && product.image.split('').slice(6).join("")}`} style={{"height":"18rem"}} fluid/>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item ><b className="text-warning">title: </b>{product.title}</ListGroup.Item>
                    <ListGroup.Item><b className="text-warning">description: </b>{product.description}</ListGroup.Item>
                    <ListGroup.Item><b className="text-warning">price: </b>${product.price}</ListGroup.Item>
                    <ListGroup.Item><b className="text-warning">Phone Contact: </b>{product.contact}</ListGroup.Item>
                    <ListGroup.Item><Button variant="warning" onClick={() => handleDelete(product)}><RiDeleteBin7Line/></Button></ListGroup.Item>
                  </ListGroup>
                </Card>
              ))}
            </Col>
          </Row>
          <div className="mt-5">
            <CellPhoneMarketPlace />
          </div>
        </div>
      ):<Row>
      <Col md="3">
        <MarketPlaceLeftSide />
      </Col>
      <Col md="9" className="d-flex flex-wrap justify-content-center">
        {products && products.map(product => (
          <Card key={product.id} style={{"width": "18rem", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}} className="mx-2 mb-2">
            <Card.Header><b className="text-warning">{moment(product.createdAt).fromNow()}</b></Card.Header>
            <Image variant="top" src={`https://quacker-api.onrender.com${product.image && product.image.split('').slice(6).join("")}`} style={{"height":"18rem"}} fluid/>
            <ListGroup className="list-group-flush">
              <ListGroup.Item ><b className="text-warning">title: </b>{product.title}</ListGroup.Item>
              <ListGroup.Item><b className="text-warning">description: </b>{product.description}</ListGroup.Item>
              <ListGroup.Item><b className="text-warning">price: </b>${product.price}</ListGroup.Item>
              <ListGroup.Item><b className="text-warning">Phone Contact: </b>{product.contact}</ListGroup.Item>
              <ListGroup.Item><Button variant="warning" onClick={() => handleDelete(product)}><RiDeleteBin7Line/></Button></ListGroup.Item>
            </ListGroup>
          </Card>

        ))}
      </Col>
    </Row>
    }
      
    </div>
   );
}
 
export default MarketPlaceMyProducts;