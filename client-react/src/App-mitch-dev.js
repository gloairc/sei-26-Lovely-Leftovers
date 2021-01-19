import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import About from "./components/About";
import OneItem from "./components/foodListing/OneItem";
import FoodListing from "./components/foodListing/FoodListing";
import ContributionAdd from "./components/contribution/ContributionAdd";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
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
