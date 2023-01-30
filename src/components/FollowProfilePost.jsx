import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FollowProfilePost = ({post}) => {

  return ( 
    <Card  className="mb-2" style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}>
          <Card.Body>
            
          <Row className="mt-2 mb-2">
              <Col>
              {post.image !== null ? <Card.Img src={`ttps://quacker-api.onrender.com${post.image && post.image.split('').slice(6).join("")}`} /> : null}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                  <Card.Text >

                    {post.textContent}
                  </Card.Text>
                  
                
              </Col>
            </Row>
          </Card.Body>
    </Card>
   );
}
 
export default FollowProfilePost;