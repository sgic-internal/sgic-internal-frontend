import { Modal, Button, Form, Row, Col, Input, DatePicker, Select,message } from "antd";
import React from "react";
import axios from "axios";

import { object } from "prop-types";

function confirm(e){
  console.log(e)
  message.success("Delete Successfully!");
}


//import ProjectDataService from './ProjectDataService';
const { MonthPicker, RangePicker } = DatePicker;

const NameRegex = RegExp(/^[a-zA-Z]+$/);
const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);
const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};

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



export default class Model extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);

    this.state = {
      projectId: "",
      projectName: "",
      type: "",
      startDate: "",
      endDate: "",
      duration: "",
      status: "",
      visible: false,
      formerrors: {
        projectId: "",
        projectName: "",
        type: "",
        startDate: "",
        endDate: "",
        duration: "",
        status: ""


      }
      // configId: "",

    };
  }

  handlechange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "projectId":
        if (!ValidRegex.test(value)) {
          formerrors.projectId = "Invalid Id";
        } else if (value.length > 8) {
          formerrors.projectId = "Should be less than 8 characters";
        } else {
          formerrors.projectId = "";
        }
        break;
      case "projectName":
        if (!NameRegex.test(value)) {
          formerrors.projectName = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.projectName = "Should be less than 70 characters";
        } else {
          formerrors.projectName = "";
        }
        break;

      case "type":
        if (!NameRegex.test(value)) {
          formerrors.type = "Invalid type";
        } else if (value.length > 30) {
          formerrors.type = "Should be less than 30 characters";
        } else {
          formerrors.type = "";
        }
        break;


      case "startDate":
        if (!NameRegex.test(value)) {
          formerrors.startDate = "Invalid start date";
        } else if (value.length > 30) {
          formerrors.startDate = "Should be less than 30 characters";
        } else {
          formerrors.startDate = "";
        }
        break;

      case "endDate":
        if (!NameRegex.test(value)) {
          formerrors.endDate = "Invalid end date";
        } else if (value.length > 30) {
          formerrors.endDate = "Should be less than 30 characters";
        } else {
          formerrors.endDate = "";
        }
        break;

      case "duration":
        if (!ValidRegex.test(value)) {
          formerrors.duration = "Invalid Duration";
        } 
        else if (value.length > 30) {
          formerrors.duration = "Should be less than 30 characters";
       } 
        else {
          formerrors.duration = "";
        }
        break;

      case "status":
        if (!NameRegex.test(value)) {
          formerrors.status = "Invalid status";
        } else if (value.length > 30) {
          formerrors.status = "Should be less than 30 characters";
        } else {
          formerrors.status = "";
        }
        break;
      default:
        break;
    }
    this.setState({ formerrors, [name]: value }, () => console.log(this.state));
  };
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Project Id :${this.state.projectId}
        Project Name: ${this.state.projectName}
        Type : ${this.state.type}
        startDate: ${this.state.startDate}
        endDate: ${this.state.endDate}
        duration:${this.state.duration}
        status:${this.state.status}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  onChangeprojectId(e) {
    this.setState({
      projectId: e.target.value
    });
  }
  onChangeprojectName(e) {
    this.setState({
      projectName: e.target.value
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }
  onChangeStartDate=(date, dateString)=> {
    // this.setState({startDate: dateString});

    this.setState({ startDate: dateString }, () =>
      console.log(this.state.startDate)
    );

    console.log(this.state.startDate);
  }
  onChangeEndDate=(date, dateString)=> {
    this.setState({ endDate: dateString }, () =>
      console.log(this.state.endDate)
    );

    console.log(this.state.endDate);
  }
  onChangeDuration=(e) =>{
    this.setState({
      duration: e.target.value
    });
  }
  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }
  // onChangeconfigId(e) {
  //   this.setState({
  //     configId: e.target.value
  //   });
  // }

  state = {
    disabled: true,
    visible: false
  };

  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  onChange = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      checked: e.target.checked
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    e.preventDefault();

    const projectData = {
      projectId: this.state.projectId,
      projectName: this.state.projectName,
      type: this.state.type,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      duration: this.state.duration,
      status: this.state.status
      // configId: this.state.configId
    };
    console.log("dddddddddddddddddddd"+projectData)
    axios
      .post("http://localhost:8081/defectservices/createproject/", projectData)
      .then(res => console.log(res.data));

    this.setState({
      projectId: "",
      projectName: "",
      type: "",
      startDate: "",
      endDate: "",
      duration: "",
      status: "",

      visible: false
    });
    message.success("Added Successfully!");
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
   
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "projectName":
        formErrors.projectName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "type":
        formErrors.type =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {

    const { formerrors } = this.state;

    // const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Project
        </Button>
        <br />
        <Modal
          title="Add Project"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
        >
          {/* <Form layout="vertical"> */}
          <form layout="vertical" onSubmit={this.handleSubmit} noValidate>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Id">
                  <Input
                    className={
                      formerrors.projectId.length > 0 ? "error" : null}
                    placeholder="Project Id"
                    name="projectId"
                    value={this.state.projectId}
                    // onChange={this.onChangeprojectId}
                    onChange={this.handlechange}
                  />
                  {formerrors.projectId.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.projectId}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Name"
                  validateStatus={this.state.projectName.validateStatus}
                  help={this.state.projectName.errorMsg}>
                  <Input
                    className={
                      formerrors.projectName.length > 0 ? "error" : null}
                    placeholder="Project Name"
                    name="projectName"
                    value={this.state.projectName}
                    // onChange={this.onChangeprojectName}
                    onChange={this.handlechange}
                  />
                  {formerrors.projectName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.projectName}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Type">
                  <Input
                    placeholder="Type"
                    name="type"
                    value={this.state.type}
                    // onChange={this.onChangeType}
                    onChange={this.handlechange}
                  />

                  {formerrors.type.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}>
                      {formerrors.type}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>

              <Col span={8}>
                <Form.Item label="Start Date">
                  <Form.Item>
                    <DatePicker
                      placeholder="Start Date"
                      name="startDate"
                      startDate={this.state.startDate}
                      onChange={this.onChangeStartDate}
                    
                    />
                    {formerrors.startDate.length > 0 && (
                      <span
                        className="error"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {formerrors.startDate}
                      </span>
                    )}
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="End Date">
                  <Form.Item>
                    <DatePicker
                      placeholder="End Date"
                      name="endDate"
                      endDate={this.state.endDate}
                      onChange={this.onChangeEndDate}
                      // onChange={this.handlechange}
                    />
                    {formerrors.endDate.length > 0 && (
                      <span
                        className="error"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {formerrors.endDate}
                      </span>
                    )}
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Duration">
                  <Input
                    placeholder="Duration"
                    name="duration"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    // onChange={this.handlechange}
                  />
                  {formerrors.duration.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.duration}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>

              <Col span={12}>
                <Form.Item label="Status">
                  <Input
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    // onChange={this.onChangeStatus}
                    onChange={this.handlechange}
                  />
                  {formerrors.status.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.status}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>

              {/* <Col span={8}>
                <Form.Item label="Config Id">
                  <Input
                    placeholder="Config Id"
                    value={this.state.configId}
                    onChange={this.onChangeconfigId}
                  />
                </Form.Item>{" "}
              </Col> */}
            </Row>
          </form>
        </Modal>
      </div>
    );
  }
}
