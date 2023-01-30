import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaHome, FaStore } from "react-icons/fa";
import { BsBagPlusFill } from "react-icons/bs";
const CellPhoneMarketPlace = () => {
  return ( 
    <div className=" d-flex justify-content-center">
          <Row className="bg-warning" style={{"position": "fixed","width": "100%", "bottom": "0"}}>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" as={Link} to="/profile"><FaHome /> </Button>Home</Col>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" as={Link} to="/MarketPlaceAddProduct"><BsBagPlusFill /></Button>Add</Col>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" as={Link} to="/MarketPlaceAllProducts"><FaStore /></Button>All</Col>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" as={Link} to="/MarketPlaceMyProducts"><FaStore /></Button>My</Col>
          </Row>
    </div>
   );
}
 
export default CellPhoneMarketPlace;