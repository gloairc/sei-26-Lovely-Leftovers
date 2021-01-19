import './App.css';
import SignUp from './components/account/SignUp'
import Login from './components/account/Login';
import AccountEdit from './components/account/AccountEdit'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <h1>Log in success</h1>
        </Route>
        <Route exact path="/users/new">
          <SignUp />
        </Route>
        <Route exact path="/users/login">
          <Login />
        </Route>
        <Route exact path="/users/:id/edit">
          <AccountEdit />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
