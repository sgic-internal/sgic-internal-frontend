import { Modal, Button, Form, Icon, Input, Select, Row, Col } from "antd";
import React from "react";
import axios from "axios";
import Employee from "./Employee";

//import EmployeeDataService from './EmployeeDataService';

const { Option } = Select;

class EmployeeAddModal extends React.Component {
  //post integration

  constructor(props) {
    super(props);

    this.state = {
      employeeId: {
          value: ''
      },
      employeeName: {
        value: ''
    },
      employeeDesignation: {
        value: ''
    },
      employeeEmail: {
        value: ''
    },
      designations:[]
    };
    this.onhandleChange = this.onhandleChange.bind(this);
    this.fetchDesignations = this.fetchDesignations.bind(this);
    this.onChangeEmployeeDesignation = this.onChangeEmployeeDesignation.bind(this);
    this.handleOk = this.handleOk.bind(this);


  }

  componentDidMount(){
 

    this.fetchDesignations();
      console.log("mounting");
  }

  fetchDesignations() {
    var _this = this;
    axios.get('http://localhost:8084/employeeservice/getAllDesignation')
    .then(function (response) {
      // handle success
      console.log(response.data);
     _this.setState({designations: response.data});
    //   this.setState(prevState => ({
    //     designations: {                   // object that we want to update
    //         ...prevState,    // keep all other key-value pairs
    //         designations: response.data       // update the value of specific key
    //     }
    // }))
      console.log(_this.state.designations);
  
    });
  }



  onhandleChange(e, validateFunc) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
  
    
    this.setState({
      [inputName]: {
          value: inputValue,
          ...validateFunc(inputValue)
     }
    });
  }

  onChangeEmployeeDesignation(value) {
    this.setState({
      employeeDesignation: `${value}`
    });
    console.log(this.state.employeeDesignation)
  }


  handleOk = e => {
    e.preventDefault();
    const serverport = {
      empId: this.state.employeeId.value,
      name: this.state.employeeName.value,
      id: this.state.employeeDesignation,
      email: this.state.employeeEmail.value
    };

    console.log(serverport);
    axios
      .post("http://localhost:8084/employeeservice/createemployee", serverport)
      .then(res => console.log(res.data));

  
  };

  // post integration finishes
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Employee
        </Button>
        <Modal
          title="Add Employee"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="550px"
        >
          <Form>
            <Row>
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="Employee Id">
                  <Input
                    name="employeeId"
                    placeholder="Employee Id"
                    value={this.state.employeeId.value}
                    onChange={(event) => this.onhandleChange(event,this.validateName)}
                  />
                </Form.Item>
              </Col>
              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Employee Name"
                  hasFeedback
                  label="Employee name"
                  validateStatus={this.state.employeeName.validateStatus}
                  help={this.state.employeeName.errorMsg}>
                  <Input
                    placeholder="Employee Name"
                    name="employeeName"
                    value={this.state.employeeName.value}
                    onChange={(event) => this.onhandleChange(event,this.validateName)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="designation">
                  <Select
                    defaultValue="Select Designations"
                    style={{ width: 120 }}
                    onChange={this.onChangeEmployeeDesignation}
                  >
                    {this.state.designations.map(function(item, index){
                      return <Option key={index} value={item.id}>{item.designation}</Option>
                      })}
                 
                  </Select>
                </Form.Item>
              </Col>

              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Email">
                  <Input
                    placeholder="Email"
                    name="employeeEmail"
                    value={this.state.employeeEmail.value}
                    onChange={(event) => this.onhandleChange(event,this.validateName)}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* <Col span={7} style={{ padding: "5px" }}>
                <Form.Item label="Gender">
                  <Select placeholder="Gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </Col> */}
            {/* <Col span={9} style={{ padding: "5px" }}>
                <Form.Item label="Contact No">
                  <Input placeholder="Contact No" />
                </Form.Item>
              </Col> */}

            {/* <Row>
              
              <Col span={9} style={{ padding: "5px", marginTop: "44px" }}>
                <Button>
                  <Icon type="upload" /> Upload Picture
                </Button>
              </Col>
            </Row> */}
          </Form>
        </Modal>
      </div>
    );
  }

  validateName = (name) => {
    if(name.length < 2){
      return {validateStatus: 'error', errorMsg: 'Name is short.'}
    }
  }
}

export default EmployeeAddModal;