import './App.css';
import AccountDetailsForm from './AccountDetailsForm'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/users/new">
          <AccountDetailsForm />
        </Route>
        <Route exact path="/users/:id/edit">
          <AccountDetailsForm />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
