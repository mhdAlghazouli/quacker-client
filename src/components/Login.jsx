import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user.context';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("")
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let user = {
      id: id,
      userName: userName,
      password: password
    }

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    const userRes = await response.json();
    if(userRes.status === "ok") {
      setUser({
        id: userRes.data.id, 
        firstName: userRes.data.firstName, 
        lastName: userRes.data.lastName, 
        userName: userRes.data.userName,
        email: userRes.data.email,
      })
      
      alert("login successful");
      window.localStorage.setItem("jwt", userRes.data.jwt)
      navigate('/profile')
    }
  }
  
  return ( 
    
      
      <Container className="d-flex justify-content-center ">
        <Card style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}} className="text-center">
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUserName(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>

              <Button variant="warning" type="submit" onClick={(e) => handleSubmit(e)}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    
   );
}
 
export default Login;