import React, { Component } from 'react';
import axios from 'axios';
import {
    Form,
    Button,
    Jumbotron,
    Container
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
export default class PharmacyRegister extends Component{
    constructor(props) {
        super(props)
        this.state = {
            usersCollection: []
        }

        this.onChangeStoreId = this.onChangeStoreId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeOpeningTime = this.onChangeOpeningTime.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeClosingTime  = this.onChangeClosingTime.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);



        this.state = {
            store_id: '',
            name:'',
            opening_time:'',
            phone_number:'',
            address:'',
            closing_time:''
        };
    }


    onChangeStoreId(e){
        this.setState({store_id: e.target.value})
    }

    onChangeName(e){
        this.setState({name: e.target.value})
    }
    onChangeOpeningTime(e){
        this.setState({opening_time: e.target.value})
    }
    onChangePhoneNumber(e){
        this.setState({phone_number: e.target.value})
    }
    onChangeAddress(e){
        this.setState({address: e.target.value})
    }
    onChangeClosingTime(e){
        this.setState({closing_time: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            store_id: this.state.store_id,
            name : this.state.name,
            address : this.state.address,
            phone_number : this.state.phone_number,
            opening_time: this.state.opening_time,
            closing_time: this.state.closing_time,
        };
        console.log(userObject)
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/pharmacy/registerpharmacy`, userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            store_id: '',
            name:'',
            opening_time:'',
            phone_number:'',
            address:'',
            closing_time:''
        });
    }

    render(){
        return(
            <Container>
                <Jumbotron>
                    <h2>Register Pharmacy</h2>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control required type="text" placeholder="Enter Hospital Name" value={this.state.name} onChange={this.onChangeName} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pharmacy ID:</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Pharmacy ID" value={this.state.store_id} onChange={this.onChangeStoreId} />
                        </Form.Group>   

                        <Form.Group>
                            <Form.Label>Phone Number:</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Pharmacy Phone Number" value={this.state.phone_number} onChange={this.onChangePhoneNumber} />
                        </Form.Group>    

                        <Form.Group>
                            <Form.Label>Opening Time:</Form.Label>
                            <Form.Control required type="time" placeholder="Enter Opening Time" value={this.state.opening_time} onChange={this.onChangeOpeningTime} />
                        </Form.Group>  

                        <Form.Group>
                            <Form.Label>Closing Time:</Form.Label>
                            <Form.Control required type="time" placeholder="Enter Closing Time" value={this.state.closing_time} onChange={this.onChangeClosingTime} />
                        </Form.Group> 

                        <Form.Group>
                            <Form.Label>Address:</Form.Label>
                            <Form.Control required type="text" placeholder="Enter Hospital Address" value={this.state.address} onChange={this.onChangeAddress}  />
                        </Form.Group>                

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
            </Container> 
            // <div>
            //     <form onSubmit={this.onSubmit}>
            //         <label for="store_id">store_id:</label><br/>
            //         <input type="string" value={this.state.store_id} onChange={this.onChangeStoreId}/><br/>
            //         <label for="name">Name:</label><br/>
            //         <input type="string" value={this.state.name} onChange={this.onChangeName}/><br/>
            //         <label for="phoneNo">Phone Number:</label><br/>
            //         <input type="number" value={this.state.phone_number} onChange={this.onChangePhoneNumber} /><br/>
            //         <label for="opening_time">opening_time:</label><br/>
            //         <input type="time" value={this.state.opening_time} onChange={this.onChangeOpeningTime} /><br/>
            //         <label for="address">address:</label><br/>
            //         <input type="string" value={this.state.address} onChange={this.onChangeAddress} /><br/>
            //         <label for="closing_time">Type:</label><br/>
            //         <input type="time" value={this.state.closing_time} onChange={this.onChangeClosingTime} /><br/>
            //         <br/>
            //         <input type="submit" value="Submit"/>
            //     </form> 
            // </div>
        )
    }
}