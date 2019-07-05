import {
  Modal,
  Button,
  Form,
  Icon,
  Input,
  Select,
  Row,
  Col,
  Alert
} from "antd";
import React from "react";
import axios from "axios";
import Employee from "./Employee";
import { object } from "prop-types";

//import EmployeeDataService from './EmployeeDataService';

const { Option } = Select;
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const NameRegex = RegExp(/^[a-zA-Z]+$/);

const formValid = ({ formerrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formerrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class App extends React.Component {
  //post integration

  constructor(props) {
    super(props);

    this.state = {
      employeeId: "",
      employeeName: "",
      employeeDesignation: "",
      employeeEmail: "",
      formerrors: {
        employeeId: "",
        employeeName: "",
        employeeEmail: ""
      }
    };
    this.handlechange = this.handlechange.bind(this);
    this.onChangeEmployeeDesignation = this.onChangeEmployeeDesignation.bind(
      this
    );
    this.handleOk = this.handleOk.bind(this);
  }

  onChangeEmployeeDesignation(value) {
    this.setState({
      employeeDesignation: `${value}`
    });
    //console.log(this.state.employeeDesignation)
  }

  handlechange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    // console.log("Name: ", name);
    // console.log("value: ", value);
    switch (name) {
      case "employeeId":
        formerrors.employeeId =
          value.length > 8 ? "Should have 8 characters" : "";
        break;
      case "employeeName":
        if (!NameRegex.test(value)) {
          formerrors.employeeName = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.employeeName = "Should be less than 30 characters";
        } else {
          formerrors.employeeName = "";
        }
        break;
      case "employeeEmail":
        formerrors.employeeEmail = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      default:
        break;
    }

    this.setState({ formerrors, [name]: value }, () => console.log(this.state));
  };

  handleOk = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.info(`
        --SUBMITTING--
        Employee Id: ${this.state.employeeId}
        Employee Name: ${this.state.employeeName}
        Employee Email: ${this.state.employeeEmail}
       
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

    // this.setState({
    //   employeeId: "",
    //   employeeName: "",
    //   employeeDesignation: "USER",
    //   employeeEmail: "",
    //   visible: false
    // });
    const serverport = {
      empId: this.state.employeeId,
      name: this.state.employeeName,
      designation: this.state.employeeDesignation,
      email: this.state.employeeEmail
    };
    axios
      .post("http://localhost:8084/employeeservice/createemployee", serverport)
      .then(res => console.log(res.data));


    alert("New Employee Record Added Successfully!!!") 
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
    const { formerrors } = this.state;
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
              <Col span={10} style={{ padding: "5px" }}>
                <Form.Item label="Employee Id">
                  <div className="employeeId">
                    <Input
                      className={
                        formerrors.employeeId.length > 0 ? "error" : null
                      }
                      placeholder="Employee Id"
                      value={this.state.employeeId}
                      name="employeeId"
                      type="text"
                      onChange={this.handlechange}
                    />

                    {formerrors.employeeId.length > 0 && (
                      <span
                        className="error"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {formerrors.employeeId}
                      </span>
                    )}
                  </div>
                </Form.Item>
              </Col>
              <Col span={14} style={{ padding: "5px" }}>
                <Form.Item label="Employee Name">
                  <Input
                    className={
                      formerrors.employeeName.length > 0 ? "error" : null
                    }
                    placeholder="Employee Name"
                    value={this.state.employeeName}
                    onChange={this.handlechange}
                    name="employeeName"
                    type="text"
                  />

                  {formerrors.employeeName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.employeeName}
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={10} style={{ padding: "5px" }}>
                <Form.Item label="Designation">
                  <Select
                    placeholder="Select Designation"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    value={this.state.employeeDesignation}
                    onChange={this.onChangeEmployeeDesignation}
                    name="designation"
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

              <Col span={14} style={{ padding: "5px" }}>
                <Form.Item label="Email">
                  <Input
                    className={
                      formerrors.employeeEmail.length > 0 ? "error" : null
                    }
                    placeholder="Email"
                    value={this.state.employeeEmail}
                    //     value={this.state.employeeEmail}
                    onChange={this.handlechange}
                    name="employeeEmail"
                    type="text"
                  />
                  {formerrors.employeeEmail.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.employeeEmail}
                    </span>
                  )}
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