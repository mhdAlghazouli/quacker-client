import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import CellPhone from './CellPhone';

const EditProfile = () => {
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  const [updatedFn, setUpdatedFn] = useState(loginUser.firstName);
  const [updatedLn, setUpdatedLn] = useState(loginUser.lastName);
  const [updatedUn, setUpdatedUn] = useState(loginUser.userName);
  const [updatedEmail, setUpdatedEmail] = useState(loginUser.email);

  const [signupErrorsFn, setSignupErrorsFn] = useState("")
  const [signupErrorsLn, setSignupErrorsLn] = useState("")
  const [signupErrorsUn, setSignupErrorsUn] = useState("")

  async function updatedProfile(e) {
    e.preventDefault();
    let updatedProfile = {
      id: loginUser.id,
      firstName: updatedFn,
      lastName: updatedLn,
      userName: updatedUn,
      email: updatedEmail
    }
    if(updatedProfile.firstName.length < 3){
      setSignupErrorsFn("first name should be at least 4 letters")
  }else if(updatedProfile.lastName.length < 3){
    setSignupErrorsLn("last name should be at least 4 letters")
  }else if(updatedProfile.userName.length <= 3){
    setSignupErrorsUn("username should be at least 4 letters")
  }else if(updatedProfile.userName === updatedProfile.firstName){
    setSignupErrorsUn("username should be different than first name")
  }else{
    const response = await fetch ("https://quacker-api.onrender.com/profile/" + loginUser.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProfile)
    })
    const updatedProfileRes = await response.json()
    localStorage.setItem("UserContext", JSON.stringify(updatedProfile));
    navigate("/profile")
    window.location.reload();

  }
  }

  return ( 
    <div>
        {isMobile ?
        <div>
          <Container className="d-flex justify-content-center ">

            <Card style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}} className="text-center">
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder={updatedFn} onChange={(e) => setUpdatedFn(e.target.value)}/>
                      {updatedFn.length >= 4 ? "" : <p className="text-warning fs-6">
                        {signupErrorsFn}
                      </p>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder={updatedLn} onChange={(e) => setUpdatedLn(e.target.value)}/>
                    {updatedLn.length >= 4 ? "" : <p className="text-warning fs-6">
                        {signupErrorsLn}
                      </p>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder={updatedUn} onChange={(e) => setUpdatedUn(e.target.value)}/>
                    {updatedUn === ""  ? "" : <p className="text-warning fs-6">
                        {signupErrorsUn}
                      </p>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} required/>
                  </Form.Group>

                  <Button variant="warning" type="submit" onClick={(e) => updatedProfile(e)}>
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>

          </Container>
          <CellPhone />
        </div>
    :  
    <Container className="d-flex justify-content-center ">

      <Card style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}} className="text-center">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder={updatedFn} onChange={(e) => setUpdatedFn(e.target.value)}/>
              {updatedFn.length >= 4 ? "" : <p className="text-warning fs-6">
                  {signupErrorsFn}
                </p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder={updatedLn} onChange={(e) => setUpdatedLn(e.target.value)}/>
              {updatedLn.length >= 4 ? "" : <p className="text-warning fs-6">
                  {signupErrorsLn}
                </p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder={updatedUn} onChange={(e) => setUpdatedUn(e.target.value)}/>
              {updatedUn === ""  ? "" : <p className="text-warning fs-6">
                  {signupErrorsUn}
                </p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} required/>
            </Form.Group>

            <Button variant="warning" type="submit" onClick={(e) => updatedProfile(e)}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </Container>
}
     
    </div>
   );
}
 
export default EditProfile;