import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const userContextValue = {
    username,
    updateUsername,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};