import { Modal, Button, Form, Icon, Input, Select, Row, Col } from "antd";
import React from "react";
import { CreateEmployee } from "./fetch/CreateEmployee";

const { Option } = Select;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      employeeID: "",
      employeeName: ""
    };
  }

  //onchange function
  doChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.state.employeeID);
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
                    value={this.state.employeeID}
                    onChange={e => this.doChange(e)}
                    id="empID"
                    name="empID"
                  />
                </Form.Item>
              </Col>
              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Employee Name">
                  <Input
                    placeholder="Employee Name"
                    value={this.state.employeeName}
                    onChange={event => this.doChange(event)}
                    id="empName"
                    name="empName"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Role">
                  <Select placeholder="Role">
                    <Option value="software engineer">software Engineer</Option>
                    <Option value="QA engineer">QA Engineer</Option>
                    <Option value="software architect">
                      software Architect
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7} style={{ padding: "5px" }}>
                <Form.Item label="Gender">
                  <Select placeholder="Gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={9} style={{ padding: "5px" }}>
                <Form.Item label="Contact No">
                  <Input placeholder="Contact No" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Email Id">
                  <Input placeholder="Email Id" />
                </Form.Item>
              </Col>
              <Col span={9} style={{ padding: "5px", marginTop: "44px" }}>
                <Button>
                  <Icon type="upload" /> Upload Picture
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
