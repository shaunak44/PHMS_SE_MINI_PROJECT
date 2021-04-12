import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link,} from 'react-router-dom';

const REDIRECT_PATH_LOGIN = 'hospitaloperator/dashboard'

class HospitalOperatorLogin extends Component{
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
        sessionStorage.setItem('aadhaar_id_hospital', this.state.aadhaar_id)
        console.log(userObject)

        axios.post('http://localhost:5000/operator/hospitallogin', userObject)
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

class HospitalOperatorDashboard extends Component{
    constructor(props) {
        super(props)
        this.onClickViewData = this.onClickViewData.bind(this)
        this.onClickUpdateData = this.onClickUpdateData.bind(this)
        this.state = {
            operatorInfo: '',
            showViewData: false,
            showUpdateData: false,
        }
        
    }

    onClickViewData(e){
        e.preventDefault();
        if(!this.state.showViewData)
            this.setState({showViewData:true})
        else
            this.setState({showViewData: false})
    }

    onClickUpdateData(e){
        e.preventDefault();
        if(!this.state.showUpdateData)
            this.setState({showUpdateData:true})
        else
            this.setState({showUpdateData:false})
    }

    render(){
        return(
            <div>
                <Link onClick={this.onClickViewData}>View Patient Data</Link><br></br>
                {this.state.showViewData ? <ViewData user={this.state.operatorInfo} />: null}
                <Link onClick={this.onClickUpdateData}>Update Patient Data</Link><br></br>
                {this.state.showUpdateData ? <UpdateData user={this.state.operatorInfo} />: null}
            </div>
        )
    }
}



export{
    HospitalOperatorLogin,
    HospitalOperatorDashboard,
}

class ViewData extends Component{
    constructor(props) {
        super(props)
        
        this.onClickViewPatientProfile = this.onClickViewPatientProfile.bind(this)
        this.onChangeAadhaarId = this.onChangeAadhaarId.bind(this)
        this.state = {
            patientData:'',
            aadhaar_id:'',
        }
        
    }

    onChangeAadhaarId(e){
        this.setState({aadhaar_id: e.target.value})
    }

    onClickViewPatientProfile(e){
        e.preventDefault()
        console.log(this.state.aadhaar_id)
        axios.get('http://localhost:5000/doctor/viewpatient', {
            headers:{
                'aadhaar_id': this.state.aadhaar_id
            }
        })
        .then(res => {
            this.setState({ patientData: res.data });
            console.log(this.state.patientData)
            this.setState({showData:true})
        })
        .catch(function (error) {
            console.log(error);
        })

    }
    render(){
        return(
            <div>
                <label for="aadhaar_id">Aadhaar:</label><br/>
                <input type="number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaarId} Min="100000000000"/><br/>    
                <Link onClick={this.onClickViewPatientProfile}>View Patient Profile</Link><br></br>
                {this.state.patientData ? <DisplayPatientData user={this.state.patientData} />: null}
            </div>
        )
    }
}

class UpdateData extends Component{
    constructor(props) {
        super(props)
        this.onChangeAadhaarId = this.onChangeAadhaarId.bind(this)
        this.onChangeSpo2 = this.onChangeSpo2.bind(this);
        this.onChangeTemperature = this.onChangeTemperature.bind(this);
        this.onChangeLastCheckupDate = this.onChangeLastCheckupDate.bind(this);
        this.onChangePulseRate = this.onChangePulseRate.bind(this);
        this.onChangeComorbidity = this.onChangeComorbidity.bind(this);
        this.onClickUpdateData = this.onClickUpdateData.bind(this)
        this.state = {
            PatientInfo:[],
            aadhaar_id:'',
            spo2: '',
            temperature: '',
            last_checkup_date: '',
            pulse_rate: '',
            comorbidity:'',
        }
        
        
    }

    onChangeAadhaarId(e){
        this.setState({aadhaar_id: e.target.value})
    }

    onChangeSpo2(e){
        this.setState({spo2: e.target.value})
    }
    onChangeTemperature(e){
        this.setState({temperature: e.target.value})
    }
    onChangeLastCheckupDate(e){
        this.setState({last_checkup_date: e.target.value})
    }
    onChangePulseRate(e){
        this.setState({pulse_rate: e.target.value})
    }
    onChangeComorbidity(e){
        this.setState({comorbidity: e.target.value})
    }

    onClickUpdateData(e){
        e.preventDefault();
        const userObject = {
            aadhaar_id: this.state.aadhaar_id,
            spo2: this.state.spo2,
            temperature: this.state.temperature,
            last_checkup_date: this.state.last_checkup_date,
            pulse_rate: this.state.pulse_rate,
            comorbidity:this.state.comorbidity,
        }
        console.log(userObject)
        axios.post('http://localhost:5000/citizen/updateinfo', userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            aadhaar_id:'',
            spo2: '',
            temperature: '',
            last_checkup_date: '',
            pulse_rate: '',
            comorbidity:'',
        });
    }
    

    render(){
        
        return(
            <div>
                <label for="aadhaar_id">Aadhaar:</label><br/>
                <input type="number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaarId} Min="100000000000"/><br/>    
                <label for="last_check_up">last_checkup_date:</label><br/>
                <input type="date" value={this.state.last_checkup_date} onChange={this.onChangeLastCheckupDate} /><br/>
                <label for="Spo2">Spo2:</label><br/>
                <input type="number" value={this.state.spo2} onChange={this.onChangeSpo2} /><br/>
                <label for="temperature">Temperature:</label><br/>
                <input type="number" value={this.state.temperature} onChange={this.onChangeTemperature} /><br/>
                <label for="pulse_rate">pulse_rate:</label><br/>
                <input type="number" value={this.state.pulse_rate} onChange={this.onChangePulseRate} /><br/>
                <label for="comorbidity">comorbidity:</label><br/>
                <input type="text" value={this.state.comorbidity} onChange={this.onChangeComorbidity} /><br/>
                <Link onClick={this.onClickUpdateData}>Update</Link><br></br>
            </div>
        )
    }
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
