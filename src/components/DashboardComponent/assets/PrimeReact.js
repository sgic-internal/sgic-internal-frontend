import React, { Component } from 'react';
import { Chart } from 'primereact/chart';

export default class PrimeReact extends Component {

    render() {


        const multiAxisData = {
            labels: ['John Brown', 'John Green', 'Joe Black', 'Jim Red'],
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

        const polardata = {
            datasets: [{
                data: [
                    217,
                    181,
                    153,
                    106,
                    105,
                    150,
                    170
                ],
                backgroundColor: [
                    '#2E04FF',
                    '#61FF33',
                    '#FF3333',
                    '#333300',
                    '#33FFCE',
                    '#FFD433',
                    '#A9A904',
                    '#C7FF33',
                ],
                label: 'defects'
            }],
            labels: [
                'New', 'Closed', 'Reopened', 'Fixed', 'Rejected', 'Opened', 'Deferred'
            ]
        };

        return (
            <div>


                <div className="content-section implementation">

                    <h3>Defects By Projects</h3>
                    <Chart type="bar" data={multiAxisData} options={multiAxisOptions} />

                </div>

                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Defects By Type</h1>

                    </div>
                </div>

                <div className="content-section implementation">
                    <Chart type="polarArea" data={polardata} />
                </div>
            </div>
        )
    }
}