import React from "react";
import { Modal, Button, Icon, Form, Input, Select, DatePicker } from "antd";
import { InputNumber } from "antd";
// import moment from "moment";
import { Row, Col } from "antd";
import "./index.css";
import axios from "axios";
import CompanyController from "./CompanyController";
import { Link } from "react-router-dom";

// import AllApi from ".AllApi";

//import { getFieldDecorator } from "antd";

// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const { TextArea } = Input;
const { Option } = Select;
//dropdown for Lisence period s Function
function onChange(value) {
  console.log("changed", value);
}

export default class AddCompany extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyId: "",
      companyName: "",
      companyAbbrivation: "",
      companyRegNo: "",
      companyAdminName: "",
      companyAdminEmail: "",
      companyLicenseTypeId: "",
      licenseTypeCompany: "",
      companyLicensePeriod: "",
      LicenseStartDate: "",
      LicenseEndDate: "",
      companyDescription: "",
      visible: false,
      loading: false,
      getCompany: [],
      getLicenseTypes: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //-----------------------------------------------------------------
  fetchAllLicenseType = () => {
    fetch(`http://localhost:8083/productservice/Licenses`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          getLicenseTypes: data
        });
        // console.log(data);
      });
  };

  componentDidMount() {
    this.fetchAllLicenseType();
  }

  //--------------------------------------------------------------

  //Get All Method
  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
    this.fetchAllLicenseType();
  }

  //Get All Method
  onChangeLicenseSelect = value => {
    this.setState({
      licenseTypeCompany: value
    });
    console.log(this.state.licenseTypeCompany);
    //this.fetchAllLicenseType();
  };

  // function onChange(date, dateString) {
  //   console.log(date, dateString);
  // }

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
    const Company = {
      companyName: this.state.companyName,
      companyAbbrivation: this.state.companyAbbrivation,
      companyRegNo: this.state.companyRegNo,
      companyAdminName: this.state.companyAdminName,
      companyAdminEmail: this.state.companyAdminEmail,
      companyLicenseTypeId: this.state.licenseTypeCompany,
      companyLicensePeriod: this.state.companyLicensePeriod,
      companyDescription: this.state.companyDescription
    };

    CompanyController.AddCompanyApi(Company);
    console.log(Company);
    console.log(Company.licenseTypeCompany);
  }

  //-------------------------------------------------------------------------------------------------

  // this.setState({ loading: true });
  // setTimeout(() => {
  //   this.setState({ loading: false, visible: false });
  // }, 1000);

  // handleCancel = () => {
  //   this.setState({ visible: false });
  // };

  //Rendering Pattern
  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Row>
          <Col span={6}>
            <Button type="primary" onClick={this.showModal}>
              Add Company
            </Button>
          </Col>
          <Col span={6} />
          <Col span={9} />
          <Col span={3}>
            <Link to="/config">
              <Button type="primary">configuration</Button>
            </Link>
          </Col>
        </Row>
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
                    max={150}
                    // defaultValue={3}
                    onChange={this.onChangeLicense}
                    placeholder="In Months"
                    style={{ width: "100%" }}
                    type="number"
                    name="companyLicensePeriod"
                  />
                </Form.Item>
              </Col>

              <Col span={15} style={{ padding: "5px" }}>
                <Form.Item label="License Type">
                  <Select
                    name="licenseType"
                    id="licenseType"
                    value={this.state.licenseTypeCompany}
                    defaultValue="Select License Type"
                    style={{ width: 120 }}
                    onChange={this.onChangeLicenseSelect}
                  >
                    {this.state.getLicenseTypes.map(e => (
                      <Option key={e.licenseId} value={e.licenseId}>
                        {e.licenseType}
                      </Option>
                    ))}
                  </Select>
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
