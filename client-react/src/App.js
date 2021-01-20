import "./App.css";
<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> 1acd8689e19439408ed663af763c60dbc9fd371e
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
<<<<<<< HEAD
import { useState } from "react";
=======
>>>>>>> 1acd8689e19439408ed663af763c60dbc9fd371e
import SignUp from "./components/account/SignUp";
import Login from "./components/account/Login";
import AccountEdit from "./components/account/AccountEdit";
import Account from "./components/account/Account";
import PasswordEdit from "./components/account/PasswordEdit";
import DeleteAccount from "./components/account/DeleteAccount";
import Logout from "./components/account/Logout";
import NavBar from "./components/NavBar";
import About from "./components/About";
import OneItem from "./components/foodListing/OneItem";
import FoodListing from "./components/foodListing/FoodListing";
import ContributionAdd from "./components/contribution/ContributionAdd";
import { UserContext } from "./components/context/Context";

function App() {
  const userId = sessionStorage.getItem("userId");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
<<<<<<< HEAD
      <NavBar loggedIn={loggedIn} />

=======
      <UserContext.Provider value="hihihi">
        <NavBar />
      </UserContext.Provider>
>>>>>>> 1acd8689e19439408ed663af763c60dbc9fd371e
      <Router>
        <Switch>
          <Route exact path="/user/new">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login setLoggedIn={() => setLoggedIn()} />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/user/:id">
            <Account />
          </Route>
          <Route exact path="/user/:id/edit">
<<<<<<< HEAD
            {userId ? <AccountEdit /> : <Redirect to={"/login"} />}
          </Route>
          <Route exact path="/user/:id/changepassword">
            {userId ? <PasswordEdit /> : <Redirect to={"/login"} />}
          </Route>
          <Route exact path="/user/:id/delete">
            {userId ? <DeleteAccount /> : <Redirect to={"/login"} />}
=======
            {/* {userId ? <AccountEdit /> : <Redirect to={"/login"} />} */}
          </Route>
          <Route exact path="/user/:id/changepassword">
            {/* {userId ? <PasswordEdit /> : <Redirect to={"/login"} />} */}
          </Route>
          <Route exact path="/user/:id/delete">
            {/* {userId ? <DeleteAccount /> : <Redirect to={"/login"} />} */}
>>>>>>> 1acd8689e19439408ed663af763c60dbc9fd371e
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/listings">
            <FoodListing />
          </Route>
          <Route exact path="/listings/:batchId/:foodId">
<<<<<<< HEAD
            {userId ? <OneItem /> : <Redirect to={"/login"} />}
          </Route>
          <Route exact path="/contribute">
            {userId ? <ContributionAdd /> : <Redirect to={"/login"} />}
=======
            {/* {userId ? <OneItem /> : <Redirect to={"/login"} />} */}
          </Route>
          <Route exact path="/contribute">
            {/* {userId ? <ContributionAdd /> : <Redirect to={"/login"} />} */}
>>>>>>> 1acd8689e19439408ed663af763c60dbc9fd371e
          </Route>
          <Route exact path="/">
            <Redirect to={"/about"} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
