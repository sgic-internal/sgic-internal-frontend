import { Modal, Form, Row, Col, Input, Icon, DatePicker } from "antd";
import React from "react";
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
export default class Model extends React.Component {
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
    console.log(e);
    this.setState({
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
        <Icon
          type="edit"
          onClick={this.showModal}
          style={{ fontSize: "18px", color: "Blue" }}
        />
        <br />
        <Modal
          title="Edit Project"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
          okText="Update"
        >
          <Form layout="vertical">
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
              <Col span={8} >
                <Form.Item label="Type">
                  <Input
                    placeholder="Type"
                    value={this.state.type}
                    onChange={this.onChangeType}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={8} >
                <Form.Item label="Start Date">
                  <Form.Item>
                    <DatePicker
                      onChange={this.onChangeStartDate}
                      placeholder="Start Date"
                    />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col span={8} >
                <Form.Item label="End Date">
                  <Form.Item>
                    <DatePicker
                      onChange={this.onChangeEndDate}
                      placeholder="End Date"
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Duration">
                  <Input
                    placeholder="Duration"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Status">
                  <Input
                    placeholder="Status"
                    value={this.state.status}
                    onChange={this.onChangeStatus}
                  />
                </Form.Item>{" "}
              </Col>
              {/* 
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Config Id">
                  <Input
                    placeholder="Config Id"
                    value={this.state.configId}
                    onChange={this.onChangeconfigId}
                  />
                </Form.Item>{" "}
              </Col> */}
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
