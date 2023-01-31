import { useState } from "react";
import Likes from "./Likes";
import UnLikes from "./UnLikes";
import Comment from "./Comment";
import GetComment from "./GetComment";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { RiDeleteBin7Line, RiEditLine } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlineComment } from "react-icons/ai";
import moment from 'moment';

export const Post = ({post, handleGetPosts})=>{

  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);
  const [isShowIconWindowOpen, setIsShowIconWindowOpen] = useState(false);
  const [isCommentsWindowOpen, setIsCommentsWindowOpen] = useState(false);
  const [newTextContent, setNewTextContent] = useState("");
  const [likesCount, setLikesCount] = useState(post.Likes ? post.Likes.length : 0);
  const [commentsCount, setCommentsCount] = useState(post.Comments ? post.Comments.length : 0);
  const [commentData, setCommentData] = useState(post.Comments ? post.Comments : undefined)
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));

  
  const toggleShowIconsWindowOpen = () => {
    if(isShowIconWindowOpen) {
      setIsShowIconWindowOpen(false)
    }else{
      setIsShowIconWindowOpen(true)
    }
  }

  const toggleEditWindow = () => {
    if(isEditWindowOpen){
      setIsEditWindowOpen(false)
    } else {
      setIsEditWindowOpen(true)
    }
  }

  const toggleCommentsWindowOpen = () => {
    if(isCommentsWindowOpen) {
      setIsCommentsWindowOpen(false)
    }else{
      setIsCommentsWindowOpen(true)
    }
  }

 

  //handle Delete
async function handleDelete(id) {
  
  const response = await fetch(`https://quacker-api.onrender.com/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  await response.json();
  handleGetPosts()
 }


//handleEdit
async function handleEdit(){
  const updatedPost = {
    id: post.id,
    textContent: newTextContent,
    
  }
  const response = await fetch ("https://quacker-api.onrender.com/posts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPost)

  })
  const updatedPostRes = await response.json();
  if(updatedPostRes){
    handleGetPosts()
    setIsEditWindowOpen(false)
  }
}

  return <Card  className="mb-5" style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}>
          <Card.Body>
            <Row >
              
                
                
                <Col md="7" className="d-flex">
                  <Image src="https://icon2.cleanpng.com/20180208/zge/kisspng-duck-cartoon-small-yellow-duck-cartoon-vector-5a7cef146cd675.8736460015181371084458.jpg" fluid style={{"width": "10%","borderRadius": "50%" }} />
                  <Card.Text className="d-flex px-3" style={{"textAlign": "start", "color": "#777"}}>
                    {loginUser.userName}
                    <br />
                    {moment(post.createdAt).fromNow()}
                  </Card.Text>
                  
                </Col>

              
              <Col md="5" className="d-flex justify-content-end align-items-start ">
               
                  
                    <Button className="mx-4" variant="warning" value={post.id} onClick={toggleShowIconsWindowOpen}>
                      <RxDotsHorizontal />
                    </Button>
                  
                  

               
                
                {isShowIconWindowOpen && 
                <Row > 
                  <Col >
                    <Button variant="warning" value={post.id} onClick={() => handleDelete(post.id)}>
                      <RiDeleteBin7Line />
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="warning" value={post.id} className="show-btn" onClick={toggleEditWindow}>
                      <RiEditLine />
                    </Button> 
                  </Col>
                </Row>}
                
              </Col>
            </Row>
            <Row className="mt-2 mb-2">
              <Col>
              {post.image !== null ? <Card.Img src={`https://quacker-api.onrender.com${post.image && post.image.split('').slice(6).join("")}`} /> : null}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                  <Card.Text >

                    {post.textContent}
                  </Card.Text>
                  
                
              </Col>
            </Row>
            {isEditWindowOpen && <div id="content-div-1" className="mt-2 content-div-1" value={post.id}>
              <Form.Control placeholder="Add a text" onChange={(e) => setNewTextContent(e.target.value)}/>
              <Button value={post.id}  variant="warning" type="submit" onClick={handleEdit}>Update</Button>
            </div>}
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
                    <Button size="sm" variant="warning" onClick={toggleCommentsWindowOpen}>
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
                {commentData &&  isCommentsWindowOpen ? <GetComment post={post} setCommentsCount={setCommentsCount} setCommentData={setCommentData} commentData={commentData}/>: null}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                {isCommentsWindowOpen && <Comment post={post} setIsCommentsWindowOpen={setIsCommentsWindowOpen} setCommentsCount={setCommentsCount} setCommentData={setCommentData}/>}
              </Col>
            </Row>
          </Card.Body>
        </Card>
}