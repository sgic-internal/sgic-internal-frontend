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
  message,
  Select
} from "antd";
import moment from "moment";
import "./index.css";
import axios from "axios";
import CompanyController from "./CompanyController";

const { TextArea } = Input;
const { Option } = Select;
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
  }
  state = {
    filteredInfo: null,
    sortedInfo: null,
    showModalView: false,
    editModalVisible: false,
    loading: false,
    visible: false,
    comments: [],
    submitting: false,
    value: "",
    data: "",
    getCompany: [],
    licenseTypeCompany: "",
    getLicenseTypes: []
  };

  //-----------------------------------------------------------------
  fetchAllLicenseType = () => {
    fetch(`http://localhost:8083/productservice/Licenses`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          getLicenseTypes: data
        });
        console.log(data);
      });
  };

  onChangeLicenseSelect = value => {
    this.setState({
      licenseTypeCompany: value
    });
    console.log(this.state.licenseTypeCompany);
    //this.fetchAllLicenseType();
  };

  //--------------------------------------------------------------

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

  showEditModal = () => {
    this.setState({
      editModalVisible: true
    });
  };

  // txtOnChange (event) {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   this.setState({
  //     [name]: value
  //   });
  // }

  txtOnChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(e.target.value);
    this.fetchAllLicenseType();
  };

  onChangeLicense = value => {
    console.log("changed", value);
    this.setState({ companyLicensePeriod: value });
  };

  handleDelete = companyId => {
    CompanyController.DeleteCompanyApi(companyId);
    console.log(" Successfully deleted " + companyId);
    const getCompany = this.state.getCompany.filter(getCompany => {
      return getCompany.companyId != companyId;
    });

    this.setState({
      getCompany
    });
  };

  handleOk = () => {
    this.setState({ loading: true, visible: false });
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 1000);
  };

  // -------------------  EDIT MODEL ---------------------------------
  showModalView = () => {
    this.setState({
      showModalView: true
    });
  };

  editModalHandleOk = () => {
    this.setState({ loading: false, editModalVisible: false });
  };

  editModalHandleCancel = () => {
    this.setState({ editModalVisible: false });
  };

  //-------------------------------------------------------------------

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
    }, 10);
  };

  fetchAllCompany = () => {
    fetch(`http://localhost:8083/productservice/Companys`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          getCompany: data
        });
        console.log(data);
      });

    // const Company = {
    //   companyName: this.state.companyName,
    //   companyAbbrivation: this.state.companyAbbrivation,
    //   companyRegNo: this.state.companyRegNo,
    //   companyAdminName: this.state.companyAdminName,
    //   companyAdminEmail: this.state.companyAdminEmail,
    //   companyLicenseTypeId: this.state.companyLicenseTypeId,
    //   companyLicenseTypeName: this.state.companyLicenseTypeName,
    //   companyLicensePeriod: this.state.companyLicensePeriod,
    //   companyDescription: this.state.companyDescription
    // };
    // let newCompany = [...this.state.getCompany, Company];
    // this.setState({
    //   getCompany: newCompany
    // });
  };

  componentDidMount() {
    this.fetchAllCompany();
    this.fetchAllLicenseType();
  }

  handleOk = companyId => {
    console.log(companyId);
    const Company = {
      companyId: this.state.companyId,
      companyName: this.state.companyName,
      companyAbbrivation: this.state.companyAbbrivation,
      companyRegNo: this.state.companyRegNo,
      companyAdminName: this.state.companyAdminName,
      companyAdminEmail: this.state.companyAdminEmail,
      companyLicenseTypeId: this.state.licenseTypeCompany,
      companyLicenseTypeName: this.state.companyLicenseTypeName,
      companyLicensePeriod: this.state.companyLicensePeriod,
      companyDescription: this.state.companyDescription
    };
    axios
      .put("http://localhost:8083/productservice/Company", Company)
      .then(response => this.fetchAllCompany());
    this.setState({
      companyId: "",
      companyName: "",
      companyAbbrivation: "",
      companyRegNo: "",
      companyAdminName: "",
      companyAdminEmail: "",
      companyLicenseTypeId: "",
      companyLicenseTypeName: "",
      companyLicensePeriod: "",
      companyDescription: "",
      visible: false
    });
    message.success("Updated Successfully!!!");
  };

  fetchCompanyById = companyId => {
    axios
      .get("http://localhost:8083/productservice/Company/" + companyId)
      .then(response => {
        console.log(response);
        this.setState({
          companyId: response.data.companyId,
          companyName: response.data.companyName,
          companyAbbrivation: response.data.companyAbbrivation,
          companyRegNo: response.data.companyRegNo,
          companyAdminName: response.data.companyAdminName,
          companyAdminEmail: response.data.companyAdminEmail,
          companyLicenseTypeId: response.data.companyLicenseTypeId,
          companyLicenseTypeName: response.data.companyLicenseTypeName,
          licenseStartDate: response.data.licenseStartDate,
          licenseEndDate: response.data.licenseEndDate,
          companyLicensePeriod: response.data.companyLicensePeriod,
          companyDescription: response.data.companyDescription
        });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  handleEdit = companyId => {
    this.showEditModal();
    console.log(companyId);
    this.fetchCompanyById(companyId);
  };

  handleView = companyId => {
    this.showModalView();
    console.log(companyId);
    this.fetchCompanyById(companyId);
  };

  render() {
    const { visible, loading } = this.state.getCompany;
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
        title: "Start Date",
        dataIndex: "licenseStartDate",
        key: "licenseStartDate",
        // filters: [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }],
        filteredValue: filteredInfo.licenseStartDate || null,
        onFilter: (value, record) => record.licenseStartDate.includes(value),
        sorter: (a, b) => a.licenseStartDate.length - b.licenseStartDate.length,
        sortOrder:
          sortedInfo.columnKey === "licenseStartDate" && sortedInfo.order
      },
      {
        title: "End Date",
        dataIndex: "licenseEndDate",
        key: "licenseEndDate",
        // filters: [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }],
        filteredValue: filteredInfo.licenseEndDate || null,
        onFilter: (value, record) => record.licenseEndDate.includes(value),
        sorter: (a, b) => a.licenseEndDate.length - b.licenseEndDate.length,
        sortOrder: sortedInfo.columnKey === "licenseEndDate" && sortedInfo.order
      },
      {
        title: "Action",
        dataIndex: "Action",
        key: "Action",
        render: (text, data = this.state.getCompany) => (
          <span>
            <Icon
              type="edit"
              style={{ color: "blue" }}
              onClick={this.handleEdit.bind(this, data.companyId)}
            />

            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure want to delete this Entry ?"
              icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
              onConfirm={() => this.handleDelete(data.companyId)}
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
        render: (text, data = this.state.getCompany) => (
          <span>
            <Icon
              type="fullscreen"
              style={{ color: "black" }}
              onClick={this.handleView.bind(this, data.companyId)}
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
          dataSource={this.state.getCompany}
          onChange={this.handleChange}
        />
        <br />
        {/* edit company starts here */}
        <Modal
          variant="contained"
          width="675px"
          visible={this.state.editModalVisible}
          title="Edit Company"
          // onOk={this.editModalHandleOk}
          onCancel={this.editModalHandleCancel}
          footer={[
            <Button
              key="back"
              type="secondary"
              color="danger"
              onClick={this.editModalHandleCancel}
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              //loading={loading}
              onClick={this.handleOk.bind(this, this.state.companyId)}
            >
              OK
            </Button>
          ]}
        >
          <Form layout=" Vertical">
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Company Name">
                  <Input
                    id="companyName"
                    placeholder="eg: Samuel Gnanam IT Centre"
                    value={this.state.companyName || ""}
                    onChange={e => this.txtOnChange(e)}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label=" Abbreviation">
                  <Input
                    id="companyAbbrivation"
                    placeholder="eg: SGIC"
                    value={this.state.companyAbbrivation || ""}
                    onChange={e => this.txtOnChange(e)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Reg ID">
                  <Input
                    id="companyRegNo"
                    placeholder="Registration Number"
                    value={this.state.companyRegNo || ""}
                    onChange={e => this.txtOnChange(e)}
                  />
                </Form.Item>
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="IT InCharge">
                  <Input
                    id="companyAdminName"
                    placeholder="IT Administrator"
                    value={this.state.companyAdminName || ""}
                    onChange={e => this.txtOnChange(e)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={9} style={{ padding: "5px" }}>
                <Form.Item label="License Period">
                  <InputNumber
                    id="companyLicensePeriod"
                    min={1}
                    max={150}
                    // defaultValue={3}
                    placeholder="In Years"
                    style={{ width: "100%" }}
                    value={this.state.companyLicensePeriod || ""}
                    onChange={this.onChangeLicense}
                  />{" "}
                </Form.Item>
              </Col>

              <Col span={15} style={{ padding: "5px" }}>
                <Form.Item label="License Type">
                  <Select
                    name="licenseType"
                    id="licenseType"
                    value={this.state.licenseTypeCompany}
                    defaultValue="Select License Type"
                    style={{ width: 200 }}
                    onChange={this.onChangeLicenseSelect}
                  >
                    {/* <Option value={this.state.companyLicenseTypeId || ""}>
                      {this.state.companyLicenseTypeName || ""}
                    </Option> */}
                    {this.state.getLicenseTypes.map(e => (
                      <Option key={e.licenseId} value={e.licenseId}>
                        {e.licenseType}
                      </Option>
                    ))}
                  </Select>
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
                id="companyAdminEmail"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="samuelgnanamitcentre@gmail.com"
                style={{ width: "50%" }}
                value={this.state.companyAdminEmail || ""}
                onChange={e => this.txtOnChange(e)}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                id="companyDescription"
                rows={3}
                placeholder="company description"
                value={this.state.companyDescription || ""}
                onChange={e => this.txtOnChange(e)}
              />
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
                <b>Company_Name: </b>
              </p>
              <p>
                <b>Abbreviation: </b>
              </p>
              <p>
                <b>Company Reg. No: </b>
              </p>
              <p>
                <b>License Period</b>
              </p>
              <p>
                <b>License Start Date</b>
              </p>
              <p>
                <b>License End Date</b>
              </p>
              <p>
                <b>License Type</b>
              </p>
              <p>
                <b>IT Admin Name</b>
              </p>

              <p>
                <b>IT Admin E-mail</b>
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
              <p>{this.state.companyName}</p>
              <p>{this.state.companyAbbrivation}</p>
              <p>{this.state.companyRegNo}</p>
              <p>{this.state.companyLicensePeriod}</p>
              <p>{this.state.licenseStartDate}</p>
              <p>{this.state.licenseEndDate}</p>
              <p>{this.state.companyLicenseTypeName}</p>
              <p>{this.state.companyAdminName}</p>
              <p>{this.state.companyAdminEmail}</p>
              <p>{this.state.companyDescription}</p>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
