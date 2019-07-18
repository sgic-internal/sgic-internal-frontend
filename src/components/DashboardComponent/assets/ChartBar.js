import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'antd';
import axios from 'axios';

export default class ChartBar extends Component {

    state={
        highsev:'',
        mediumsev:'',
        lowsev:''

    }

getHigh(){

        axios
        .get('http://localhost:8081/defectservices/getcounthigh')
        .then(res=>{
            console.log(res.data)
            this.setState({
                highsev:res.data
            })
        })
}

getMedium(){
    axios
    .get('http://localhost:8081/defectservices/getcountmudium')
    .then(res=>{
        console.log(res.data)
        this.setState({
            mediumsev:res.data
        })
    })
}

getLow(){
    axios
    .get('http://localhost:8081/defectservices/getlowcount')
    .then(res=>{
        console.log(res.data)
        this.setState({
            lowsev:res.data
        })
    })
}
componentDidMount(){
    this.getHigh();
    this.getMedium();
    this.getLow();
}


    render() {
console.log(this.state.highsev)

        const multiAxisData = {
            labels: ['High', 'Medium', 'Low '],
            datasets: [{
                label: 'Severity',
                backgroundColor: [
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5',
                    

                ],
                yAxisID: 'y-axis-1',
                data: [this.state.highsev, this.state.mediumsev, this.state.lowsev]
            }]
        };

        const multiAxisOptions = {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            }
        }



        return (
            <div>
                <Card title="Defects By Projects" style={{ margin: "0 5px 0 -2px", borderRadius: "5px" }}>



                    <Chart type="bar" data={multiAxisData} options={multiAxisOptions} style={{ padding: "0 0 50px 0" }} />


                </Card>



            </div>
        )
    }
}