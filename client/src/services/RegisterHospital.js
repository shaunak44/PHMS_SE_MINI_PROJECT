import React, { Component } from 'react';
import axios from 'axios';
export default class HospitalRegister extends Component{
    constructor(props) {
        super(props)
        this.state = {
            usersCollection: []
        }

        this.onChangeHospitalId = this.onChangeHospitalId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNoOfBeds = this.onChangeNoOfBeds.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeType  = this.onChangeType.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);



        this.state = {
            hospital_id: '',
            name:'',
            no_of_beds:'',
            phone_number:'',
            address:'',
            type:''
        };
    }

    onChangeHospitalId(e){
        this.setState({hospital_id: e.target.value})
    }

    onChangeName(e){
        this.setState({name: e.target.value})
    }
    onChangeNoOfBeds(e){
        this.setState({no_of_beds: e.target.value})
    }
    onChangePhoneNumber(e){
        this.setState({phone_number: e.target.value})
    }
    onChangeAddress(e){
        this.setState({address: e.target.value})
    }
    onChangeType(e){
        this.setState({type: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            hospital_id: this.state.hospital_id,
            name : this.state.name,
            address : this.state.address,
            phone_number : this.state.phone_number,
            no_of_beds: this.state.no_of_beds,
            type: this.state.type,
        };
        console.log(userObject)
        axios.post('http://localhost:5000/hospital/registerhospital', userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            hospital_id: '',
            name:'',
            no_of_beds:'',
            phone_number:'',
            address:'',
            type:'',
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <label for="hospital_id">hospital_id:</label><br/>
                    <input type="string" value={this.state.hospital_id} onChange={this.onChangeHospitalId}/><br/>
                    <label for="name">Name:</label><br/>
                    <input type="string" value={this.state.name} onChange={this.onChangeName}/><br/>
                    <label for="phoneNo">Phone Number:</label><br/>
                    <input type="number" value={this.state.phone_number} onChange={this.onChangePhoneNumber} /><br/>
                    <label for="beds">Number of Beds:</label><br/>
                    <input type="number" value={this.state.no_of_beds} onChange={this.onChangeNoOfBeds} /><br/>
                    <label for="address">address:</label><br/>
                    <input type="string" value={this.state.address} onChange={this.onChangeAddress} /><br/>
                    <label for="type">Type:</label><br/>
                    <input type="string" value={this.state.type} onChange={this.onChangeType} /><br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form> 
            </div>
        )
    }
}