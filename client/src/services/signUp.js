import React, { Component } from 'react';
import axios from 'axios';
import {
    Form,
    Button,
    Jumbotron,
    Container
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'

export default class SignUp extends Component{
    constructor(props) {
        super(props)

        // this.onChangeAadhaar = this.onChangeAadhaar.bind(this);
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            aadhaar_id: '',
            email_id: '',
            password: '',
            errorPassword:'',
        }
    }

    onChangeAadhaar(e){
        console.log(e.target.value);
        this.setState({aadhaar_id: e.target.value})
    }

    onChangeEmail(e){
        console.log(e.target.value);
        this.setState({email_id: e.target.value})
    }

    onChangePassword(e){
        console.log(e.target.value);
        if (validator.isStrongPassword(e.target.value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            this.setState({errorPassword: "Strong Password"})  
          } else {
            this.setState({errorPassword: "Week Password"})  
          }
          this.setState({password: e.target.value})
    }

    onSubmit(e){

        console.log(e);
        e.preventDefault();

        if(this.state.errorPassword == "Week Password"){
            toast('Week password')
            return;
        }

        const userObject = {
            aadhaar_id : this.state.aadhaar_id,
            email_id : this.state.email_id,
            password : this.state.password
        };
        
        console.log(userObject)

        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/signup`, userObject)
        .then((res) => {
            console.log(res.data.token)

            // Save data to sessionStorage
            sessionStorage.setItem('token', res.data.token);

            // Get saved data from sessionStorage
            let data = sessionStorage.getItem('token');

            console.log(data)
             toast("Sucessfully signed up");

        }).catch((error) => {
            console.log(error)
            toast("Invalid cred or already registered");
        });

        this.setState({ aadhaar_id: '', email_id: '', password: ''});

    }

   
    render(){
        return(
            <Container>
                <Jumbotron>
                    <h2>Register</h2>
                    <Form onSubmit={this.onSubmit.bind(this)}>

                        <Form.Group>
                            <Form.Label>Aadhar ID</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Aadhar Number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaar.bind(this)} Min="100000000000" Max="999999999999"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" value={this.state.email_id} onChange={this.onChangeEmail.bind(this)} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required onChange={this.onChangePassword.bind(this)} value={this.state.password} type="password" placeholder="Password" />
                            <Form.Text className="text-muted">
                            {this.state.errorPassword}
                            </Form.Text>    
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <ToastContainer />
                    </Form>
                </Jumbotron>
            </Container> 
        )
    }

}