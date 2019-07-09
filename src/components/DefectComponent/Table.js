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
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import moment from "moment";
import axios from "axios";
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
    ContentType: "application/json"
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

// const data = [
//   {
//     key: '1',
//     defectid: '001',
//     modulename: 'Thanushan',
//     severity: ['High'],
//     priority: ['Medium'],
//     type: 'UI',
//     status: 'Open',
//   },
//   {
//     key: '2',
//     defectid: '002',
//     modulename: 'Romi',
//     severity: ['Low'],
//     priority: ['High'],
//     type: 'Functionality',
//     status: 'Open',
//   },
//   {
//     key: '3',
//     defectid: '003',
//     modulename: 'Thuvi',
//     severity: ['High'],
//     priority: ['Low'],
//     type: 'Performance',
//     status: 'Open',
//   },
//   {
//     key: '4',
//     defectid: '004',
//     modulename: 'Guruji',
//     severity:['Low'],
//     priority: ['High'],
//     type: 'UI',
//     status: 'Re-opened',
//   },
// ];

class TableFilter extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    visible: false,
    visible1: false,
    showModalView: false,
    comments: [],
    submitting: false,
    value: ""
  };

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
          moduleId: "'",
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
      images: [],
      comments: "",
      defectId: "",
      user: "",
      status: "",
      audit: "",
      comment: [],
      photoIndex: 0,
      isOpen: false
    };
    this.deleteDefect = this.deleteDefect.bind(this);
    this.refreshDefect = this.refreshDefect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      comments: e.target.value
    });
  }
  attachment = () => {
    axios.get("http://localhost:8081/defectservices/listFile/1").then(data => {
      data.data.map(file => {
        if (file.id == 1) {
          console.log(file.fileDownloadUri);
          this.setState({
            images: [file.fileDownloadUri],
            isOpen: true
          });
        }
      });
    });
    // this.setState({
    //   images:['//localhost:8081/defect/downloadFile/1'],
    //   isOpen: true
    // })
  };

  onSubmit(e) {
    e.preventDefault();

    const commentsu = {
      comments: this.state.comments,
      defectId: "1"
    };
    //var myJSON = JSON.stringify(commentsu);
    console.log(commentsu);

    axios
      .post("http://localhost:8081/defectservices/comments", commentsu)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.getComment();
      });

    this.setState({
      comments: "",
      defectId: ""
    });
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

  showModalView = () => {
    this.setState({
      showModalView: true
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
    this.setState({
      showModalView: false
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
      showModalView: false
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
        this.getComment();
      })
      .catch(err => err);
  };

  componentDidMount() {
    this.getComment();
  }
  getComment() {
    axios.get("http://localhost:8081/defectservices/comments/1").then(resp => {
      let Data = resp.data;

      let comment = Data.map(e => {
        // return <div><p>{e.comments}</p></div>
        return (
          <tr key={e.id}>
            <td
              style={{
                width: "300px",
                wordWrap: "break-word",
                maxWidth: "250px"
              }}
            >
              {e.comments}
            </td>
            <td />
            <td>{}</td>
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
        );
      });

      this.setState({ comment });

      console.log(comment);
    });
  }

  Preloader(props) {
    return <img src="spinner.gif" />;
  }

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

  handleDelete = defectId => {
    // axios.get('http://localhost:8081/employeeservice/DeleteById/'+empId)
    //     .then(console.log('Deleted'))
    //     .catch(err => console.log(err))
    fetch(
      "http://localhost:8081/defectservices//deleteDefect/{defectId}" +
        defectId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      }
    );
    console.log(defectId);
    const defect = this.state.defect.filter(defect => {
      return defect.defectId !== defectId;
    });
    this.setState({
      defect
    });
  };

  deleteDefect(defectId) {
    console.log(defectId);
    axios
      .delete("http://localhost:8081/defectservices/deleteDefect/" + defectId)
      .then(response => {
        console.warn("Delete Service is working");
        //  this.refreshBook(response);
        this.forceUpdate();
        // alert(" Defect deleted successfully");
      });
  }

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
        title: "Found In",
        dataIndex: "foundIn",
        key: "foundIn"
      },
      {
        title: "Available In",
        dataIndex: "availableIn",
        key: "availableIn"
      },
      {
        title: "Action",
        key: "action",
        render: (text, data = this.state.defect, record) => (
          <span>
            <Icon
              type="edit"
              style={{ fontSize: "18px", color: "blue" }}
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
                  onClick={() => this.deleteDefect(data.defectId)}
                />
              </a>
            </Popconfirm>
          </span>
        )
      },
      {
        title: "More",
        key: "more",
        render: (text, record) => (
          <span>
            <Icon
              type="arrows-alt"
              style={{ fontSize: "18px", color: "green" }}
              onClick={this.showModalView}
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
                    //disabled="true"
                    onChange={event => this.handleChangeState(event)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Project Name">
                  <Select
                    defaultValue="Project Name"
                    style={{ width: "100%" }}
                    onChange={this.handleChangeProjectName}
                  >
                    <Option value="Defect System">Defect System</Option>
                    <Option value="HRM">HRM</Option>
                    <Option value="Leave System">Leave System</Option>
                  </Select>
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

            <Form.Item label="Description: ">
              <TextArea
                className="defectDescription"
                name="defectDescription"
                onChange={this.handleChangeState}
                placeholder="Description"
                autosize
              />
            </Form.Item>

            <Form.Item label="Steps to Re-create: ">
              <TextArea
                className="stepsToRecreate"
                name="stepsToRecreate"
                placeholder="Step to Create"
                autosize={{ minRows: 2, maxRows: 6 }}
                onChange={this.handleChangeState}
              />
            </Form.Item>

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

            <Form.Item label="Comments:  ">
              <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 8 }} />
            </Form.Item>
          </Form>

          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Modal>
        <Table
          columns={columns}
          dataSource={defect}
          onChanger={this.handleChange}
        />

        {/* Edit Defects Part  */}
        <Modal
          title="Edit Defects"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Edit Defect Id: ">
                  <Input placeholder="Defect Id" disabled="true" />
                </Form.Item>
              </Col>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Edit Module: ">
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
                <Form.Item label="Edit Type: ">
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
                <Form.Item label="Edit Severity">
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
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Edit Priority:  ">
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

            <Form.Item label="Edit Description: ">
              <TextArea placeholder="Description" autosize />
            </Form.Item>

            <Form.Item label="Edit Steps to Re-create: ">
              <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} />
            </Form.Item>

            <Form.Item label="Edit Assigned To: ">
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

          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
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
                <b>Fixed Date:</b>
              </p>
              <p>
                <b>Available Date:</b>
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
              <p>Tom</p>
              <p>Sam</p>
              <p>05.05.2020</p>
              <p>05.10.2020</p>
              <p>{this.state.comment}</p>
            </Col>
          </Row>
          <Row>
            <div>
              <Button type="primary" onClick={this.attachment}>
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
            </div>
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
