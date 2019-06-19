import {
  Modal,
  Icon,
  Col,
  Row,
  Avatar
} from "antd";
import React from "react";


export default class App extends React.Component {
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    return (
      <div>
        <Icon
          type="fullscreen"
          onClick={this.showModal}
          style={{ fontSize: "18px", color: "black" }}
        />

        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="500px"
        >
          <Row>
            <Col span={2} style={{ padding: "5px" }}>
              <Avatar shape="square" size="large" icon="user" />
            </Col>
            <Col span={20} style={{ padding: "10px", marginTop: "10px" }}>
              <p>
                <b>Rammiya Narayanasamy</b>
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={10} style={{ padding: "5px" }}>
              <p>
                <b>Employee Id</b>
              </p>

              <p>
                <b>Gender</b>
              </p>
              <p>
                <b>Email Id</b>
              </p>
              <p>
                <b>Contact No</b>
              </p>
              <p>
                <b>Role</b>
              </p>
            </Col>
            <Col span={14} style={{ padding: "5px" }}>
              <p>001</p>

              <p>Female</p>
              <p>rarara@gmail.com</p>
              <p>09757557575</p>
              <p>Software Engineer</p>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
