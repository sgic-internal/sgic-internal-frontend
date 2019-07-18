import React from "react";
import {
  Table,
  Modal,
  Button,
  Icon,
  Form,
  Select,
  Row,
  Col,
  Upload,
  Input,
  TreeSelect,
  Tag,
  Comment,
  Avatar,
  List,
  Popconfirm,
  message,
  Divider,
  
} from "antd";
import moment from "moment";
import axios from "axios";
import EditorIn from "./Editor";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
//import axios from "axios";
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
//import { Input } from 'antd';
const { TextArea } = Input;
const id = 1;
const props = {
 name: "files",
  action:
    "http://localhost:8081/defectservices/uploadMultipleFiles?defectId=" + id,
  headers: {
    authorization: "authorization-text"
  },
  multiple: true

  
};

function confirm(e) {
  console.log(e);

  message.success("Successfully Deleted");
}

function cancel(e) {
  console.log(e);

  message.error("Click on No");
}
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class TableFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      filteredInfo: null,
      sortedInfo: null,
      defect: [],
      moduleId: "",
      defectId: "",
      abbre: "",
      projectId: "",
      //moduleId: "",
      priority: "Medium",
      severity: "Medium",
      type: "",
      status: "",
      defectDescription: "",
      stepsToRecreate: "",
      assignTo: "",
      reassignTo: "",
      enteredBy: "",
      fixedBy: "",
      availableIn: "",
      foundIn: "",
      fixedIn: "",
      dateAndTime: "",
      addAttachment: {
        name: "",
        action: "",
        headers: "",
        multiple: true
      },
      images: [],
      user: "",
     // status: "",
      audit: "",
      comment: [],
      photoIndex: 0,
      isOpen: false,
      count: 0,
      //filteredInfo: null,
     // sortedInfo: null,
      visible: false,
      visible1: false,
      showModalView: false,
      comments: [],
      submitting: false,
      value: ""
      
     
     
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.refreshDefect = this.refreshDefect.bind(this);
    //this.handleEditOk = this.handleEditOk.bind(this);
    this.handleOk = this.handleOk.bind(this);
    // this.onChange1 = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showModalView = this.showModalView.bind(this);
  }
  onChange2 = e => {
    this.setState({
      comments: e.target.value
    });
  };
  attachment = id => {
    axios
      .get("http://localhost:8081/defectservices/listFile/" + id)
      .then(data => {
        data.data.map(file => {
          console.log(file.fileDownloadUri);
          this.setState({
            images: [...this.state.images, file.fileDownloadUri],
            isOpen: true
          });
        });
      });
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  onSubmit(e) {
    //e.preventDefault();
    const commentsu = {
      comments: this.state.comments,
      defectId: this.state.defectId
    };
    //var myJSON = JSON.stringify(commentsu);
    console.log(commentsu);
    if (this.state.count < 5) {
      axios
        .post("http://localhost:8081/defectservices/comments", commentsu)
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.getComment(this.state.defectId);
        });
      this.setState({
        comments: "",
        count: this.state.count + 1
      });
    } else {
      message.error("Can't add more than 5 comments");
    }
  }
  


  componentWillMount() {
    this.getAllDefect();
  }
  componentDidMount() {
    this.forceUpdate();
  }
  refreshDefect() {
    axios
      .get("http://localhost:8081/defectservices/getAllDefects")
      .then(response => {
        console.warn("Refresh Service is working");
        this.setState({ defect: response.data });
      });
  }

  refresh = () => {
    this.forceUpdate();
  };

  onChange1 = value => {
    console.log(`selected ${value}`);

    const auditinfo = {
      status: "Status changes to " + value,
      user: "romi",
      defectId: this.state.defectId
    };

    this.setState({
      audit: auditinfo
    });
    console.log(this.state.audit);
  };
  onBlur() {
    console.log("blur");
  }
  onFocus() {
    console.log("focus");
  }
  onSearch(val) {
    console.log("search:", val);
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  showModal1 = () => {
    this.setState({
      visible1: true
    });
  };
  showModalView = id => {
    this.setState({
      addAttachment: {
        name: "files",
        action:
          "http://localhost:8081/defectservices/uploadMultipleFiles?defectId=" +
          id,
        headers: {
          authorization: "authorization-text"
        },
        multiple: true
      }
    });
    console.log(this.state.addAttachment);
    this.getComment(id);
    this.setState({
      showModalView: true,
      defectId: id,
      comments: "",
      images: []
    });
  };

  handleOk = () => {
    this.onSubmit();
    const defectList = {
      defectId: this.state.defectId,
      moduleId: this.state.moduleId,
      projectId: this.state.projectId,
      severity: this.state.severity,
      priority: this.state.priority,
      type: this.state.type,
      status: this.state.status,
      fixedIn: "Release3",
      abbre: "gg",
      defectDescription: this.state.defectDescription,
      stepsToRecreate: "gggggggggggggggggggggggg",
      assignTo: "gg",
      reassignTo: "gg",
      enteredBy: "gg",
      fixedBy: "gg",
      availableIn: "gg",
      foundIn: this.state.foundIn,
      dateAndTime: "2015-05-05"
    };

    console.log("dddddddddddddddddddd" + defectList);
    axios
      .post("http://localhost:8081/defectservices/saveDefect", defectList)
      .then(res => {
        this.getdefectStatus();
        console.log(res.data);
      });
    this.setState({
      visible: false
    });
    this.setState({
      defectId: "",
      moduleId: "",
      projectId: "",
      severity: "",
      priority: "",
      defectDescription: "",
      type: "",
      status: "",
      foundIn: "",
      fixedIn: "",
      

      visible1: false
    });
    message.success("Added Successfully!");
  };

  handleOkView = e => {
    console.log(e);
    axios
      .post("http://localhost:8081/defectservices/audit/", this.state.audit)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });

    this.setState({
      showModalView: false,
      defectId: ""
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };
  handleCancelView = e => {
    console.log(e);
    this.setState({
      showModalView: false,
      defectId: ""
    });
  };
  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age"
      }
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

  handleChangeState = event => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    this.setState({
      [inputName]: inputValue
    });
  };
  handleChangeSeverity = value => {
    this.setState({ severity: value });
  };

  handleChangePriority = value => {
    this.setState({ priority: value });
  };

  handleChangeType = value => {
    this.setState({ type: value });
  };
  handleChangeStatus = value => {
    this.setState({ status: value });
  };
 // handleChangeDefectDescription= value => {
 //   this.setState({ defectDescription: value });
 // };
  handleChangeFoundIn = value => {
    this.setState({ foundIn: value });
  };
  // handleChangeFixedIn = value => {
  //    this.setState({ type: value });
  //};

  handleChangeAssignTo = value => {
    this.setState({ assignTo: value });
  };
  

  remove = id => {
    console.log(id);
    fetch("http://localhost:8081/defectservices/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.getComment(this.state.defectId);
      })
      .catch(err => err);
    message.success("Comment Successfully Deleted");
  };
  // componentDidMount() {
  //   this.getComment();
  // }
  getComment = id => {
    axios
      .get("http://localhost:8081/defectservices/comments/" + id)
      .then(resp => {
        let Data = resp.data;
        this.setState({ count: Data.length });
        let comment = Data.map(e => {
          // return <div><p>{e.comments}</p></div>
          return (
            <table style={{ border: "2px" }}>
              <tr key={e.id}>
                <td
                  style={{
                    width: "300px",
                    wordWrap: "break-word",
                    maxWidth: "250px"
                    //wordBreak: "break-all"
                  }}
                >
                  {e.comments}
                </td>
                <td>
                  {/* <Icon type="minus-circle" style={{ color: 'red' }} onClick={() => this.remove(e.commentId)} /> */}
                  {/* <Button size="sm" color="danger" onClick={() => this.remove(e.commentId)}>Delete</Button> */}
                  <Popconfirm
                    title="Are you sure want to delete this Entry ?"
                    icon={
                      <Icon
                        type="question-circle-o"
                        style={{
                          color: "red"
                        }}
                      />
                    }
                    onConfirm={() => this.remove(e.commentId)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">
                      <Icon type="minus-circle" style={{ color: "red" }} />
                    </a>
                  </Popconfirm>
                </td>
              </tr>
            </table>
          );
        });
        this.setState({ comment });
        console.log(comment);
      });
  };

  Preloader(props) {
    return <img src="spinner.gif" />;
  }

  //Getting All defect details
  getdefectStatus() {
    const url = "http://localhost:8081/defectservices/getAllDefects";
    axios
      .get(url)
      .then(response =>
        this.setState({
          defect: response.data
        })
      )
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.getdefectStatus();
  }

  //Deleting defect details
  handleDelete = defectId => {
    axios
      .delete("http://localhost:8081/defectservices/deleteDefect/" + defectId)
      .then(console.log(defectId))
      .catch(err => console.log(err));

    const defect = this.state.defect.filter(defect => {
      return defect.defectId !== defectId;
    });
    this.setState({
      defect
    });
  };
  //fetching the employee with get all employee
  getAllDefect = () => {
   
    const _this = this;
    
    axios
      .get("http://localhost:8081/defectservices/getAllDefects")
      .then(function(response) {
        // handle success
        console.log(response);

        var data = response.data;
        console.log("gjhgjhg"+response.data.length);
        for (let a = 0; a < data.length; a++) {
          _this.state.defect.push({
            defectId: data[a].defectId,
            projectName: data[a].projectName,
            moduleName: data[a].moduleName,
            severity: data[a].severity,
            priority: data[a].priority,
            type: data[a].type,
            foundIn: data[a].foundIn,
            status: data[a].status
          });
        }
        console.log(this.state.defect);
        alert(this.state.defect.length)
      });

    this.setState({ state: this.state,
     
     });
  };

  render() {
    const departureValidationMessage = 'Please select a departure country!';
    const { photoIndex, isOpen, images } = this.state;
    const { comments, submitting, value, defect } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Defect Id",
        dataIndex: "defectId",
        key: "defectId",
        //filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        //filteredValue: filteredInfo.defectId || null,
        //onFilter: (value, record) => record.defectId.includes(value),
        //sorter: (a, b) => a.defectId.length - b.defectId.length,
        //sortOrder: sortedInfo.columnKey === "defectId" && sortedInfo.order
      },
      {
        title: "Project Name",
        dataIndex: "projectName",
        key: "projectName",
        filters: [
          { text: "Leave", value: "leave" },
          { text: "Defect", value: "defect" },
          
        ],
        
        filteredValue: filteredInfo.projectName || null,
        onFilter: (value, record) => record.projectName.includes(value),
        },
      {
        title: "Module Name",
        dataIndex: "moduleName",
        key: "moduleName",
        filters: [
          { text: "Login", value: "login" },
          { text: "Defect", value: "defect" },
          
        ],
      
        filteredValue: filteredInfo.moduleName || null,
        onFilter: (value, record) => record.moduleName.includes(value),
       
      },
      {
        title: "Severity",
        dataIndex: "severity",
        key: "severity",
        filters: [
          { text: "High", value: "High" },
          { text: "Medium", value: "Medium" },
          { text: "Low", value: "Low" }
        ],
        filteredValue: filteredInfo.severity || null,
        onFilter: (value, record) => record.severity.includes(value)
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        filters: [
          { text: "High", value: "High" },
          { text: "Medium", value: "Medium" },
          { text: "Low", value: "Low" }
        ],
        filteredValue: filteredInfo.priority || null,
        onFilter: (value, record) => record.priority.includes(value)
        
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        filters: [
          { text: "UI", value: "UI" },
          { text: "Functinality", value: "Functinality" },
          { text: "Enhancement", value: "Enhancement" }
        ],
        filteredValue: filteredInfo.type || null,
        onFilter: (value, record) => record.type.includes(value)
        
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: () => (
          <Select
            showSearch
            style={{ width: 100 }}
            defaultValue="New"
            optionFilterProp="children"
            onChange={this.onChange1}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="New">New</Option>
            <Option value="Open">Open</Option>
            <Option value="Closed">Closed</Option>
            <Option value="Re-Opened">Re-Opened</Option>
            <Option value="Fixed">Fixed</Option>
          </Select>
        ),
        filters: [
          { text: "Open", value: "Open" },
          { text: "Re-opened", value: "Re-opened" },
          { text: "Defrred", value: "Defrred" }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
      
      },
      {
        title: "Found In",
        dataIndex: "foundIn",
        key: "foundIn",
        filters: [
          { text: "Release1", value: "Release1" },
          { text: "Release2", value: "Release2" },
          { text: "Release3", value: "Release3" }
        ],
        filteredValue: filteredInfo.fixedIn || null,
        onFilter: (value, record) => record.status.includes(value),
      
      },
      {
        title: "Fixed In",
        dataIndex: "fixedIn",
        key: "fixedIn",

        render: () => (
          <Select
            showSearch
            style={{ width: 100 }}
            placeholder="Select a Release"
            optionFilterProp="children"
            onChange={this.onChange1}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Release1">Release1</Option>
            <Option value="Release2">Release2</Option>
            <Option value="Release3">Release3</Option>
            <Option value="Release4">Release4</Option>
            <Option value="Release5">Release5</Option>
          </Select>
        ),
        filters: [
          { text: "Release1", value: "Release1" },
          { text: "Release2", value: "Release2" },
          { text: "Release3", value: "Release3" }
        ],
        filteredValue: filteredInfo.fixedIn || null,
        onFilter: (value, record) => record.status.includes(value),
        
      },
      
      {
        title: "Action",
        key: "action",
        render: (text, data = this.state.defect, record) => (
          <span>
            <Icon
              type="edit"
              style={{ fontSize: "18px", color: "blue" }}
              // onClick={this.handleEdit.bind(this, data.defectId)}
              onClick={this.showModal}
            />
            <Divider type="vertical" />

            <Popconfirm
              title="Are you sure want to delete this Entry ?"
              icon={
                <Icon
                  type="question-circle-o"
                  style={{
                    color: "red"
                  }}
                />
              }
              onConfirm={this.handleDelete.bind(this, data.defectId)}
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

                  // onClick={() => this.handleDelete(data.defectId)}
                />
              </a>
            </Popconfirm>
            
          </span>
        )
      },
      {
        title: "More",
        key: "more",
        render: (text, data = this.state.defect, record) => (
          <span>
            <Icon
              type="arrows-alt"
              style={{ fontSize: "18px", color: "green" }}
              onClick={() => this.showModalView(data.defectId)}
            />
          </span>
        )
      },
      {

      }
    ];
    return (
      <div>
        <EditorIn />
        <Button type="primary" onClick={this.showModal1}>
          Add Defect
        </Button>
        
        <br />
        <br />
        {/* Add Defects Part */}
        <Modal
          title="Add Defects"
          visible={this.state.visible1}
          onOk={this.handleOk}
          onCancel={this.handleCancel1}
          width="600px"
        >
          <Form onSubmit={this.handleOk}>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Defect Id: ">
                  <Input
                    placeholder="Defect Id"
                    className="defectId"
                    name="defectId"
                    //disabled="true"
                    onChange={event => this.handleChangeState(event)}
                  />
                </Form.Item>
              </Col>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label=" ModuleId: ">
                  <Input
                    placeholder="Module Id"
                    className="moduleId"
                    name="moduleId"
                    //disabled="true"
                    onChange={event => this.handleChangeState(event)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Project Id: ">
              <Input
                placeholder="ProjectId"
                className="projectId"
                name="projectId"
                onChange={event => this.handleChangeState(event)}
              />
            </Form.Item>

            <Form.Item label="Description: ">
              <TextArea
                className="defectDescription"
                name="defectDescription"
                autosize={{ minRows: 4, maxRows: 10 }}
                onChange={event => this.handleChangeState(event)}
                placeholder="Description"   
                required={true}
                validationMessage={departureValidationMessage}
                />
                
               
                                    
            
            </Form.Item>

            <Form.Item label="Steps to Re-create: ">
              <TextArea
                className="stepsToRecreate"
                name="stepsToRecreate"
                placeholder="Step to Create"
                autosize={{ minRows: 6, maxRows: 12 }}
                onChange={this.handleChangeState}
              />
            </Form.Item>
            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Type: ">
                  <Select
                    placeholder="Type"
                    style={{ width: "100%" }}
                    onChange={this.handleChangeType}
                  >
                    <Option value="UI">UI</Option>
                    <Option value="Functionality">Functionality</Option>
                    <Option value="Enhancement">Enhancement</Option>
                    <Option value="Performance">Performance</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Severity">
                  <Select                    
                    style={{ width: "100%" }}
                    onChange={this.handleChangeSeverity}
                    defaultValue="Medium"
                    
                  >
                    <Option value="High">High</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Priority:  ">
                  <Select
                    defaultValue="Medium"
                    style={{ width: "100%" }}
                    onChange={this.handleChangePriority}
                  >
                    <Option value="High">High</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Found In: ">
                  <Select
                    defaultValue="Release"
                    style={{ width: "100%" }}
                    onChange={this.handleChangeFoundIn}
                  >
                    <Option value="Release1">Release1</Option>
                    <Option value="Release2">Release2</Option>
                    <Option value="Release3">Release3</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Assigned To: ">
                  <Select
                    defaultValue="user1"
                    style={{ width: "100%" }}
                    onChange={this.handleChangeAssignTo}
                  >
                    <Option value="user1">User 1</Option>
                    <Option value="user2">User 2</Option>
                    <Option value="user3">User 3</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Form.Item label="Comments: ">
                <TextArea
                  placeholder="Comments"
                  className="comments"
                  autosize={{ minRows: 4, maxRows: 10 }}
                  name="comments"
                  //disabled="true"
                  onChange={this.onChange2}
                />
              </Form.Item>
            </Row>
          </Form>
         
              <Upload {...this.state.addAttachment}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            
        </Modal>
        <Table
          columns={columns}
          dataSource={this.state.defect}
          onChange={this.handleChange}
          scroll={{ x: 1300 }}
        />
                  
          <p>Total Defects :- {this.state.defect.length}</p>
          
        {/* Edit Defects Part  */}
        <Modal
          title="Edit Defects"
          visible={this.state.visible}
          // onOk={this.handleEditOk.bind(this, this.state.defectId)}
          onCancel={this.handleCancel}
          width="600px"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label=" Defect Id: ">
                  <Input placeholder="Defect Id" disabled="true" />
                </Form.Item>
              </Col>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label=" Module: ">
                  <TreeSelect
                    showSearch
                    style={{ width: "100%" }}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder="Module / SubModule name"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onChange}
                  >
                    <TreeNode value="parent 1" title="Module" key="0-1">
                      <TreeNode
                        value="parent 1-0"
                        title="Sub Module"
                        key="0-1-1"
                      />
                    </TreeNode>
                  </TreeSelect>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label=" Type: ">
                  <Select
                    defaultValue="UI"
                    style={{ width: "100%" }}
                    onChange={this.onChange}
                  >
                    <Option value="UI">UI</Option>
                    <Option value="Functionality">Functionality</Option>
                    <Option value="Enhancement">Enhancement</Option>
                    <Option value="performance">Performance</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label=" Severity">
                  <Select
                    defaultValue="high"
                    style={{ width: "100%" }}
                    onChange={this.onChangeSeverityId}
                  >
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label=" Priority:  ">
                  <Select
                    defaultValue="high"
                    style={{ width: "100%" }}
                    onChange={this.onChange}
                  >
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Fixed In: ">
                  <Select
                    defaultValue="Fixed In"
                    style={{ width: "100%" }}
                    onChange={this.onChange}
                  >
                    <Option value="User1">User1</Option>
                    <Option value="User2">User2</Option>
                    <Option value="User3">User3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Found In: ">
                  <Select
                    defaultValue="Release"
                    style={{ width: "100%" }}
                    onChange={this.onChange}
                  >
                    <Option value="Release1">Release1</Option>
                    <Option value="Release2">Release2</Option>
                    <Option value="Release3">Release3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Status:  ">
                  <Select
                    defaultValue="New"
                    style={{ width: "100%" }}
                    onChange={this.onChange}
                  >
                    <Option value="New">New</Option>
                    <Option value="Open">Open</Option>
                    <Option value="Fixed">Fixed</Option>
                    <Option value="closed">Closed</Option>
                    <Option value="Reject">Reject</Option>
                    <Option value="ReOpen">ReOpen</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label=" Description: ">
              <TextArea
                placeholder="Description"
                autosize={{ minRows: 3, maxRows: 12 }} 
              />
              
            </Form.Item>

            <Form.Item label=" Steps to Re-create: ">
              <TextArea placeholder="" autosize={{ minRows: 6, maxRows: 12 }} />
            </Form.Item>

            <Form.Item label=" Assigned To: ">
              <Select
                defaultValue="User 1"
                style={{ width: "100%" }}
                onChange={this.onChange}
              >
                <Option value="user1">User 1</Option>
                <Option value="user2">User 2</Option>
                <Option value="user3">User 3</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        {/* More Details View */}
        <Modal
          title="More Details"
          visible={this.state.showModalView}
          onOk={this.handleOkView}
          onCancel={this.handleCancelView}
          width="600px"
        >
          <Row>
            <Col span={10} style={{ padding: "5px" }}>
              <p>
                <b>Module name:</b>
              </p>
              <p>
                <b>Description:</b>
              </p>
              <p>
                <b>Steps to Recreate:</b>
              </p>
              <p>
                <b>Severity:</b>
              </p>
              <p>
                <b>Priority:</b>
              </p>
              <p>
                <b>Defect Type:</b>
              </p>
              <p>
                <b>Found In:</b>
              </p>
              <p>
                <b>Fixed In:</b>
              </p>

              <p>
                <b>Entered By:</b>
              </p>
              <p>
                <b>Entered Date:</b>
              </p>
              <p>
                <b>Assigned To:</b>
              </p>
              <p>
                <b>Fixed By:</b>
              </p>
              <p>
                <b>Available Date:</b>
              </p>
              <p>
                <b>Status:</b>
              </p>
              <p>
                <b>Comments:</b>
              </p>
            </Col>
            <Col span={14} style={{ padding: "5px" }}>
              <p>Defect Dashboard</p>
              <p>Samuel Gnanam IT Centre has devoted itself </p>
              <p>Lorem ipsum dolor sit amet consectetur. </p>
              <p>
                <Tag color="red">High</Tag>
              </p>
              <p>
                {" "}
                <Tag color="orange">Low</Tag>
              </p>
              <p>UI</p>
              <p>Release1</p>
              <p>Release1</p>
              <p>Tom</p>
              <p>05.05.2019</p>
              <p>Sam</p>
              <p>User1</p>
              <p>Tom</p>
              <p>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  defaultValue="New"
                  optionFilterProp="children"
                  onChange={this.onChange1}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="New">New</Option>
                  <Option value="open">open</Option>
                  <Option value="fixed">fixed</Option>
                  <Option value="close">close</Option>
                  <Option value="reopen">reopen</Option>
                  <Option value="rejected">rejected</Option>
                </Select>
              </p>

              <p>{this.state.comment}</p>
            </Col>
          </Row>
          <Row>
            <Col span={10} style={{ padding: "5px" }}>
              <Button
                type="primary"
                onClick={() => this.attachment(this.state.defectId)}
              >
                View Attachments
              </Button>
              {isOpen && (
                <Lightbox
                  mainSrc={images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={
                    images[(photoIndex + images.length - 1) % images.length]
                  }
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex:
                        (photoIndex + images.length - 1) % images.length
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % images.length
                    })
                  }
                />
              )}
            </Col>

            <Col span={14} style={{ padding: "5px" }}>
              <Upload {...this.state.addAttachment}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </Col>
          </Row>
          <Divider />
          <h3>Comments</h3>
          {/* {comments.length > 0 && <CommentList comments={comments} />} */}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={this.onChange2}
                onSubmit={this.onSubmit}
                submitting={submitting}
                value={this.state.comments}
                name="comments"
              />
            }
          />
        </Modal>
        
      </div>
    );
  }
}

export default TableFilter;
