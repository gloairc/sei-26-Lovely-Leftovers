import { createContext } from 'react'

const UserContext = createContext({
    userInfo: "guest",
    updateUser: () => { },
});

// const AuthStateContext = createContext();
// const AuthDispatchContext = createContext();

// // state management - AuthProvider is available to any children of the AuthProvider component
// const AuthProvider = ({ children }) => {
//     const [user, dispatch] = useReducer(Reducer.AuthReducer, Reducer.initialState);

//     return (
//         <AuthStateContext.Provider value={user}>
//             <AuthDispatchContext.Provider value={dispatch}>
//                 {children}
//             </AuthDispatchContext.Provider>
//         </AuthStateContext.Provider>
//     );
// };

// function useAuthState() {
//     const context = useContext(AuthStateContext);
//     if (context === undefined) {
//         throw new Error("useAuthState must be used within a AuthProvider");
//     }

//     return context;
// }

// function useAuthDispatch() {
//     const context = useContext(AuthDispatchContext);
//     if (context === undefined) {
//         throw new Error("useAuthDispatch must be used within a AuthProvider");
//     }

//     return context;
// }

// const Context = { AuthProvider, useAuthState, useAuthDispatch }
// export default Context;

export default UserContext;