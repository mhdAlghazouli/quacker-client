import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

import { RiDeleteBin7Line, RiEditLine } from "react-icons/ri";


const GetComment = ({ commentData, setCommentData, setCommentsCount }) => {

  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  const [newCommentText, setNewCommentText] = useState("");
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);


  async function handleDelete(id) {
    const deleteResponse = await fetch(`https://quacker-api.onrender.com/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    await deleteResponse.json()
    setCommentsCount((commentCount) => commentCount - 1)
    setCommentData(commentData.filter(comment => comment.id !== id))
  }

  const toggleEditWindow = () => {
    if(isEditWindowOpen){
      setIsEditWindowOpen(false)
    } else {
      setIsEditWindowOpen(true)
    }
  }

  async function handleEdit(comment) {
    const updatedComment = {
      id : comment.id,
      commentText: newCommentText,
      userId: comment.userId,
      postId: comment.postId
    }
    const response = await fetch("https://quacker-api.onrender.com/comments", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedComment)
    })
    const editResponse = await response.json();
    if(editResponse){
      setCommentData((prevState => prevState.map(c => c.id === comment.id ? updatedComment : c)))
      setIsEditWindowOpen(false)
    }
  }
  return ( 
    <>
       { commentData.map(comment => 
        <Card className="mt-2" key={comment.id}>
          <Row className='d-flex'>
            <Col className='d-flex justify-content-start align-items-center py-2' style={{"color": "#777"}}>
              <Image src="https://icon2.cleanpng.com/20180208/zge/kisspng-duck-cartoon-small-yellow-duck-cartoon-vector-5a7cef146cd675.8736460015181371084458.jpg" fluid style={{"width": "10%","borderRadius": "50%" }} className="mx-2"/>
        
              {comment.User ? comment.User.userName : loginUser.userName}

            </Col>
            <Col className='d-flex justify-content-end px-4 py-2'>
              {comment.Post && comment.Post.userId === loginUser.id ? <Button className="mx-2" size="sm" variant='warning'value={comment.id} onClick={() => handleDelete(comment.id)}>
                <RiDeleteBin7Line />
              </Button> : comment.userId === loginUser.id ? <Button className="mx-2" size="sm" variant='warning'value={comment.id} onClick={() => handleDelete(comment.id)}>
                <RiDeleteBin7Line />
              </Button> : null}
              
              {comment.userId === loginUser.id ? <Button variant='warning' size="sm" value={comment.id} onClick={toggleEditWindow}>
                <RiEditLine />
              </Button>: null}
              
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center align-items-center'>
              {comment.commentText}
            </Col>
          </Row>
          {isEditWindowOpen && <div id="content-div-1" className="mt-2 content-div-1" value={comment.id}>
              <Form.Control placeholder="Add a text" onChange={(e) => setNewCommentText(e.target.value)}/>
              <Button value={comment.id}  variant="warning" type="submit" onClick={() => handleEdit(comment)}>Update</Button>
            </div>}
        </Card>
        )}
    </> 
  );
}
 
export default GetComment;