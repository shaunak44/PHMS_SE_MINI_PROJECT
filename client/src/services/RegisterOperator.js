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
export default class OperatorRegister extends Component{
    constructor(props) {
        super(props)
        this.state = {
            usersCollection: []
        }

        this.onChangeOperatorType = this.onChangeOperatorType.bind(this);
        this.onChangeAadhaarId = this.onChangeAadhaarId.bind(this);
        this.onChangeStoreId = this.onChangeStoreId.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);


        this.state = {
            operator_type: 'hospital_operator',
            aadhaar_id:'',
            store_id:'',
        };
    }

    onChangeOperatorType(e){
        this.setState({operator_type: e.target.value})
    }

    onChangeAadhaarId(e){
        this.setState({aadhaar_id: e.target.value})
    }
    onChangeStoreId(e){
        this.setState({store_id: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            operator_type: this.state.operator_type,
            aadhaar_id : this.state.aadhaar_id,
            store_id : this.state.store_id,
        };
        console.log(userObject)
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/operator/registeroperator`, userObject)
        .then((res) => {
            console.log(res.data.message)
            toast.success('Registartion Sucessful')

        }).catch((error) => {
            console.log(error)
            toast.error('Already registered or invalid details')
        });

        this.setState({
            operator_type: 'hospital_operator',
            aadhaar_id:'',
            store_id:'',
        });
    }

    render(){
        return(
            <Container>
                <Jumbotron>
                    <h2>Register As Operator</h2>
                    <Form onSubmit={this.onSubmit.bind(this)}>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Operator Type:</Form.Label>
                        <Form.Control as="select" id="operator_type" required  value={this.state.operator_type} onChange={this.onChangeOperatorType.bind(this)}>
                            <option value="hospital_operator">Hospital operator</option>
                            <option value="pharmacy_operator">Pharmacy operator</option>
                        </Form.Control>
                    </Form.Group>

                        <Form.Group>
                            <Form.Label>Aadhar ID</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Aadhar Number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaarId.bind(this)} Min="100000000000" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Store ID/ Hospital ID:</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Store / Hospital Number" value={this.state.store_id} onChange={this.onChangeStoreId.bind(this)} />
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