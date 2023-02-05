import './App.css';
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes as Switch  } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SearchUserProfile from './components/SearchUserProfile';
import EditProfile from './components/EditProfile';
import MarketPlace from './components/MarketPlace';
import MarketPlaceAddProduct from './components/MarketPlaceAddProduct';
import MarketPlaceAllProducts from './components/MarketPlaceAllProduct';
import MarketPlaceMyProducts from './components/MarketPlaceMyProducts';
import CellPhoneFollowing from './components/CellPhoneFollowing';
import { UserContextProvider } from './contexts/user.context';


 function App() {
  
  
  return (
    <div className="App">
      
      <UserContextProvider>
          <Header  />
            <Switch>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/profile' element={<Profile />} />
              <Route exact path='/profile/:id' element={<SearchUserProfile />} />
              <Route path="/editProfile" element={<EditProfile />}/>
              <Route path="/MarketPlace" element={<MarketPlace />}/>
              <Route path="/MarketPlaceAddProduct" element={<MarketPlaceAddProduct />}/>
              <Route path="/MarketPlaceAllProducts" element={<MarketPlaceAllProducts />}/>
              <Route path="/MarketPlaceMyProducts" element={<MarketPlaceMyProducts />}/>
              <Route path="/following" element={<CellPhoneFollowing />} />
            </Switch>   
        </UserContextProvider>
    </div>
  );
}

export default App;
