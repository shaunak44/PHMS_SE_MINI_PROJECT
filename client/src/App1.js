import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import SignUp from './services/signUp'
import Login from './services/Login'
import UserProfile from './services/UserProfile'
import CreateUserProfile from './services/CreateUserProfile'

import App from "./App";

function App1() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <UserProfile />
          </Route>
          <Route exact path="/createprofile">
            <CreateUserProfile />
          </Route>
          <Route exact path="/logout">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const AppWithRouter = withRouter(App1);
export {AppWithRouter};
export default App1;

function Home() {
  return (<h2>welcome to Home Page</h2>);
}
