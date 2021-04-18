import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';


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
        axios.get('http://localhost:5000/citizen/viewstats', {
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
        axios.get('http://localhost:5000/citizen/viewstats', {
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

export {
    AgePie,
    BmiPie,
};