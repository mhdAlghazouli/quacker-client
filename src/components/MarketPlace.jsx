import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaStoreAlt } from "react-icons/fa";
import MarketPlaceLeftSide from "./MarketPlaceLeftSide";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { useMediaQuery } from 'react-responsive';
import CellPhoneMarketPlace from './CellPhoneMarketPlace';



const MarketPlace = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return ( 
    <div>
      {isMobile ? (
        <div>
          <Container className="d-flex justify-content-center align-items-end">
            <Image src="https://img.freepik.com/premium-photo/funny-illustrated-duck-holding-shopping-bag_183364-36807.jpg?w=2000" style={{"width": "15rem"}} fluid/>
          </Container>
          <div className="">
            <CellPhoneMarketPlace />
          </div>
        </div>
      ) : <Row>
      <Col md="3">
       <MarketPlaceLeftSide />
         
      </Col>
      <Col md="9">
        <Container className="d-flex justify-content-center">
         <Image src="https://img.freepik.com/premium-photo/funny-illustrated-duck-holding-shopping-bag_183364-36807.jpg?w=2000" style={{"width": "18rem"}} fluid/>
        </Container>
      </Col>
    </Row>
    }

    </div>
   
   );
}
 
export default MarketPlace;