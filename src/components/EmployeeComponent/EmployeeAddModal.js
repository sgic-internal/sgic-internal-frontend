import { Modal, Button, Form, Icon, Input, Select, Row, Col } from "antd";
import React from "react";
import axios from "axios";
import Employee from "./Employee";
import { object } from "prop-types";

var emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
const { Option } = Select;

class EmployeeAddModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      employeeId: "",
      employeeIdError: "",
      employeeName: "",
      employeeNameError: "",
      employeeDesignation: "",
      employeeEmail: "",
      employeeEmailError: "",
      designations: [],
      designation: "Please Select a Designation",
      employeeDesignationError: "",
      visible: false,
      error: false,
      eIdError: false,
      eNameError: false,
      eEmailError: false
    };

    // this.onhandleChange = this.onhandleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchDesignations = this.fetchDesignations.bind(this);
    //this.onChangeEmployeeDesignation = this.onChangeEmployeeDesignation.bind(this);
    this.handleOk = this.handleOk.bind(this);


  }

  doValidate = (e) => {
    let empId = this.state.employeeId;
    let empName = this.state.employeeName;
    let empEmail = this.state.employeeEmail;
    let empDesError = this.state.employeeDesignationError;
    let error = this.state.error;
    let eIdError = false;
    let eNameError = false;
    let eEmailError = false;
    let eDescError = false;

    if (!empId && !empName && !empEmail && !eDescError) {
      this.setState({
        employeeIdError: "*Employee Id cannot be empty",
        employeeNameError: "*Employee Name cannot be empty",
        employeeEmailError: "*Employee Email cannot be empty",
        employeeDesignationError: "* Please Select a Designation"
      });

    }
    else if (!empId) {
      this.setState({
        employeeIdError: "*Employee Id cannot be empty",
      });
      eIdError = true;
      console.log(eIdError);
      return false
    }

    else if (empId) {
      this.setState({
        employeeIdError: "",
      });
      eIdError = true;
      console.log(eIdError);

    }

    if (!empName) {
      this.setState({
        employeeNameError: "*Employee Name cannot be empty"
      });
      eNameError = true;
      console.log(eNameError)

    }

    else if (empName) {
      this.setState({
        employeeNameError: ""
      });
      eNameError = true;
      console.log(eNameError)

    }



    if (!empEmail) {
      this.setState({
        employeeEmailError: "*Employee Email cannot be empty"
      });
      eEmailError = true;
      console.log(eEmailError)

    }

    else if (empEmail) {
      this.setState({
        employeeEmailError: ""
      });
      eEmailError = true;
      console.log(eEmailError)

    }

    else if (!emailRegex.test(empEmail)) {
      this.setState({
        employeeEmailError
          : "Employee Email must have @ character"
      });
      error = true;
      console.log(error)
    }

    if (empDesError) {

    }

    if (empId && empName && empEmail && eDescError) {
      this.setState({
        employeeIdError: "",
        employeeNameError: "",
        employeeEmailError: "",
        employeeDesignationError: ""
      });

      return true;
    }



  }

  componentDidMount() {
    //this.props.form.validateFields();
    //this.doValidate();
    this.fetchDesignations();
    console.log("mounting");
  }

  fetchDesignations() {
    var _this = this;
    axios.get('http://localhost:8084/employeeservice/getAllDesignation')
      .then(function (response) {
        // handle success
        console.log(response.data);
        _this.setState({ designations: response.data });
        //   this.setState(prevState => ({
        //     designations: {                   // object that we want to update
        //         ...prevState,    // keep all other key-value pairs
        //         designations: response.data       // update the value of specific key
        //     }
        // }))
        console.log(_this.state.designations);
      });
  }



  // onhandleChange(e, validateFunc) {
  //   const inputName = e.target.name;
  //   const inputValue = e.target.value;


  //   this.setState({
  //     [inputName]: {
  //         value: inputValue,
  //         ...validateFunc(inputValue)
  //    }
  //   });
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);

  }

  // handling select cuz handleChange is throwing errors
  handleDesignationChange = (value) => {
    this.setState({
      designation: value
    });
    console.log()
  }



  handleOk = e => {

    e.preventDefault();
    let isValidated = this.doValidate();
    let error = this.state.error;

    if (!isValidated) {
      this.setState({
        // employeeIdError: "Employee Id cannot be empty",
        // employeeNameError: "Employee Name cannot be empty",
        visible: true
      })
    }

    if (isValidated) {
      this.setState({
        visible: false
      })
      const serverport = {
        empId: this.state.employeeId,
        name: this.state.employeeName,
        id: this.state.employeeDesignation,
        email: this.state.employeeEmail
      };
      axios
        .post("http://localhost:8084/employeeservice/createemployee", serverport)
        .then(res => console.log(res.data)
        );
    }



    //eIdError & etc
    // let e1 = this.state.eIdError;
    // let e2 = this.state.eNameError;
    // let e3 = this.state.eEmailError;

    // if (e1) {
    //   this.setState({
    //     visible: "true",
    //     employeeIdError: "Employee Id cannot be empty"
    //   });

    // }

    // if (!e1) {
    //   this.setState({
    //     visible: "true",
    //     employeeIdError: ""
    //   });
    // }


    // if (e2) {
    //   this.setState({
    //     visible: "true",
    //     employeeNameError: "Employee Name cannot be empty",
    //   });
    // }

    // if (e2 == false) {
    //   this.setState({
    //     visible: "true",
    //     employeeNameError: "",
    //   });
    // }

    // if (e3 == true) {
    //   this.setState({
    //     visible: "true",
    //     employeeEmailError: "Employee Email cannot be empty",
    //   });
    // }

    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
    // if (formValid(this.state)) {
    //   console.info(`
    //     --SUBMITTING--
    //     Employee Id: ${this.state.employeeId}
    //     Employee Name: ${this.state.employeeName}
    //     Employee Email: ${this.state.employeeEmail}

    //   `);
    // } else {
    //   console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    // }

    // this.setState({
    //   employeeId: "",
    //   employeeName: "",
    //   employeeDesignation: "USER",
    //   employeeEmail: "",
    //   visible: false
    // });



  };

  // post integration finishes
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      employeeId: "",
      employeeName: "",
      employeeDesignation: "",
      employeeEmail: "",
      visible: false
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
          <Form onSubmit={e => this.handleOk(e)}>
            <Row>
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="Employee Id">
                  <Input
                    placeholder="Employee Id"
                    value={this.state.employeeId}
                    name="employeeId"
                    type="text"
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <div style={{ color: "red", fontSize: "11px", marginRight: "4px" }}>{this.state.employeeIdError}</div>

                  {/* {formerrors.employeeId.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.employeeId}
                    </span>
                  )}  */}

                </Form.Item>
              </Col>
              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Employee Name">
                  <Input
                    required
                    placeholder="Employee Name"
                    value={this.state.employeeName}
                    onChange={e => this.handleChange(e)}
                    name="employeeName"
                    type="text"
                  />
                  <div style={{ color: "red", fontSize: "11px" }}>{this.state.employeeNameError}</div>
                  {/* {formerrors.employeeName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.employeeName}
                    </span>
                  )} */}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="designation">
                  <Select
                    defaultValue="Select Designations"
                    style={{ width: 120 }}
                    value={this.state.designation}
                    onChange={e => this.handleDesignationChange(e)}
                    name="designation"
                  >
                    {this.state.designations.map(function (item, index) {
                      return <Option key={index} value={item.id}>{item.designationname}</Option>
                    })}
                  </Select>
                  <div>{this.state.employeeDesignationError}</div>
                </Form.Item>
              </Col>

              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Email">
                  <Input
                    // className={
                    //   formerrors.employeeEmail.length > 0 ? "error" : null
                    // }
                    placeholder="Email"
                    value={this.state.employeeEmail}
                    //     value={this.state.employeeEmail}
                    onChange={e => this.handleChange(e)}
                    name="employeeEmail"
                    type="text"
                    required
                  />
                  <div style={{ color: "red", fontSize: "11px" }}>{this.state.employeeEmailError}</div>

                  {/* {formerrors.employeeEmail.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.employeeEmail}
                    </span>
                  )} */}
                </Form.Item>
              </Col>
            </Row>

            {/* <Col span={7} style={{ padding: "5px" }}>
                <Form.Item label="Gender">
                  <Select placeholder="Gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </Col> */}
            {/* <Col span={9} style={{ padding: "5px" }}>
                <Form.Item label="Contact No">
                  <Input placeholder="Contact No" />
                </Form.Item>
              </Col> */}

            {/* <Row>
              
              <Col span={9} style={{ padding: "5px", marginTop: "44px" }}>
                <Button>
                  <Icon type="upload" /> Upload Picture
                </Button>
              </Col>
            </Row> */}
          </Form>
        </Modal>
      </div >
    );
  }

  // validateName = (name) => {
  //   if (name.length < 2) {
  //     return { validateStatus: 'error', errorMsg: 'Name is short.' }
  //   }
  // }
}

export default EmployeeAddModal;
// export default Form.create()(EmployeeAddModal);