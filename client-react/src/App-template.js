// just a template, not complete

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>

        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp>
              <AccountDetailsForm />
            </SignUp>
          </Route>
          <Route exact path="/listing">
            <Listing>
              <ItemCard />
              <ItemCard />
              <ItemCard />
            </Listing>
          </Route>
          <Route path="/listing/:id">
            <OneItem>
              <ItemDetailsTemplate />
            </OneItem>
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Route path="/account/edit">
            <AccountEdit>
              <AccountDetailsForm />
            </AccountEdit>
          </Route>
          <Route path="/mycontributions">
            <MyContributions />
          </Route>
          <Route path="/mycontributions/:batchId">
            <MyFood />
            {/* lists food according to batchID */}
          </Route>
          <Route path="/contribute">
            <Contribute>
              <ItemDetailsTemplate />
            </Contribute>
          </Route>
          <Route path="/myfood">
            <MyFood />
            {/* lists food for recipient */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
