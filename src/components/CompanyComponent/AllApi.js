import React from "react";
import { Modal, Button, Icon, Form, Input, Radio, DatePicker } from "antd";
import { InputNumber } from "antd";
import { Row, Col } from "antd";
import "./index.css";
import axios from "axios";

const { TextArea } = Input;
//dropdown for Lisence period s Function

function onChange(value) {
  console.log("changed", value);
}

export default class AddCompany extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      companyAbbrivation: "",
      companyRegNo: "",
      companyAdminName: "",
      companyAdminEmail: "",
      companyLicenseType: "",
      companyLicensePeriod: "",
      LicenseStartDate: "",
      LicenseEndDate: "",
      companyDescription: "",
      visible: false,
      loading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //Get All Method
  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

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
    this.setState({
      visible: false
    });
  };

  onChangeLicense = value => {
    console.log("changed", value);
    this.setState({ companyLicensePeriod: value });
  };

  //On submit form method
  onSubmit(e) {
    e.preventDefault();
    const saveCompany = {
      companyName: this.state.companyName,
      companyAbbrivation: this.state.companyAbbrivation,
      companyRegNo: this.state.companyRegNo,
      companyAdminName: this.state.companyAdminName,
      companyAdminEmail: this.state.companyAdminEmail,
      companyLicenseType: this.state.companyLicenseType,
      companyLicensePeriod: this.state.companyLicensePeriod,
      LicenseStartDate: this.state.LicenseStartDate,
      LicenseEndDate: this.state.LicenseEndDate,
      companyDescription: this.state.companyDescription
    };
    console.log(saveCompany);
    axios
      .post("http://localhost:8083/productservice/SaveCompany", saveCompany)
      .then(res => {
        if (res.status === 200) {
          alert("Company Successfylly Added...!");
          console.log(res.data);
        }
      });

    this.setState({
      companyName: "",
      companyAbbrivation: "",
      companyRegNo: "",
      companyAdminName: "",
      companyAdminEmail: "",
      companyLicenseType: "",
      companyLicensePeriod: "",
      LicenseStartDate: "",
      LicenseEndDate: "",
      companyDescription: ""
    });

    console.log(
      JSON.stringify({
        companyName: this.setState.companyName,
        companyAbbrivation: this.setState.companyAbbrivation,
        companyRegNo: this.setState.companyRegNo,
        companyAdminName: this.setState.companyAdminName,
        companyAdminEmail: this.setState.companyAdminEmail,
        companyLicenseType: this.setState.companyLicenseType,
        companyLicensePeriod: this.setState.companyLicensePeriod,
        LicenseStartDate: this.setState.LicenseStartDate,
        LicenseEndDate: this.setState.LicenseEndDate,
        companyDescription: this.setState.companyDescription
      })
    );
  }
  //Rendering Pattern
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
              onClick={this.onSubmit}
            >
              Add
            </Button>
          ]}
        >
          <Form layout="vertical" onSubmit={this.onSubmit}>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Company Name">
                  <Input
                    onChange={event => this.onChange(event)}
                    placeholder="eg: Samuel Gnanam IT Centre"
                    type="text"
                    name="companyName"
                    value={this.state.companyName}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Abbreviation">
                  <Input
                    onChange={event => this.onChange(event)}
                    placeholder="eg: SGIC"
                    type="text"
                    name="companyAbbrivation"
                    value={this.state.companyAbbrivation}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Reg ID">
                  <Input
                    onChange={event => this.onChange(event)}
                    placeholder="Registration Number"
                    type="text"
                    name="companyRegNo"
                    value={this.state.companyRegNo}
                  />
                </Form.Item>
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="IT InCharge">
                  <Input
                    onChange={event => this.onChange(event)}
                    placeholder="IT Administrator"
                    type="text"
                    name="companyAdminName"
                    value={this.state.companyAdminName}
                  />
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

                    onChange={this.onChangeLicense}
                    placeholder="In Years"
                    style={{ width: "100%" }}
                    type="number"
                    name="companyLicensePeriod"
                  />
                </Form.Item>
              </Col>

              <Col span={15} style={{ padding: "5px" }}>
                <Form.Item
                  label="Lisence Type"
                  className="collection-create-form_last-form-item"
                >
                  <Radio.Group
                    onChange={event => this.onChange(event)}
                    type="radio"
                    name="companyLicenseType"
                    value={this.state.companyLicenseType}
                  >
                    <Radio value="basic">Basic</Radio>
                    <Radio value="medium">Medium</Radio>
                    <Radio value="advanced">Advanced</Radio>
                    <Radio value="customized">Customized</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="E-mail">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="samuelgnanamitcentre@gmail.com"
                onChange={event => this.onChange(event)}
                style={{ width: "50%" }}
                type="email"
                name="companyAdminEmail"
                value={this.state.companyAdminEmail}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                rows={3}
                placeholder="company description"
                onChange={event => this.onChange(event)}
                type="text"
                name="companyDescription"
                value={this.state.companyDescription}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
