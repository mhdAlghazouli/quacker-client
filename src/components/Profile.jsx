import { useState, useEffect } from "react";
import Posts from "./Posts";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Post } from "./Post";
import LeftSection from "./LeftSection";
import FollowSection from "./FollowSection";
import FollowedGetPosts from "./FollowedGetPosts";
import CellPhoneProfile from "./CellPhoneProfile";
import { useMediaQuery } from 'react-responsive';

const Profile =  () => {
  const [data, setData]= useState(undefined);
  const [followSectionData, setFollowSectionData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  const isMobile = useMediaQuery({ maxWidth: 767 });
  //post profile fetch
  async function handleSubmit() {
    await fetch("https://quacker-api.onrender.com/profile", {
      method: "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        token : window.localStorage.getItem("jwt")
      })
    }).then(res => res.json())
    .then(userRes => {
      setData(userRes)
    }) 
  }
  // get followed fetch
  async function handleGetFollow() {

    const response = await fetch("https://quacker-api.onrender.com/follows/" + loginUser.id, {
      method: "GET",
    });
    const followRes = await response.json();
    setFollowSectionData(followRes)
   
  }

  // get posts fetch
  async function handleGetPosts() {
    const response = await fetch("https://quacker-api.onrender.com/posts/" + loginUser.id, {
      method: "GET",
    });
    const postsRes = await response.json();
   
    setPostsData(postsRes)
  }
  useEffect(() => {
    handleSubmit()
  }, [])

  useEffect(() => {
    handleGetFollow()

   }, [])

   useEffect(() => {
    if(postsData.length === 0){
      handleGetPosts()  
    }
  },[])

if(!data){
  return null;
}

return ( 
    <div> 
      {isMobile ? (
        
        <CellPhoneProfile />
      ) : <Row className="justify-content-md-between">
      <Col xs lg="3">
        <LeftSection />
      </Col>
      <Col md="6">
        <Posts data={data} setPostsData={setPostsData} />
        {postsData.map(post => (
          
          <Post key={post.id} post={post} handleGetPosts={handleGetPosts}/>
          
        ))}
        <FollowedGetPosts followSectionData={followSectionData}/>
      </Col>
      <Col xs lg="3">
        <FollowSection followSectionData={followSectionData} />
      </Col>
    </Row>
    }
    </div>

  );
}

export default Profile;