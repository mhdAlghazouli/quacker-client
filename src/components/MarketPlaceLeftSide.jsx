import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaStoreAlt,FaHome, FaStore } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BsBagPlusFill } from "react-icons/bs";

const MarketPlaceLeftSide = (props) => {
  return ( 
    <Row>
      <Col>
        <Row className="d-flex align-items-center my-2">
          <Col className="d-flex justify-content-end text-warning">
            <b>Home</b>
          </Col>
          <Col className="d-flex justify-content-start">
            <Button variant="warning" as={Link} to="/profile">
              <FaHome />
            </Button>
          </Col>
        </Row>

        <Row className="d-flex align-items-center mb-2">
          <Col className="d-flex justify-content-end text-warning">
            <b>Add Product</b>
          </Col>
          <Col className="d-flex justify-content-start">
            <Button variant="warning" as={Link} to="/MarketPlaceAddProduct">
              <BsBagPlusFill />
            </Button>
          </Col>
        </Row>

        <Row className="d-flex align-items-center mb-2">
          <Col className="d-flex justify-content-end text-warning">
            <b>All Products</b>
          </Col>
          <Col className="d-flex justify-content-start">
            <Button variant="warning" as={Link} to="/MarketPlaceAllProducts" >
              <FaStore />
            </Button>
          </Col>
        </Row>

        <Row className="d-flex align-items-center">
          <Col className="d-flex justify-content-end text-warning">
            <b>my Products</b>
          </Col>
          <Col className="d-flex justify-content-start">
            <Button variant="warning" as={Link} to="/MarketPlaceMyProducts">
              <FaStore />
            </Button>
          </Col>
        </Row>

      </Col>
      <Col md="10"></Col>
      {props.children}
    </Row>
   );
}
 
export default MarketPlaceLeftSide;