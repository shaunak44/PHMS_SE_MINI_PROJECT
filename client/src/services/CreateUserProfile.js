import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUserProfile extends Component{
    constructor(props) {
        super(props)

        this.state = {
            usersCollection: []
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            phoneNo: ''
        }
    }

    componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        axios.get('http://localhost:5000/user/me', {
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

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            name : this.state.name,
            address : this.state.address,
            phoneNo : this.state.phoneNo,
            aadhaar: this.state.usersCollection['aadhaar'],
        };
        
        //console.log(userObject)

        axios.post('http://localhost:5000/user/createprofile', userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({ name: '', address: '', phoneNo: ''});

    }

    render(){
        return(
            <div>       
                <form onSubmit={this.onSubmit}>
                    <label for="name">Name:</label><br/>
                    <input type="name" value={this.state.name} onChange={this.onChangeName}/><br/>
                    <label for="address">Address:</label><br/>
                    <input type="address" value={this.state.address} onChange={this.onChangeAddress}/><br/>
                    <label for="phoneNo">Phone Number:</label><br/>
                    <input type="phoneNo" value={this.state.phoneNumber} onChange={this.onChangePhoneNo} /><br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form> 
            </div> 
        )
    }
}