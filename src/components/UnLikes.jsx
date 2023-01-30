import { AiOutlineDislike } from "react-icons/ai";
import Button from 'react-bootstrap/Button';

const UnLikes = ({ post, setLikesCount }) => {
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));

  async function handlePostUnLike () {
    let unLike = {
      userId: loginUser.id,
      postId: post.id
    }
    const response = await fetch("ttps://quacker-api.onrender.com/likes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(unLike)
    });
    const unLikeResponse = await response.json();
   if(unLikeResponse !== 0){

     setLikesCount((likesCount) => likesCount-1)
   }else{
     alert("you disliked this post")
    setLikesCount((likesCount) => likesCount)
   }
  }


  return ( 
    <div>
      <Button variant="warning" onClick={handlePostUnLike}>
        <AiOutlineDislike />
      </Button>
    </div>
   );
}
 
export default UnLikes;