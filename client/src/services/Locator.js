import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,} from 'react-router-dom';
import {
    Form,
    Jumbotron,
    Container,
    Card,
    CardDeck
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class HospitalLocator extends Component{
    constructor(props){
        super(props)
        this.state = {
            HospitalInfo: '',
            pincode:'',
            LocatedHospital:'',
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/hospital/viewstats`, {
            
        })
        .then(res => {
            this.setState({ HospitalInfo: res.data });
            console.log(this.state.HospitalInfo)
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Error')
        })
    }

    onChangePincode(e){
        console.log(e.target.value)
        const info = this.state.HospitalInfo;
        console.log(info)
        let listItems = []

        for(let i = 0; i < info.length; i++){
            if(info[i].address.slice(-6) == e.target.value){
                listItems.push(
                <div>
                    <CardDeck>
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Header>Hospital ID: {info[i].hospital_id}</Card.Header>
                        <Card.Body>
                            <Card.Text>Name: {info[i].name}</Card.Text>
                            <Card.Text>Phone Number: {info[i].phone_number[0]}</Card.Text>
                            <Card.Text>No of Beds: {info[i].no_of_beds}</Card.Text>
                            <Card.Text>Type: {info[i].type}</Card.Text>
                            <Card.Text>Address: {info[i].address}</Card.Text>
                        </Card.Body>
                    </Card>
                    </CardDeck><br></br>
                </div>
                )
            }
        }
        this.setState({LocatedHospital: listItems})
    }

    render(){
        const pincodes = []
        const uniqueChars = []
        for (let i = 0; i < this.state.HospitalInfo.length; i++) {
            pincodes.push(
                this.state.HospitalInfo[i].address.substr(this.state.HospitalInfo[i].address.length - 6)
            )
        }
        pincodes.forEach((c) => {
            if (!uniqueChars.includes(c)) {
                uniqueChars.push(c);
            }
        });
        console.log(uniqueChars)

        const info = []
        
        for (let i = 0; i < uniqueChars.length; i++) {
            info.push(
                <option value= {uniqueChars[i]}>
                    {uniqueChars[i]}
                </option>
            )
        }
        
        if(info.length === 0){
            info.push(<option>No available</option>)
        }
        return(
            <Container>
            <Container>
                <Jumbotron>
                    <Form.Group>
                        <Form.Label>Select Pincode</Form.Label>
                        <Form.Control as="select" required type="number" placeholder="Enter Pincode" onChange={this.onChangePincode.bind(this)}>
                            <option disabled selected value> -- select an option -- </option>
                            {info}
                        </Form.Control>
                    </Form.Group>
                </Jumbotron>
            </Container>
            <Container>
                <Jumbotron>
                    {this.state.LocatedHospital}
                </Jumbotron>
            </Container>
            </Container>
        )
    }

}

class PharmacyLocator extends Component{
    constructor(props){
        super(props)
        this.state = {
            HospitalInfo: '',
            pincode:'',
            LocatedHospital:'',
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/pharmacy/getinfo`, {
            
        })
        .then(res => {
            this.setState({ HospitalInfo: res.data });
            console.log(this.state.HospitalInfo)
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Error')
        })
    }

    onChangePincode(e){
        console.log(e.target.value)
        const info = this.state.HospitalInfo;
        console.log(info)
        let listItems = []

        for(let i = 0; i < info.length; i++){
            if(info[i].address.slice(-6) == e.target.value){
                listItems.push(
                <div>
                    <CardDeck>
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Header>Store ID: {info[i].store_id}</Card.Header>
                        <Card.Body>
                            <Card.Text>Name: {info[i].name}</Card.Text>
                            <Card.Text>Phone Number: {info[i].phone_number[0]}</Card.Text>
                            <Card.Text>Opening Time: {info[i].opening_time}</Card.Text>
                            <Card.Text>Closing_time: {info[i].closing_time}</Card.Text>
                            <Card.Text>Address: {info[i].address}</Card.Text>
                        </Card.Body>
                    </Card>
                    </CardDeck><br></br>
                </div>
                )
            }
        }
        this.setState({LocatedHospital: listItems})
    }

    render(){
        const pincodes = []
        const uniqueChars = []
        for (let i = 0; i < this.state.HospitalInfo.length; i++) {
            pincodes.push(
                this.state.HospitalInfo[i].address.substr(this.state.HospitalInfo[i].address.length - 6)
            )
        }
        pincodes.forEach((c) => {
            if (!uniqueChars.includes(c)) {
                uniqueChars.push(c);
            }
        });
        console.log(uniqueChars)

        const info = []
        
        for (let i = 0; i < uniqueChars.length; i++) {
            info.push(
                <option value= {uniqueChars[i]}>
                    {uniqueChars[i]}
                </option>
            )
        }
        
        if(info.length === 0){
            info.push(<option>No available</option>)
        }
        return(
            <Container>
            <Container>
                <Jumbotron>
                    <Form.Group>
                        <Form.Label>Select Pincode</Form.Label>
                        <Form.Control as="select" required type="number" placeholder="Enter Pincode" onChange={this.onChangePincode.bind(this)}>
                            <option disabled selected value> -- select an option -- </option>
                            {info}
                        </Form.Control>
                    </Form.Group>
                </Jumbotron>
            </Container>
            <Container>
                <Jumbotron>
                    {this.state.LocatedHospital}
                </Jumbotron>
            </Container>
            </Container>
        )
    }
}

export{
    HospitalLocator,
    PharmacyLocator,
}