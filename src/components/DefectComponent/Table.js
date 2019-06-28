import React from 'react';
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
  Typography, Divider
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

// const images = [
//   '//placekitten.com/1500/500',
//   '//placekitten.com/4000/3000',
//   '//placekitten.com/800/1200',
//   '//placekitten.com/1500/1500',
//   'http://localhost:8081/defect/downloadFile/1'
// ];
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
//import { Input } from 'antd';
const { TextArea } = Input;
const id=1;
const props = {
  name: 'files',
  action: 'http://localhost:8081/defect/uploadMultipleFiles?defectId='+id,
  headers: {
    authorization: 'authorization-text',
  },
  multiple:true
}
function
  confirm(e) {

  console.log(e);

  message.success("Successfully Deleted");

}

function
  cancel(e) {

  console.log(e);

  message.error("Click on No");

}
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
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
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const data = [
  {
    key: '1',
    defectid: '001',
    modulename: 'Thanushan',
    severity: ['High'],
    priority: ['Medium'],
    type: 'UI',
    status: 'Open',
  },
  {
    key: '2',
    defectid: '002',
    modulename: 'Romi',
    severity: ['Low'],
    priority: ['High'],
    type: 'Functionality',
    status: 'Open',
  },
  {
    key: '3',
    defectid: '003',
    modulename: 'Thuvi',
    severity: ['High'],
    priority: ['Low'],
    type: 'Performance',
    status: 'Open',
  },
  {
    key: '4',
    defectid: '004',
    modulename: 'Guruji',
    severity: ['Low'],
    priority: ['High'],
    type: 'UI',
    status: 'Re-opened',
  },
];

