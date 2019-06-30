import { Modal, Button, Form, Row, Col, Input, DatePicker } from "antd";
import React from "react";
import axios from "axios";

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
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
      projectIdError: "",
      projectName: "",
      projectNameError: "",
      type: "",
      typeError: "",
      startDate: "",
      startDateError: "",
      endDate: "",
      endDateError: "",
      duration: "",
      durationError: "",
      status: "",
      statusError: "",

      visible: false
    };
  }

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


  state = {
    disabled: true,
    visible: false
  };

  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  onChange = e => {
    const isCheckbox = e.target.type === "checkbox";
    console.log("checked = ", e.target.checked);
    this.setState({
      // checked: e.target.checked
      [e.target.name]: isCheckbox
        ? e.target.checked
        : e.target.value
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };


  validate = () => {
    let projectIdError = "";


    if (!this.state.projectId) {
      projectIdError = "name cannot be blank";
    }



    return true;
  };


  handleOk = e => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {

      const projectData = {
        projectId: this.state.projectId,
        projectName: this.state.projectName,
        type: this.state.type,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        duration: this.state.duration,
        status: this.state.status

      };
      axios
        .post("http://localhost:8081/project_service/createproject", projectData)
        .then(res => console.log(res.data));

      this.setState({
        projectId: "",
        projectIdError: "",
        projectName: "",
        projectNameError: "",
        type: "",
        typeError: "",
        startDate: "",
        startDateError: "",
        endDate: "",
        endDateError: "",
        duration: "",
        durationError: "",
        status: "",
        statusError: "",

        visible: false
      });

      // this.props.onChange({
      //   projectId: "",
      //   projectName: "",
      //   type: "",
      //   startDate: "",
      //   endDate: "",
      //   duration: "",
      //   status: "",

      // });
    }
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
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Id">
                  <Input
                    placeholder="Project Id"
                    value={this.state.projectId}
                    onChange={this.onChangeprojectId}
                    errorText={this.state.projectIdError}




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
                    errorText={this.state.projectNameError}

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
                    errorText={this.state.typeError}
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
                      errorText={this.state.startDateError}
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
                      errorText={this.state.endDateError}
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
                    errorText={this.state.durationError}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={12}>
                <Form.Item label="Status">
                  <Input
                    placeholder="Status"
                    value={this.state.status}
                    onChange={this.onChangeStatus}
                    errorText={this.state.statusError}
                  />
                </Form.Item>{" "}
              </Col>


            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
