import { Modal, Button, Form, Icon, Input, Select, Row, Col } from "antd";
import React from "react";
import axios from "axios";

const { Option } = Select;
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const NameRegex = RegExp(/^[a-zA-Z]+$/);
const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);

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
class EmployeeAddModal extends React.Component {
  //post integration

  constructor(props) {
    super(props);

    this.state = {
      employeeautoId:"",
      employeeId: "",
      employeeName: "",
      employeeDesignation: "",
      employeeEmail: "",
      formerrors: {
        employeeId: "",
        employeeName: "",
        employeeEmail: ""
    },
      designations:[]
    };
    
    // this.onhandleChange = this.onhandleChange.bind(this);
    this.handlechange = this.handlechange.bind(this);
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
      console.log(_this.state.designations);
  
    });
  }

  onChangeEmployeeDesignation(value) {
    this.setState({
      employeeDesignation: `${value}`
    });
    console.log(this.state.employeeDesignation)
  }
  handlechange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "employeeId":
          if (!ValidRegex.test(value)) {
            formerrors.employeeId = "Invalid Id";
          } else if (value.length > 8) {
            formerrors.employeeId = "Should be less than 8 characters";
          } else {
            formerrors.employeeId = "";
          }
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
          : "Invalid email address";
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

    const serverport = {
      empId:this.state.employeeautoId,
      employeeid: this.state.employeeId,
      name: this.state.employeeName,
      designationid: this.state.employeeDesignation,
      email: this.state.employeeEmail
    };
    axios
      .post("http://localhost:8084/employeeservice/createemployee", serverport)
      .then(res => console.log(res.data) 
      );

      this.setState ({ visible: false });
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
      employeeId: "",
      employeeName: "",
      employeeDesignation: "",
      employeeEmail: "",
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
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="Employee Id">
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
                </Form.Item>
              </Col>
              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Employee Name"
                  hasFeedback
                  label="Employee name"
                  validateStatus={this.state.employeeName.validateStatus}
                  help={this.state.employeeName.errorMsg}>
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
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="Designation">
                  <Select
                    defaultValue="Select Designation"
                    style={{ width: 120 }}
                    onChange={this.onChangeEmployeeDesignation}
                  >
                    {this.state.designations.map(function(item, index){
                      return <Option key={index} value={item.designationid}>{item.designationname}</Option>
                      })}
                 
                  </Select>
                </Form.Item>
              </Col>

              <Col span={18} style={{ padding: "5px" }}>
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

  validateName = (name) => {
    if(name.length < 2){
      return {validateStatus: 'error', errorMsg: 'Name is short.'}
    }
  }
}

export default EmployeeAddModal;