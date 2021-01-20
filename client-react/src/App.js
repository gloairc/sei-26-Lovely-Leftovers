import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import About from "./components/About";
import OneItem from "./components/foodListing/OneItem";
import FoodListing from "./components/foodListing/FoodListing";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="/listings">
            <FoodListing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
