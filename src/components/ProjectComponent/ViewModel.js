import { Modal, Icon, Row, Col, Form, Tag } from "antd";
import React from "react";

export default class ViewModel extends React.Component {
  state = { visible: false };

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
      <Col span={3}>
        <div>
          <Icon
            type="fullscreen"
            onClick={this.showModal}
            style={{ fontSize: "18px", color: "black" }}
          />
          <br />
          <Modal
            title="More Info "
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: "#fff",
                minHeight: "150px"
              }}
            >
              <Form layout="vertical">
                <Row>
                  <Col span={10} style={{ padding: "5px" }}>
                    <p>
                      <b>Project Id:</b>
                    </p>
                    <p>
                      <b>Project Name:</b>
                    </p>
                    <p>
                      <b>Type:</b>
                    </p>
                    <p>
                      <b>Start Date:</b>
                    </p>
                    <p>
                      <b>End Date:</b>
                    </p>
                    <p>
                      <b>Duration:</b>
                    </p>
                    <p>
                      <b>Status:</b>
                    </p>
                    <p>
                      <b>Config Id:</b>
                    </p>
                  </Col>
                  <Col span={14} style={{ padding: "5px" }}>
                    <p>Defect Dashboard</p>
                    <p>Samuel Gnanam IT Centre has devoted itself </p>
                    <p>Lorem ipsum dolor sit amet consectetur. </p>

                    <p>UI</p>
                    <p>Open</p>
                    <p>Tom</p>
                    <p>05.05.2019</p>
                    <p>Tom</p>
                  </Col>
                </Row>
              </Form>
            </div>
          </Modal>
        </div>
      </Col>
    );
  }
}
