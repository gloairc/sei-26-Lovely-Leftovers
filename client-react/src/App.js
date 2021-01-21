import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
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
import ContributionTable from "./components/contribution/ContributionTable";
import ContributionView from "./components/contribution/ContributionView";

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [userType, setUserType] = useState(sessionStorage.getItem("userType"))
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"))

  useEffect(() => {
    console.log('using effect')
    setUserType(sessionStorage.getItem("userType"))
    setUserId(sessionStorage.getItem("userId"))
  }, [loggedIn])

  return (
    <div>
      <NavBar loggedIn={loggedIn} />
      <Router>
        <Switch>
          <Route exact path="/user/new">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/logout">
            <Logout setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
          </Route>
          <Route exact path="/user/:id">
            {userId ? <Account /> : <Redirect to={'/login'} />}
            {/* <Account /> */}
          </Route>
          <Route exact path="/user/:id/edit">
            <AccountEdit />
          </Route>
          <Route exact path="/user/:id/changepassword">
            {userId ? <PasswordEdit /> : <Redirect to={"/login"} />}
          </Route>
          <Route exact path="/user/:id/delete">
            {userId ? <DeleteAccount /> : <Redirect to={"/login"} />}
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/listings">
            <FoodListing />
          </Route>
          <Route exact path="/listings/:batchId/:foodId">
            {userId ? <OneItem /> : <Redirect to={"/login"} />}
          </Route>
          <Route exact path="/contribute">
            {userId ? <ContributionAdd /> : <Redirect to={"/login"} />}
          </Route>
          <Route exact path="/">
            <Redirect to={"/about"} />
          </Route>
          <Route exact path="/contributions">
            {userId ? <ContributionTable /> : <Redirect to={"/login"} />}
          </Route>
          <Route path="/contributions/:batchId">
            {userId ? <ContributionView /> : <Redirect to={"/login"} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
