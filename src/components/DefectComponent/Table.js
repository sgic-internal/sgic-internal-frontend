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
  Typography,
  Divider
} from "antd";
import moment from "moment";
import axios from "axios";
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
      defect: [],
      moduleId: "",
      defectList: [
        {
          defectId: "",
          projectId: "1",
          moduleId: "",
          severityId: 0,
          priorityId: 0,
          typeId: 0,
          statusId: 1,
          defectDescription: "",
          stepsToRecreate: "",
          assignTo: "",
          reassignTo: "none",
          enteredBy: "pinky",
          fixedBy: "none",
          commentId: 1,
          attachmentId: 1,
          dateAndTime: "2017-05-05"
        }
      ],
      addAttachment: {
        name: "",
        action: "",
        headers: "",
        multiple: true
      },
      images: [],
      defectId: "",
      user: "",
      status: "",
      audit: "",
      comment: [],
      photoIndex: 0,
      isOpen: false,
      count: 0,
      filteredInfo: null,
      sortedInfo: null,
      visible: false,
      visible1: false,
      showModalView: false,
      comments: [],
      submitting: false,
      value: ""
      //fileList: [],
      //uploading: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.refreshDefect = this.refreshDefect.bind(this);
    //this.handleEditOk = this.handleEditOk.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showModalView = this.showModalView.bind(this);
  }
  onChange(e) {
    this.setState({
      comments: e.target.value
    });
  }
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
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleOkAddDefect = e => {
    console.log(e);
    console.log(this.state.assignTo);

    const defectList = {
      defectId: this.state.defectId, //OK
      projectId: "1", //Needs to add ui to get project id
      moduleId: "1", //OK
      severityId: parseInt(this.state.severityId), //OK
      priorityId: parseInt(this.state.priorityId), //OK
      typeId: parseInt(this.state.typeId), //OK
      statusId: 1, //OK predefined 1 = NEW
      defectDescription: this.state.defectDescription, //OK
      stepsToRecreate: this.state.stepsToRecreate, //OK
      assignTo: this.state.assignTo, //OK
      reassignTo: "none", // predefined
      enteredBy: "mathu", // integrate after login done
      fixedBy: "pinky", // need to be done
      commentId: 1, //Merge this
      attachmentId: 1, //Merge this
      dateAndTime: "2017-05-05" // Change format in back end
    };
    console.log(defectList);
    axios({
      method: "post",
      url: "http://localhost:8081/defectservices/saveDefect",
      data: defectList,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function(response) {
        //handle success
        console.log(response);
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
    this.setState({
      visible1: false
    });
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
    console.log(inputValue);
    this.setState({
      [inputName]: inputValue
    });
  };
  handleChangeSeverity = value => {
    this.setState({ severityId: value });
  };

  handleChangePriority = value => {
    this.setState({ priorityId: value });
  };

  handleChangeType = value => {
    this.setState({ typeId: value });
  };

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
            <tr key={e.id}>
              <td style={{ whiteSpace: "nowrap", width: "20%" }}>
                {e.comments}
              </td>
              <td />
              <td>{}</td>
              <td style={{ paddingLeft: "140px" }}>
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
        for (let a = 0; a < data.length; a++) {
          _this.state.defect.push({
            defectId: data[a].defectId,
            moduleId: data[a].moduleId,
            severityId: data[a].severityId,
            priorityId: data[a].priorityId,
            typeId: data[a].typeId,
            statusId: data[a].statusId
          });
        }
        console.log(_this.state.defect);
      });

    this.setState({ state: this.state });
  };

  //   handleDelete = defectId => {
  //     // axios.get('http://localhost:8080/employeeservice/DeleteById/'+empId)
  //     //     .then(console.log('Deleted'))
  //     //     .catch(err => console.log(err))
  //     fetch("http://localhost:8081/defectservices//deleteDefect/{defectId}" + defectId, {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(this.state)
  //     });
  //     console.log(defectId);
  //     const defect = this.state.defect.filter(defect => {
  //       return defect.defectId !== defectId;
  //     });
  //     this.setState({
  //       defect
  //     });
  //   };

  //  deleteDefect(defectId) {
  //   console.log(defectId);
  //   axios
  //     .delete("http://localhost:8081/defectservices/deleteDefect/" + defectId)
  //     .then(response => {
  //       console.warn("Delete Service is working");
  //       //  this.refreshBook(response);
  //       this.forceUpdate();
  //       // alert(" Defect deleted successfully");
  //     });
  // }

  // //Edting Defect Details
  //   handleEdit = defectId => {
  //     this.showModal();
  //     console.log(defectId);
  //     this.setState({
  //       defectId: defectId
  //     });
  //     axios
  //       .get("http://localhost:8081/defectservices/getDefectById" + defectId)
  //       .then(response => {
  //         console.log(response);
  //         this.setState({
  //           defectId:response.data.defectId,
  //           moduleId:response.data.moduleId,
  //           defectDescription:response.data.defectDescription,

  //         });
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });

  //   };

  render() {
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
        filteredValue: filteredInfo.defectId || null,
        onFilter: (value, record) => record.defectId.includes(value),
        sorter: (a, b) => a.defectId.length - b.defectId.length,
        sortOrder: sortedInfo.columnKey === "defectId" && sortedInfo.order
      },
      {
        title: "Project Name",
        dataIndex: "projectId",
        key: "projectId",
        //filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        filteredValue: filteredInfo.projectName || null,
        onFilter: (value, record) => record.projectName.includes(value),
        sorter: (a, b) => a.projectName.length - b.projectName.length,
        sortOrder: sortedInfo.columnKey === "projectId" && sortedInfo.order
      },
      {
        title: "Module Name",
        dataIndex: "moduleId",
        key: "moduleId",
        //filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        filteredValue: filteredInfo.moduleId || null,
        onFilter: (value, record) => record.moduleId.includes(value),
        sorter: (a, b) => a.moduleId.length - b.moduleId.length,
        sortOrder: sortedInfo.columnKey === "moduleId" && sortedInfo.order
      },
      {
        title: "Severity",
        dataIndex: "severityId",
        key: "severityId",
        filters: [
          { text: "High", value: "High" },
          { text: "Medium", value: "Medium" },
          { text: "Low", value: "Low" }
        ],
        filteredValue: filteredInfo.severityId || null,
        onFilter: (value, record) => record.severityId.includes(value),
        sorter: (a, b) => a.severityId.length - b.severityId.length,
        sortOrder: sortedInfo.columnKey === "severity" && sortedInfo.order
        // render: severityId => (
        //   <span>
        //     {/*severityId.map(tag => {
        //       let color = tag.length > 5 ? 'geekblue' : 'green';
        //       if (tag === 'loser') {
        //         color = 'volcano';
        //       }
        //       return (
        //         <Tag color={color} key={tag}>
        //           {tag.toUpperCase()}
        //         </Tag>
        //       );
        //     })*/}
        //   </span>
        // ),
      },
      {
        title: "Priority",
        dataIndex: "priorityId",
        key: "priorityId",
        filters: [
          { text: "High", value: "High" },
          { text: "Medium", value: "Medium" },
          { text: "Low", value: "Low" }
        ],
        filteredValue: filteredInfo.priorityId || null,
        onFilter: (value, record) => record.priorityId.includes(value),
        sorter: (a, b) => a.priority.length - b.priorityId.length,
        sortOrder: sortedInfo.columnKey === "priorityId" && sortedInfo.order
      },
      {
        title: "typeId",
        dataIndex: "typeId",
        key: "typeId",
        filters: [
          { text: "UI", value: "UI" },
          { text: "Functinality", value: "Functinality" },
          { text: "Enhancement", value: "Enhancement" }
        ],
        filteredValue: filteredInfo.type || null,
        onFilter: (value, record) => record.type.includes(value),
        sorter: (a, b) => a.type.length - b.type.length,
        sortOrder: sortedInfo.columnKey === "typeId" && sortedInfo.order
      },
      {
        title: "Status",
        dataIndex: "statusId",
        key: "statusId",
        filters: [
          { text: "Open", value: "Open" },
          { text: "Re-opened", value: "Re-opened" },
          { text: "Defrred", value: "Defrred" }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        sorter: (a, b) => a.status.length - b.status.length,
        sortOrder: sortedInfo.columnKey === "statusId" && sortedInfo.order
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
      }
    ];
    return (
      <div>
        <Button type="primary" onClick={this.showModal1}>
          Add Defect
        </Button>
        <br />
        <br />
        {/* Add Defects Part */}
        <Modal
          title="Add Defects"
          visible={this.state.visible1}
          onOk={this.handleOkAddDefect}
          onCancel={this.handleCancel1}
          width="600px"
        >
          <Form onSubmit={this.handleAddDefect}>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Defect Id: ">
                  <Input
                    placeholder="Defect Id"
                    className="defectId"
                    name="defectId"
                    disabled="true"
                    onChange={event => this.handleChangeState(event)}
                  />
                </Form.Item>
              </Col>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Module: ">
                  <TreeSelect
                    showSearch
                    style={{ width: "100%" }}
                    className="moduleId"
                    name="moduleId"
                    value={this.state.defect.moduleId}
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

            <Form.Item label="Project Name: ">
              <Input
                placeholder="ProjectName"
                className="ProjectName"
                name="projectName"
                onChange={event => this.handleChangeState(event)}
              />
            </Form.Item>

            <Form.Item label="Description: ">
              <TextArea
                className="defectDescription"
                name="defectDescription"
                autosize={{ minRows: 4, maxRows: 10 }}
                onChange={this.handleChangeState}
                placeholder="Description"
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
                    defaultValue="UI"
                    style={{ width: "100%" }}
                    onChange={this.handleChangeType}
                  >
                    <Option value="1">UI</Option>
                    <Option value="2">Functionality</Option>
                    <Option value="3">Enhancement</Option>
                    <Option value="4">Performance</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Severity">
                  <Select
                    defaultValue="high"
                    style={{ width: "100%" }}
                    onChange={this.handleChangeSeverity}
                  >
                    <Option value="1">High</Option>
                    <Option value="2">Medium</Option>
                    <Option value="3">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Priority:  ">
                  <Select
                    defaultValue="high"
                    style={{ width: "100%" }}
                    onChange={this.handleChangePriority}
                  >
                    <Option value="1">High</Option>
                    <Option value="2">Medium</Option>
                    <Option value="3">Low</Option>
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
                    onChange={this.onChange}
                  >
                    <Option value="Release1">Release1</Option>
                    <Option value="Release2">Release2</Option>
                    <Option value="Release3">Release3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Available In">
                  <Select
                    defaultValue="Release"
                    style={{ width: "100%" }}
                    onChange={this.onChangeSeverityId}
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
          </Form>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Modal>
        <Table
          columns={columns}
          dataSource={this.state.defect}
          onChanger={this.handleChange}
        />

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

            <Form.Item label="Available In">
              <Select
                defaultValue="Release"
                style={{ width: "100%" }}
                onChange={this.onChangeSeverityId}
              >
                <Option value="Release1">Release1</Option>
                <Option value="Release2">Release2</Option>
                <Option value="Release3">Release3</Option>
              </Select>
            </Form.Item>
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

            <Form.Item label="Comments:  ">
              <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 8 }} />
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
            {/*<Col span={10} style={{ padding: '5px' }}>
           <p><b>Module name:</b></p>
              <p><b>Description:</b></p>
              <p><b>Steps to re-create:</b></p>
              <p><b>Severity:</b></p>
              <p><b>Priority:</b></p>
              <p><b>Defect Type:</b></p>
              <p><b>Status:</b></p>
              <p><b>Entered By:</b></p>
              <p><b>Entered Date:</b></p>
              <p><b>Found In:</b></p>
              <p><b>Available In:</b></p>
              <p><b>Assigned To:</b></p>
              <p><b>Fixed By:</b></p>
              <p><b>Fixed Date:</b></p>
              <p><b>Fixed In:</b></p>
             <p><b>Comments:</b></p>

              </Col>*/}

            <Col span={10} style={{ padding: "5px" }}>
              <p>
                <b>Module name:</b>
              </p>
              <p>
                <b>Description:</b>
              </p>
              <p>
                <b>Steps to re-create:</b>
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
                <b>Status:</b>
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

              {/* <p label="Priority: "> </p>
              <br />
              <br />
              <br />
              <br />
              <p label="Status: "></p> */}
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
              <p>Open</p>
              <p>Tom</p>
              <p>05.05.2019</p>
              <p>Sam</p>
              <p>User1</p>
              <p>Tom</p>
              <p>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
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
                onChange={this.onChange}
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
