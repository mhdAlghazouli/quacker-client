import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import MarketPlaceLeftSide from './MarketPlaceLeftSide';
import CellPhoneMarketPlace from './CellPhoneMarketPlace';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';

const MarketPlaceAllProducts = () => {
  const [products, setProducts] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  async function getProducts() {
    const response = await fetch("ttps://quacker-api.onrender.com/products", {
      method: "GET"
    });
    const productsRes = await response.json();
    setProducts(productsRes)
  }
  console.log(products)

  useEffect(() => {
    getProducts();
  },[])

  return ( 
    <div>
      {isMobile ? (
        <div>
          <Row >
          <Col className="d-flex flex-wrap justify-content-center">
            {products && products.map(product => (
              <Card key={product.id} style={{"width": "18rem", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}} className="mx-2 mb-4">
                <Card.Header><b className="text-warning">{moment(product.createdAt).fromNow()}</b></Card.Header>
                <Image variant="top" src={`ttps://quacker-api.onrender.com${product.image && product.image.split('').slice(6).join("")}`} style={{"height":"18rem"}} fluid/>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">posted by: </b>{product.User.firstName} {product.User.lastName}</ListGroup.Item>
                  <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">title: </b>{product.title}</ListGroup.Item>
                  <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">description: </b>{product.description}</ListGroup.Item>
                  <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">price: </b>${product.price}</ListGroup.Item>
                  <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">Phone Contact: </b>{product.contact}</ListGroup.Item>
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
            <Image variant="top" src={`ttps://quacker-api.onrender.com${product.image && product.image.split('').slice(6).join("")}`} style={{"height":"18rem"}} fluid/>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">posted by: </b>{product.User.firstName} {product.User.lastName}</ListGroup.Item>
              <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">title: </b>{product.title}</ListGroup.Item>
              <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">description: </b>{product.description}</ListGroup.Item>
              <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">price: </b>${product.price}</ListGroup.Item>
              <ListGroup.Item style={{"color":"#777"}}><b className="text-warning">Phone Contact: </b>{product.contact}</ListGroup.Item>
            </ListGroup>
          </Card>

        ))}
      </Col>
    </Row>
    }
      
    </div>
   );
}
 
export default MarketPlaceAllProducts;