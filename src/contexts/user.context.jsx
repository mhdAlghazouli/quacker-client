// // {
// //   id: 
// //   userName:
// //   firstName:
// //   lastName:
// // }
import { createContext, useState, useEffect } from 'react';

const initialState = {
  user: undefined,
  setUser: ()=>{}
}

export const UserContext = createContext(initialState);

export const UserContextProvider = ({children}) => {
  initialState.setUser = (user) =>
      setState((prevState) => {
         window.localStorage.setItem("UserContext", JSON.stringify(user));
         return user
      });
  
	const [state, setState] = useState(initialState);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}




