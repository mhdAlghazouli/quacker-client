import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [un, setUn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [signupErrorsFn, setSignupErrorsFn] = useState("")
  const [signupErrorsLn, setSignupErrorsLn] = useState("")
  const [signupErrorsUn, setSignupErrorsUn] = useState("")
  const [signupErrorsEmail, setSignupErrorsEmail] = useState("")
  const [signupErrorsPassword, setSignupErrorsPassword] = useState("");

  const navigate = useNavigate();

  
  async function signupHandleSubmit(e) {
    e.preventDefault();
    const user = {
      firstName: fn,
      lastName: ln,
      userName: un,
      email: email,
      password: password
    }
    
    //error handler
    
    if(user.firstName.length < 3){
        setSignupErrorsFn("first name should be at least 4 letters")
    }else if(user.lastName.length < 3){
      setSignupErrorsLn("last name should be at least 4 letters")
    }else if(user.userName.length <= 3){
      setSignupErrorsUn("username should be at least 4 letters")
    }else if(user.userName === user.firstName){
      setSignupErrorsUn("username should be different than first name")
    }
    else{
      
      const response = await fetch("https://quacker-api.onrender.com/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
  
      });
      const resUser = await response.json();
      if(resUser.errors){
          setSignupErrorsUn(resUser.errors.userName)
          setSignupErrorsEmail(resUser.errors.email)
        
      }else{
        navigate('/')
        
      }
      
      
    }
    
  }



  return ( 
    <Container className="d-flex justify-content-center ">

          <Card style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}} className="text-center">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter first name" 
                  onChange={(e) => setFn(e.target.value)}
                  />
                  {fn === "" || fn.length >= 4 ? "" : <p className="text-warning fs-6">
                      {signupErrorsFn}
                    </p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter last name" 
                  onChange={(e) => setLn(e.target.value)}
                  />
                  {ln === "" || ln.length >= 4 ? "" : <p className="text-warning fs-6">
                      {signupErrorsLn}
                    </p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" 
                  onChange={(e) => setUn(e.target.value)}
                  />
                  {un === ""  ? "" : <p className="text-warning fs-6">
                      {signupErrorsUn}
                    </p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" 
                  onChange={(e) => setEmail(e.target.value)}
                  />
                  {email === ""  ? "" : <p className="text-warning fs-6">
                      {signupErrorsEmail}
                    </p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="text" placeholder="Enter password" 
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="warning" type="submit" onClick={(e) => signupHandleSubmit(e)}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
          
       

    </Container>
   );
}
 
export default Signup;