export default class TableFilter extends React.Component {
  // state = {
  //   filteredInfo: null,
  //   sortedInfo: null,
  //   visible: false,
  //   visible1: false,
  //   showModalView: false,
  //   comments: [],
  //   submitting: false,
  //   value: '',
  // };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      comments: "",
      defectId: "",
      user: "",
      status: "",
      audit: '',
      comment: [],
      photoIndex: 0,
      isOpen: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState(
      {
        comments: e.target.value

      });
  }
  attachment = () => {
    axios.get("http://localhost:8081/defect/listFile/1")
      .then(data => {
        data.data.map(file => {
          if (file.id == 1) {
            console.log(file.fileDownloadUri)
            this.setState({
              images: [file.fileDownloadUri],
              isOpen: true
            })
          }
        })
      });
    // this.setState({
    //   images:['//localhost:8081/defect/downloadFile/1'],
    //   isOpen: true 
    // })
  }

  onSubmit(e) {
    e.preventDefault();

    const commentsu = {
      comments: this.state.comments,
      defectId: "1"



    }
    //var myJSON = JSON.stringify(commentsu);
    console.log(commentsu);

    axios.post('http://localhost:8081/defect/comments', commentsu)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.getComment()
      });
    // fetch('http://localhost:8081/defect/comments', {
    //   method: 'post',
    //   body: JSON.stringify(commentsu)
    // }).then(function(response) {
    //   return response.json();
    // });



    this.setState({

      comments: "",
      defectId: ""


    });
  }
  onChange1 = (value) => {
    console.log(`selected ${value}`);

    const auditinfo = {
      status: "Status changes to " + value,
      user: "romi",
      defectId: "1"
    }

    this.setState({

      audit: auditinfo

    });
    console.log(this.state.audit)


  }
  onBlur() {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

  onSearch(val) {
    console.log('search:', val);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showModal1 = () => {
    this.setState({
      visible1: true,
    });
  };

  showModalView = () => {
    this.setState({
      showModalView: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleOk1 = e => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  };
  handleOkView = e => {
    console.log(e);
    this.setState({
      showModalView: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  };
  handleCancelView = e => {
    console.log(e);
    this.setState({
      showModalView: false,
    });
  };
  // handleChange = (pagination, filters, sorter) => {
  //   console.log('Various parameters', pagination, filters, sorter);
  //   this.setState({
  //     filteredInfo: filters,
  //     sortedInfo: sorter,
  //   });
  // };

  // clearFilters = () => {
  //   this.setState({ filteredInfo: null });
  // };

  // clearAll = () => {
  //   this.setState({
  //     filteredInfo: null,
  //     sortedInfo: null,
  //   });
  // };

  // setAgeSort = () => {
  //   this.setState({
  //     sortedInfo: {
  //       order: 'descend',
  //       columnKey: 'age',
  //     },
  //   });
  // };
  // handleSubmit = () => {
  //   if (!this.state.value) {
  //     return;
  //   }

  //   this.setState({
  //     submitting: true
  //   });

  //   setTimeout(() => {
  //     this.setState({
  //       submitting: false,
  //       value: '',
  //       comments: [
  //         {
  //           author: 'Han Solo',
  //           avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //           content: <p>{this.state.value}</p>,
  //           datetime: moment().fromNow(),
  //         },
  //         ...this.state.comments,
  //       ],
  //     });
  //   }, 1000);
  // };

  // handleChangeState = e => {
  //   this.setState({
  //     value: e.target.value
  //   });
  //};
  remove = (id) => {
    console.log(id)
    // axios.delete('http://localhost:8081/defect/comments/'+ id)
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // });
    fetch('http://localhost:8081/defect/delete/' + id, {
      method: 'DELETE',
      // body: JSON.stringify(items),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.getComment();
    }).catch(err => err);
  }
  componentDidMount() {
    this.getComment()
  }

  getComment() {
    axios.get('http://localhost:8081/defect/comments/1')
      .then(resp => {

        let Data = resp.data;

        let comment = Data.map(e => {


          // return <div><p>{e.comments}</p></div>
          return <tr key={e.id}>
            <td style={{ whiteSpace: 'nowrap', width: "20%" }}>{e.comments}</td>
            <td></td>

            <td>{

            }</td>

            <td style={{ paddingLeft: '140px' }}>

              <Icon type="minus-circle" style={{ color: 'red' }} onClick={() => this.remove(e.commentId)} />


              {/* <Button size="sm" color="danger" onClick={() => this.remove(e.commentId)}>Delete</Button> */}

            </td>
          </tr>

        });

        this.setState({ comment });

        console.log(comment);
      });
  }

  Preloader(props) {
    return <img src="spinner.gif" />;
  }
  render() {
    const { photoIndex, isOpen, images } = this.state;
    const { comments, submitting, value } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Defect Id',
        dataIndex: 'defectid',
        key: 'defectid',
        //filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        filteredValue: filteredInfo.defectid || null,
        onFilter: (value, record) => record.defectid.includes(value),
        sorter: (a, b) => a.defectid.length - b.defectid.length,
        sortOrder: sortedInfo.columnKey === 'defectid' && sortedInfo.order,
      },
      {
        title: 'Module Name',
        dataIndex: 'modulename',
        key: 'modulename',
        //filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        filteredValue: filteredInfo.modulename || null,
        onFilter: (value, record) => record.modulename.includes(value),
        sorter: (a, b) => a.modulename.length - b.modulename.length,
        sortOrder: sortedInfo.columnKey === 'modulename' && sortedInfo.order,
      },
      {
        title: 'Severity',
        dataIndex: 'severity',
        key: 'severity',
        filters: [{ text: 'High', value: 'High' }, { text: 'Medium', value: 'Medium' }, { text: 'Low', value: 'Low' }],
        filteredValue: filteredInfo.severity || null,
        onFilter: (value, record) => record.severity.includes(value),
        sorter: (a, b) => a.severity.length - b.severity.length,
        sortOrder: sortedInfo.columnKey === 'severity' && sortedInfo.order,
        render: severity => (
          <span>
            {severity.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'High') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),

      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        filters: [{ text: 'High', value: 'High' }, { text: 'Medium', value: 'Medium' }, { text: 'Low', value: 'Low' }],
        filteredValue: filteredInfo.priority || null,
        onFilter: (value, record) => record.priority.includes(value),
        sorter: (a, b) => a.priority.length - b.priority.length,
        sortOrder: sortedInfo.columnKey === 'priority' && sortedInfo.order,
        render: priority => (
          <span>
            {priority.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'High') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters: [{ text: 'UI', value: 'UI' }, { text: 'Functinality', value: 'Functinality' }, { text: 'Enhancement', value: 'Enhancement' }],
        filteredValue: filteredInfo.type || null,
        onFilter: (value, record) => record.type.includes(value),
        sorter: (a, b) => a.type.length - b.type.length,
        sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [{ text: 'Open', value: 'Open' }, { text: 'Re-opened', value: 'Re-opened' }, { text: 'Defrred', value: 'Defrred' }],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        sorter: (a, b) => a.status.length - b.status.length,
        sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Icon type="edit" style={{ fontSize: "18px", color: "blue" }} onClick={this.showModal} />
            <Divider
              type="vertical"
            />

            <Popconfirm

              title="Are you sure want to delete this Entry ?"

              icon={<Icon
                type="question-circle-o"
                style={{
                  color:
                    "red"
                }}
              />}

              onConfirm={confirm}

              onCancel={cancel}

              okText="Yes"

              cancelText="No"

            >

              <a
                href="#">

                <Icon
                  type="delete"
                  style={{
                    color:
                      "red", fontSize: "18px"
                  }}
                />

              </a>

            </Popconfirm>
          </span>
        ),

      },
      {
        title: 'More',
        dataIndex: 'more',
        key: 'more',
        render: (text, record) => (
          <span>
            <Icon type="arrows-alt" style={{ fontSize: "18px", color: 'green' }} onClick={this.showModalView} />
          </span>
        ),

      },

    ];
    return (
      <div>
        <Button type="primary" onClick={this.showModal1}>
          Add Defect
        </Button>
        <br /><br />
        {/* Add Defects Part */}
        <Modal
          title="Add Defects"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
          width="600px"
        >

          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12} style={{ padding: '5px' }}>


                <Form.Item label="Defect Id: ">

                  <Input
                    placeholder="Defect Id"
                    disabled="true"
                  />
                </Form.Item>

              </Col>
              <Col span={12} style={{ padding: '5px' }}>
                <Form.Item label="Module: ">
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Module / SubModule name"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onChange}
                  >
                    <TreeNode value="parent 1" title="Module" key="0-1">
                      <TreeNode value="parent 1-0" title="Sub Module" key="0-1-1">


                      </TreeNode>

                    </TreeNode>
                  </TreeSelect>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={8} style={{ padding: '5px' }}>


                <Form.Item label="Type: ">
                  <Select defaultValue="UI" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="UI">UI</Option>
                    <Option value="Functionality">Functionality</Option>
                    <Option value="Enhancement">Enhancement</Option>
                    <Option value="performance">Performance</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: '5px' }}>

                <Form.Item label="Severity">
                  <Select defaultValue="high" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: '5px' }}>
                <Form.Item label="Priority:  ">
                  <Select defaultValue="high" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Description: ">
              <TextArea placeholder="Description" autosize />
            </Form.Item>

            <Form.Item label="Steps to Re-create: ">
              <TextArea
                placeholder=""
                autosize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>


            <Form.Item label="Assigned To: ">

              <Select defaultValue="user1" style={{ width: '100%' }} onChange={this.handleChangeState}>
                <Option value="user1">User 1</Option>
                <Option value="user2">User 2</Option>
                <Option value="user3">User 3</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Comments:  ">
              <TextArea
                placeholder=""
                autosize={{ minRows: 2, maxRows: 8 }}
              />
            </Form.Item>
          </Form>

          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
    </Button>
          </Upload>
        </Modal>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />

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
              <Col span={12} style={{ padding: '5px' }}>


                <Form.Item label="Edit Defect Id: ">

                  <Input
                    placeholder="Defect Id"
                    disabled="true"
                  />
                </Form.Item>

              </Col>
              <Col span={12} style={{ padding: '5px' }}>
                <Form.Item label="Edit Module: ">
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Module / SubModule name"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onChange}
                  >
                    <TreeNode value="parent 1" title="Module" key="0-1">
                      <TreeNode value="parent 1-0" title="Sub Module" key="0-1-1">


                      </TreeNode>

                    </TreeNode>
                  </TreeSelect>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={8} style={{ padding: '5px' }}>


                <Form.Item label="Edit Type: ">
                  <Select defaultValue="UI" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="UI">UI</Option>
                    <Option value="Functionality">Functionality</Option>
                    <Option value="Enhancement">Enhancement</Option>
                    <Option value="performance">Performance</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: '5px' }}>

                <Form.Item label="Edit Severity">
                  <Select defaultValue="high" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: '5px' }}>
                <Form.Item label="Edit Priority:  ">
                  <Select defaultValue="high" style={{ width: '100%' }} onChange={this.handleChangeState}>
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
              <TextArea
                placeholder=""
                autosize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>


            <Form.Item label="Edit Assigned To: ">

              <Select defaultValue="User 1" style={{ width: '100%' }} onChange={this.handleChangeState}>
                <Option value="user1">User 1</Option>
                <Option value="user2">User 2</Option>
                <Option value="user3">User 3</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Edit Comments:  ">
              <TextArea
                placeholder=""
                autosize={{ minRows: 2, maxRows: 8 }}
              />
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
            <Col span={10} style={{ padding: '5px' }}>
              <p><b>Module name:</b></p>
              <p><b>Description:</b></p>
              <p><b>Steps to re-create:</b></p>
              <p><b>Severity:</b></p>
              <p><b>Priority:</b></p>
              <p><b>Defect Type:</b></p>
              <p><b>Status:</b></p>
              <p><b>Entered By:</b></p>
              <p><b>Entered Date:</b></p>
              <p><b>Assigned To:</b></p>
              <p><b>Fixed By:</b></p>
              <p><b>Fixed Date:</b></p>
              <p><b>Available Date:</b></p>
              <p><b>Comments:</b></p>


              {/* <p label="Priority: "> </p>
              <br />
              <br />
              <br />
              <br />
              <p label="Status: "></p> */}
            </Col>
            <Col span={14} style={{ padding: '5px' }}>
              <p>Defect Dashboard</p>
              <p>Samuel Gnanam IT Centre has devoted itself </p>
              <p>Lorem ipsum dolor sit amet consectetur.  </p>
              <p><Tag color="red">High</Tag></p>
              <p> <Tag color="orange">Low</Tag></p>
              <p>UI</p>
              <p>Open</p>
              <p>Tom</p>
              <p>05.05.2019</p>
              <p>Tom</p>
              <p>Sam</p>
              <p>05.05.2020</p>
              <p>05.10.2020</p>
              {/* <p>Samuel Gnanam IT Centre has devoted itself to become the pioneer institution for Industrial Software Engineering Training in Jaffna, which helps and guide the IT graduates to reach heights in their IT career. SGIC is a charitable organization under the Trust of ‘Deshamanya A Y S Gnanam’, who is the founder of Anthony’s Group in Sri Lanka. Deshamanya A Y S Gnanam had done various philanthropic activities in Sri Lanka and his sons are following his footsteps.</p> */}
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
                  prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + images.length - 1) % images.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % images.length,
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

