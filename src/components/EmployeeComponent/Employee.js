import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";
import React from "react";
import EmployeeView from "./EmployeeViewModal";
import EmployeeEdit from "./EmployeeEditModal";
// import axios from 'axios';

// const tableData = [
//   {
//     key: "1",
//     empId: "0001",
//     name: "Rammiya Narayanasamy",
//     role: "Software Engineer",
//     emailid: "ramminarayanan7@gmai.com",
//     contactno: "0764345676",
//     edit: <EmployeeEdit />,
//     delete: <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />,
//     view: <EmployeeView />
//   },
//   {
//     key: "2",
//     EmployeeId: "0002",
//     name: "Saranya Narayanasamy",
//     role: "Software Engineer",
//     emailid: "saranyanarayanan7@gmail.com",
//     contactno: "0764345676",
//     edit: <Icon type="edit" style={{ fontSize: "18px", color: "green" }} />,
//     delete: <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />,
//     view: (
//       <Icon type="fullscreen" style={{ fontSize: "18px", color: "black" }} />
//     )
//   },
//   {
//     key: "3",
//     EmployeeId: "0003",
//     name: "Abira Thavalingam",
//     role: "Software Engineer",
//     emailid: "abithavan@gmail.com",
//     contactno: "0764345676",
//     edit: <Icon type="edit" style={{ fontSize: "18px", color: "green" }} />,
//     delete: <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />,
//     view: (
//       <Icon type="fullscreen" style={{ fontSize: "18px", color: "black" }} />
//     )
//   },
//   {
//     key: "4",
//     EmployeeId: "0004",
//     name: "Piriyanka Arulantham",
//     role: "Software Engineer",
//     emailid: "piriyasiva@gmail.com",
//     contactno: "0764345676",
//     edit: <Icon type="edit" style={{ fontSize: "18px", color: "green" }} />,
//     delete: <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />,
//     view: (
//       <Icon type="fullscreen" style={{ fontSize: "18px", color: "black" }} />
//     )
//   }
// ];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      employees: [],
      patients: []
    };
  }

  state1 = {
    filteredInfo: null,
    sortedInfo: null
  };

  //fetching the employee with get all employee
  async getAllEmployees() {
    const url = "http://localhost:8080/employeeservice/GetAllemployee";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      employees: data,
      empId: data
    });
    console.log(this.state.employees);

    // data.forEach(element => {
    //     console.log(element.severity);
    // });
  }

  componentDidMount() {
    this.getAllEmployees();
  }

  handleDelete = empId => {
    // axios.get('http://localhost:8080/employeeservice/DeleteById/'+empId)
    //     .then(console.log('Deleted'))
    //     .catch(err => console.log(err))
    fetch("http://localhost:8080/employeeservice/DeleteById/" + empId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
    console.log(empId);
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

  // handleClick(param, e) {
  //       console.log(param);
  //       deletePatient(param);
  //       // message.success('Successfully deleted patient!');
  //       this.forceUpdate();
  //     }

  render() {
    let { sortedInfo, filteredInfo } = this.state1;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Emp Id",
        dataIndex: "empId",
        key: "empId",
        width: "10%",
        filteredValue: filteredInfo.empId || null,
        onFilter: (value, record) => record.empId.includes(value),
        sorter: (a, b) => a.EmployeeId.length - b.empId.length,
        sortOrder: sortedInfo.columnKey === "empId" && sortedInfo.order
      },
      {
        title: "Employee Name",
        dataIndex: "name",
        key: "firstName",
        width: "25%",
        ...this.getColumnSearchProps("firstName")
      },

      {
        title: "Designation",
        dataIndex: "designation",
        key: "designation",
        width: "25%",
        ...this.getColumnSearchProps("designation")
      },

      {
        title: "Email Id",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },

      {
        title: "Edit",
        render: () => (
          <a>
            <EmployeeEdit />
          </a>
        ),
        key: "edit",
        width: "7%"
      },
      {
        title: "Delete",
        dataIndex: "empId",
        key: "empId",
        ...this.getColumnSearchProps("empId"),
        render: (text, data = this.state.patients) => (
          <a>
            <Icon
              type="delete"
              style={{ fontSize: "18px", color: "red" }}
              onClick={this.handleDelete.bind(this, data.empId)}
            />
          </a>
        ),
        key: "delete",
        width: "8%"
      },

      {
        title: "More Details",
        render: () => (
          <a>
            <EmployeeView />
          </a>
        ),
        key: "view",

        width: "8%"
      }
    ];
    return <Table columns={columns} dataSource={this.state.employees} />;
  }
}
