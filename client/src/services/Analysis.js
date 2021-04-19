import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class AgePie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                labels: ['0-18', '19-58', '59+'],
                title: {
                    text: "Age Division",
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                      fontSize:  '25px',
                      fontWeight:  'bold',
                      fontFamily:  undefined,
                      color:  '#263238'
                    },
                },
            },
            series: [0, 0, 0],
            labels: ['0-18', '19-58', '59+'],
            citizenInfo: [{}, {}]
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/viewstats`, {
        })
        .then(res => {
            this.setState({ citizenInfo: res.data });
            console.log(this.state.citizenInfo)
            this.counter();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    counter(){
        var a = 0;
        var b = 0;
        var c = 0;
        var x = {};

        for(x in this.state.citizenInfo){
            if (this.state.citizenInfo[x].age){
                if(this.state.citizenInfo[x].age <= 18){
                    a++;
                }
                else if(this.state.citizenInfo[x].age >= 19 && this.state.citizenInfo[x].age <= 58){
                    b++;  
                }
                else if(this.state.citizenInfo[x].age >= 59){
                    c++;
                }
            }
        }

        this.setState({series: [a, b, c]});
    }

    render() {
        return (
        <div className="donut">
            <Chart options={this.state.options} series={this.state.series} type="donut" width="500" />
        </div>
        );
    }
}


class BmiPie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                labels: ['Underweight (Below 18.5)', 'Healthy Weight (18.5 to 14.9)', 'Overweight(25.0 to 29.9)', 'Obese (30.0 and above)'],
                title: {
                    text: "BMI Analysis",
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                      fontSize:  '25px',
                      fontWeight:  'bold',
                      fontFamily:  undefined,
                      color:  '#263238'
                    },
                },
            },
            series: [0, 0, 0, 0],
            labels: ['Underweight (Below 18.5)', 'Healthy Weight (18.5 to 14.9)', 'Overweight(25.0 to 29.9)', 'Obese (30.0 and above)'],
            citizenInfo: [{}, {}]
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/viewstats`, {
        })
        .then(res => {
            this.setState({ citizenInfo: res.data });
            console.log(this.state.citizenInfo)
            this.counter();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    counter(){
        var a = 0;
        var b = 0;
        var c = 0;
        var d = 0;
        var x = {};

        for(x in this.state.citizenInfo){
            if (this.state.citizenInfo[x].bmi){
                if(this.state.citizenInfo[x].bmi < 18.5){
                    a++;
                }
                else if(this.state.citizenInfo[x].bmi >= 18.5 && this.state.citizenInfo[x].bmi < 25){
                    b++;  
                }
                else if(this.state.citizenInfo[x].bmi >= 25.0 && this.state.citizenInfo[x].bmi < 30){
                    c++;
                }
                else if(this.state.citizenInfo[x].bmi >= 30){
                    d++;
                }
            }
        }

        this.setState({series: [a, b, c, d]});
    }

    render() {
        return (
        <div className="donut">
            <Chart options={this.state.options} series={this.state.series} type="donut" width="600" />
        </div>
        );
    }
}


class BedsBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []
                    // hosp names here
                },
                title: {
                    text: "Number of Beds available",
                    align: 'left',
                    margin: 10,
                    offsetX: 10,
                    offsetY: 0,
                    floating: false,
                    style: {
                      fontSize:  '25px',
                      fontWeight:  'bold',
                      fontFamily:  undefined,
                      color:  '#263238'
                    },
                },
            },
            series: [
                {
                    name: "series-1",
                    data: [],
                    // number of beds here
                }
            ],
            hospInfo: [{}, {}]
        };
    }

    componentDidMount(){
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/hospital/viewstats`, {
        })
        .then(res => {
            this.setState({ hospInfo: res.data });
            console.log(this.state.hospInfo);
            this.counter();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    counter(){
        var x = {};
        var names = [];
        var beds = [];

        for(x in this.state.hospInfo){
            if (this.state.hospInfo[x].name){
                names[x] = this.state.hospInfo[x].name;
                beds[x] = this.state.hospInfo[x].no_of_beds;
            }
        }

        this.setState({options: {xaxis: {categories: names}}, series: [{name: "No. of Beds", data: beds}]});
    }

    render() {
        return (
            <div className="app">
            <div className="row">
                <div className="mixed-chart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    width="500"
                />
                </div>
            </div>
            </div>
        );
    }
}


class CheckupPie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                labels: ['Last 1 Month', 'Last 2 to 3 Months', 'Beyond 3 months'],
                title: {
                    text: "Last Health Check-up",
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                      fontSize:  '25px',
                      fontWeight:  'bold',
                      fontFamily:  undefined,
                      color:  '#263238'
                    },
                },
            },
            series: [0, 0, 0],
            labels: ['Last 1 Month', 'Last 2 to 3 Months', 'Beyond 3 months'],
            citizenInfo: [{}, {}]
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/citizen/viewstats`, {
        })
        .then(res => {
            this.setState({ citizenInfo: res.data });
            console.log(this.state.citizenInfo)
            this.counter();
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    diff_months(dt2, dt1) {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4);
        return Math.abs(Math.round(diff));
    }

    counter(){
        var a = 0;
        var b = 0;
        var c = 0;
        var x = {};
        var d = new Date();

        for(x in this.state.citizenInfo){
            if (this.state.citizenInfo[x].last_checkup_date){

                var temp = new Date(this.state.citizenInfo[x].last_checkup_date);
                var diff = this.diff_months(d, temp);
                if(diff == 0 || diff == 1)
                    a++;
                else if(diff == 2 || diff == 3)
                    b++;
                else if(diff > 3)
                    c++;
            }
        }

        this.setState({series: [a, b, c]});
    }

    render() {
        return (
        <div className="donut">
            <Chart options={this.state.options} series={this.state.series} type="donut" width="600" />
        </div>
        );
    }
}



export {
    AgePie,
    BmiPie,
    BedsBar,
    CheckupPie,
};