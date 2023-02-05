
import { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import {  Link  } from 'react-router-dom';
import CellPhone from "./CellPhone";
const CellPhoneFollowing = () => {
  const [followSectionData, setFollowSectionData] = useState([]);
  const [filteredFollowerData, setFilteredFollowerData] = useState([]);
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));

  async function handleGetFollow() {

    const response = await fetch("https://quacker-api.onrender.com/follows/" + loginUser.id, {
      method: "GET",
    });
    const followRes = await response.json();
    setFollowSectionData(followRes)
   
  }

  useEffect(() => {
    if(filteredFollowerData.length === 0){
      setFilteredFollowerData(followSectionData.filter((follower) => loginUser.id === follower.followerId ))
    }
  },[followSectionData]);

  useEffect(() => {
    handleGetFollow()

   }, [])


  return ( 
    <div>
      
      <Card className="mx-2" style={{"width": "90%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}>
      <h6 className="text-warning">Following ducks</h6>
      {filteredFollowerData.map(follower => 
      // <p key={follower.id}>{follower.followed.userName}</p>
      
        <Nav.Link as={Link} to={`/profile/${follower.followedId}`} key={follower.id}>
          <Card className="mb-2 " style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}>
            <Row className="d-flex align-items-center">
              <Col><Image src="https://icon2.cleanpng.com/20180208/zge/kisspng-duck-cartoon-small-yellow-duck-cartoon-vector-5a7cef146cd675.8736460015181371084458.jpg" fluid style={{"width": "20%","borderRadius": "50%" }} /></Col>
              <Col style={{"color": "#777"}}>{follower.followed.userName}</Col>
            </Row>
          </Card>

        </Nav.Link>

   
      )}
    </Card>

      <CellPhone />
      
    </div>
   );
}
 
export default CellPhoneFollowing;