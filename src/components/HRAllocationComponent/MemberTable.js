import React, { Component } from 'react';
import { Table, Tag, Row, Col, Progress, Select } from 'antd';

import Allocation from './Allocation';

const { Option, OptGroup } = Select;

const columns = [

    {
        title: 'EmpID',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Role',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'Developer') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Availability',
        dataIndex: 'Availability',
        key: 'Availability',
        render: () => (<Progress type="circle" percent={30} width={40} />)
    }
];

const data = [
    {
        key: '1',
        name: 'John',
        age: 12,
        tags: ['Developer'],
    },
    {
        key: '2',
        name: 'Jim',
        age: 13,
        tags: ['QA'],
    },
    {
        key: '3',
        name: 'Joe',
        age: 14,
        tags: ['Developer'],
    },
];


export class Allocate extends Component {

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
    render() {
        return (

            <div className="gutter-example">
                <Row gutter={16}>
                    <div style={{ float: "right" }}> <Allocation /></div>
                    <div><Select defaultValue="Select Project" style={{ width: 200 }} onChange={this.handleChange}>
                        <OptGroup label="Projects">
                            <Option value="School Management System">School Management System</Option>
                            <Option value="Defect Tracker System">Defect Tracker System</Option>
                            <Option value="Library Management System">Library Management System</Option>
                            <Option value="Wedding Hall System">Wedding Hall System</Option>
                        </OptGroup>
                    </Select></div>


                    <br />
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box"> <Table columns={columns} dataSource={data} /></div>
                    </Col>
                </Row>
            </div >

        )
    }
}

export default Allocate
