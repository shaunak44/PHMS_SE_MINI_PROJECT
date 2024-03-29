import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,} from 'react-router-dom';
import {
    Form,
    Button,
    Jumbotron,
    Container,
    Card
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

const REDIRECT_PATH_LOGIN = 'doctor/dashboard'

class DoctorLogin extends Component{
    constructor(props) {
        super(props)

        this.onChangeAadhaar = this.onChangeAadhaar.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            aadhaar_id: '',
            password: '',
            redirect_flag: false
        }


    }

    onChangeAadhaar(e){
        this.setState({aadhaar_id: e.target.value})
    }

    onChangePassword(e){
        this.setState({password: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            aadhaar_id : this.state.aadhaar_id,
            password : this.state.password
        };
        
        sessionStorage.setItem('doctor_aadhaar_id', this.state.aadhaar_id);
        console.log(userObject)

        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/doctor/login`, userObject)
        .then((res) => {
            // Save data to sessionStorage
            this.setState({redirect_flag: true}) 
        }).catch((error) => {
            console.log(error)
            toast.error('Invalid creds')
        });

        this.setState({ aadhaar_id: '', password: '', redirect_flag: false});

    }

   
    render(){
        var isRedirect = this.state.redirect_flag;
        let redirection_html = '';
        if(isRedirect){
            redirection_html = <Redirect to={REDIRECT_PATH_LOGIN}/>
        }
        else{
            redirection_html = "";
        }
        return(
            <Container>
                <Jumbotron>
                    <h2>Login As Doctor</h2>
                    <Form onSubmit={this.onSubmit.bind(this)}>

                        <Form.Group>
                            <Form.Label>Aadhar ID</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Aadhar Number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaar.bind(this)} Min="100000000000" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required onChange={this.onChangePassword.bind(this)} value={this.state.password} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <ToastContainer/>
                    </Form>
                </Jumbotron>
                {redirection_html}
            </Container> 
        )
    }
}

class DoctorDashboard extends Component{
    constructor(props) {
        super(props);
        this.onClickViewPatientProfile = this.onClickViewPatientProfile.bind(this);
        this.onClickViewAppointment = this.onClickViewAppointment.bind(this);
        this.onChangeAadhaar = this.onChangeAadhaar.bind(this);
        this.state = {
            aadhaar_id:'',
            showData: false,
            doctor_id:'',
            showAppointment: false
        }
        this.state = {
            usersCollection:'',
            doctorCollection:'',
            appointmentCollection: '',
        }
    }


    onClickViewPatientProfile(e) {
        e.preventDefault();
        this.setState({showData:false})
        console.log(this.state.aadhaar_id)
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/doctor/viewpatient`, {
            headers:{
                'aadhaar_id': this.state.aadhaar_id
            }
        })
        .then(res => {
            this.setState({ usersCollection: res.data });
            console.log(this.state.usersCollection)
            this.setState({showData:true})
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    

    async onClickViewAppointment(e) {
        e.preventDefault();
        let doctor_aadhaar_id = sessionStorage.getItem('doctor_aadhaar_id')
        console.log(doctor_aadhaar_id);
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/doctor/doctorInfo`, {
            headers:{
                'aadhaar_id': doctor_aadhaar_id,
            }
        })
        .then(res => {
            this.setState({doctorCollection: res.data})
            this.setState({doctor_id: this.state.doctorCollection[0].doctor_id})
        })
        .catch(function (error) {
            console.log(error);
        })

        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/appointment/doctorappointmentinfo`, {
            headers:{
                'doctor_id': this.state.doctor_id
            }
        })
        .then(res => {
            this.setState({ appointmentCollection: res.data });
            console.log(this.state.appointmentCollection)
            this.setState({showAppointment:true})
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    
    onChangeAadhaar(e){
        this.setState({aadhaar_id: e.target.value})
    }   
    render(){
        return(
            <Container>
                <Container>
                    <Jumbotron>
                        <h3>Doctor Dashboard</h3> <hr></hr>
                        <Form.Group>
                            <Form.Label>Enter Aadhaar Id of Patient</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Aadhaar Id of Patient" value={this.state.aadhaar_id} onChange={this.onChangeAadhaar.bind(this)}/>
                        </Form.Group>
                        <Button block onClick={this.onClickViewPatientProfile} size='lg' variant='info'>View Patient Profile</Button>{this.state.showData ? <DisplayPatientData user={this.state.usersCollection} />: null}
                        </Jumbotron>
                </Container>
                <Container>
                <Jumbotron>
                    <Button block onClick={this.onClickViewAppointment} size='lg' variant='dark'>Appointment Details</Button>{this.state.showAppointment? <DisplayAppointments user={this.state.appointmentCollection}/>: null}
                    <Button block href="/logout" size='lg' variant='danger'>Logout</Button>{'  '}
                </Jumbotron>
                <ToastContainer/>
                </Container>
            </Container>
        )
    }
}


export{
    DoctorLogin,
    DoctorDashboard,
}

function DisplayPatientData(props) {
    if(props.user[0]){
        console.log(props);
        
        return (
            <Card>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <h4>Aadhaar: {props.user[0].aadhaar_id}</h4>
                        <h4>Name: {props.user[0].name}</h4>
                        <h4>Age: {props.user[0].age}</h4>
                        <h4>BMI: {props.user[0].bmi}</h4>
                        <h4>Last checkup date: {props.user[0].last_checkup_date ? <>{props.user[0].last_checkup_date.substring(0, 10)}</>: null}</h4>
                        <h4>Spo2: {props.user[0].spo2}</h4>
                        <h4>Comorbidity: {props.user[0].comorbidity}</h4>
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }
    else{
        return(
            <Container>
                <Jumbotron>
                    <h2>Nothing To Show</h2>
                </Jumbotron>
            </Container>
        )
    }
}

class DisplayAppointments extends Component {
    constructor(props) {
        super(props);
        this.onClickConfirm = this.onClickConfirm.bind(this);
    }


    onClickConfirm(i, e){
        e.preventDefault()
        console.log(i)
        const userObject = {
            aadhaar_id : i.aadhaar_id,
            doctor_id : i.doctor_id,
            slot: i.slot,
        };
        
        console.log(userObject)

        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/appointment/confirmstatus`, userObject)
        .then((res) => {
            console.log(res.data);

            var templateParams = {
                to_email: res.data.user[0].email_id,
                to_name: res.data.user[0].name,
                message:'Your appointment is confirmed.'
            };
            emailjs.send('service_nsema9w', 'template_a1xy8li', templateParams, 'user_vHmTSugteuDoVDXBeI5sc')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                toast.success('Mail sent to Patient')
            }, function(error) {
                console.log('FAILED...', error);
            });
        
        }).catch((error) => {
            console.log(error)
        });

    }

    render(){
        if(this.props.user.length === 0){
            return(
                <Container>
                    <Jumbotron>
                        <h3>No appointements Pending Or Scheduled.</h3>
                    </Jumbotron>
                </Container>
            )
        }
        const listItems = this.props.user.map((i) => 
        <Card style={{ width: '18rem'}}>
            <Card.Body>
                <Card.Title>{i.slot}</Card.Title>
                <Card.Text> {i.aadhaar_id} </Card.Text>
                {i.status ? <Button variant='warning'>Confirmed</Button>: <Button variant="success" onClick={(e) => this.onClickConfirm(i, e)}>Confirm Appointment </Button>}
            </Card.Body>
        </Card>
            );
        return(
            <div>
                {listItems}
            </div>
        )
    }
}