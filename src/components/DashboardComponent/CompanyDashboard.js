import React from 'react';
import {
    Breadcrumb, Row, Col, Icon, Button, Menu, message, Dropdown, Table, Tag, Timeline
} from 'antd';
import { Chart } from 'primereact/chart';
import './index.css';
import QALeadIcon from './images/qalead.png';
import QAIcon from './images/qa.png';
import DashboardConfig from './DashboardConfig';

//table data column setting
const columns = [
    {
        title: 'Company Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Project Title',
        dataIndex: 'projecttitle',
        key: 'Project Title',
    },
    {
        title: 'Project Duration',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: 'Deadline',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color;
                    if (tag === '10 Days' || tag === '20 Days' || tag === '30 Days') {
                        color = 'volcano';
                    }
                    else if (tag === '40 Days' || tag === '50 Days' || tag === '60 Days' || tag === '1 month') {
                        color = 'blue';
                    }
                    else if (tag === '70 Days' || tag === '80 Days') {
                        color = "green"
                    }

                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    }
];

//data for the table
const tabledata = [
    {
        key: '1',
        name: 'British Telecom',
        projecttitle: 'Project 1',
        duration: '6 months',
        tags: ['20 Days']
    },
    {
        key: '2',
        name: 'ThomasCook Money',
        projecttitle: 'Project 2',
        duration: '4 months',
        tags: ['50 Days']
    },
    {
        key: '3',
        name: 'Manhattan Navigators',
        projecttitle: 'Project 3',
        duration: '2 months',
        tags: ['70 Days']
    },
];

// data for line bar
const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: '#9CCC65',
            data: [28, 48, 40, 19, 86, 27, 90]
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


class CompanyDashboard extends React.Component {

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
                            <Breadcrumb.Item>Company Dashboard</Breadcrumb.Item>

                        </Breadcrumb>
                    </Col>
                    <Col span={1} >
                        <div id="components-dropdown-demo-dropdown-button" style={{ marginLeft: "-2.1em" }}>
                            <DashboardConfig />
                        </div>
                        {/* <Button type="primary"><img src="https://img.icons8.com/ios/20/000000/filter-filled.png" alt="sorry no img" /></Button> */}
                    </Col>
                </Row>


                {/* dashboard starts here  */}
                <div className="gutter-example" style={{ textAlign: "center" }}>

                    {/* the embedded and seperatd row  - row1 */}
                    <Row gutter={7}>

                        {/*projects box */}
                        <Col className="gutter-row" span={4}>

                            {/* opened defects box */}
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        minHeight: '80%',
                                        width: "12.4em",
                                        textShadow: " 1px 2px 3px #c0c1c4",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }} className="res">
                                    <div>
                                        <h1>Projects</h1>
                                        <h2>5</h2>

                                        <div>
                                            {/* <img src={ProjectIcon} alt="sorry no img" style={{ height: "8em" }} /> */}
                                            <img src="https://img.icons8.com/clouds/112/000000/combo-chart.png" alt="sorry no img" />
                                            {/* <Progress strokeColor="454d66" type="dashboard" percent="60" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* project manager box */}
                        <Col className="gutter-row" span={4}>

                            {/* opened defects box */}
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        minHeight: '80%',
                                        width: "12.4em",
                                        textShadow: " 1px 2px 3px #c0c1c4",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }} className="res">
                                    <div>
                                        <h1>Project Managers</h1>
                                        <h2>5</h2>

                                        <div>
                                            <img src="https://img.icons8.com/clouds/112/000000/training.png" alt="sorry no img" />
                                            {/* <img src={ProjectManagerIcon} alt="sorry no img" style={{ height: "8em" }} /> */}
                                            {/* <Progress strokeColor="454d66" type="dashboard" percent="60" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* qalead box */}
                        <Col className="gutter-row" span={4}>

                            {/* opened defects box */}
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        minHeight: '80%',
                                        width: "12.4em",
                                        textShadow: " 1px 2px 3px #c0c1c4",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }} className="res">
                                    <div>
                                        <h1>QA Leads</h1>
                                        <h2>5</h2>

                                        <div>
                                            <img src={QALeadIcon} alt="sorry no img" style={{ height: "8em" }} />
                                            {/* <Progress strokeColor="454d66" type="dashboard" percent="60" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* techlead box */}
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        textShadow: " 1px 2px 3px #c0c1c4",
                                        width: "12.4em",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Tech Leads</h1>
                                        <h2>5</h2>

                                        <div>
                                            <img src="https://img.icons8.com/clouds/112/000000/mind-map.png" alt="sorry no img" />
                                            {/* <img src={TechLeadIcon} alt="sorry no img" style={{ height: "8em" }} /> */}
                                            {/* <Progress strokeColor="454d66" type="dashboard" percent="60" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* software Engineer box */}
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        border: "#605877",
                                        width: "12.4em",
                                        textShadow: " 1px 2px 3px #c0c1c4",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Software Engineers</h1>
                                        <h2>5</h2>

                                        <div>
                                            {/* <img src={EngineerIcon} alt="sorry no img" style={{ height: "8em" }} /> */}
                                            <img src="https://img.icons8.com/clouds/112/0200000/under-computer.png" alt="sorry no img" />
                                            {/* <Progress strokeColor="454d66" type="dashboard" percent="60" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* qa engineer box */}
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        border: "#605877",
                                        width: "12.4em",
                                        textShadow: " 1px 2px 3px #c0c1c4",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>QA Engineers</h1>
                                        <h2>5</h2>

                                        <div>
                                            <img src={QAIcon} alt="sorry no img" style={{ height: "8em" }} />
                                            {/* <Progress strokeColor="454d66" type="dashboard" percent="60" /> */}
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

                                    <h1>Productivity Meter</h1>
                                    <Chart type="bar" data={lineChartData} />


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
                                    <h1>Our Clients</h1>
                                    <br></br>
                                    <Table columns={columns} dataSource={tabledata} />
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
                                        <h1>Timeline</h1>
                                        <br></br>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo quod facere minima. Perferendis recusandae accusamus architecto enim aut. Et minima neque suscipit quaerat veritatis. Ipsa perspiciatis nisi vero quae aperiam!</p>
                                    </div>
                                </div>
                                <br />

                                {/* timeline area starts here */}
                                <div className="content-section implementation">
                                    <Timeline mode="alternate">
                                        <Timeline.Item>Create a services site 2019-09-01</Timeline.Item>
                                        <Timeline.Item color="green">Solve initial network problems 2019-09-01</Timeline.Item>
                                        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                                            beatae vitae dicta sunt explicabo.
                                    </Timeline.Item>
                                        <Timeline.Item color="red">Network problems being solved 2019-09-01</Timeline.Item>
                                        <Timeline.Item>Create a services site 2019-09-01</Timeline.Item>
                                        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                                            Technical testing 2019-09-01
                                    </Timeline.Item>
                                        <Timeline.Item dot={<Icon type="play-circle" />}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, quasi quibusdam officiis illum hic cum temporibusluptatum
                                        </Timeline.Item>
                                        <Timeline.Item color="green">
                                            Lorem ipsum dolor sit amet consectetur adipisicingsfdasjh cufsrjhgsfgbm temporibusluptatum
                                        </Timeline.Item>
                                    </Timeline>
                                </div>
                                {/* timeline area ends here */}

                            </div>
                        </div>
                    </Col >

                </Row >


            </React.Fragment >

        );
    }
}

export default CompanyDashboard;
