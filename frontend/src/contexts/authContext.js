import React, { createContext, useReducer } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const authenticationReducer = (state, action) => {
  switch(action.type){
    case 'LOGIN':
      return {
        email: action.payload,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return {
        email: null,
        isAuthenticated: false,
      }
    default:
      return state
  }
};

export const AuthContextProvider = (props) => {
  const token = sessionStorage.getItem('token');
  const auth = sessionStorage.getItem('isAuthenticated');

  const initialState = {
    email: token? jwtDecode(token).email : null,
    isAuthenticated: auth? auth : false
  };

  const [state, dispatch] = useReducer(authenticationReducer, initialState);

  return(
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}

