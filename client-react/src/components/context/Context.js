import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext({ loggedin: false });

const UserProvider = () => {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {});

  return (
    <UserContext.Provider value={loggedin}>
      {this.props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
