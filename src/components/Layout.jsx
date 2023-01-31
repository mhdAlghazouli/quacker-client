import SearchDucks from "./SearchDucks";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';




const Layout = () => {  
  
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  
  return ( 
    <Navbar  className="mb-3">
      <Container>
        <Col md="2" className="d-flex justify-content-start align-items-center">
        
        <Navbar.Brand as={Link} to="/profile" className="text-warning">Quacker</Navbar.Brand>
        </Col>
            {localStorage.getItem("jwt") ? null : 
            <Col className="d-flex justify-content-end">
              
                  <Nav >
                    <Nav.Link as={Link} to="/" className="text-warning">Login</Nav.Link>
                    <Nav.Link  as={Link} to="/signup" className="text-warning">Sign up</Nav.Link>
                  </Nav>
               
            
            </Col>
            }
            {localStorage.getItem("jwt") ? 
            <Col className="d-flex ">
              
                  <Col md="10" className="d-flex justify-content-center align-items-center">
                    <SearchDucks  />
                  </Col >
            
            
                  <Col className="d-flex justify-content-end align-items-center">
                  <Image className="mx-4" src="https://icon2.cleanpng.com/20180208/zge/kisspng-duck-cartoon-small-yellow-duck-cartoon-vector-5a7cef146cd675.8736460015181371084458.jpg"  style={{"width": "20%","borderRadius": "50%" }} />
                    <b className="text-warning">{loginUser && loginUser.userName}</b>
                  </Col>
           
            
            </Col>
            
            : null}
        </Container>
      </Navbar>
   );
}
 
export default Layout;

