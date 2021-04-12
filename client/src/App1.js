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
import {DoctorLogin, DoctorDashboard} from './services/LoginDoctor'
import {PharmacyOperatorLogin, PharmacyOperatorDashboard} from './services/LoginPharmacyOperator'
import {HospitalOperatorLogin, HospitalOperatorDashboard} from './services/LoginHospitalOperator'
import CitizenProfile from './services/CitizenProfile'
import HospitalRegister from './services/RegisterHospital'
import PharmacyRegister from './services/RegisterPharmacy'
import OperatorRegister from './services/RegisterOperator'
import DoctorRegister from './services/RegisterDoctor'
import {CreateCitizenProfile, ViewCitizenInfo} from "./services/CreateCitizenProfile";

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
            <li>
              <Link to="/logindoctor">Doctor Login</Link>
            </li>
            <li>
              <Link to="/loginpharmacyoperator">Pharmacy operator Login</Link>
            </li>
            <li>
              <Link to="/loginhospitaloperator">Hospital operator Login</Link>
            </li>
            <li>
              <Link to="/registerhospital">Register as hospital</Link>
            </li>
            <li>
              <Link to="/registerpharmacy">Register as pharmacy</Link>
            </li>
            <li>
              <Link to="/registeroperator">Register as operator</Link>
            </li>
            <li>
              <Link to="/registerdoctor">Register as doctor</Link>
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
          <Route exact path="/logindoctor">
            <DoctorLogin />
          </Route>
          <Route exact path="/loginpharmacyoperator">
            <PharmacyOperatorLogin />
          </Route>
          <Route exact path="/loginHospitaloperator">
            <HospitalOperatorLogin />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/citizen/profile">
            <CitizenProfile />
          </Route>
          <Route exact path="/doctor/dashboard">
            <DoctorDashboard />
          </Route>
          <Route exact path="/pharmacyoperator/dashboard">
            <PharmacyOperatorDashboard />
          </Route>
          <Route exact path="/hospitaloperator/dashboard">
            <HospitalOperatorDashboard />
          </Route>
          <Route exact path="/citizen/createprofile">
            <CreateCitizenProfile />
          </Route>
          <Route exact path="/logout">
            <Home />
          </Route>
          <Route exact path="/citizen/viewprofile">
            <ViewCitizenInfo />
          </Route>
          <Route exact path="/registerhospital">
            <HospitalRegister />
          </Route>
          <Route exact path="/registerpharmacy">
            <PharmacyRegister />
          </Route>
          <Route exact path="/registeroperator">
            <OperatorRegister />
          </Route>
          <Route exact path="/registerdoctor">
            <DoctorRegister />
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
