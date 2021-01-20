import React, { createContext, useEffect, useReducer } from "react";

const logged = false;
export const UserContext = createContext(logged);

const UserProvider = () => {
  const [state, dispatch] = useReducer(reducer, logged);

  useEffect(() => {});

  return (
    <UserContext.Provider value={loggedin}>
      {this.props.children}
    </UserContext.Provider>
  );
};

const reducer = (x, action) => {};

export default UserProvider;
