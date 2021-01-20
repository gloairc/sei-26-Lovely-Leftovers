import './App.css';
import { createContext, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from './components/account/SignUp';
import Login from './components/account/Login';
import AccountEdit from './components/account/AccountEdit';
import Account from './components/account/Account';
import PasswordEdit from './components/account/PasswordEdit';
import DeleteAccount from './components/account/DeleteAccount';
import Logout from './components/account/Logout';
import NavBar from "./components/NavBar";
import About from "./components/About";
import OneItem from "./components/foodListing/OneItem";
import FoodListing from "./components/foodListing/FoodListing";
import ContributionAdd from "./components/contribution/ContributionAdd";

function App() {
  const [userInfo, setUserInfo] = useState({ _id: '60069e52a70d026203aea575' })

  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/home">
            <h1>Log in success</h1>
          </Route>
          <Route exact path="/user/new">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login user={userInfo} updateUser={setUserInfo} />
          </Route>
          <Route exact path="/logout">
            <Logout user={userInfo} updateUser={setUserInfo} />
          </Route>
          <Route exact path="/user/:id">
            {userInfo ? <Account user={userInfo} /> : <h1>Please log in</h1>}
          </Route>
          <Route exact path="/user/:id/edit">
            {userInfo ? <AccountEdit user={userInfo} /> : <h1>Please log in</h1>}
          </Route>
          <Route exact path="/user/:id/changepassword">
            {userInfo ? <PasswordEdit user={userInfo} /> : <h1>Please log in</h1>}
          </Route>
          <Route exact path="/user/:id/delete">
            <DeleteAccount user={userInfo} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/listings">
            <FoodListing />
          </Route>
          <Route path="/listings/:batchId/:foodId">
            <OneItem />
          </Route>
          <Route path="/contribute">
            <ContributionAdd />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
