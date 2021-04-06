import React, { Component } from 'react';
import axios from 'axios';

export default class UserProfile extends Component{
    constructor(props) {
        super(props)

        this.state = {
            usersCollection: []
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
                    Welcome User with aadhaar {this.state.usersCollection.aadhaar}
                </h1>
                <a href="/createprofile">Create your profile.</a><br></br>
                <a href="/logout">Logout.</a>
            </div> 
        )
    }
}