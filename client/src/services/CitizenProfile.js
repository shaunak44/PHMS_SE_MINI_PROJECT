import React, { Component } from 'react';
import axios from 'axios';

export default class CitizenProfile extends Component{
    constructor(props) {
        super(props)

        this.state = {
            usersCollection: []
        }
    }

    componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        axios.get('http://localhost:5000/citizen/me', {
            headers:{
                'token': data
            }
        })
            .then(res => {
                this.setState({ usersCollection: res.data });
                //console.log(this.state.usersCollection)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                <h1>
                    Welcome User with aadhaar {this.state.usersCollection.aadhaar_id}
                </h1>
                <a href="/citizen/createprofile">Create your profile.</a><br></br>
                <a href="/citizen/viewprofile">View your profile.</a><br></br>
                <a href="/citizen/bookappointment">Book an appointment.</a><br></br>
                <a href="/citizen/checkappointment">Check appointments.</a><br></br>
                <a href="/logout">Logout.</a>
            </div> 
        )
    }
}