import React from 'react';
import { Breadcrumb, Statistic, Card, Row, Col, Icon, Timeline, Divider, Progress, Table, Button } from 'antd';
import ChartBar from './assets/ChartBar';
import ChartPolar from './assets/ChartPolar';
//import PrimeReact from './PrimeReact';
import DashboardConfig from './DashboardConfig';

//table data
const data = [
    {
        id: '1',
        key: '1',
        name: 'Task Management System',
        member: 'Thuva, Kishanth, Romi',
    },
    {
        id: '2',
        key: '2',
        name: 'Hospital Management System',
        member: 'thuva, kishanth, romi',
    },
    {
        id: '3',
        key: '3',
        name: 'School Management System',
        member: 'Thuva',
    },

    {
        id: '4',
        key: '4',
        name: 'Defect Tracker',
        member: 'Thuviyan, Pratheepan, Romi',


    },
];
// Table data end

class ProjectManagerDashboard extends React.Component {
    // Chart Component




    //Table Declaration
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    setIdSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'id',
            },
        });
    };

    // table decalration End
    /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */


    componentDidMount() {
    }

    render() {
        // For Table functions
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id,
                sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            },
            {
                title: 'Project Name',
                dataIndex: 'name',
                key: 'name',
                filters: [{ text: 'Task', value: 'Task' }, { text: 'Management', value: 'Management' }],
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: 'Member',
                dataIndex: 'member',
                key: 'member',
                filters: [{ text: 'Thuva', value: 'Thuva' }, { text: 'Kishanth', value: 'Kishanth' }],
                filteredValue: filteredInfo.member || null,
                onFilter: (value, record) => record.member.includes(value),
                sorter: (a, b) => a.member.length - b.member.length,
                sortOrder: sortedInfo.columnKey === 'member' && sortedInfo.order,
            },

            {
                title: 'View Member',
                dataIndex: 'viewmember',
                key: 'viewmember',
                render: () => <Button style={{ marginLeft: '1rem' }}><Icon type="security-scan" /></Button>
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'edit',
                render: () => <Button type="primary">Edit</Button>
            },


        ];



        // Table functions End
        //Chart data

        // chart data end

        return (
            <React.Fragment>
                <Row>
                    <Col span={23}>
                        <Breadcrumb style={{
                            marginBottom: '6px',
                            marginTop: '-10px'
                        }}>

                            <Breadcrumb.Item>Dashboard Component</Breadcrumb.Item>
                            <Breadcrumb.Item>PM Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={1} >
                        <div id="components-dropdown-demo-dropdown-button" style={{ marginLeft: "-2.1em" }}>
                            <DashboardConfig />
                        </div>
                    </Col>
                </Row>
                <div style={{

                    padding: "0 0 10px 0 "



                }}>
                    <Row>
                        <Col span={6}>
                            <Card style={{ margin: "10px 5px 0 -2px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Success Ratio"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="safety-certificate" theme="filled" />}
                                    suffix="%"
                                />
                            </Card>



                        </Col>


                        <Col span={6}>
                            <Card style={{ margin: "10px 5px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Defects Ratio"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<Icon type="fund" theme="filled" />}
                                    suffix="%"
                                />
                            </Card></Col>

                        <Col span={6}>
                            <Card style={{ margin: "10px 5px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Software Engineers"
                                    value={11}

                                    valueStyle={{ color: '#333333' }}
                                    prefix={<Icon type="play-circle" />}

                                />
                            </Card></Col>
                        <Col span={6}>
                            <Card style={{ margin: "10px 2px", borderRadius: "5px" }}>
                                <Statistic
                                    title="QA Engineers"
                                    value={9}

                                    valueStyle={{ color: '#007673' }}
                                    prefix={<Icon type="sync" spin />}


                                />
                            </Card></Col>
                    </Row>
                </div>
                <div>



                    <div>
                        <br />
                    </div>

                    <Row style={{ margin: "-20px 0 0 0 " }}>
                        <Col span={12}>
                            <ChartBar />
                        </Col>
                        <Col span={12}>
                            <Card title="Defects Status" style={{ borderRadius: "5px", margin: "0 0 0 5px" }}>
                                <div >
                                    <label>New</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        percent={70} status="active"
                                    />
                                    <label>Opened</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#eee000',
                                            '100%': '#766766',
                                        }}
                                        percent={20} status="active"
                                    />
                                    <label>Fixed</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#11FF00',
                                            '100%': '#91C8F9',
                                        }}
                                        percent={60} status="active"
                                    />
                                    <label>Reopen</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#F60C0C',
                                            '100%': '#171515',
                                        }}
                                        percent={25} status="active"
                                    />
                                    <label>Closed</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#095725',
                                            '100%': '#B1FF29',
                                        }}
                                        percent={50} status="active"
                                    />
                                    <label>Rejected</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#FFF700',
                                            '100%': '#4BF90C',
                                        }}
                                        percent={10} status="active"
                                    />
                                    <label>Deferred</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#0A0A00',
                                            '100%': '#FF5500',
                                        }}
                                        percent={30} status="active"
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div>
                        <br />
                    </div>
                    <Row style={{ margin: "-10px 0 0 0 " }}>
                        <Col span={12}>
                            <ChartPolar />
                        </Col>
                        <Col span={12}>


                            <Card title="Ongoing Project Updates" style={{ minHeight: '22.4rem', height: '22.4rem', borderRadius: "5px", margin: "0 0 0 5px" }}>
                                <Timeline>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="red">
                                        Solve initial network problems 1
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        Technical testing
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        Manual testing
                                    </Timeline.Item>
                                    <Timeline.Item color="red">
                                        Solve initial network problems 2
                                    </Timeline.Item>
                                </Timeline>
                            </Card>

                        </Col>

                    </Row>

                    <div>
                        <br />
                    </div>

                    <div
                        style={{

                            padding: 24,
                            background: '#fff',
                            minHeight: '500px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                            borderRadius: "5px",
                            margin: "-10px 0 0 0 "
                        }}>


                        <Row >
                            <Col span={24}>
                                <div className="table-operations" >

                                    <Button onClick={this.clearFilters} type="primary">Clear filters</Button>

                                </div>
                                <div>
                                    <br />
                                </div>
                                <Table columns={columns} dataSource={data} onChange={this.handleChange} style={{ textAlign: "center", alignContent: "center", alignItems: "center" }} />


                            </Col>

                        </Row>




                    </div>
                </div>

            </React.Fragment>

        );
    }
}

export default ProjectManagerDashboard;
