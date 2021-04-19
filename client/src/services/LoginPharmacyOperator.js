import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link,} from 'react-router-dom';
import {
    Form,
    Button,
    Jumbotron,
    Container
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const REDIRECT_PATH_LOGIN = 'pharmacyoperator/dashboard'

class PharmacyOperatorLogin extends Component{
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
        sessionStorage.setItem('aadhaar_id_pharmacy', this.state.aadhaar_id)
        console.log(userObject)

        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/operator/pharmacylogin`, userObject)
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
            <Container>
                <Jumbotron>
                    <h2>Login As Pharmacy Operator</h2>
                    <Form onSubmit={this.onSubmit.bind(this)}>

                        <Form.Group>
                            <Form.Label>Aadhar ID</Form.Label>
                            <Form.Control required type="number" placeholder="Enter Aadhar Number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaar.bind(this)} Min="100000000000" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required onChange={this.onChangePassword.bind(this)} value={this.state.password} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
                {redirection_html}
            </Container> 
            // <div>
            //     <form onSubmit={this.onSubmit.bind(this)}>
            //         <label for="aadhaar_id">Aadhaar:</label><br/>
            //         <input type="number" value={this.state.aadhaar_id} onChange={this.onChangeAadhaar} Min="100000000000"/><br/>
            //         <label for="password">Password:</label><br/>
            //         <input type="password" onChange={this.onChangePassword} value={this.state.password}/><br/>
            //         <br/>
            //         <input type="submit" value="Submit"/>
            //     </form>
            //     {redirection_html}
            // </div> 
            
        )
    }
}

class PharmacyOperatorDashboard extends Component{
    constructor(props) {
        super(props)
        this.onClickAddStocks = this.onClickAddStocks.bind(this)
        this.onClickShowStocks = this.onClickShowStocks.bind(this)
        this.onClickUpdateStocks = this.onClickUpdateStocks.bind(this)
        this.state = {
            operatorInfo: '',
            showAddStock: false,
            showShowStock: false,
            showUpdateStock: false,
        }
        
    }

    onClickAddStocks(e){
        e.preventDefault();
        if(!this.state.showAddStock)
            this.setState({showAddStock:true})
        else
            this.setState({showAddStock: false})
    }

    onClickShowStocks(e){
        e.preventDefault();
        if(!this.state.showShowStock)
            this.setState({showShowStock:true})
        else
            this.setState({showShowStock:false})
    }
    onClickUpdateStocks(e){
        e.preventDefault();
        if(!this.state.showUpdateStock)
            this.setState({showUpdateStock:true})
        else
            this.setState({showUpdateStock:false})
    }

    componentDidMount(){
        let aadhaar_id = sessionStorage.getItem('aadhaar_id_pharmacy')
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/operator/pharmacyme`, {
            headers:{
                'aadhaar_id': aadhaar_id
            }
        })
        .then(res => {
            this.setState({ operatorInfo: res.data });
            console.log(this.state.operatorInfo)
            sessionStorage.setItem('store_id', this.state.operatorInfo[0].store_id)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render(){
        return(
            <div>
                <Link onClick={this.onClickAddStocks}>Add stocks</Link><br></br>
                {this.state.showAddStock ? <AddStock user={this.state.operatorInfo} />: null}
                <Link onClick={this.onClickShowStocks}>Show stocks</Link><br></br>
                {this.state.showShowStock ? <ShowStock user={this.state.operatorInfo} />: null}
                <Link onClick={this.onClickUpdateStocks}>Update and Delete stocks</Link><br></br>
                {this.state.showUpdateStock ? <UpdateStock user={this.state.operatorInfo} />: null}
            </div>
        )
    }
}



export{
    PharmacyOperatorLogin,
    PharmacyOperatorDashboard,
}

class AddStock extends Component{
    constructor(props) {
        super(props)
        this.onChangeDrugName = this.onChangeDrugName.bind(this)
        this.onChangeExpiryDate = this.onChangeExpiryDate.bind(this)
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            store_id:'',
            drug_name:'',
            expiry_date:'',
            quantity:'',
        }
        
    }

    onChangeDrugName(e){
        this.setState({drug_name: e.target.value})
    }

    onChangeExpiryDate(e){
        this.setState({expiry_date: e.target.value})
    }

    onChangeQuantity(e){
        this.setState({quantity: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()
        let store_id = sessionStorage.getItem('store_id')
        console.log(store_id)
        const userObject = {
            store_id: store_id,
            drug_name:this.state.drug_name,
            expiry_date:this.state.expiry_date,
            quantity:this.state.quantity,
        }
        console.log(userObject)
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/stock/addstock`, userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            store_id:'',
            drug_name:'',
            expiry_date:'',
            quantity:'',
        });

    }
    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label for="drug_name">Drug name:</label><br/>
                    <input type="string" value={this.state.drug_name} onChange={this.onChangeDrugName.bind(this)}/><br/>
                    <label for="expiry_date">Expiry_date:</label><br/>
                    <input type="date" value={this.state.expiry_date} onChange={this.onChangeExpiryDate.bind(this)}/><br/>
                    <label for="quantity">quantity:</label><br/>
                    <input type="number" value={this.state.quantity} onChange={this.onChangeQuantity.bind(this)}/><br/>
                    <br></br>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

class ShowStock extends Component{
    constructor(props) {
        super(props)
        this.state = {
            stocksInfo:[]
        }
        
    }

    componentDidMount(){
        let store_id = sessionStorage.getItem('store_id')
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/stock/showstock`, {
            headers:{
                'store_id': store_id
            }
        })
        .then(res => {
            this.setState({ stocksInfo: res.data });
            console.log(this.state.stocksInfo)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render(){
        const info = []
        for (let i = 0; i < this.state.stocksInfo.length; i++) {
            info.push(
                <ul>
                    <li>{this.state.stocksInfo[i].drug_name}</li>
                    <li>{this.state.stocksInfo[i].expiry_date}</li>
                    <li>{this.state.stocksInfo[i].quantity}</li>
                </ul>
            )
        }
        return(
            <div>
                {info}
            </div>
        )
    }
}

class UpdateStock extends Component{
    constructor(props) {
        super(props)
        this.onChangeDrugName = this.onChangeDrugName.bind(this)
        this.onChangeExpiryDate = this.onChangeExpiryDate.bind(this)
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onClickUpdate = this.onClickUpdate.bind(this)
        this.onClickDelete = this.onClickDelete.bind(this)
        this.state = {
            stocksInfo:[],
            drug_name:'',
            expiry_date:'',
            quantity:'',
        }
        
    }

    componentDidMount(){
        let store_id = sessionStorage.getItem('store_id')
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/stock/showstock`, {
            headers:{
                'store_id': store_id
            }
        })
        .then(res => {
            this.setState({ stocksInfo: res.data });
            console.log(this.state.stocksInfo)
            if(this.state.stocksInfo.length >= 1){
                this.setState({drug_name:this.state.stocksInfo[0].drug_name})
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeDrugName(e){
        this.setState({drug_name: e.target.value})
    }

    onChangeExpiryDate(e){
        this.setState({expiry_date: e.target.value})
    }

    onChangeQuantity(e){
        this.setState({quantity: e.target.value})
    }

    onClickUpdate(e){
        e.preventDefault();
        let store_id = sessionStorage.getItem('store_id')
        console.log(store_id)
        const userObject = {
            store_id: store_id,
            drug_name:this.state.drug_name,
            expiry_date:this.state.expiry_date,
            quantity:this.state.quantity,
        }
        console.log(userObject)
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/stock/updatestock`, userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            store_id:'',
            expiry_date:'',
            quantity:'',
        });
    }

    onClickDelete(e){
        e.preventDefault();
        let store_id = sessionStorage.getItem('store_id')
        console.log(store_id)
        const userObject = {
            store_id: store_id,
            drug_name:this.state.drug_name,
            expiry_date:this.state.expiry_date,
            quantity:this.state.quantity,
        }
        console.log(userObject)
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/stock/deletestock`, userObject)
        .then((res) => {
            console.log(res.data.message)

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            store_id:'',
            expiry_date:'',
            quantity:'',
        });
    }

    render(){
        const info = []
        for (let i = 0; i < this.state.stocksInfo.length; i++) {
            info.push(
                <option value= {this.state.stocksInfo[i].drug_name}>
                    {this.state.stocksInfo[i].drug_name}
                </option>
            )
        }
        return(
            <div>
                <label for="drug_name">Select drug_name:</label><br/>
                <select name="drug_name" id="drug_name" value={this.state.drug_name} onChange={this.onChangeDrugName.bind(this)}>
                    {info}
                </select><br/>
                <label for="expiry_date">Expiry_date:</label><br/>
                <input type="date" value={this.state.expiry_date} onChange={this.onChangeExpiryDate.bind(this)}/><br/>
                <label for="quantity">quantity:</label><br/>
                <input type="number" value={this.state.quantity} onChange={this.onChangeQuantity.bind(this)}/><br/>
                <br></br>
                <Link onClick={this.onClickUpdate}>Update</Link><br></br>
                <Link onClick={this.onClickDelete}>Delete</Link><br></br>
            </div>
        )
    }
}