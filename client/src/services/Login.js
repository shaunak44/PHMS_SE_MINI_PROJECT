import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const REDIRECT_PATH_LOGIN = 'citizen/profile'

export default class Login extends Component{
    constructor(props) {
        super(props)

        this.onChangeAadhaar = this.onChangeAadhaar.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            aadhaar_id: '',
            password: '',
            redirect_flag: false
        }


    }

    onChangeAadhaar(e){
        this.setState({aadhaar_id: e.target.value})
    }

    onChangePassword(e){
        this.setState({password: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            aadhaar_id : this.state.aadhaar_id,
            password : this.state.password
        };
        
        console.log(userObject)

        axios.post('http://localhost:5000/citizen/login', userObject)
        .then((res) => {
            console.log(res.data.token)

            // Save data to sessionStorage
            sessionStorage.setItem('token', res.data.token);

            // Get saved data from sessionStorage
            let data = sessionStorage.getItem('token');

            console.log(data)

            this.setState({redirect_flag: true}) 
            
        
        }).catch((error) => {
            console.log(error)
        });

        this.setState({ aadhaar_id: '', password: '', redirect_flag: false});

    }

   
    render(){
        var isRedirect = this.state.redirect_flag;
        let redirection_html = '';
        if(isRedirect){
            redirection_html = <Redirect to={REDIRECT_PATH_LOGIN}/>
        }
        else{
            redirection_html = "";
        }
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <label for="aadhaar_id">Aadhaar:</label><br/>
                    <input type="number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaar} Min="100000000000"/><br/>
                    <label for="password">Password:</label><br/>
                    <input type="password" onChange={this.onChangePassword} value={this.state.password}/><br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                {redirection_html}
                
            </div> 
            
        )
    }

}