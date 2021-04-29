import {React,useState} from "react";
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
  NavDropdown,
  Container,
  Jumbotron,
} from 'react-bootstrap';
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
import {CreateCitizenProfile, ViewCitizenInfo, BookAppointment, CheckAppointment} from "./services/CreateCitizenProfile";
import FaqPage from './services/FAQ'
import { AllCharts} from './services/Analysis'
import {HospitalLocator, PharmacyLocator} from './services/Locator'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#083256',
  headerFontColor: '#fff',
  headerFontSize: '25px',
  botBubbleColor: '#083256',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

var chats = [
  {
    id: '1',
    message: 'How can i Help You?',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'How to get started?', trigger: '3' },
      { value: 2, label: 'What is PHMS?', trigger: '7' },
    ],
  },
  {
    id: '7',
    message: 'Please visit Homepage',
    trigger: '4',
  },
  {
    id: '3',
    message: 'Go to SignUp and Register Yourself, then you can login into your account.',
    trigger: '4',
  },
  {
    id: '4',
    options: [
      { value: 1, label: 'How to Book Appointment?', trigger: '5' },
      { value: 2, label: 'How to Current Health Status?', trigger: '6' },
    ],
  },
  {
    id: '5',
    message: 'Login Yourself. Go to Dashboard and Book Appointment, selecting your preferable slot and date.',
    trigger: '1',
  },
  {
    id: '6',
    message: 'Go to Analysis Tab',
    trigger: '1',
  },
]

function App1() {

  return (
    <Router>
      <div>
     
        <Navbar bg="light" variant="light" style={{borderRadius: 5}}>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src="/1.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          PHMS
          </Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
            
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

            <Nav.Link as={Link} to="/agepie">Analysis</Nav.Link>

            <NavDropdown title="Locator" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/Hospitallocator" >Hospital Locator</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Pharmacylocator" >Pharmacy Locator</NavDropdown.Item>
            </NavDropdown>

          </Nav>
            <Form inline>
            <ThemeProvider theme={theme}>
              <ChatBot 
                steps={chats}
                botAvatar='../chatbot.jpg'
                floating= 'true'
                enableMobileAutoFocus='true'
                headerTitle='PHMS ChatBot'
              />
            </ThemeProvider>
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
            <HomePage />
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
          <Route exact path="/registeoperator">
            <OperatorRegister />
          </Route>
          <Route exact path="/registerdoctor">
            <DoctorRegister />
          </Route>
          <Route exact path="/faq">
            <FaqPage />
          </Route>
          <Route exact path="/agepie">
            <AllCharts/>
          </Route>
          <Route exact path="/hospitallocator">
            <HospitalLocator />
          </Route>
          <Route exact path="/pharmacylocator">
            <PharmacyLocator />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const AppWithRouter = withRouter(App1);
export {AppWithRouter};
export default App1;

class Home extends Component {
  componentDidMount(){
    toast.success("logged out sucessfully");
  }
  render(){
    const divStyle = {
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("homepage.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    }
    const cardStyle = {
      padding: '27px',
      width: '50%',
      backgroundColor:'#073256',
      backgroundColor:'rgba(7, 50, 86, 1)',
      margin: '15px',
      color: 'white',
      borderRadius: '20px'
    }

    return (
      <Container>
          <Jumbotron>
            <center><h2>Public Health Monitoring System</h2></center><hr></hr>
            <div style={divStyle}>
            <div style={cardStyle}>
                <h4 >Why is monitoring needed?</h4><hr style={{backgroundColor:'white'}}></hr>
                <h6 >Serve as an early warning system, identify public health emergencies.</h6>
                <h6>Guide public health policy and strategies.</h6>
                <h6>Document impact of an intervention or progress towards specified public health targets/goals.</h6>
                <h6>Understand/monitor the epidemiology of a condition to set priorities and guide public health policy and strategies.</h6>
            </div>
            <div style={cardStyle}>
                <h4>What is public health monitoring system?</h4><hr style={{backgroundColor:'white'}}></hr>
                <h6>The Public health monitoring system is a surveillance portal.</h6>
                <h6>This enables Government to handle Pandemics better.</h6>
                <h6>This allows the health department to access the situation and decide preference for treatment.</h6>
                <h6>Overall, a comprehensive and inclusive health system can be formed with such assessment.</h6>
            </div>
            </div>
            
          <ToastContainer/>
          </Jumbotron>
      </Container>
    );
  }
}

class HomePage extends Component {
  render(){
    const divStyle = {
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("homepage.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    }
    const cardStyle = {
      padding: '27px',
      width: '50%',
      backgroundColor:'#073256',
      backgroundColor:'rgba(7, 50, 86, 1)',
      margin: '15px',
      color: 'white',
      borderRadius: '20px'
    }

    return (
      <Container>
          <Jumbotron>
            <center><h2>Public Health Monitoring System</h2></center><hr></hr>
            <div style={divStyle}>
            <div style={cardStyle}>
                <h4 >Why is monitoring needed?</h4><hr style={{backgroundColor:'white'}}></hr>
                <h6 >Serve as an early warning system, identify public health emergencies.</h6>
                <h6>Guide public health policy and strategies.</h6>
                <h6>Document impact of an intervention or progress towards specified public health targets/goals.</h6>
                <h6>Understand/monitor the epidemiology of a condition to set priorities and guide public health policy and strategies.</h6>
            </div>
            <div style={cardStyle}>
                <h4>What is public health monitoring system?</h4><hr style={{backgroundColor:'white'}}></hr>
                <h6>The Public health monitoring system is a surveillance portal.</h6>
                <h6>This enables Government to handle Pandemics better.</h6>
                <h6>This allows the health department to access the situation and decide preference for treatment.</h6>
                <h6>Overall, a comprehensive and inclusive health system can be formed with such assessment.</h6>
            </div>
            </div>
            

          </Jumbotron>
      </Container>
    );
  }
}
