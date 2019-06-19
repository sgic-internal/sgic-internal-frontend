import React from 'react';
import {
    Breadcrumb, Row, Col, Progress, Icon, Button, Menu, message, Dropdown
} from 'antd';
import { Chart } from 'primereact/chart';
import DashboardConfig from './DashboardConfig';
import './index.css';

// doughnut data
const doughnutData = {
    labels: ['UI', 'Functionality', 'Performance'],
    datasets: [
        {
            data: [100, 17, 20],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
};

// data for line chart
const lineChartData = {
    labels: ['First Release', '2nd Release', '3rd Release', '4th Release'],
    datasets: [
        {
            label: 'Severity',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#e41749',
            borderColor: '#e41749'
        },
        {
            label: 'Priority',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#004d61',
            borderColor: '#004d61'
        }
    ]
};

// handling the menu for filter
function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
}


// filter icon specs
const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">
            <Icon type="user" />
            Type 1
      </Menu.Item>
        <Menu.Item key="2">
            <Icon type="user" />
            Type 2
      </Menu.Item>
        <Menu.Item key="3">
            <Icon type="user" />
            Type 3
      </Menu.Item>
    </Menu>
);


class DefectDashboard extends React.Component {
    state = {
        percent: 70
    };
    /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */
    // constructor(props) {
    //     super(props);
    // }



    componentWillMount() {
    }



    render() {


        return (
            <React.Fragment>

                {/* BreadCrumbs */}

                <Row>
                    <Col span={23}>
                        <Breadcrumb style={{
                            marginBottom: '6px',
                            marginTop: '-10px'
                        }}>
                            <Breadcrumb.Item>Dashboard Component</Breadcrumb.Item>
                            <Breadcrumb.Item>Defect Dashboard</Breadcrumb.Item>

                        </Breadcrumb>
                    </Col>
                    <Col span={1}>
                        <div id="components-dropdown-demo-dropdown-button" style={{ marginLeft: "-2.1em" }}>
                            <DashboardConfig />
                        </div>
                        </Col>
                </Row>


                {/* dashboard starts here  */}
                <div className="gutter-example" style={{ textAlign: "center" }}>

                    {/* the embedded and seperatd row  - row1 */}
                    <Row gutter={25}>

                        {/* opened defects box */}
                        <Col className="gutter-row" span={6} style={{ minHeight: "4em" }}>

                            {/* opened defects box */}
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        minHeight: '80%',
                                        textShadow: " 1px 6px 7px #c0c1c4",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }} className="res">
                                    <div>
                                        <h1>Opened Defects</h1>
                                        <br></br>
                                        <div>
                                            <Progress strokeColor="454d66" type="dashboard" percent="60" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* fixed defects box */}
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        textShadow: " 1px 6px 7px #c0c1c4",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Fixed Defects</h1>
                                        <br></br>
                                        <div>
                                            <Progress strokeColor="ff8a5c" type="dashboard" percent="20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* reopened defects box */}
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        border: "#605877",
                                        textShadow: " 1px 6px 7px #c0c1c4",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Reopened Defects</h1>
                                        <br></br>
                                        <div>
                                            <Progress strokeColor="58b368" type="dashboard" percent="30" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Rejected defects box */}
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        border: "#605877",
                                        textShadow: " 1px 6px 7px #c0c1c4",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Rejected Defects</h1>
                                        <br></br>
                                        <div>
                                            <Progress strokeColor="e41749" type="dashboard" percent="20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>



                {/* Row 2 for big area */}
                <Row gutter={10} style={{ textAlign: "center" }}>

                    {/* column 1 for row 2.. it includes 2 rows to seperate vertically  */}
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box" >

                            {/* progress lines starts here */}
                            <Row>

                                <div
                                    style={{
                                        padding: 24,
                                        borderRadius: "0.2em",
                                        background: '#fff',
                                        minHeight: '250px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>

                                    <h1>Severity Meter</h1>
                                    <br />


                                    {/* Progress bar 1 - line */}
                                    <Progress
                                        strokeColor={{
                                            '0%': '#834d9b',
                                            '100%': '#d04ed6',
                                        }}
                                        percent={39.9}
                                        status="active"
                                    />
                                    <div style={{ minHeight: "0.8em" }}></div>


                                    {/* Progress bar 2 - line */}
                                    <Progress
                                        strokeColor={{
                                            from: '#1e3c72',
                                            to: '#2a5298',
                                        }}
                                        percent={49.9}
                                        status="active"
                                    />
                                    <div style={{ minHeight: "0.8em" }}></div>


                                    {/* Progress bar 3 - line */}
                                    <Progress
                                        strokeColor={{
                                            '0%': '#fd746c',
                                            '100%': '#ff9068',
                                        }}
                                        percent={59.9}
                                        status="active"
                                    />
                                    <div style={{ minHeight: "0.8em" }}></div>


                                    {/* Progress bar 4 - line */}
                                    <Progress
                                        strokeColor={{
                                            from: '#C02425',
                                            to: '#F0CB35',
                                        }}
                                        percent={89.9}
                                        status="active"
                                    />
                                </div>
                            </Row>
                            {/* progress lines starts here */}

                            {/* little seperator between progress bar and line chart */}
                            <div style={{ marginBottom: "0.7em", marginTop: "1em" }}></div>

                            {/* line chart starts here */}
                            <Row>
                                <div
                                    style={{
                                        padding: 24,
                                        background: '#fff',
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <div className="content-section introduction">
                                            <div className="feature-intro">
                                                <h1>LineChart</h1>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima doloribus aut eius atque ne</p>
                                            </div>
                                        </div>

                                        <div className="content-section implementation">
                                            <h3>Basic</h3>
                                            <Chart type="line" data={lineChartData} />
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            {/* line chart ends here */}
                        </div>

                    </Col >

                    {/* alignment adjuster */}
                    <div style={{ marginBottom: "0.6em" }}></div>

                    {/* Column 2 of Row 2 */}
                    < Col className="gutter-row" span={12} >
                        <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                borderRadius: "0.2em",
                                minHeight: '48.2em',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                            }}>

                            {/* Doughnut Chart starts here*/}
                            <div>
                                <div className="content-section introduction">
                                    <div className="feature-intro">
                                        <h1>DoughnutChart</h1>
                                        <br></br>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo quod facere minima. Perferendis recusandae accusamus architecto enim aut. Et minima neque suscipit quaerat veritatis. Ipsa perspiciatis nisi vero quae aperiam!</p>
                                    </div>
                                </div>
                                <br /><br /><br />
                                <div className="content-section implementation">
                                    <Chart height="220px" type="doughnut" data={doughnutData} />
                                </div>

                            </div>
                        </div>
                    </Col >

                </Row >


            </React.Fragment >

        );
    }
}

export default DefectDashboard;
