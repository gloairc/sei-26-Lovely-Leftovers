import React, { createContext, useContext, useReducer } from "react";

const UserContext = createContext();
const DispatchContext = createContext();

const countLog = (state, action) => {
  switch (action.type) {
    case "logged in": {
      return { status: (state.status = true) };
    }
    case "logged out": {
      return { status: (state.status = false) };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const StatusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countLog, { status: false });
  return (
    <UserContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("hehe");
  }
  console.log("context", context);
  return context;
};

const useDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("oops");
  }
  return context;
};

export { StatusProvider, useUser, useDispatch };
