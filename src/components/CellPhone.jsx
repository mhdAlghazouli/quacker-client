import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ImProfile } from "react-icons/im";
import { FaStoreAlt, FaUserFriends } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

const CellPhone = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  function logout(){
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }
  return ( 
    <div className=" d-flex justify-content-center">
          <Row className="bg-warning" style={{"position": "fixed","width": "100%", "bottom": "0"}}>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" as={Link} to="/editProfile"><ImProfile /> </Button>Edit</Col>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" as={Link} to="/marketPlace"><FaStoreAlt /></Button>Market</Col>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" as={Link} to="/following"><FaUserFriends /></Button>Following</Col>
            <Col className="d-flex flex-column align-items-center justify-content-center"><Button variant="white" onClick={logout}><RiLogoutBoxFill /></Button>Logout</Col>
          </Row>
    </div>
   );
}
 
export default CellPhone;