import React from "react";
import {
  Modal,
  Button,
  Icon,
  Form,
  Input,
  Radio,
  DatePicker
} from "antd";
import { InputNumber } from "antd";
import moment from "moment";
import { Row, Col } from "antd";
import "./index.css";

//import { getFieldDecorator } from "antd";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const { TextArea } = Input;
//dropdown for Lisence period s Function
function onChange(value) {
  console.log("changed", value);
}

export default class AddCompany extends React.Component {
  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Company
        </Button>
        <Modal
          variant="contained"
          width="675px"
          visible={visible}
          title="Add Company"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key="back"
              type="secondary"
              color="danger"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              //loading={loading}
              onClick={this.handleOk}
            >
              Add
            </Button>
          ]}
        >
          <Form layout="vertical">
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Company Name">
                  <Input placeholder="eg: Samuel Gnanam IT Centre" />
                </Form.Item>{" "}
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Abbreviation">
                  <Input placeholder="eg: SGIC" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Reg ID">
                  <Input placeholder="Registration Number" />
                </Form.Item>
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="IT InCharge">
                  <Input placeholder="IT Administrator" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={9} style={{ padding: "5px" }}>
                <Form.Item label="License Period">
                  <InputNumber
                    min={1}
                    max={10}
                    // defaultValue={3}
                    onChange={onChange}
                    placeholder="In Years"
                    style={{ width: "100%" }}
                  />{" "}
                </Form.Item>
              </Col>

              <Col span={15} style={{ padding: "5px" }}>
                <Form.Item
                  label="Lisence Type"
                  className="collection-create-form_last-form-item"
                >
                  <Radio.Group>
                    <Radio value="basic">Basic</Radio>
                    <Radio value="medium">Medium</Radio>
                    <Radio value="advanced">Advanced</Radio>
                    <Radio value="customized">Customized</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Start Date">
                  <DatePicker
                    defaultValue={moment("01/01/2015", dateFormatList[0])}
                    format={dateFormatList}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="End Date">
                  <DatePicker
                    defaultValue={moment("01/01/2016", dateFormatList[0])}
                    format={dateFormatList}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="E-mail">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="samuelgnanamitcentre@gmail.com"
                style={{ width: "50%" }}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea rows={3} placeholder="company description" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
