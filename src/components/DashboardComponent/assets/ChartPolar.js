import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'antd';

export default class ChartBar extends Component {

    render() {



        const polardata = {
            datasets: [{
                data: [
                    140,
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

                <Card title="Defects Types" style={{ margin: "0 5px 0 -2px", borderRadius: "5px" }}>




                    <div className="content-section implementation" style={{ padding: "0 0 10px 0" }}>
                        <Chart type="polarArea" data={polardata} />
                    </div>
                </Card>
            </div>

        )
    }
}