import React from "react";
import {
  Table,
  Button,
  Icon,
  Divider,
  Modal,
  Form,
  Input,
  Radio,
  Row,
  Col,
  InputNumber,
  Popconfirm,
  message
} from "antd";
import moment from "moment";
import "./index.css";
import axios from "axios";
// import { get } from "http";
//import { getFieldDecorator } from "antd";

// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const { TextArea } = Input;
//dropdown for Lisence period s Function
function onChange(value) {
  console.log("changed", value);
}
//delete popconfirm goes here
function confirm(e) {
  console.log(e);
  message.success("Click on Yes");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

// const data = [
//   {
//     key: "1",
//     registrationid: "Sl200585",
//     companyname: "Samuel Gnanam IT Centre",
//     abbreviation: "SGIC",
//     licenseperiod: "2yrs",
//     itaministrator: "Sujeeban",
//     action: "",
//     more: ""
//   }
// ];

export default class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    showModalView: false,
    loading: false,
    visible: false,
    comments: [],
    submitting: false,
    value: "",
    data: ""
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  showModalView = () => {
    this.setState({
      showModalView: true
    });
  };

  // handleDelete = companyId => {
  //   fetch("http://localhost:8083/productservice/company/" + companyId, {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(this.state)
  //   });
  //   console.log(companyId);
  // };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleViewOk = e => {
    console.log(e);
    this.setState({ showModalView: true });
  };

  handleViewCancel = e => {
    console.log(e);
    this.setState({ showModalView: false });
  };

  handleChangeState = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow()
          },
          ...this.state.comments
        ]
      });
    }, 1000);
  };

  componentDidMount() {
    fetch(`http://localhost:8083/productservice/Companys`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data
        });
        console.log(data);
      });
  }

  //On submit form method
  onSubmit(e) {
    e.preventDefault();
    const updateCompany = {
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
    console.log(updateCompany);
    axios
      .post("http://localhost:8083/productservice/Company", updateCompany)
      .then(res => {
        if (res.status === 200) {
          alert("Company Update Successfylly...!");
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

  render() {
    const { visible, loading } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Registration Id",
        dataIndex: "companyRegNo",
        key: "companyRegNo",
        // filters: [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }],
        filteredValue: filteredInfo.registrationid || null,
        onFilter: (value, record) => record.registrationid.includes(value),
        sorter: (a, b) => a.registrationid.length - b.registrationid.length,
        sortOrder: sortedInfo.columnKey === "registrationid" && sortedInfo.order
      },
      {
        title: "Company Name",
        dataIndex: "companyName",
        key: "companyName",
        // filters: [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }],
        filteredValue: filteredInfo.companyname || null,
        onFilter: (value, record) => record.companyname.includes(value),
        sorter: (a, b) => a.companyname.length - b.companyname.length,
        sortOrder: sortedInfo.columnKey === "companyname" && sortedInfo.order
      },
      {
        title: "Abbreviation",
        dataIndex: "companyAbbrivation",
        key: "companyAbbrivation",
        // filters: [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }],
        filteredValue: filteredInfo.abbreviation || null,
        onFilter: (value, record) => record.abbreviation.includes(value),
        sorter: (a, b) => a.abbreviation.length - b.abbreviation.length,
        sortOrder: sortedInfo.columnKey === "abbreviation" && sortedInfo.order
      },
      {
        title: "License Period",
        dataIndex: "companyLicensePeriod",
        key: "companyLicensePeriod",
        filters: [
          { text: "1yrs", value: "1yrs" },
          { text: "2yrs", value: "2yrs" },
          { text: "3yrs", value: "3yrs" },
          { text: "4yrs", value: "4yrs" },
          { text: "5yrs", value: "5yrs" }
        ],
        filteredValue: filteredInfo.licenseperiod || null,
        onFilter: (value, record) => record.licenseperiod.includes(value),
        sorter: (a, b) => a.licenseperiod.length - b.licenseperiod.length,
        sortOrder: sortedInfo.columnKey === "licenseperiod" && sortedInfo.order
      },
      {
        title: "IT Admin",
        dataIndex: "companyAdminName",
        key: "companyAdminName",
        // filters: [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }],
        filteredValue: filteredInfo.itaministrator || null,
        onFilter: (value, record) => record.itaministrator.includes(value),
        sorter: (a, b) => a.itaministrator.length - b.itaministrator.length,
        sortOrder: sortedInfo.columnKey === "itaministrator" && sortedInfo.order
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
          <span>
            <Icon
              type="edit"
              style={{ color: "blue" }}
              onClick={this.showEditModal}
            />
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure want to delete this Entry ?"
              icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">
                <Icon
                  type="delete"
                  style={{ color: "red" }}
                  // onClick={this.handleDelete.bind(this, data.companyId)}
                />
              </a>
            </Popconfirm>
          </span>
        )
      },
      {
        title: "More",
        dataIndex: "more",
        key: "more",
        render: (text, record) => (
          <span>
            <Icon
              type="fullscreen"
              style={{ color: "black" }}
              onClick={this.showModalView}
            />
          </span>
        )
      }
    ];
    return (
      <div>
        <div className="table-operations" />
        <Table
          columns={columns}
          dataSource={this.state.data}
          onChange={this.handleChange}
        />
        <br />
        {/* edit company starts here */}
        <Modal
          variant="contained"
          width="675px"
          visible={this.state.visible}
          title="Edit Company"
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
              OK
            </Button>
          ]}
        >
          <Form layout=" Vertical">
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Company Name">
                  <Input placeholder="eg: Samuel Gnanam IT Centre" />
                </Form.Item>{" "}
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label=" Abbreviation">
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
                  label="Licence Type"
                  className="collection-create-form_last-form-item"
                >
                  <Radio.Group>
                    <Radio value="Basic">Basic</Radio>
                    <Radio value="Medium">Medium</Radio>
                    <Radio value="Advanced">Advanced</Radio>
                    <Radio value="Customized">Customized</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            {/* <Row>
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
            </Row> */}

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
        {/* edit company ends here */}
        <Modal
          variant="contained"
          width="675px"
          visible={this.state.showModalView}
          title="More details"
          onOk={this.handleViewOk}
          onCancel={this.handleViewCancel}
        >
          <Row>
            <Col span={9} style={{ padding: "5px" }}>
              {/* <p>
                <b>Registration Id :</b>
              </p> */}
              <p>
                <b>Company Name: </b>
              </p>
              <p>
                <b>Abbreviation: </b>
              </p>
              <p>
                <b>License Period</b>
              </p>
              <p>
                <b>IT Admin</b>
              </p>
              <p>
                <b>License Type</b>
              </p>
              {/* <p>
                <b>Start Date</b>
              </p>
              <p>
                <b>End Date</b>
              </p> */}
              <p>
                <b>E-mail</b>
              </p>
              <p>
                <b>Description</b>
              </p>
              {/* <p label="Priority: "> </p>
              <br />
              <br />
              <br />
              <br />
              <p label="Status: "></p> */}
            </Col>
            <Col span={1} style={{ padding: "5px" }}>
              {/* <p>
                <b>:</b>
              </p> */}
              <p>
                <b>:</b>
              </p>
              <p>
                <b>:</b>
              </p>
              <p>
                <b>:</b>
              </p>
              <p>
                <b>:</b>
              </p>
              <p>
                <b>:</b>
              </p>
              <p>
                <b>:</b>
              </p>
              <p>
                <b>:</b>
              </p>
              {/* <p>
                <b>:</b>
              </p>
              <p>
                <b>:</b>
              </p> */}
            </Col>
            <Col span={14} style={{ padding: "5px" }}>
              <p />
              <p>Samuel Gnanam</p>
              <p>SGIC</p>
              <p>2yrs</p>
              <p>Sujeeban</p>
              <p>Advanced</p>
              <p>22.05.2009</p>
              <p>29.05.2020</p>
              <p>SGIC@gmail.com</p>
              <p>
                Samuel Gnanam IT Centre has devoted itself to become the pioneer
                institution for Industrial Software Engineering Training in
                Jaffna, which helps and guide the IT graduates to reach heights
                in their IT career. SGIC is a charitable organization under the
                Trust of ‘Deshamanya A Y S Gnanam’, who is the founder of
                Anthony’s Group in Sri Lanka. Deshamanya A Y S Gnanam had done
                various philanthropic activities in Sri Lanka and his sons are
                following his footsteps.
              </p>
            </Col>
          </Row>
          <Divider />
        </Modal>
      </div>
    );
  }
}
