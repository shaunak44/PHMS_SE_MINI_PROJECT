import React, { Component } from 'react';
import axios from 'axios';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
 
class CreateCitizenProfile extends Component{
    constructor(props) {
        super(props)

        this.state = {
            usersCollection: []
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeSpo2 = this.onChangeSpo2.bind(this);
        this.onChangeTemperature = this.onChangeTemperature.bind(this);
        this.onChangeLastCheckupDate = this.onChangeLastCheckupDate.bind(this);
        this.onChangePulseRate = this.onChangePulseRate.bind(this);
        this.onChangeComorbidity = this.onChangeComorbidity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            phoneNo: '',
            age: '',
            weight:'',
            height:'',
            spo2: '',
            temperature: '',
            last_checkup_date: '',
            pulse_rate: '',
            comorbidity:'',
        }
    }

    componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/me`, {
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
    onChangeAge(e){
        this.setState({age: e.target.value})
    }
    onChangeHeight(e){
        this.setState({height: e.target.value})
    }
    onChangeWeight(e){
        this.setState({weight: e.target.value})
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

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            name : this.state.name,
            address : this.state.address,
            phoneNo : this.state.phoneNo,
            aadhaar_id: this.state.usersCollection['aadhaar_id'],
            height: this.state.height,
            weight: this.state.weight,
            age: this.state.age,
            spo2: this.state.spo2,
            temperature: this.state.temperature,
            last_checkup_date: this.state.last_checkup_date,
            pulse_rate: this.state.pulse_rate,
            comorbidity: this.state.comorbidity,
        };
        
        console.log(userObject)

        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/createprofile`, userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            name: '',
            address: '',
            phoneNo: '',
            age: '',
            weight:'',
            height:'',
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
                <form onSubmit={this.onSubmit}>
                    <label for="name">Name:</label><br/>
                    <input type="name" value={this.state.name} onChange={this.onChangeName}/><br/>
                    <label for="address">Address:</label><br/>
                    <input type="address" value={this.state.address} onChange={this.onChangeAddress}/><br/>
                    <label for="phoneNo">Phone Number:</label><br/>
                    <input type="phoneNo" value={this.state.phoneNumber} onChange={this.onChangePhoneNo} /><br/>
                    <label for="age">Age:</label><br/>
                    <input type="number" value={this.state.age} onChange={this.onChangeAge} /><br/>
                    <label for="height">Height:</label><br/>
                    <input type="mumber" value={this.state.height} onChange={this.onChangeHeight} /><br/>
                    <label for="weight">Weight:</label><br/>
                    <input type="number" value={this.state.weight} onChange={this.onChangeWeight} /><br/>
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
                    <br/>
                    <input type="submit" value="Submit"/>
                </form> 
            </div> 
        )
    }
}

class ViewCitizenInfo extends Component{
    constructor(props){
        super(props)

        this.state = {
            citizenInfo: []
        }
    }

    componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/me`, {
            headers:{
                'token': data
            }
        })
            .then(res => {
                this.setState({ citizenInfo: res.data });
                console.log(this.state.citizenInfo)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                <p>{this.state.citizenInfo.name}</p>
                <p>{this.state.citizenInfo.age}</p>
                <p>{this.state.citizenInfo.height}</p>
                <p>{this.state.citizenInfo.bmi}</p>
                <p>{this.state.citizenInfo.comorbidity}</p>
            </div>
        )
    }
}

class BookAppointment extends Component{
    constructor(props){
        super(props)
        this.onSchedule = this.onSchedule.bind(this);
        this.onChangeDoctorId = this.onChangeDoctorId.bind(this);
        this.state = {
            citizenInfo: [],
            doctor_id:''
        }
    }

    onSchedule(dateTime){
        const userObject = {
            doctor_id: this.state.doctor_id,
            slot: String(dateTime),
            aadhaar_id: this.state.citizenInfo.aadhaar_id,
        };
        console.log(userObject)
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/appointment/book`, userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            doctor_id:'',
        });
    }

    onChangeDoctorId(e){
        this.setState({doctor_id: e.target.value})
    }

    componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/me`, {
            headers:{
                'token': data
            }
        })
            .then(res => {
                this.setState({ citizenInfo: res.data });
                console.log(this.state.citizenInfo)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                <h1>
                    Book an appointment.
                </h1>
                <label for="doctor_id">DoctorId:</label><br/>
                <input type="number" value={this.state.doctor_id} onChange={this.onChangeDoctorId}/><br/>
                <DayTimePicker timeSlotSizeMinutes={30} onConfirm={this.onSchedule}/>;
            </div>
        )
    }
}

class CheckAppointment extends Component{
    constructor(props){
        super(props)
        this.state = {
            citizenInfo: [],
            appointments:[],
        }
    }

    async componentDidMount() {
        let data = sessionStorage.getItem('token');
        console.log(data, typeof(data))
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/me`, {
            headers:{
                'token': data
            }
        })
            .then(res => {
                this.setState({ citizenInfo: res.data });
                console.log(this.state.citizenInfo)
            })
            .catch(function (error) {
                console.log(error);
            })

        const userObject = {
            aadhaar_id: this.state.citizenInfo.aadhaar_id,
        };
        console.log(userObject)
        await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/appointment/getinfo`, userObject)
        .then((res) => {
            console.log(res.data.appointments)
            this.setState({appointments: res.data.appointments})

        }).catch((error) => {
            console.log(error)
        });
        
    }

    render(){
        const info = this.state.appointments;
        const listItems = info.map((i) => 
            <div key={i.slot}>
                <h3>{i.doctor_id}</h3>
                <h3>{i.slot}</h3>
                <h3>{i.status ? "Confirmed": "Waiting for confirmation"}</h3>
            </div>);
       
        return(
            <div>
                <h1>
                    Your appointments.
                </h1>
                {listItems}
                
            </div>
        )
    }
}

export {
    CreateCitizenProfile,
    ViewCitizenInfo,
    BookAppointment,
    CheckAppointment,
}