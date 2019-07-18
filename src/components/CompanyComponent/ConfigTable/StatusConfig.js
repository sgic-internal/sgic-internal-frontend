import React from "react";
import {
  Table,
  Divider,
  Modal,
  Button,
  Icon,
  Form,
  Input,
  Col,
  Row,
  Popconfirm,
  Select
} from "antd";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import StatusConfigController from "./StatusConfigController";

const { Option } = Select;

export default class StatusConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    statusId: "",
    statusName: "",
    statusValue: "",
    getAllStatus: []
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  showEditModal = () => {
    console.log("showEditModal clicked");
    this.setState({
      visibleEditModal: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
    e.preventDefault();
    const Status = {
      statusName: this.state.statusName,
      statusValue: this.state.statusValue
    };

    StatusConfigController.AddStatusApi(Status);
    console.log(Status);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleEditPriorityCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false
    });
  };

  state = {
    displayColorPicker: false,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1"
    }
  };
  txtOnChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(e.target.value);
  };

  handleDelete = statusId => {
    StatusConfigController.DeleteStatusApi(statusId);
    console.log(" Successfully deleted " + statusId);
    const getAllStatus = this.state.getAllStatus.filter(getAllStatus => {
      return getAllStatus.statusId != statusId;
    });

    this.setState({
      getAllStatus
    });
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.rgb });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  fetchAllStatus = () => {
    fetch(`http://localhost:8083/productservice/Statuses`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          getAllStatus: data
        });
        console.log(data);
      });
  };

  componentDidMount() {
    this.fetchAllStatus();
  }

  render() {
    const columns = [
      {
        title: "Status",
        dataIndex: "statusName",
        key: "name"
      },
      {
        title: "Description",
        dataIndex: "statusValue",
        key: "Description"
      },
      // {
      //   title: "Color",
      //   dataIndex: "statusColor",
      //   key: "statusColor"
      // },
      {
        title: "Action",
        key: "action",
        render: (data = this.state.getAllSeverity) => (
          <span>
            {/* <a onClick={this.showEditModal}>
              <Icon type="edit" style={{ fontSize: "17px", color: "blue" }} />
            </a>
            <Divider type="vertical" /> */}
            <Popconfirm
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: "red" }} />}
              onConfirm={() => this.handleDelete(data.statusId)}
            >
              <a href="#">
                <Icon
                  type="delete"
                  style={{ fontSize: "17px", color: "red" }}
                />
              </a>
            </Popconfirm>
          </span>
        )
      }
    ];

    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${
            this.state.color.b
          }, ${this.state.color.a})`
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });
    return (
      <React.Fragment>
        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: "500px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
          }}
        >
          <Row>
            <Col span={8}>
              <h3>Status Configuration</h3>
            </Col>
            <Col span={6} />
            <Col span={10} />
          </Row>
          <br />

          <Row>
            <Col span={4}>
              {" "}
              <div>
                <div>
                  <Button type="primary" onClick={this.showModal}>
                    Add Status
                  </Button>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <Select
                defaultValue="DEFECTTRACKER"
                style={{ width: 120 }}
                onChange={this.handleChange}
              >
                <Option value="HRM">HRM</Option>
                <Option value="DEFECTTRACKER">DEFECTTRACKER</Option>
              </Select>
            </Col>
            <Col span={14} />
          </Row>
          <br />

          <Modal
            title=" Add Status"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ padding: "60px" }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: "#fff",
                minHeight: "150px"
              }}
            >
              <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                onSubmit={this.handleSubmit}
              >
                {/* <Form.Item label="Name">
                  <Input
                    id="statusName"
                    value={this.state.statusName}
                    onChange={e => this.txtOnChange(e)}
                  />
                </Form.Item> */}
                <Form.Item label="Value">
                  <Input
                    id="statusValue"
                    value={this.state.statusValue}
                    onChange={e => this.txtOnChange(e)}
                  />
                </Form.Item>

                <Form.Item label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? (
                    <div style={styles.popover}>
                      <div style={styles.cover} onClick={this.handleClose} />
                      <SketchPicker
                        color={this.state.color}
                        onChange={this.handleChange}
                      />
                    </div>
                  ) : null}
                </Form.Item>
              </Form>
            </div>
          </Modal>

          <Modal
            title="Edit Status"
            visible={this.state.visibleEditModal}
            onOk={this.handleOk}
            onCancel={this.handleEditPriorityCancel}
            style={{ padding: "60px" }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: "#fff",
                minHeight: "150px"
              }}
            >
              <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                onSubmit={this.handleSubmit}
              >
                {/* <Form.Item label="Name">
                  <Input />
                </Form.Item> */}
                <Form.Item label="Value">
                  <Input />
                </Form.Item>

                {/* <Form.Item label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? (
                    <div style={styles.popover}>
                      <div style={styles.cover} onClick={this.handleClose} />
                      <SketchPicker
                        color={this.state.color}
                        onChange={this.handleChange}
                      />
                    </div>
                  ) : null}
                </Form.Item> */}
              </Form>
            </div>
          </Modal>
          <Table columns={columns} dataSource={this.state.getAllStatus} />

          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}
