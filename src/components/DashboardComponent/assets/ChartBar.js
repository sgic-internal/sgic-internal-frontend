import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'antd';
export default class ChartBar extends Component {

    render() {


        const multiAxisData = {
            labels: ['TMS', 'HMS', 'SMS ', 'DFS'],
            datasets: [{
                label: 'Defects',
                backgroundColor: [
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5',
                    '#7E57C2'

                ],
                yAxisID: 'y-axis-1',
                data: [65, 59, 80, 81]
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