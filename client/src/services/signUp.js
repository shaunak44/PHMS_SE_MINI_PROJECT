import React, { Component } from 'react';
import axios from 'axios';

export default class SignUp extends Component{
    constructor(props) {
        super(props)

        this.onChangeAadhaar = this.onChangeAadhaar.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            aadhaar_id: '',
            email_id: '',
            password: ''
        }
    }

    onChangeAadhaar(e){
        this.setState({aadhaar_id: e.target.value})
    }

    onChangeEmail(e){
        this.setState({email_id: e.target.value})
    }

    onChangePassword(e){
        this.setState({password: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            aadhaar_id : this.state.aadhaar_id,
            email_id : this.state.email_id,
            password : this.state.password
        };
        
        console.log(userObject)

        axios.post('http://localhost:5000/citizen/signup', userObject)
        .then((res) => {
            console.log(res.data.token)

            // Save data to sessionStorage
            sessionStorage.setItem('token', res.data.token);

            // Get saved data from sessionStorage
            let data = sessionStorage.getItem('token');

            console.log(data)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({ aadhaar_id: '', email_id: '', password: ''});

    }

   
    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <label for="aadhaar_id">Aadhaar:</label><br/>
                    <input type="number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaar} Min="100000000000"/><br/>
                    <label for="email_id">Email:</label><br/>
                    <input type="email" value={this.state.email_id} onChange={this.onChangeEmail}/><br/>
                    <label for="password">Password:</label><br/>
                    <input type="password" onChange={this.onChangePassword} value={this.state.password}/><br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form> 
            </div> 
        )
    }

}