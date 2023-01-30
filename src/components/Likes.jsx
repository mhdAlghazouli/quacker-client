import { AiOutlineLike } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
const Likes = ({ post, setLikesCount }) => {
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));

  async function handlePostLike () {
    let like = {
      userId: loginUser.id,
      postId: post.id
    }
    const response = await fetch("https://quacker-api.onrender.com/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(like)
    });
    const likeResponse = await response.json();
    if(likeResponse.msg === "new like"){
      // alert(`you liked this post`)
      setLikesCount((likesCount)=> likesCount+1)
    
    }else{
      alert(likeResponse.msg)
    }
  }
  
  return ( 
    <div>
      <Button variant="warning" onClick={handlePostLike}>
        <AiOutlineLike />
      </Button>
    </div>
   );
}
 
export default Likes;