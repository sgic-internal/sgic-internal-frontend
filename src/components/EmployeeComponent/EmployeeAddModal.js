import { Modal, Button, Form, Icon, Input, Select, Row, Col } from "antd";
import React from "react";
import axios from "axios";
import Employee from "./Employee";

//import EmployeeDataService from './EmployeeDataService';

const { Option } = Select;

export default class App extends React.Component {
  //post integration

  constructor(props) {
    super(props);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
    this.onChangeEmployeeDesignation = this.onChangeEmployeeDesignation.bind(
      this
    );
    this.handleOk = this.handleOk.bind(this);

    this.state = {
      employeeId: "",
      employeeName: "",
      employeeDesignation: "USER",
      employeeEmail: ""
    };
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value
    });
  }
  onChangeEmployeeName(e) {
    this.setState({
      employeeName: e.target.value
    });
  }

  onChangeEmployeeDesignation(value) {
    this.setState({
      employeeDesignation: `${value}`
    });
    //console.log(this.state.employeeDesignation)
  }
  onChangeEmployeeEmail(e) {
    this.setState({
      employeeEmail: e.target.value
    });
  }

  handleOk = e => {
    // e.preventDefault();
    console.log();
    const serverport = {
      empId: this.state.employeeId,
      name: this.state.employeeName,
      designation: this.state.employeeDesignation,
      email: this.state.employeeEmail
    };
    axios
      .post("http://localhost:8084/employeeservice/createemployee", serverport)
      .then(res => console.log(res.data));

    window.location.reload();

    this.setState({
      employeeId: "",
      employeeName: "",
      employeeDesignation: "USER",
      employeeEmail: "",
      visible: false
    });
    return <Employee />;
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
                    placeholder="Employee Id"
                    value={this.state.employeeId}
                    onChange={this.onChangeEmployeeId}
                  />
                </Form.Item>
              </Col>
              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Employee Name">
                  <Input
                    placeholder="Employee Name"
                    value={this.state.employeeName}
                    onChange={this.onChangeEmployeeName}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="Designation">
                  <Select
                    placeholder="Select Designation"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    //value={this.state.employeeDesignation}
                    onChange={this.onChangeEmployeeDesignation}
                  >
                    <Option value="ADMIN"> ADMIN</Option>
                    <Option value="USER"> USER</Option>
                    <Option value="HR">HR</Option>
                    <Option value="PM">PM</Option>
                    <Option value="QAL"> QAL</Option>
                    <Option value="TECL"> TECL</Option>
                    <Option value="QA"> QA</Option>
                    <Option value="DEV">DEV</Option>
                    <Option value="ASSOCQA"> ASSOCQA</Option>
                    <Option value="ASSOCDEV">ASSOCDEV</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Email">
                  <Input
                    placeholder="Email"
                    value={this.state.employeeEmail}
                    onChange={this.onChangeEmployeeEmail}
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
}
