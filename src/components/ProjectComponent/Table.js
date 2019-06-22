import { Table, Input, Button, Icon, Popconfirm, message } from "antd";
import Highlighter from "react-highlight-words";
import React from "react";
import EditModel from "./EditModel";
import ViewModel from "./ViewModel";
import axios from "axios";

function confirm(e) {
  console.log(e);
  message.success("Deleted Succesfully");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  state = {
    searchText: "",
    projects: []
  };

  handleDelete = projectId => {
    axios
      .delete(`http://localhost:8080/project_service/deleteById/` + projectId)
      .then(console.log(projectId))
      .catch(err => console.log(err));

    const projects = this.state.projects.filter(projects => {
      return projects.projectId !== projectId;
    });
    this.setState({
      projects
    });
  };
  handleSubmit = event => {
    console.log(this.state.handleSubmit);
    event.preventDefault();
  };
  componentDidMount() {
    // fetch api method

    // this.getAllProjects();

    // axios method
    axios
      .get(`http://localhost:8080/project_service/GetAllproject`)
      .then(res => {
        // const projects = res.data;
        this.setState({ projects: res.data });
        console.log(this.state.projects);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

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
    const columns = [
      {
        title: "Project Id ",
        dataIndex: "projectId",
        key: "projectid",
        width: "20%"
      },
      {
        title: "Project Name",
        dataIndex: "projectName",
        key: "projectName",
        width: "20%"
        //...this.getColumnSearchProps('projectname'),
      },
      {
        title: "Type ",
        dataIndex: "type",
        key: "type",
        width: "20%"
        //...this.getColumnSearchProps('type'),
      },

      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
        width: "20%"
      },

      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        width: "20%"
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        width: "20%"
      },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "20%"
      },

      {
        title: "ConfigId",
        dataIndex: "configId",
        key: "configId",
        width: "20%"
      },
      // {
      //   title: 'Abbrevation',
      //   dataIndex: 'abbrevation',
      //   key: 'Abbrevation',
      //   width: '20%',

      // },

      {
        title: "Edit ",
        dataIndex: "edit",
        key: "edit",
        width: "10%",
        render: (text, record) => (
          <span>
            <a>
              <EditModel />
            </a>
          </span>
        )
      },
      {
        title: "Delete ",
        dataIndex: "delete",
        key: "delete",
        width: "10%",
        render: (text, data = this.state.patients) => (
          <span>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">
                <Icon
                  type="delete"
                  style={{
                    color: "red",
                    fontSize: "18px"
                  }}
                  onClick={this.handleDelete.bind(this, data.projectId)}
                />
              </a>
            </Popconfirm>
          </span>
        )
      },
      {
        title: "View More ",
        dataIndex: "viewmore",
        key: "viewmore",
        width: "10%",
        render: (text, record) => (
          <span>
            <a>
              <ViewModel />
            </a>
          </span>
        )
      }
    ];
    return <Table columns={columns} dataSource={this.state.projects} />;
  }
}
