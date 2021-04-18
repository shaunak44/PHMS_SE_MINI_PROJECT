import React, { Component } from 'react';
import axios from 'axios';
import {
    Card,
    Container,
    Button,
    CardDeck
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CitizenProfile extends Component{
    constructor(props) {
        super(props)

        this.state = {
            usersCollection: []
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
                //console.log(this.state.usersCollection)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        return(
            <Container>
                <h1>
                    Welcome User With aadhaar {this.state.usersCollection.aadhaar_id}
                </h1>
                <hr></hr>
                <CardDeck>
                    <Card bg='primary'text='light'style={{ width: '18rem' }}className="mb-2">
                        <Card.Header>Create Profile</Card.Header>
                        <Card.Body>
                            <Card.Text>Set Name, Height, Weight, Age, etc.</Card.Text>
                            <Button variant="light" href="/citizen/createprofile">Go</Button>
                        </Card.Body>
                    </Card>

                    <Card bg='primary'text='light'style={{ width: '18rem' }}className="mb-2">
                        <Card.Header>View Profile</Card.Header>
                        <Card.Body>
                            <Card.Text>View Your Profile</Card.Text>
                            <Button variant="light" href="/citizen/viewprofile">Go</Button>
                        </Card.Body>
                    </Card>

                    <Card bg='primary'text='light'style={{ width: '18rem' }}className="mb-2">
                        <Card.Header>Book appointment.</Card.Header>
                        <Card.Body>
                            <Card.Text>Book An Appointment, Select Date, Doctor.</Card.Text>
                            <Button variant="light" href="/citizen/bookappointment">Go</Button>
                        </Card.Body>
                    </Card>

                    <Card bg='primary'text='light'style={{ width: '18rem' }}className="mb-2">
                        <Card.Header>Check appointments.</Card.Header>
                        <Card.Body>
                            <Card.Text>Check Your Appointments.</Card.Text>
                            <Button variant="light" href="/citizen/checkappointment">Go</Button>
                        </Card.Body>
                    </Card>

                    <Card bg='primary'text='light'style={{ width: '18rem' }}className="mb-2">
                        <Card.Header>Logout</Card.Header>
                        <Card.Body>
                            <Button variant="light" href="/logout">Go</Button>
                        </Card.Body>
                    </Card>
                </CardDeck>
                {/* <a href="/citizen/createprofile">Create your profile.</a><br></br>
                <a href="/citizen/viewprofile">View your profile.</a><br></br>
                <a href="/citizen/bookappointment">Book an appointment.</a><br></br>
                <a href="/citizen/checkappointment">Check appointments.</a><br></br>
                <a href="/logout">Logout.</a> */}
            </Container> 
        )
    }
}