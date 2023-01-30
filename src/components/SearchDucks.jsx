import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./style.css"
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Routes as Switch, Link  } from 'react-router-dom';




const SearchDucks = () => {
  const [filteredData, setFilteredData] = useState([]);

  const [usersData, setUsersData] = useState([]);
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  async function handleClick() {
    const response = await fetch("ttps://quacker-api.onrender.com/users", {
      method: "GET",
    });
    const usersRes = await response.json();
    if(loginUser){

      setUsersData(usersRes.user.filter(user => loginUser && loginUser.id !== user.id))
    }else{
      return ;
    }
   }
   useEffect( () => {
     setTimeout(() => {
      handleClick()
     }, 5000)
   },[])
 
  //users search box filter function
  const handleFilter = (event) => {
    let wordEnter = event.target.value;
    const newFilter = usersData.filter(user => {
      return user.userName.toLowerCase().includes(wordEnter.toLowerCase());
    });
    if(wordEnter === "") {
      setFilteredData([])
    }else{
      setFilteredData(newFilter)
    }
  }
  
  return ( 
    <div >
    <Row className='search-container'>
      <Col>
        <Form className="">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => handleFilter(e)}
            style={{"width":"100%"}}
            />
        </Form>
      </Col>
        {filteredData.length !== 0 && (
      <Col className='searchCol'>
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return <div key={value.userName} className="d-flex">
              
              <Nav.Link className='dataItem' as={Link} to={`/profile/${value.id}`} onClick={() => setFilteredData([])} ><p>{value.userName}</p></Nav.Link>
                
              </div> 
          })}
        
        </div>
      </Col>
        )}
    </Row>

    
    
    
    
  </div>
   );
}
 
export default SearchDucks;