import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user.context';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let user = {
      id: id,
      userName: userName,
      password: password
    }

    const response = await fetch("https://quacker-api.onrender.com/users", {
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
      window.localStorage.setItem("jwt", userRes.data.jwt)
      setLoading(false);
      navigate('/profile')
    }else{
      if(userRes.error === "incorrect password"){
        setPasswordError(userRes.error)
        setUserNameError("")
      }else{
        setUserNameError("this username is not registered")
        setPasswordError("")
      }
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
                <p className="text-warning">{userNameError && userNameError}</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <p className="text-warning">{passwordError && passwordError}</p>
              </Form.Group>

              <Button variant="warning" type="submit" onClick={(e) => handleSubmit(e)}>
              {loading ? (
                <Spinner animation="border" variant="secondary" size="sm" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : <>Login</>}
              </Button>
            </Form>
            
          </Card.Body>
        </Card>
      </Container>

    
   );
}
 
export default Login;