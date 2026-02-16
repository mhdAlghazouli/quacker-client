import { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import {  Link  } from 'react-router-dom';

const FollowSection = ({ followSectionData }) => {

  const [filteredFollowerData, setFilteredFollowerData] = useState([]);
  const followerUser = JSON.parse(window.localStorage.getItem("UserContext"));

  
  useEffect(() => {
    if(filteredFollowerData.length === 0){
      setFilteredFollowerData(followSectionData.filter((follower) => followerUser.id === follower.followerId ))
    }
  },[followSectionData]);

  
  return ( 
    <Card className="mx-2" style={{"width": "90%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}>
      <h6 className="text-warning">Following ducks</h6>
      {filteredFollowerData.map(follower => 
      // <p key={follower.id}>{follower.followed.userName}</p>
      
        <Nav.Link as={Link} to={`/profile/${follower.followedId}`} key={follower.id}>
          <Card className="mb-2" style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}>
            <Row>
              <Col><Image src="/flat-duck-wink-head-png-illustration-5698265.svg" fluid style={{"width": "20%","borderRadius": "50%" }} /></Col>
              <Col style={{"color": "#777"}}>{follower.followed.userName}</Col>
            </Row>
          </Card>

        </Nav.Link>

   
      )}
    </Card>
   );
}
 
export default FollowSection;
