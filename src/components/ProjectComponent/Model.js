import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Input,
  Checkbox,
  DatePicker,
  TimePicker
} from "antd";
import React from "react";
import react, { Component } from "react";
import axios from "axios";

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
export default class Model extends React.Component {
  constructor(props) {
    super(props);

    this.setState({
      projectName: "",
      type: "",
      startDate: "",
      endDate: "",

      duration: "",
      status: "",
      configId: "",
      visible: false
    });
    this.onChangeprojectName = this.onChangeprojectName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeconfigId = this.onChangeconfigId.bind(this);
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
  onChangeconfigId(e) {
    this.setState({
      configId: e.target.value
    });
  }

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
      projectName: this.state.projectName,
      type: this.state.type,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      duration: this.state.duration,
      status: this.state.status,
      configId: this.state.configId
    };
    axios
      .post("http://localhost:8080/project_service/createproject", projectData)
      .then(res => console.log(res.data));

    this.setState({
      projectName: "",
      type: "",
      startDate: "",
      endDate: "",
      duration: "",
      status: "",
      configId: "",
      visible: false
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
          <Form layout="vertical">
            <Row>
              <Col span={24} style={{ padding: "5px" }}>
                <Form.Item label="Project Name">
                  <Input
                    placeholder="ProjectName"
                    value={this.state.projectName}
                    onChange={this.onChangeprojectName}
                  />
                </Form.Item>{" "}
              </Col>
            </Row>

            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Type">
                  <Input
                    placeholder="Type"
                    value={this.state.type}
                    onChange={this.onChangeType}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Start Date" style={{ marginBottom: 0 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "24px",
                      textAlign: "center"
                    }}
                  />
                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "calc(90% - 12px)"
                    }}
                  >
                    <DatePicker onChange={this.onChangeStartDate} />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="End Date" style={{ marginBottom: 0 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "24px",
                      textAlign: "center"
                    }}
                  />
                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "calc(90% - 12px)"
                    }}
                  >
                    <DatePicker
                      // value={this.state.endDate}
                      onChange={this.onChangeEndDate}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Duration">
                  <Input
                    placeholder="Duration"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Status">
                  <Input
                    placeholder="Status"
                    value={this.state.status}
                    onChange={this.onChangeStatus}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Config Id">
                  <Input
                    placeholder="ConfigId"
                    value={this.state.configId}
                    onChange={this.onChangeconfigId}
                  />
                </Form.Item>{" "}
              </Col>
            </Row>

            {/* <Row>
              <Col>
                <div>

                  <p>

                    <Checkbox
                      style={{ marginLeft: '10px' }}

                      onClick={this.toggleDisable}
                      onChange={onChange}

                    >Edit
            {!this.state.disabled}
                    </Checkbox>

                  </p>
                </div>
              </Col>


              <Col span={24} style={{ padding: "5px" }}>

                <Form.Item>
                  <Input
                    disabled={this.state.disabled}
                    onChange={this.onChange}
                    placeholder="Abbrevation" />
                </Form.Item>{" "}
              </Col>

            </Row> */}
          </Form>
        </Modal>
      </div>
    );
  }
}
