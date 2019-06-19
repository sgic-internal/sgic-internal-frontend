import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";
import React from "react";
import EmployeeView from "./EmployeeViewModal";
import EmployeeEdit from "./EmployeeEditModal";

const data = [
  {
    key: "1",
    EmployeeId: "0001",
    name: "Rammiya Narayanasamy",
    role: "Software Engineer",
    emailid: "ramminarayanan7@gmai.com",
    contactno: "0764345676",
    edit: <EmployeeEdit />,
    delete: <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />,
    view: <EmployeeView />
  },
  {
    key: "2",
    EmployeeId: "0002",
    name: "Saranya Narayanasamy",
    role: "Software Engineer",
    emailid: "saranyanarayanan7@gmail.com",
    contactno: "0764345676",
    edit: <Icon type="edit" style={{ fontSize: "18px", color: "green" }} />,
    delete: <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />,
    view: (
      <Icon type="fullscreen" style={{ fontSize: "18px", color: "black" }} />
    )
  },
  {
    key: "3",
    EmployeeId: "0003",
    name: "Abira Thavalingam",
    role: "Software Engineer",
    emailid: "abithavan@gmail.com",
    contactno: "0764345676",
    edit: <Icon type="edit" style={{ fontSize: "18px", color: "green" }} />,
    delete: <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />,
    view: (
      <Icon type="fullscreen" style={{ fontSize: "18px", color: "black" }} />
    )
  },
  {
    key: "4",
    EmployeeId: "0004",
    name: "Piriyanka Arulantham",
    role: "Software Engineer",
    emailid: "piriyasiva@gmail.com",
    contactno: "0764345676",
    edit: <Icon type="edit" style={{ fontSize: "18px", color: "green" }} />,
    delete: <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />,
    view: (
      <Icon type="fullscreen" style={{ fontSize: "18px", color: "black" }} />
    )
  }
];

export default class App extends React.Component {
  state = {
    searchText: ""
  };

  state1 = {
    filteredInfo: null,
    sortedInfo: null
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
        textToHighlight={text.toString()}
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
    let { sortedInfo, filteredInfo } = this.state1;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Emp Id",
        dataIndex: "EmployeeId",
        key: "EmployeeId",
        width: "10%",
        filteredValue: filteredInfo.EmployeeId || null,
        onFilter: (value, record) => record.EmployeeId.includes(value),
        sorter: (a, b) => a.EmployeeId.length - b.EmployeeId.length,
        sortOrder: sortedInfo.columnKey === "EmployeeId" && sortedInfo.order
      },
      {
        title: "Employee Name",
        dataIndex: "name",
        key: "name",
        width: "25%",
        ...this.getColumnSearchProps("name")
      },

      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: "25%",
        ...this.getColumnSearchProps("role")
      },

      {
        title: "Email Id",
        dataIndex: "emailid",
        key: "emailid"
      },

      {
        title: "Edit",
        dataIndex: "edit",
        key: "edit",
        width: "7%"
      },
      {
        title: "Delete",
        dataIndex: "delete",
        key: "delete",
        width: "8%"
      },
      {
        title: "More Details",
        dataIndex: "view",
        key: "view",

        width: "8%"
      }
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}
