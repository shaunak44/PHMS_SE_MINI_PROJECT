import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link,} from 'react-router-dom';
import {
    Form,
    Button,
    Jumbotron,
    Container,
    Card
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const REDIRECT_PATH_LOGIN = 'hospitaloperator/dashboard'

class HospitalOperatorLogin extends Component{
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
        sessionStorage.setItem('aadhaar_id_hospital', this.state.aadhaar_id)
        console.log(userObject)

        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/operator/hospitallogin`, userObject)
        .then((res) => {
            console.log(res.data.token)

            // Save data to sessionStorage
            sessionStorage.setItem('token', res.data.token);

            // Get saved data from sessionStorage
            let data = sessionStorage.getItem('token');

            console.log(data)

            this.setState({redirect_flag: true}) 
            
        
        }).catch((error) => {
            console.log(error)
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
                    <h2>Login As Hospital Operator</h2>
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
                    </Form>
                </Jumbotron>
                {redirection_html}
            </Container> 
        )
    }
}

class HospitalOperatorDashboard extends Component{
    constructor(props) {
        super(props)
        this.onClickViewData = this.onClickViewData.bind(this)
        this.onClickUpdateData = this.onClickUpdateData.bind(this)
        this.state = {
            operatorInfo: '',
            showViewData: false,
            showUpdateData: false,
        }
        
    }

    onClickViewData(e){
        e.preventDefault();
        if(!this.state.showViewData)
            this.setState({showViewData:true})
        else
            this.setState({showViewData: false})
    }

    onClickUpdateData(e){
        e.preventDefault();
        if(!this.state.showUpdateData)
            this.setState({showUpdateData:true})
        else
            this.setState({showUpdateData:false})
    }

    render(){
        return(
            <Container>
                <Jumbotron>
                    <h2>Hospital Operator Dashboard</h2><hr></hr>
                    <Button block onClick={this.onClickViewData} size='lg' variant='secondary'>View Patient Data</Button>{this.state.showViewData ? <ViewData user={this.state.operatorInfo} />: null}
                    <Button block onClick={this.onClickUpdateData} size='lg' variant='dark'>Update Patient Data</Button>{this.state.showUpdateData ? <UpdateData user={this.state.operatorInfo} />: null}
                    <Button block href="/logout" size='lg' variant='danger'>Logout</Button>{'  '}
                </Jumbotron>
            </Container>
        )
    }
}



export{
    HospitalOperatorLogin,
    HospitalOperatorDashboard,
}

class ViewData extends Component{
    constructor(props) {
        super(props)
        
        this.onClickViewPatientProfile = this.onClickViewPatientProfile.bind(this)
        this.onChangeAadhaarId = this.onChangeAadhaarId.bind(this)
        this.state = {
            patientData:'',
            aadhaar_id:'',
        }
        
    }

    onChangeAadhaarId(e){
        this.setState({aadhaar_id: e.target.value})
    }

    onClickViewPatientProfile(e){
        e.preventDefault()
        console.log(this.state.aadhaar_id)
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/doctor/viewpatient`, {
            headers:{
                'aadhaar_id': this.state.aadhaar_id
            }
        })
        .then(res => {
            this.setState({ patientData: res.data });
            console.log(this.state.patientData)
            this.setState({showData:true})
        })
        .catch(function (error) {
            console.log(error);
        })

    }
    render(){
        return(
            <div>
                <Form.Group>
                    <Form.Label>Aadhar ID</Form.Label>
                    <Form.Control required type="number" placeholder="Enter Aadhar Number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaarId.bind(this)} Min="100000000000"/>
                    <Button variant='primary' onClick={this.onClickViewPatientProfile}>View Patient Profile</Button><br></br>{this.state.patientData ? <DisplayPatientData user={this.state.patientData} />: null}
                </Form.Group>
            </div>
        )
    }
}

class UpdateData extends Component{
    constructor(props) {
        super(props)
        this.onChangeAadhaarId = this.onChangeAadhaarId.bind(this)
        this.onChangeSpo2 = this.onChangeSpo2.bind(this);
        this.onChangeTemperature = this.onChangeTemperature.bind(this);
        this.onChangeLastCheckupDate = this.onChangeLastCheckupDate.bind(this);
        this.onChangePulseRate = this.onChangePulseRate.bind(this);
        this.onChangeComorbidity = this.onChangeComorbidity.bind(this);
        this.onClickUpdateData = this.onClickUpdateData.bind(this)
        this.state = {
            PatientInfo:[],
            aadhaar_id:'',
            spo2: '',
            temperature: '',
            last_checkup_date: '',
            pulse_rate: '',
            comorbidity:'',
        }
        
        
    }

    onChangeAadhaarId(e){
        this.setState({aadhaar_id: e.target.value})
    }

    onChangeSpo2(e){
        this.setState({spo2: e.target.value})
    }
    onChangeTemperature(e){
        this.setState({temperature: e.target.value})
    }
    onChangeLastCheckupDate(e){
        this.setState({last_checkup_date: e.target.value})
    }
    onChangePulseRate(e){
        this.setState({pulse_rate: e.target.value})
    }
    onChangeComorbidity(e){
        this.setState({comorbidity: e.target.value})
    }

    onClickUpdateData(e){
        e.preventDefault();
        const userObject = {
            aadhaar_id: this.state.aadhaar_id,
            spo2: this.state.spo2,
            temperature: this.state.temperature,
            last_checkup_date: this.state.last_checkup_date,
            pulse_rate: this.state.pulse_rate,
            comorbidity:this.state.comorbidity,
        }
        console.log(userObject)
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/updateinfo`, userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            aadhaar_id:'',
            spo2: '',
            temperature: '',
            last_checkup_date: '',
            pulse_rate: '',
            comorbidity:'',
        });
    }
    

    render(){
        
        return(
            <Container>
                <Jumbotron>
                    <Form.Group>
                        <Form.Label>Aadhaar</Form.Label>
                        <Form.Control required type="number" placeholder="Enter Patient Aadhar" value={this.state.aadhaar_id} onChange={this.onChangeAadhaarId.bind(this)} Min="100000000000"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Last Checkup Date</Form.Label>
                        <Form.Control required type="date" placeholder="Enter Last Checkup Date" value={this.state.last_checkup_date} onChange={this.onChangeLastCheckupDate.bind(this)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>SPO2</Form.Label>
                        <Form.Control required type="number" placeholder="Enter SPO2" value={this.state.spo2} onChange={this.onChangeSpo2.bind(this)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Temperature</Form.Label>
                        <Form.Control required type="number" placeholder="Enter Temperature" value={this.state.temperature} onChange={this.onChangeTemperature.bind(this)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Pulse Rate</Form.Label>
                        <Form.Control required type="number" placeholder="Enter Pulse Rate" value={this.state.pulse_rate} onChange={this.onChangePulseRate.bind(this)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Comorbidity</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Temperature" value={this.state.comorbidity} onChange={this.onChangeComorbidity.bind(this)}/>
                    </Form.Group>

                    <Button variant="primary" onClick={this.onClickUpdateData}>
                        Update
                    </Button>


                </Jumbotron>
            </Container>
        )
    }
}

function DisplayPatientData(props) {
    if(props.user[0]){
        return (
            <Card>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <h4>Aadhaar: {props.user[0].aadhaar_id}</h4>
                        <h4>Name: {props.user[0].name}</h4>
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }
    else{
        return(
            <div>
                <h2>
                    Patient Record Not Found.
                </h2>
            </div>
        )
    }
}
