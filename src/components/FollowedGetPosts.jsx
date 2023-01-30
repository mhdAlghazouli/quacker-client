import { useState, useEffect } from "react";
import FollowPost from "./FollowPost";




const FollowedGetPosts = ({ followSectionData }) => {
  const [filteredFollowerData, setFilteredFollowerData] = useState([]);
  const followerUser = JSON.parse(window.localStorage.getItem("UserContext"));

  useEffect(() => {
    setFilteredFollowerData(followSectionData.filter((follower) => followerUser.id === follower.followerId ))
  },[followSectionData]);
 

  return ( 
    <div >
      {filteredFollowerData.map(followedData => followedData.followed.Posts.length === 0 ? null : 
            followedData.followed.Posts.map(post =>
            <FollowPost key={post.id} post={post}/>)
        )}
   
    </div>
   );
}
 
export default FollowedGetPosts;