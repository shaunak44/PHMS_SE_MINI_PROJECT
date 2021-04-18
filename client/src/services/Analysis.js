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
                      fontSize:  '14px',
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
            <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
        </div>
        );
    }
}

export {
    AgePie,
};