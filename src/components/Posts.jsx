import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const Posts = ({ data,setPostsData }) => {
  const [image, setImage] = useState("");
  const [textContent, setTextContent] = useState("");

  function showContent() {
    document.getElementById("content-div").style.display = "block";
    document.getElementById("show-content-btn").style.display = "none";
  }
 
  //post a quack fetch
  async function handleSubmitPost(e){
    e.preventDefault();
    if(image === "" && textContent === ""){
      alert("you can not post an empty post")
    }else{
      const formData = new FormData();
      formData.append('image', image)
      formData.append('textContent', textContent)
      formData.append('userId', data.data.id)
      const response = await fetch("https://quacker-api.onrender.com/posts", {
        method: "POST",
        
        
        body: formData
        
      });
      const postRes = await response.json();
      if(postRes){
        setPostsData((prevState)=>[postRes,...prevState ])
        setTextContent('')
      }
      document.getElementById("content-div").style.display = "none";
      document.getElementById("show-content-btn").style.display = "block";
    }

  } 

  return ( 
    <Form onSubmit={(e) => handleSubmitPost(e)} >
      <Form.Group controlId="fileName" className="mb-3 d-flex flex-column" style={{"textAlign": "center"}}>
        <Form.Label>Quack Quack <b>{data && data.data.firstName} {data && data.data.lastName}</b> </Form.Label>
        <Button variant="warning" id="show-content-btn" onClick={showContent}>Click here to post a quack</Button>
        <div id="content-div" style={{"display": "none"}}>
          <Form.Control type="file" placeholder="Add image" name="image" onChange={(e) => setImage(e.target.files[0])}/>
          <Form.Control placeholder="Add a text" value={textContent} className="" onChange={(e) => setTextContent(e.target.value)}/>
          <Button variant="warning" type="submit"  >Quack</Button>
        </div>
      </Form.Group>
      
    </Form>
   );
}
 
export default Posts;