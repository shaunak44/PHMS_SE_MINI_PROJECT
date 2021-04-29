import React, { Component } from 'react';
import axios from 'axios';
import {
    Container,
    Button,
    Jumbotron,
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
                <Jumbotron>
                    <h2>
                        Welcome User With aadhaar {this.state.usersCollection.aadhaar_id}
                    </h2>
                    <hr></hr>
                    <Container>
                        <Button block href="/citizen/createprofile" size='lg' variant='primary'>Create Profile</Button>{'  '}
                        <Button block href="/citizen/viewprofile" size='lg' variant='secondary'>View Profile</Button>{'  '}
                        <Button block href="/citizen/bookappointment" size='lg' variant='success'>Book Appointment</Button>{'  '}
                        <Button block href="/citizen/checkappointment" size='lg' variant='info'>Check Appointments</Button>{'  '}
                        <Button block href="/logout" size='lg' variant='danger'>Logout</Button>{'  '}
                    </Container>
                </Jumbotron>
            </Container> 
        )
    }
}