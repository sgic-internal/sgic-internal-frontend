import { Table, Icon, Popconfirm, message} from "antd";
import React from "react";
import EditModel from "./EditModel";
import axios from "axios";


// function confirm(e) {
//   console.log(e); 
//   console.log(this.state.projectId);
//   message.success("Deleted Succesfully");
// }

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
    projects: [],
    projectId:''
  };

  handleSubmit = event => {
    console.log(this.state.handleSubmit);
    event.preventDefault();
  };
  componentDidMount() {
    // fetch api method
    // this.getAllProjects();
    // axios method
    
    // page refresh
    this.getAllProjects();
  }
 //DELETE-METHOD 1 = WORKING
  handleDelete = projectId => {
    axios
      .delete(`http://localhost:8081/project_service/deleteById/` + projectId)
      .then(console.log(projectId))
      .catch(err => console.log(err));

    const projects = this.state.projects.filter(projects => {
      return projects.projectId !== projectId;
    });
    this.setState({
      projects
    });
  };
  /*END OF DELETE METHOD = 1*/
  getAllProjects() {
    axios
      .get(`http://localhost:8081/project_service/GetAllproject`)
      .then(res => {
        const projects = res.data;
        this.setState({ projects: res.data });
        this.getAllProjects();
        // console.log(this.state.projects);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    // <Searchbar />;
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

      // {
      //   title: "ConfigId",
      //   dataIndex: "configId",
      //   key: "configId",
      //   width: "20%"
      // },
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
              onConfirm={this.handleDelete.bind(this, data.projectId)}
        
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
                  
                  
                />
              </a>
            </Popconfirm>
          </span>
        )
      }
      //   {
      //     title: "View More ",
      //     dataIndex: "viewmore",
      //     key: "viewmore",
      //     width: "10%",
      //     render: (text, record) => (
      //       <span>
      //         <a>
      //           <ViewModel />
      //         </a>
      //       </span>
      //     )
      //   }
    ];

    return <Table columns={columns} dataSource={this.state.projects} />;
  }
}
