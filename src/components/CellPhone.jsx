import { Link, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ImProfile } from "react-icons/im";
import { FaStoreAlt } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

const CellPhone = () => {
  const navigate = useNavigate();
  
  function logout(){
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }
  return ( 
    <div className=" d-flex justify-content-center">
          <Row className="bg-warning" style={{"position": "fixed","width": "100%", "bottom": "0"}}>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" as={Link} to="/editProfile"><ImProfile /> </Button>Edit profile</Col>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" as={Link} to="/marketPlace"><FaStoreAlt /></Button>Market Place</Col>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" onClick={logout}><RiLogoutBoxFill /></Button>Logout</Col>
          </Row>
    </div>
   );
}
 
export default CellPhone;