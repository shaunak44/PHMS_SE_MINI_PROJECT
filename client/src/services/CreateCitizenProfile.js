import React, { Component } from 'react';
import axios from 'axios';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import {
    Form,
    Button,
    Jumbotron,
    Container,
    Card,
    CardDeck
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
class CreateCitizenProfile extends Component{
    constructor(props) {
        super(props)

        this.state = {
            usersCollection: []
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeSpo2 = this.onChangeSpo2.bind(this);
        this.onChangeTemperature = this.onChangeTemperature.bind(this);
        this.onChangeLastCheckupDate = this.onChangeLastCheckupDate.bind(this);
        this.onChangePulseRate = this.onChangePulseRate.bind(this);
        this.onChangeComorbidity = this.onChangeComorbidity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            phoneNo: '',
            age: '',
            weight:'',
            height:'',
            spo2: '',
            temperature: '',
            last_checkup_date: '',
            pulse_rate: '',
            comorbidity:'',
        }
    }

    componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/me`, {
            headers:{
                'token': data
            }
        })
            .then(res => {
                this.setState({ usersCollection: res.data });
                console.log(this.state.usersCollection)
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Error')
            })
    }
    onChangeName(e){
        this.setState({name: e.target.value})
    }

    onChangeAddress(e){
        this.setState({address: e.target.value})
    }

    onChangePhoneNo(e){
        this.setState({phoneNo: e.target.value})
    }
    onChangeAge(e){
        this.setState({age: e.target.value})
    }
    onChangeHeight(e){
        this.setState({height: e.target.value})
    }
    onChangeWeight(e){
        this.setState({weight: e.target.value})
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

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            name : this.state.name,
            address : this.state.address,
            phoneNo : this.state.phoneNo,
            aadhaar_id: this.state.usersCollection['aadhaar_id'],
            height: this.state.height,
            weight: this.state.weight,
            age: this.state.age,
            spo2: this.state.spo2,
            temperature: this.state.temperature,
            last_checkup_date: this.state.last_checkup_date,
            pulse_rate: this.state.pulse_rate,
            comorbidity: this.state.comorbidity,
        };
        
        console.log(userObject)

        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/createprofile`, userObject)
        .then((res) => {
            console.log(res.data.message)
            toast.success('Saved sucessfully')

        }).catch((error) => {
            console.log(error)
            toast.error('Error in saving')
        });

        this.setState({
            name: '',
            address: '',
            phoneNo: '',
            age: '',
            weight:'',
            height:'',
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
                    <h2>Create Profile</h2>
                    <Form onSubmit={this.onSubmit.bind(this)}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter Your Name" value={this.state.name} onChange={this.onChangeName.bind(this)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control required type="text" placeholder="Enter Your Address" value={this.state.address} onChange={this.onChangeAddress.bind(this)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control required type="number" placeholder="Enter Your Phone Number" value={this.state.phoneNumber} onChange={this.onChangePhoneNo.bind(this)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <Form.Control required type="number" placeholder="Enter Your Age" value={this.state.age} onChange={this.onChangeAge.bind(this)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Height</Form.Label>
                                <Form.Control required type="number" placeholder="Enter Your Height (in cm)" value={this.state.height} onChange={this.onChangeHeight.bind(this)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Weight</Form.Label>
                                <Form.Control required type="number" placeholder="Enter Your Weight (in kg)" value={this.state.weight} onChange={this.onChangeWeight.bind(this)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Last Checkup Date</Form.Label>
                                <Form.Control required type="date" placeholder="Enter Last Checkup date" value={this.state.last_checkup_date} onChange={this.onChangeLastCheckupDate.bind(this)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>SPO2</Form.Label>
                                <Form.Control required type="number" placeholder="Enter Your SPO2" value={this.state.spo2} onChange={this.onChangeSpo2.bind(this)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Temperature</Form.Label>
                                <Form.Control required type="number" placeholder="Enter Your Temperature" value={this.state.temperature} onChange={this.onChangeTemperature.bind(this)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Pulse Rate</Form.Label>
                                <Form.Control required type="number" placeholder="Enter Your Pulse Rate" value={this.state.pulse_rate} onChange={this.onChangePulseRate.bind(this)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Comorbidity</Form.Label>
                                <Form.Control required type="text" placeholder="Enter Your Comorbidity" value={this.state.comorbidity} onChange={this.onChangeComorbidity.bind(this)}/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <ToastContainer/>
                    </Form>
                </Jumbotron>
            </Container>
        )
    }
}

class ViewCitizenInfo extends Component{
    constructor(props){
        super(props)

        this.state = {
            citizenInfo: []
        }
    }

    componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/me`, {
            headers:{
                'token': data
            }
        })
            .then(res => {
                this.setState({ citizenInfo: res.data });
                console.log(this.state.citizenInfo)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        return(
            <Container>
                <h2>Profile Highlights</h2>
                <hr></hr>
                <CardDeck>
                    <Card    bg='warning' text='dark' style={{ width: '18rem' }} className="mb-2">
                        <Card.Header>Name</Card.Header>
                        <Card.Body>
                        <Card.Title> {this.state.citizenInfo.name} </Card.Title>
                        </Card.Body>
                    </Card>

                    <Card    bg='secondary' text='light' style={{ width: '18rem' }} className="mb-2">
                        <Card.Header>Age</Card.Header>
                        <Card.Body>
                        <Card.Title> {this.state.citizenInfo.age} yrs</Card.Title>
                        </Card.Body>
                    </Card>

                    <Card    bg='success' text='light' style={{ width: '18rem' }} className="mb-2">
                        <Card.Header>Height</Card.Header>
                        <Card.Body>
                        <Card.Title> {this.state.citizenInfo.height} cm </Card.Title>
                        </Card.Body>
                    </Card>

                    <Card    bg='info' text='light' style={{ width: '18rem' }} className="mb-2">
                        <Card.Header>BMI</Card.Header>
                        <Card.Body>
                        <Card.Title> {(this.state.citizenInfo.weight / (this.state.citizenInfo.height/100) ** 2).toFixed(2)} </Card.Title>
                        </Card.Body>
                    </Card>

                    <Card    bg='danger' text='light' style={{ width: '18rem' }} className="mb-2">
                        <Card.Header>Comorbidity</Card.Header>
                        <Card.Body>
                        <Card.Title> {this.state.citizenInfo.comorbidity} </Card.Title>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Container>
        )
    }
}

class BookAppointment extends Component{
    constructor(props){
        super(props)
        this.onSchedule = this.onSchedule.bind(this);
        this.onChangeDoctorId = this.onChangeDoctorId.bind(this);
        
        this.state = {
            citizenInfo: [],
            doctor_id:'',
            doctorInfo: [],
        }
    }

    onSchedule(dateTime){
        const userObject = {
            doctor_id: this.state.doctor_id,
            slot: String(dateTime),
            aadhaar_id: this.state.citizenInfo.aadhaar_id,
        };
        console.log(userObject)
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/appointment/book`, userObject)
        .then((res) => {
            console.log(res.data.message)
            toast.success('Sucessfully Booked')
        }).catch((error) => {
            console.log(error)
            toast.error('Not available slots')

        });

        this.setState({
            doctor_id:this.state.doctorInfo[0].doctor_id,
        });
    }

    onChangeDoctorId(e){
        this.setState({doctor_id: e.target.value})
    }

    componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/me`, {
            headers:{
                'token': data
            }
        })
        .then(res => {
            this.setState({ citizenInfo: res.data });
            console.log(this.state.citizenInfo)
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/doctor/getdoctorinfo`, {
           
        })
        .then(res => {
            this.setState({ doctorInfo: res.data });
            console.log(this.state.doctorInfo)
            this.setState({
                doctor_id: this.state.doctorInfo[0].doctor_id,
            })
        })
        .catch(function (error) {
            console.log(error);
        })

    }

    render(){
        const info = []
        for (let i = 0; i < this.state.doctorInfo.length; i++) {
            info.push(
                <option value= {this.state.doctorInfo[i].doctor_id}>
                    {this.state.doctorInfo[i].doctor_id} Specialized in {this.state.doctorInfo[i].specialization}
                </option>
            )
        }
        if(info.length === 0){
            info.push(<option>Stock Empty</option>)
        }
        return(
            <Container>
                <Jumbotron>
                    <h1>Book an appointment.</h1><hr/>

                    <Form.Group>
                        <Form.Label>Doctor ID</Form.Label>
                        <Form.Control as="select" required type="number" placeholder="Enter Doctor ID" value={this.state.doctor_id} onChange={this.onChangeDoctorId.bind(this)} >
                            {info}
                        </Form.Control>
                    </Form.Group>
                    <DayTimePicker bg='primary' timeSlotSizeMinutes={30} onConfirm={this.onSchedule} />
                    <ToastContainer/>
                </Jumbotron>
            </Container>
        )
    }
}

class CheckAppointment extends Component{
    constructor(props){
        super(props)
        this.state = {
            citizenInfo: [],
            appointments:[],
        }
    }

    async componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/me`, {
            headers:{
                'token': data
            }
        })
            .then(res => {
                this.setState({ citizenInfo: res.data });
                console.log(this.state.citizenInfo)
            })
            .catch(function (error) {
                console.log(error);
            })

        const userObject = {
            aadhaar_id: this.state.citizenInfo.aadhaar_id,
        };
        console.log(userObject)
        await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/appointment/getinfo`, userObject)
        .then((res) => {
            console.log(res.data.appointments)
            this.setState({appointments: res.data.appointments})

        }).catch((error) => {
            console.log(error)
        });
        
    }

    render(){
        const info = this.state.appointments;
        const listItems = info.map((i) => 
            <div key={i.slot}>
                <CardDeck>
                <Card border="info" style={{ width: '18rem' }}>
                    <Card.Header>Doctor ID: {i.doctor_id}</Card.Header>
                    <Card.Body>
                        <Card.Text>{i.slot}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {i.status ? "Confirmed": "Waiting for confirmation"}
                    </Card.Footer>
                </Card>
                </CardDeck>
            </div>);
       
        return(
            <Container>
                <Jumbotron>
                    <h3> Your Appointments.</h3><hr></hr>
                    {listItems}
                </Jumbotron>    
            </Container>
        )
    }
}

export {
    CreateCitizenProfile,
    ViewCitizenInfo,
    BookAppointment,
    CheckAppointment,
}