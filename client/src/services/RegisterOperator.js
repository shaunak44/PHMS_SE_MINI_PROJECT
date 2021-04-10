import React, { Component } from 'react';
import axios from 'axios';
export default class OperatorRegister extends Component{
    constructor(props) {
        super(props)
        this.state = {
            usersCollection: []
        }

        this.onChangeOperatorType = this.onChangeOperatorType.bind(this);
        this.onChangeAadhaarId = this.onChangeAadhaarId.bind(this);
        this.onChangeStoreId = this.onChangeStoreId.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);


        this.state = {
            operator_type: 'hospital_operator',
            aadhaar_id:'',
            store_id:'',
        };
    }

    onChangeOperatorType(e){
        this.setState({operator_type: e.target.value})
    }

    onChangeAadhaarId(e){
        this.setState({aadhaar_id: e.target.value})
    }
    onChangeStoreId(e){
        this.setState({store_id: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const userObject = {
            operator_type: this.state.operator_type,
            aadhaar_id : this.state.aadhaar_id,
            store_id : this.state.store_id,
        };
        console.log(userObject)
        axios.post('http://localhost:5000/operator/registeroperator', userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            operator_type: 'hospital_operator',
            aadhaar_id:'',
            store_id:'',
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <label for="operator_type">operator_type:</label><br/>
                    <select id="operator_type"  value={this.state.operator_type} onChange={this.onChangeOperatorType}>
                        <option value="hospital_operator">Hospital operator</option>
                        <option value="pharmacy_operator">Pharmacy operator</option>
                    </select><br/>
                    <label for="aadhaar">Aadhaar Number:</label><br/>
                    <input type="string" value={this.state.aadhaar_id} onChange={this.onChangeAadhaarId}/><br/>
                    <label for="store_id">Store ID/ Hospital ID:</label><br/>
                    <input type="number" value={this.state.store_id} onChange={this.onChangeStoreId} /><br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form> 
            </div>
        )
    }
}