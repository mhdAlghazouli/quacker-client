
import { Link, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ImProfile } from "react-icons/im";
import { FaStoreAlt } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

const LeftSection = () => {
  const navigate = useNavigate();

  function logout(){
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }

  return ( 
    <div>
      <Row className="d-flex align-items-center my-2">
        <Col className="d-flex justify-content-end text-warning"><b>Edit profile</b></Col>
        <Col className="d-flex justify-content-start"><Button variant="warning" as={Link} to="/editProfile"><ImProfile /></Button></Col>
      </Row>
      <Row className="d-flex align-items-center mb-2">
        <Col className="d-flex justify-content-end text-warning"><b>Market Place</b></Col>
        <Col className="d-flex justify-content-start"><Button variant="warning" as={Link} to="/marketPlace"><FaStoreAlt /></Button></Col>
      </Row>
      <Row className="d-flex align-items-center">
        <Col className="d-flex justify-content-end text-warning"><b>Logout</b></Col>
        <Col className="d-flex justify-content-start"><Button variant="warning" onClick={logout}><RiLogoutBoxFill /></Button></Col>
      </Row>
    </div>
   );
}
 
export default LeftSection;