import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link,} from 'react-router-dom';

const REDIRECT_PATH_LOGIN = 'doctor/dashboard'

class DoctorLogin extends Component{
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

        axios.post('http://localhost:5000/doctor/login', userObject)
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

class DoctorDashboard extends Component{
    constructor(props) {
        super(props);
        this.onClickViewPatientProfile = this.onClickViewPatientProfile.bind(this);
        this.onChangeAadhaar = this.onChangeAadhaar.bind(this);
        this.state = {
            aadhaar_id:'',
            showData: false,
        }
        this.state = {
            usersCollection:''
        }
    }
    onClickViewPatientProfile(e) {
        e.preventDefault();
        console.log(this.state.aadhaar_id)
        axios.get('http://localhost:5000/doctor/viewpatient', {
            headers:{
                'aadhaar_id': this.state.aadhaar_id
            }
        })
        .then(res => {
            this.setState({ usersCollection: res.data });
            console.log(this.state.usersCollection)
            this.setState({showData:true})
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    onChangeAadhaar(e){
        this.setState({aadhaar_id: e.target.value})
    }   
    render(){
        return(
            <div>
                <label for="aadhaar_id">Aadhaar:</label><br/>
                <input type="number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaar} Min="100000000000"/><br/>    
                <Link onClick={this.onClickViewPatientProfile}>View Patient Profile</Link><br></br>
                {this.state.showData ? <DisplayPatientData user={this.state.usersCollection} />: null}
                <a href="/logout">Logout.</a>
            </div>
        )
    }
}


export{
    DoctorLogin,
    DoctorDashboard,
}

function DisplayPatientData(props) {
    if(props.user[0]){
        return (
            <div>
                <h2>aadhaar: {props.user[0].aadhaar_id}</h2>
                <h2>Name: {props.user[0].name}</h2>
            </div>
        );
    }
    else{
        return(
            <div>
                <h2>
                    Patient record not found.
                </h2>
            </div>
        )
    }
}