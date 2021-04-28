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
  Modal,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Container,
  Jumbotron,
  Card,
  CardDeck
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
import {CreateCitizenProfile, ViewCitizenInfo, BookAppointment, CheckAppointment} from "./services/CreateCitizenProfile";
import FaqPage from './services/FAQ'
import {AgePie, BmiPie, BedsBar, CheckupPie} from './services/Analysis'
import {HospitalLocator, PharmacyLocator} from './services/Locator'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';


function App1() {
  const [show, setShow] = useState(false);  
  
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  
  function talk(event){
    var know = {
        "hello": "Hello I Am A Simple Chatbot. I Am Here To Help You!",
        "hi": "Hii, Tell me something about yourself ??",
        "how are you?": "I am great !!",
        "life is like hell": "Are you in TY COMP at COEP ?",
        "tell me a random fact": "Life would have been much easy, if there was no Abhijit Sir.",
        "bye": "Bye ! Have A Great Day !!"
    }
    console.log(event);
    if(event.keyCode === 13){
        
        var user = document.getElementById("userbox").value
        document.getElementById("userbox").value = ""
        document.getElementById("chatLog").innerHTML += user + "<br>"
        
        if(user in know){
            document.getElementById("chatLog").innerHTML += "&nbsp;" + know[user] + "<br><br>"
        }
        else{
            document.getElementById("chatLog").innerHTML += "&nbsp;" + "Sorry I Can't Understand. <br><br>"
        }
    }
  };
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

            {/* <Nav.Link as={Link} to="/analysis">Analysis</Nav.Link> */}
            <NavDropdown title="Analysis" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/agepie" >Age</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/bmipie" >BMI</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/bedsbar" >Beds</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/checkuppie" >Last Checkup</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Locator" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/Hospitallocator" >Hospital Locator</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Pharmacylocator" >Pharmacy Locator</NavDropdown.Item>
            </NavDropdown>

          </Nav>
            <Form inline>
              <Container>
                <Button variant="warning" onClick={handleShow}>
                  Chatbot
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chatbot - Ask Me Queries !</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h6 id="chatLog"></h6>
                      <Form.Group>
                          <Form.Control id="userbox" type="text" onKeyDown={talk} placeholder="Ask Your Queries" />
                      </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                  </Modal.Footer>
                </Modal>
              </Container>
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
          <Route exact path="/registeroperator">
            <OperatorRegister />
          </Route>
          <Route exact path="/registerdoctor">
            <DoctorRegister />
          </Route>
          <Route exact path="/faq">
            <FaqPage />
          </Route>
          <Route exact path="/agepie">
            <AgePie />
          </Route>
          <Route exact path="/bmipie">
            <BmiPie />
          </Route>
          <Route exact path="/bedsbar">
            <BedsBar />
          </Route>
          <Route exact path="/checkuppie">
            <CheckupPie />
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
    return (
      <Container>
        <Jumbotron>
          <h2>Home Page</h2><hr></hr>
          <Chatbot></Chatbot>
        </Jumbotron>
        <ToastContainer />
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
