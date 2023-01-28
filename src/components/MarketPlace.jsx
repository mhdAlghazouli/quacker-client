import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaStoreAlt } from "react-icons/fa";
import MarketPlaceLeftSide from "./MarketPlaceLeftSide";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';



const MarketPlace = () => {
  return ( 
   <Row>
     <Col md="3">
      <MarketPlaceLeftSide />
        
     </Col>
     <Col md="9">
       <Container className="d-flex justify-content-center">
        <Image src="https://img.freepik.com/premium-photo/funny-illustrated-duck-holding-shopping-bag_183364-36807.jpg?w=2000" style={{"width": "18rem"}} fluid/>
       </Container>
     </Col>
   </Row>
   );
}
 
export default MarketPlace;