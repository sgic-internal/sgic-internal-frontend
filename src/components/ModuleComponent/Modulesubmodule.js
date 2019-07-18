import {
  Table,
  Modal,
  Form,
  Input,
  Icon,
  Popconfirm,
  message,
  Button,
  Popover,
  Select,

} from "antd";

import { Component } from "react";
import React from "react";
import axios from "axios";

const { Option } = Select;

class Modulesubmodule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      module: [],
      moduleId: "",
      moduleName: "",
      projectid: "",
      projectId: "",
      subModuleId: "",
      subModuleName: "",
      visible: false,
      formLayout: "horizontal",
      data: [],
      data1: [],
      project: [],
      ModuleData: [],
      SubmoduleData: [],
      key: '',
      date: '',
      name: '',
      sub:[]
    };

    this.state = { ModuleData: [] };
    this.onChangemoduleId = this.onChangemoduleId.bind(this);
    this.onChangemoduleName = this.onChangemoduleName.bind(this);
    this.onChangeprojectid = this.onChangeprojectid.bind(this);
    this.onChangesubModuleId = this.onChangesubModuleId.bind(this);
    this.onChangesubModuleName = this.onChangesubModuleName.bind(this);


    this.handleOk3 = this.handleOk3.bind(this);
    this.fetchProject = this.fetchProject.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.fetchProject();
    console.log("mounting");
  }

  fetchProject() {
    var _this = this;
    axios
      .get("http://localhost:8081/defectservices/GetAllproject")
      .then(response => {
        // handle success
        console.log(response);
        //alert(response.data[0].projectId)
        _this.setState({ project: response.data });

        let drop = response.data.map((post, index) => {

          return (
            <Option key={index} value={post.projectId}>
              {post.projectName}
            </Option>
          );
        })

        this.setState({ drop });
        // alert(_this.state.project[0].projectId);
      });
  }

  //DELETE-METHOD 1 = WORKING
  handleDelete = moduleId => {
    axios.delete(`http://localhost:8081/defectservices/deleteModuleById/` + moduleId)
      .then(console.log(moduleId))
      .catch(err => console.log(err));

    const module = this.state.module.filter(module => {
      return module.moduleId !== moduleId;
    });
    this.setState({
      module
    });
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onChangeprojectId(value) {
    this.setState({
      projectId: `${value}`
    });
    console.log(this.state.projectId);
  }
  onChangemoduleName(e) {
    this.setState({
      moduleName: e.target.value
    });
  }

  onChangemoduleId(e) {
    this.setState({
      moduleId: e.target.value
    });
  }
  onChangeprojectid(e) {
    this.setState({
      projectid: e.target.value
    });
  }

  onChangesubModuleId(value) {
    this.setState({
      subModuleId: `${value}`
    });
    console.log(this.state.subModuleId);
  }

  onChangesubModuleName(value) {
    this.setState({
      subModuleName: `${value}`
    });
    console.log(this.state.subModuleName);
  }

  handleChange3 = (e) => {
    this.setState({ projectid: e.target.value });
  }

  hide = () => {
    this.setState({
      hovered: false
    });
  };

  handleHoverChange = visible => {
    this.setState({
      hovered: visible
    });

    console.log("gghghfghf")
  };

  handleClickChange = visible => {
    this.setState({
      hovered: false
    });
  };
  // constructor() {
  //     super();
  //
  //   }

  confirm = () => {
    message.info("Clicked on Yes.");
  };

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  showModal1 = () => {
    this.setState({
      visible1: true
    });
  };

  handleOk1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };

  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };

  showModal2 = () => {
    this.setState({
      visible2: true
    });
  };

  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };
  handleOk2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };

  showModal3 = () => {
    this.fetchProject();
    this.setState({
      visible3: true
    });
  };

  handleCancel3 = e => {
    console.log(e);
    this.setState({
      visible3: false
    });
  };
  componentDidMount() {
    this.getallsub();
    this.GetAllmodule();

  }

  handleOk3 = e => {
    e.preventDefault();
    console.log("handle3");
    const ModuleData = {
      moduleId: this.state.moduleId,
      moduleName: this.state.moduleName,
      projectid: this.state.projectId,
      subModuleId: this.state.subModuleId,
      subModuleName: this.state.subModuleName,
    };
    console.log(ModuleData);
    axios
      .post("http://localhost:8081/defectservices/createmodule", ModuleData)
      .then({
        // this.sGetAllmodule();
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      moduleId: "",
      moduleName: "",
      projectid: "",
      subModuleId: "",
      subModuleName: "",
      visible3: false
    });
  };

  GetAllmodule = () => {
    var _this = this;
    axios
      .get(`http://localhost:8081/defectservices/FindallMain`)
      .then(res => {
        let ModuleData = res.data;
        // let SubModuleData=res.data;
        console.log(res.data.length);
        console.log(res.data[0].subModule);
        const modulelist = Object.assign([], this.state.data);
        for (let i = 0; i < res.data.length; i++) {
          modulelist[i] = {
            key: i,
            moduleId: res.data[i].moduleId,
            moduleName: res.data[i].moduleName,
            projectid: res.data[i].project.projectId,
            subModule:res.data[i].subModule,
            

          };

          console.log(i);
          console.log(this.state.data);
        }


        this.setState({
          data: modulelist,
          ModuleData: res.data,

        });


        console.log(this.state.data);

        console.log(this.state.data);
        console.log(this.state.ModuleData)

      })
      .catch(function (error) {
        console.log(error);
      });

  };

  subModuletable=()=>{

  }

  getallsub() {


    axios

      .get(`http://localhost:8081/defectservices/FindallMain`)
      .then(res => {

        this.setState({
          data4: res.data
        })

        console.log(this.state.data3)
      })
  }
  deletesub=()=>{
    // console.log(id)
  }
 

  handleDelete = moduleId => {
    console.log(moduleId);
    axios
      .delete(
        `http://localhost:8081/defectservices/deleteModuleById/` + moduleId
      )
      .then(console.log(moduleId))
      .catch(err => console.log(err));

    const data = this.state.data.filter(data => {
      return data.moduleId !== moduleId;
    });
    this.setState({
      data
    });
    message.success("Delete Successfully!");
  };

  
  render() {

    
    const hoverContent = <h5>Add Sub Module</h5>;
    const expandedRowRender = (expanded) => {
      console.log(expanded)
      const columns = [
        { title: "Submodule ID", dataIndex: "date", key: "date" },
        { title: "Submodule Name", dataIndex: "name", key: "name" },
        {
          render: () => (
            <Icon
              type="edit"
              onClick={this.showModal2}
              style={{ color: "blue" }}
            />
          )
        },
        {
          render: () => (
            <Popconfirm
              placement="topLeft"
              title={text}
              okText="Yes"
              cancelText="No"
              // onConfirm={this.deletesub()}
            >
              <Icon type="delete" style={{ color: "red" }} />
            </Popconfirm>
          )
        }
      ];
for(var i=0;i<5;i++){
      const data6 = [
        {
          key: i,
          date: expanded.subModule[i].subModuleId,
          name: expanded.subModule[i].subModuleName
        }

      ]
      // this.setState({data6})
      return <Table columns={columns} dataSource={data6} pagination={false} />;
    }

// const modulelist = Object.assign([], this.state.data1);
//         for (let i = 0; i < 5; i++) {
//           modulelist[i] = {
//             key: i,
//             date: expanded.subModule[i].subModuleId,
//             name: expanded.subModule[i].subModuleName
//           };

          
//         }
        // return <Table columns={columns} dataSource={modulelist} pagination={false} />;
    };

    const text = "Are you sure to delete this item?";
    const columns = [
      { title: "Module ID", dataIndex: "moduleId", key: "moduleId" },
      { title: "Module Name", dataIndex: "moduleName", key: "moduleName" },
      // { title: "Project ID", dataIndex: "projectid", key: "projectid" },
      {
        render: () => (
          <Popover
            style={{ width: 500 }}
            content={hoverContent}
            trigger="hover"
            onVisibleChange={this.handleHoverChange}
          >
            <Icon
              type="plus-circle"
              onClick={this.showModal}
              style={{ color: "green" }}
            />
          </Popover>
        )
      },
      {
        render: () => (
          <Icon
            type="edit"
            onClick={this.showModal1}
            style={{ color: "blue" }}
          />
        )
      },
      {
        render: () => (
          // render: (text, data = this.state.patients) => (
          <Popconfirm
            placement="topLeft"
            title={text}
            okText="Yes"
            cancelText="No"
            onConfirm={this.handleDelete.bind(this, data.moduleId)}
          >
            <Icon type="delete" style={{ color: "red" }} />
          </Popconfirm>
        )
      }
    ];

    const data = [
      {
        key: 2,
        moduleId: "01",
        moduleName: "Login",
        projectId: "LS"
      },
      {
        key: 3,
        moduleId: "02",
        moduleName: "QA Dashboard",
        projectId: "LS"
      }
    ];
    const { formLayout } = this.state;
    const { Option, onBlur, onChange, onSearch, onFocus } = Select;
    const formItemLayout =
      formLayout === "horizontal"
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
        : null;
    const buttonItemLayout =
      formLayout === "horizontal"
        ? {
          wrapperCol: { span: 14, offset: 4 }
        }
        : null;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      }
    };

   


    return (
      <div>
        <div style={{ paddingBottom: "20px" }}>
          <Button type="primary" onClick={this.showModal3}>
            Add Module
          </Button>
        </div>
        <Table
          className="components-table-demo-nested"
          columns={columns}
           expandedRowRender={expanded=>expandedRowRender(expanded)}
          dataSource={this.state.data}

          expandRowByClick={value => this.openRow(value)}
        />
        <Modal
          title="Add Submodule"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Add"
        >
          <Form layout={formLayout}>
            <Form.Item label="Module ID">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Submodule Name:">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select projectId"
              optionFilterProp="children"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
            </Select>
          </Form>
        </Modal>
        <Modal
          title="Edit Module"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
          okText="Edit"
        >
          <Form layout={formLayout}>
            <Form.Item label="Module ID">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Module Name:">
              <Input placeholder="input placeholder" />
            </Form.Item>

          </Form>
        </Modal>
        <Modal
          title="Edit Sub Module"
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          okText="Edit"
        >
          <Form layout={formLayout}>
            <Form.Item label="Sub Module ID">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Sub Module Name:">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select ProjectID"
              optionFilterProp="children"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
            </Select>
          </Form>
        </Modal>
        <Modal
          title="Add Module"
          visible={this.state.visible3}
          onOk={this.handleOk3}
          onCancel={this.handleCancel3}
          okText="Add"
        >
          <Form layout={formLayout}>
            <Form.Item label="Module ID">
              <Input
                placeholder="input placeholder"
                value={this.state.moduleId}
                onChange={this.onChangemoduleId}
              />
            </Form.Item>
            <Form.Item label="Module Name:">
              <Input
                placeholder="input placeholder"
                value={this.state.moduleName}
                onChange={this.onChangemoduleName}
              />
            </Form.Item>
            <Form.Item label="project Name">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Project"
                optionFilterProp="children"
                onChange={(e) => this.onChangeprojectId(e)} value={this.state.projectId}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.drop}
              </Select>

            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Modulesubmodule;
