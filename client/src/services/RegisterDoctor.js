import React, { Component } from 'react';
import axios from 'axios';
export default class DoctorRegister extends Component{
    constructor(props) {
        super(props)
        this.state = {
            usersCollection: []
        }

        this.onChangeHospitalId = this.onChangeHospitalId.bind(this);
        this.onChangeAadhaarId = this.onChangeAadhaarId.bind(this);
        this.onChangeDoctorId = this.onChangeDoctorId.bind(this);
        this.onChangeSpecialization = this.onChangeSpecialization.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);

        this.state = {
            doctor_id:'',
            aadhaar_id:'',
            hospital_id:'',
            specialization:'',
        };
    }

    onChangeHospitalId(e){
        this.setState({hospital_id: e.target.value})
    }
    onChangeAadhaarId(e){
        this.setState({aadhaar_id: e.target.value})
    }
    onChangeDoctorId(e){
        this.setState({doctor_id: e.target.value})
    }
    onChangeSpecialization(e){
        this.setState({specialization: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            hospital_id: this.state.hospital_id,
            aadhaar_id: this.state.aadhaar_id,
            doctor_id: this.state.doctor_id,
            specialization: this.state.specialization,
        };
        console.log(userObject)
        axios.post('http://localhost:5000/doctor/registerdoctor', userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            doctor_id:'',
            aadhaar_id:'',
            hospital_id:'',
            specialization:'',
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <label for="hospital_id">hospital_id:</label><br/>
                    <input type="number" value={this.state.hospital_id} onChange={this.onChangeHospitalId}/><br/>
                    <label for="doctor_id">DoctorId:</label><br/>
                    <input type="number" value={this.state.doctor_id} onChange={this.onChangeDoctorId}/><br/>
                    <label for="aadhaar_id">Aadhaar:</label><br/>
                    <input type="number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaarId} /><br/>
                    <label for="specialization">specialization:</label><br/>
                    <input type="string" value={this.state.specialization} onChange={this.onChangeSpecialization} /><br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form> 
            </div>
        )
    }
}