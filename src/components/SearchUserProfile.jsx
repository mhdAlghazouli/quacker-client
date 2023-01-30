import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Follow from "./Follow";
import FollowProfilePost from "./FollowProfilePost";
import usePostsFetch from "../helpers/postsFetch";
import Button from 'react-bootstrap/Button';

const SearchUserProfile = () => {
  
  const { id } = useParams()
  const [data, setData] = useState(undefined);
  const { postsData, handleGetPosts } = usePostsFetch("ttps://quacker-api.onrender.com/posts/" + id)
  
  //get user fetch
  async function handleSubmit() {
    const response = await fetch("ttps://quacker-api.onrender.com/profile/" + id, {
      method: "GET",
      
    })
    const userRes = await response.json();
    setData(userRes)
    
  }
  useEffect(() => {
    handleSubmit() 
  }, [id])

  if(!data){
    return null;
  }
  
  return ( 
    <div>
      <Container> 
        <p style={{"textAlign": "center"}}><b>{data.oneUser[0] && data.oneUser[0].userName}</b> Quack</p>
         <Follow className="m-3" data={data}  />
        {postsData && postsData.map(post => (
           <FollowProfilePost key={post.id} post={post} handleGetPosts={handleGetPosts}/>
          
        ))}
      </Container>
    </div>
   );
}
 
export default SearchUserProfile;
