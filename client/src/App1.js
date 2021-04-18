import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import Chatbot from './services/Chatbot'
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
import FaqPage from './services/FAQ'
import {CreateCitizenProfile, ViewCitizenInfo, BookAppointment, CheckAppointment} from "./services/CreateCitizenProfile";

function App1() {
  return (
    <Router>
      <div>
     
        <Navbar bg="dark" variant="dark" >
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/signup">Register</Nav.Link>
            
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login" >Citizen</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/logindoctor" >Doctor</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/loginpharmacyoperator" >Pharmacy Operator</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="loginhospitaloperator">Hospital Operator</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Register" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/registerhospital" >Hospital</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registerpharmacy" >Pharmacy</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registeroperator" >Operator</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registerdoctor">Doctor</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
          </Nav>

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <br />

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
            <Chatbot />
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
          <Route exact path="/citizen/bookappointment">
            <BookAppointment />
          </Route>
          <Route exact path="/citizen/checkappointment">
            <CheckAppointment />
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
          <Route exact path="/faq">
            <FaqPage />
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

  return (
    <div>
    </div>
  );
}
