import { useState } from "react";
import Likes from "./Likes";
import UnLikes from "./UnLikes";
import Comment from "./Comment";
import GetComment from "./GetComment";
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AiOutlineComment } from "react-icons/ai";
import Image from 'react-bootstrap/Image';

const FollowPost = ({post}) => {
 
  const [likesCount, setLikesCount] = useState( post.Likes ? post.Likes.length : 0);
  const [commentsCount, setCommentsCount] = useState(post.Comments ? post.Comments.length : 0);
  const [isCommentsWindowOpen, setIsCommentsWindowOpen] = useState(false);
  const [commentData, setCommentData] = useState(post.Comments ? post.Comments : undefined)

  const toggleCommentsWindowOpen = () => {
    if(isCommentsWindowOpen) {
      setIsCommentsWindowOpen(false)
    }else{
      setIsCommentsWindowOpen(true)
    }
  }

  return ( 
    <Card key={post.id} className="mb-5" style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}> 
              <Card.Body>
                <Row>
                  <Col className="d-flex">
                  <Image src="/flat-duck-wink-head-png-illustration-5698265.svg" fluid style={{"width": "10%","borderRadius": "50%" }} />
                    <Card.Text className="d-flex px-3" style={{"textAlign": "start", "color": "#777"}}>
                      {post.User.userName}
                      <br />
                      {moment(post.createdAt).fromNow()}
                    </Card.Text>
                    
                  </Col>

                </Row>
                <Row className="mt-2 mb-2">
              <Col>
              {post.image !== null  ? <Card.Img src={`https://quacker-api.onrender.com${post.image && post.image.split('').slice(6).join("")}`} /> : null}
              </Col>
            </Row>
                <Row>
                  <Col>{post.textContent}</Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-start">
                    <Row >
                      <Col>
                        <Likes post={post} setLikesCount={setLikesCount}/>
                      </Col>
                      <Col>
                        <UnLikes post={post} setLikesCount={setLikesCount}/>
                      </Col>
                      <Col>
                    <Button variant="warning" size="sm" onClick={toggleCommentsWindowOpen}>
                      <AiOutlineComment />
                    </Button>
                  </Col>
                    </Row>
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center ">
                    <div className="mx-3" style={{"color": "#777"}}>
                      {likesCount} likes
                    </div>
                    <div style={{"color": "#777"}}>
                      {commentsCount} comments
                    </div>
                  </Col>
                </Row>
                <Row>
              <Col>
                {/* {commentData && isCommentsWindowOpen ? commentData.map(comment => <div key={comment.id}>{comment.commentText}</div>): null} */}
                {commentData &&  isCommentsWindowOpen ? <GetComment setCommentsCount={setCommentsCount} setCommentData={setCommentData} commentData={commentData}/>: null}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                {isCommentsWindowOpen && <Comment post={post} setIsCommentsWindowOpen={setIsCommentsWindowOpen} setCommentsCount={setCommentsCount} setCommentData={setCommentData}/>}
              </Col>
            </Row>
              </Card.Body>
              
            </Card>
   );
}
 
export default FollowPost;
