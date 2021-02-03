import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const REDIRECT_PATH_LOGIN = '/signup'

export default class Login extends Component{
    constructor(props) {
        super(props)

        this.onChangeAadhaar = this.onChangeAadhaar.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            aadhaar: '',
            password: '',
            redirect_flag: false
        }


    }

    onChangeAadhaar(e){
        this.setState({aadhaar: e.target.value})
    }

    onChangePassword(e){
        this.setState({password: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            aadhaar : this.state.aadhaar,
            password : this.state.password
        };
        
        //console.log(userObject)

        axios.post('http://localhost:5000/user/login', userObject)
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

        this.setState({ aadhaar: '', password: '', redirect_flag: false});

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
                    <label for="aadhaar">Aadhaar:</label><br/>
                    <input type="number" value={this.state.aadhaar} onChange={this.onChangeAadhaar} Min="1000000000"/><br/>
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