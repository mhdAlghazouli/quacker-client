import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Comment = ({ post, setIsCommentsWindowOpen, setCommentsCount, setCommentData }) => {
  const [commentText, setCommentText] = useState("");
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  const postId = post.id;

  async function handlePostComment () {
    const comment =  {
      commentText: commentText,
      userId: loginUser.id,
      postId: postId
    }
    const response = await fetch("ttps://quacker-api.onrender.com/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    });
    const commentResponse = await response.json();
    if(commentResponse){
      setCommentText("")
      setIsCommentsWindowOpen(false)
      setCommentsCount((commentCount) => commentCount + 1)
      setCommentData((prevState)=> [ ...prevState || [], commentResponse ])
    }
  }


  return ( 
   <div>
      <Form.Group className="d-flex justify-content-start">        
        <Form.Control placeholder="Add a comment" value={commentText}  onChange={(e) => setCommentText(e.target.value)} />
        <Button variant="warning" type="submit" onClick={handlePostComment}>Comment Quack</Button>   
      </Form.Group>
   </div>
  )
}
 
export default Comment;