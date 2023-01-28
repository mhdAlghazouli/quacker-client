import Layout from "./Layout"
import { UserContext } from '../contexts/user.context';
import { useState, useEffect, useContext } from 'react';

const Header = () => {
  const {user} = useContext(UserContext);
  return ( 
    <>
      <Layout user={user}/>
    </>
   );
}
 
export default Header;