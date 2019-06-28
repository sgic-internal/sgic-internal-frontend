import { Modal, Button, Form, Row, Col, Input, DatePicker } from "antd";
import React from "react";
import axios from "axios";

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
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
    this.onChangeprojectId = this.onChangeprojectId.bind(this);
    this.onChangeprojectName = this.onChangeprojectName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    // this.onChangeconfigId = this.onChangeconfigId.bind(this);
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
      formErrors: {
        projectId: "",
        projectName: "",
        type: "",
        startDate: "",
        endDate:"",
        duration:"",
        status:""


      }
      // configId: "",
     
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
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
  onChangeStartDate(date, dateString) {
    //this.setState({startDate: dateString});

    this.setState({ startDate: dateString }, () =>
      console.log(this.state.startDate)
    );

    console.log(this.state.startDate);
  }
  onChangeEndDate(date, dateString) {
    this.setState({ endDate: dateString }, () =>
      console.log(this.state.endDate)
    );

    console.log(this.state.endDate);
  }
  onChangeDuration(e) {
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
    axios
      .post("http://localhost:8081/project_service/createproject", projectData)
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
      // case "email":
      //   formErrors.email = emailRegex.test(value)
      //     ? ""
      //     : "invalid email address";
      //   break;
      // case "password":
      //   formErrors.password =
      //     value.length < 6 ? "minimum 6 characaters required" : "";
      //   break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }; 
  render() {
    const { formErrors } = this.state;
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
          <form layout="vertical"onSubmit={this.handleSubmit} noValidate>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Id">
                  <Input
                    placeholder="Project Id"
                    value={this.state.projectId}
                    onChange={this.onChangeprojectId}
                  />
                </Form.Item>{" "}
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Name">
                  <Input
                    placeholder="Project Name"
                    value={this.state.projectName}
                    onChange={this.onChangeprojectName}
                  />
                </Form.Item>{" "}
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Type">
                  <Input
                    placeholder="Type"
                    value={this.state.type}
                    onChange={this.onChangeType}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={8}>
                <Form.Item label="Start Date">
                  <Form.Item>
                    <DatePicker
                      placeholder="Start Date"
                      startDate={this.state.startDate}
                      onChange={this.onChangeStartDate}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="End Date">
                  <Form.Item>
                    <DatePicker
                      placeholder="End Date"
                      endDate={this.state.endDate}
                      onChange={this.onChangeEndDate}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Duration">
                  <Input
                    placeholder="Duration"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={12}>
                <Form.Item label="Status">
                  <Input
                    placeholder="Status"
                    value={this.state.status}
                    onChange={this.onChangeStatus}
                  />
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
