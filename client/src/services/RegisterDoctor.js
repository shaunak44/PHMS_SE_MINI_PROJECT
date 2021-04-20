import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Form,
    Button,
    Jumbotron,
    Container
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DoctorRegister extends Component{
    constructor(props) {
        super(props)
        this.state = {
            usersCollection: []
        }

        this.onChangeHospitalId = this.onChangeHospitalId.bind(this);
        this.onChangeAadhaarId = this.onChangeAadhaarId.bind(this);
        this.onChangeDoctorId = this.onChangeDoctorId.bind(this);
        this.onChangeSpecialization = this.onChangeSpecialization.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);

        this.state = {
            doctor_id:'',
            aadhaar_id:'',
            hospital_id:'',
            specialization:'',
        };
    }

    onChangeHospitalId(e){
        this.setState({hospital_id: e.target.value})
    }
    onChangeAadhaarId(e){
        this.setState({aadhaar_id: e.target.value})
    }
    onChangeDoctorId(e){
        this.setState({doctor_id: e.target.value})
    }
    onChangeSpecialization(e){
        this.setState({specialization: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            hospital_id: this.state.hospital_id,
            aadhaar_id: this.state.aadhaar_id,
            doctor_id: this.state.doctor_id,
            specialization: this.state.specialization,
        };
        console.log(userObject)
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/doctor/registerdoctor`, userObject)
        .then((res) => {
            console.log(res.data.message)
            toast.success('Registration sucessful')

        }).catch((error) => {
            console.log(error)
            toast.error('Already registred or invalid creds')
        });

        this.setState({
            doctor_id:'',
            aadhaar_id:'',
            hospital_id:'',
            specialization:'',
        });
    }

    render(){
        return(
            <Container>
                <Jumbotron>
                    <h2>Register As Doctor</h2>
                    <Form onSubmit={this.onSubmit.bind(this)}>

                        <Form.Group>
                            <Form.Label>Hospital ID</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Hospital ID" value={this.state.hospital_id} onChange={this.onChangeHospitalId.bind(this)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Doctor ID</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Doctor ID" value={this.state.doctor_id} onChange={this.onChangeDoctorId.bind(this)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Aadhar ID</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Aadhar Number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaarId.bind(this)} Min="100000000000" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Specialization</Form.Label>
                            <Form.Control required type="text" placeholder="Enter Specialization" value={this.state.specialization} onChange={this.onChangeSpecialization.bind(this)} />
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