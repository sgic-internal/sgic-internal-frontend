import { Modal, Button, Select } from 'antd';
import React from 'react';
import AddMember from './AddMember';
import axios from "axios";


const { Option, OptGroup } = Select;

export default class Allocation extends React.Component {
    state = {
        loading: false,
        visible: false,
        project:[],
        employee:[]
    };

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    showModal = () => {
        this.setState({
            visible: true,
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



    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Allocate
                </Button>
                <br />
                <Modal

                    style={{ top: 20 }}

                    visible={visible}
                    title="Allocating Members for Project"
                    width="60%"
                    height="30%"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancel
            </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk} theme="filled">
                            Submit
            </Button>,
                    ]}>
                    <div><Select defaultValue="Project" style={{ width: 200 }} onChange={this.handleChange}>
                        <OptGroup label="Projects">
                        {this.state.project.map(function(item, index){
                      return <Option key={index} value={item.pid}> {item.projectName}</Option> })}
                        {/* <Select>
                  
                    </Select> */}
                            {/* <Option value="School Management System">School Management System</Option>
                            <Option value="Defect Tracker System">Defect Tracker System</Option>
                            <Option value="Library Management System">Library Management System</Option>
                            <Option value="Wedding Hall System">Wedding Hall System</Option> */}
                        </OptGroup>
                    </Select></div>
                    <br />
                    <AddMember />
                </Modal>
            </div>
        );
    }
}
