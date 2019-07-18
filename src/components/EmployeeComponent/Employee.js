import {
  Table,
  Input,
  Button,
  Icon,
  Modal,
  Form,
  Select,
  Row,
  Col,
  Popconfirm,
  message
} from "antd";
import Highlighter from "react-highlight-words";
import React from "react";
import axios from "axios";

const { Option } = Select;

function confirm(e) {
  console.log(e);
  message.success("Successfully Deleted");
}

function cancel(e) {
  console.log(e);
  // message.error('Click on No');
}

function onChange(sorter) {
  console.log("params", sorter);
}



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeFirstName = this.onChangeEmployeeFirstName.bind(this);
    this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
    this.onChangeEmployeeDesignation = this.onChangeEmployeeDesignation.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.fetchDesignations = this.fetchDesignations.bind(this);

    this.state = {
      employeeautoId: "",
      employeeId: "",
      employeeName: "",
      employeeFirstName:"",
      employeeDesignation: "",
      employeeEmail: ""
    };

    this.state = {
      searchText: "",
      employees: [],
      patients: [],
      Total: ""
    };
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value
    });
  }
  onChangeEmployeeName(e) {
    this.setState({
      employeeName: e.target.value
    });
  }

  onChangeEmployeeFirstName(e){
    this.setState({
      employeeFirstName:e.target.value
    });
  }

  onChangeEmployeeDesignation(value) {
    this.setState({
      employeeDesignation: `${value}`
    });
    console.log(this.state.employeeDesignation);
  }

  onChangeEmployeeEmail(e) {
    this.setState({
      employeeEmail: e.target.value
    });
  }

  state1 = {
    filteredInfo: null,
    sortedInfo: null
  };

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  componentDidMount() {
    this.fetchDesignations();
    console.log("mounting");
    this.getAllEmployees();
    this.getTotalEmployee();
  }

  fetchDesignations() {
    var _this = this;
    axios
      .get("http://localhost:8084/employeeservice/getAllDesignation")
      .then(function(response) {
        // handle success
        console.log(response.data);
        _this.setState({ designations: response.data });
        console.log(_this.state.designations);
      });
  }

  handleOk = empId => {
    console.log(empId);
    const obj = {
      empId: this.state.employeeautoId,
      employeeid: this.state.employeeId,
      name: this.state.employeeName,
      firstname:this.state.employeeFirstName,
      designationid: this.state.employeeDesignation,
      email: this.state.employeeEmail
    };
    axios
      .put("http://localhost:8084/employeeservice/update/" + empId, obj)
      .then(response => this.getAllEmployees());
    this.setState({
      employeeautoId: "",
      employeeId: "",
      employeeName: "",
      employeeFirstName:"",
      employeeDesignation: "",
      employeeEmail: "",
      visible: false
    });

    message.success("Updated Successfully!!!");
  };

  handleCancel = e => {
    console.log(e);

    this.setState({
      visible: false
    });
  };

  //fetching the employee with get all employee
  async getAllEmployees() {
    const url = "http://localhost:8084/employeeservice/getallemployee";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      employees: data
    });
    console.log(this.state.employees);
  }
  async getTotalEmployee() {
    const url = "http://localhost:8084/employeeservice/getcount";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      Total: data
    });
    console.log(this.state.Total);
  }
  handleDelete = empId => {
    fetch("http://localhost:8084/employeeservice/deletebyid/" + empId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
    console.log(empId);
    confirm(empId);
    const employees = this.state.employees.filter(employees => {
      return employees.empId !== empId;
    });
    this.setState({
      employees
    });
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  handleEdit = empId => {
    this.showModal();
    console.log(empId);
    this.setState({
      empId: empId
    });
    axios
      .get("http://localhost:8084/employeeservice/getempolyeebyid/" + empId)
      .then(response => {
        console.log(response);
        this.setState({
          employeeautoId: response.data.empId,
          employeeId: response.data.employeeid,
          employeeName: response.data.name,
          employeeFirstName:response.data.firstname,
          employeeDesignation: response.data.designationid,
          employeeEmail: response.data.email
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    // For Table functions
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Emp Id",
        dataIndex: "employeeid",
        key: "employeeid",
        width: "10%",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.employeeid.length - b.employeeid.length
      },
      {
        title: "Employee Name",
        dataIndex: "name",
        key: "name",
        width: "25%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Employee FirstName",
        dataIndex: "firstname",
        key: "firstname",
        width: "25%",
        ...this.getColumnSearchProps("firstname")
      },

      {
        title: "Designation",
        dataIndex: "designationname",
        key: "designationname",
        width: "25%",
        ...this.getColumnSearchProps("designationname")
      },

      {
        title: "Email Id",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },

      {
        title: "Edit",
        render: (text, data = this.state.patients) => (
          <a>
            <Icon
              type="edit"
              onClick={this.handleEdit.bind(this, data.empId)}
              style={{ fontSize: "18px", color: "green" }}
            />
          </a>
        ),
        key: "edit",
        width: "7%"
      },
      {
        title: "Delete",
        dataIndex: "empId",
        key: "empId",
        // ...this.getColumnSearchProps("empId"),
        render: (text, data = this.state.patients) => (
          <Popconfirm
            title="Are you sure delete this Row?"
            onConfirm={this.handleDelete.bind(this, data.empId)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a>
              <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />
            </a>
          </Popconfirm>
        ),
        key: "delete",
        width: "8%"
      }

      // {
      //   title: "More Details",
      //   render: () => (
      //     <a>
      //       <EmployeeView />
      //     </a>
      //   ),
      //   key: "view",

      //   width: "8%"
      // }
    ];
    return (
      <React.Fragment>
        <div>
          <Modal
            title="Edit Employee"
            visible={this.state.visible}
            onOk={this.handleOk.bind(this, this.state.empId)}
            onCancel={this.handleCancel}
            width="500px"
          >
            <Form>
              <Row>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Employee Id">
                    <Input
                      placeholder="Employee Id"
                      value={this.state.employeeId}
                      onChange={this.onChangeEmployeeId}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Employee Name">
                    <Input
                      placeholder="Employee Name"
                      value={this.state.employeeName}
                      onChange={this.onChangeEmployeeName}
                    />
                  </Form.Item>
                </Col>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Employee FirstName">
                    <Input
                      placeholder="Employee FirstName"
                      value={this.state.employeeFirstName}
                      onChange={this.onChangeEmployeeFirstName}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Designation">
                    <Select
                      // defaultValue="Select Designation"
                      onChange={this.onChangeEmployeeDesignation}
                      value={this.state.employeeDesignation}
                    >
                      {this.state.employees.map(function(item, index) {
                        return (
                          <Option key={index} value={item.designationid}>
                            {item.designationname}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={16} style={{ padding: "5px" }}>
                  <Form.Item label="Email Id">
                    <Input
                      placeholder="Email Id"
                      value={this.state.employeeEmail}
                      onChange={this.onChangeEmployeeEmail}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.employees}
          pagination={{
            total: this.state.Total,
            //  showTotal: total => `Total ${total} employees`
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            pageSize: 10,
            showSizeChanger: true
            // showQuickJumper: true
          }}
        />
      </React.Fragment>
    );
  }
}
