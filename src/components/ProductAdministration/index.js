import React from 'react';
import {
    Breadcrumb, Row, Col, Progress, Icon, Button, Menu, message, Dropdown, Table, Divider, Tag, Timeline
} from 'antd';
import { Chart } from 'primereact/chart';
import './index.css';
import clients from './images/client.png';
import license1 from "./images/license1.png";
import license2 from './images/license2.png';
import license3 from './images/license3.png';
import license4 from './images/license4.png';



const doughData = {
    labels: ['A','B','C'],
    datasets: [
        {
            data: [300, 50, 100],
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

//table data column setting
const columns = [
    {
        title: 'Company Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Company Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'License Type',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color;
                    if (tag === 'License 4' || tag === 'License 3') {
                        color = 'volcano';
                    }
                    else if (tag === 'License 2') {
                        color = 'blue';
                    }
                    else if (tag === 'License 1') {
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
        name: 'Virtusa',
        email: 'abc@gmail.com',
        tags: ['License 1']
    },
    {
        key: '1',
        name: 'Mitra Innovations',
        email: 'def@gmail.com',
        tags: ['License 2']
    },
    {
        key: '1',
        name: 'Virtusa',
        email: 'ghi@gmail.com',
        tags: ['License 3']
    },
];

//data source for radar chart
const radarData = {
    datasets: [{
        data: [
            5,
            7,
            9,
            4,
        ],
        backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
        ],
        label: 'My dataset'
    }],
    labels: [
        "Platinum",
        "Gold",
        "Silver",
        "Bronze"
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


class ProductAdministration extends React.Component {

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
                            <Breadcrumb.Item>Product Admin Dashboard</Breadcrumb.Item>

                        </Breadcrumb>
                    </Col>
                    <Col span={1}>
                        <div id="components-dropdown-demo-dropdown-button">
                            <Dropdown overlay={menu}>
                                <Button>
                                    <img src="https://img.icons8.com/ios/20/000000/filter.png" alt="sorry no img" />
                                </Button>
                            </Dropdown>
                        </div>
                        {/* <Button type="primary"><img src="https://img.icons8.com/ios/20/000000/filter-filled.png" alt="sorry no img" /></Button> */}
                    </Col>
                </Row>


                {/* dashboard starts here  */}
                <div className="gutter-example" style={{ textAlign: "center" }}>

                    {/* the embedded and seperatd row  - row1 */}
                    <Row gutter={224}>

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
                                        <h1>Clients</h1>
                                        <h2>15</h2>

                                        <div>
                                            {/* <img src={ProjectIcon} alt="sorry no img" style={{ height: "8em" }} /> */}
                                            <img src={clients} alt="sorry no img" />
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
                                        width: "13em",
                                        textShadow: " 1px 2px 3px #c0c1c4",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }} className="res">
                                    <div>
                                        <h1>Platinum Licensed</h1>
                                        <h2>10</h2>

                                        <div>
                                            <img src={license1} alt="sorry no img" />
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
                                        width: "13em",
                                        textShadow: " 1px 2px 3px #c0c1c4",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }} className="res">
                                    <div>
                                        <h1>Gold Licensed</h1>
                                        <h2>5</h2>

                                        <div>
                                            <img src={license2} alt="sorry no img"  />
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
                                        width: "13em",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Silver Licensed</h1>
                                        <h2>5</h2>

                                        <div>
                                            <img src={license3} alt="sorry no img" />
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
                                        width: "13em",
                                        textShadow: " 1px 2px 3px #c0c1c4",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Bronze Licensed</h1>
                                        <h2>5</h2>

                                        <div>
                                            {/* <img src={EngineerIcon} alt="sorry no img" style={{ height: "8em" }} /> */}
                                            <img src={license4} alt="sorry no img" />
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

                            {/* polar area starts here */}
                            <Row>

                                <div
                                    style={{
                                        padding: 24,
                                        borderRadius: "0.2em",
                                        background: '#fff',
                                        minHeight: '250px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>

                                   
                                    {/* radar chart starts here */}
                                    <div>
                                        <div className="content-section introduction">
                                            <div className="feature-intro">
                                                <h1>License Feasibility</h1>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi adipisci dolores, saepe quae facilis ullam recusandae excepturi amet est facere? Animi, ratione.</p>
                                            </div>
                                        </div>

                                        <div className="content-section implementation">
                                            <Chart type="polarArea" data={radarData} />
                                        </div>
                                    </div>
                                    {/* radar chart ends here */}

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
                                    <h1>Our Consumers</h1>
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
                                minHeight: '27.1em',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                            }}>
                                
                            {/* progress area */}
                            <h1>Customer License Expiry Count</h1>
                            <div>
                                <h5 style={{textAlign: "left"}}>Company A</h5>
                                <Progress percent={30} status="active" strokeColor="#FF6B6C" />
                                <br/> <br/>
                                <h5 style={{textAlign: "left"}}>Company B</h5>
                                <Progress percent={50} status="active" strokeColor="#D8572A"/>
                                <br/>  <br/>
                                <h5 style={{textAlign: "left"}}>Company C</h5>
                                <Progress percent={70} status="active" strokeColor="#98CE00"/>
                                <br/> <br/>
                                <h5 style={{textAlign: "left"}}>Company D</h5>
                                <Progress percent={100} status="active" strokeColor="#F00699"/>
                                <br/> <br/>
                                <h5 style={{textAlign: "left"}}>Company E</h5>
                                <Progress percent={50} status="active" strokeColor="#1B998B"/>
                                
                            </div>

                        </div>
                        {/* seperator */}
                        <div style={{ marginBottom: "0.7em", marginTop: "1em" }}></div>

                            {/* doughnut chart */}
                            <div style={{
                                padding: 24,
                                background: '#fff',
                                borderRadius: "0.2em",
                                minHeight: '27.1em',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                            }}>
                                     <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DoughnutChart</h1>
                        <p>A doughnut chart is a variant of the pie chart, with a blank center allowing for additional information about the data as a whole to be included.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <Chart type="doughnut" data={doughData} />
                </div>

           
            </div>
                            </div>
                    </Col >     

                </Row >


            </React.Fragment >

        );
    }
}

export default ProductAdministration;