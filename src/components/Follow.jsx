import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

const Follow = ({ data }) => {

  let  id  = data.id
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFollow, setIsFollow] = useState(false)
  const navigate = useNavigate();
  
    async function handleFollow() {
      setIsFollow(true)
      let follow = {
        followerId : loginUser.id,
        followedId: id
      }
     
        const response = await fetch("ttps://quacker-api.onrender.com/follows", {
          
          method: "POST",
          headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(follow)
        });
        const followRes = await response.json();
        if(followRes.msg === "new connection"){
          
          alert(`${loginUser.userName} now following ${id}`)
          navigate('/profile')
          
        }else{
          alert(`${followRes.msg}.`)
        }
        
      }
      // useEffect(() => {
      //   if(data.oneUser[0].Follows.length !== 0){
      //     setIsDisabled(true)
      //   }else{
      //     setIsDisabled(false)
      //   }

      // },[])
      
      async function handleUnFollow() {
        let unFollow = {
          followerId : loginUser.id,
          followedId: id,
        }
        const response = await fetch("ttps://quacker-api.onrender.com/follows", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(unFollow)
        });
        await response.json()
        alert("you unfollowed this user")
        navigate('/profile')
      }
 

 
  return ( 
    <div className="d-flex justify-content-center ">
      <div className="mx-2">
       <Button id="followBtn" variant="warning" onClick={handleFollow} disabled={isDisabled} >Follow</Button>
      </div>
      <div>
       <Button id="followBtn" variant="warning" onClick={handleUnFollow} disabled={isDisabled}>unFollow</Button>   
      </div>
         
        
       
      
    </div>
   );
}
 
export default Follow;