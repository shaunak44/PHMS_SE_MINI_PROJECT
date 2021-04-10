import React, { Component } from 'react';
import axios from 'axios';
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
        axios.post('http://localhost:5000/pharmacy/registerpharmacy', userObject)
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
            <div>
                <form onSubmit={this.onSubmit}>
                    <label for="store_id">store_id:</label><br/>
                    <input type="string" value={this.state.store_id} onChange={this.onChangeStoreId}/><br/>
                    <label for="name">Name:</label><br/>
                    <input type="string" value={this.state.name} onChange={this.onChangeName}/><br/>
                    <label for="phoneNo">Phone Number:</label><br/>
                    <input type="number" value={this.state.phone_number} onChange={this.onChangePhoneNumber} /><br/>
                    <label for="opening_time">opening_time:</label><br/>
                    <input type="time" value={this.state.opening_time} onChange={this.onChangeOpeningTime} /><br/>
                    <label for="address">address:</label><br/>
                    <input type="string" value={this.state.address} onChange={this.onChangeAddress} /><br/>
                    <label for="closing_time">Type:</label><br/>
                    <input type="time" value={this.state.closing_time} onChange={this.onChangeClosingTime} /><br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form> 
            </div>
        )
    }
}