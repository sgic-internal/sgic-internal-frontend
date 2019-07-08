import React, { Component } from 'react';
import { Table, Tag, Row, Col, Progress, Select } from 'antd';

import Allocation from './Allocation';
import axios from "axios";

const { Option, OptGroup } = Select;




export class Allocate extends Component {

    state = {
        filteredInfo: null,
        sortedInfo: null,
        Allocation:[], 
        project:[],
        employee:[]
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    componentDidMount() {
    
        this.fetchProjects();
        console.log("mounting");
        // this.GetAllproject();
        this.fetchEmployee();
      }

    fetchProjects() {
        var _this = this;
        axios.get('http://localhost:8081/defectservices/GetAllproject')
        .then(function (response) {
          // handle success
          console.log(response.data);
         _this.setState({ project: response.data});    
          console.log(_this.state.project);
      
        });
      }


      
      fetchEmployee() {
        var _this = this;
        axios.get('http://localhost:8081/defectservices/GetAllresources')
        .then(function (response) {
          // handle success
          console.log(response.data);
         _this.setState({ employee: response.data});    
          console.log(_this.state.employee);
      
        });
      }



    render() {
        const columns = [

            {
                title: 'EmpID',
                dataIndex: 'employeeid',
                key: 'employeeid',
            },
            {
                title: 'Employee Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Designation',
                key: 'designationname',
                dataIndex: 'designationname',
                // render: tags => (
                //     <span>
                //         {tags.map(tag => {
                //             let color = tag.length > 5 ? 'geekblue' : 'green';
                //             if (tag === 'Dev') {
                //                 color = 'volcano';
                //             }
                //             return (
                //                 <Tag color={color} key={tag}>
                //                     {tag.toUpperCase()}
                //                 </Tag>
                //             );
                //         })}
                //     </span>
                // ),
            },

            {
                title: 'Employee Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Availability',
                dataIndex: 'availability',
                key: 'availability',
                render: () => (<Progress type="circle" percent={0} width={40} />)
            }
        ];
        return (

            <div className="gutter-example">
                <Row gutter={16}>
                    <div style={{ float: "right" }}> <Allocation /></div>
                    <div><Select defaultValue="Select Project" style={{ width: 200 }} onChange={this.handleChange}>
                        <OptGroup label="Projects">
                        {this.state.project.map(function(item, index){
                      return <Option key={index} value={item.pid}> {item.projectName}</Option> })}
                            {/* <Option value="School Management System">School Management System</Option>
                            <Option value="Defect Tracker System">Defect Tracker System</Option>
                            <Option value="Library Management System">Library Management System</Option>
                            <Option value="Wedding Hall System">Wedding Hall System</Option> */}
                        </OptGroup>
                    </Select></div>


                    <br />
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box"> 
                        
                        <Table columns={columns} dataSource={this.state.employee} />
                        
                        
                        </div>
                    </Col>
                </Row>
            </div >

        )
    }
}

export default Allocate
