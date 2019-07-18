import React from "react";
import {
  Table,
  Divider,
  Modal,
  Button,
  Icon,
  Upload,
  Form,
  Input,
  Col,
  Row,
  Popconfirm,
  Select
} from "antd";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import SeverityConfigController from "./SeverityConfigController";

// const { Option } = Select;

// const props = {
//   action: "//jsonplaceholder.typicode.com/posts/",
//   listType: "picture",
//   previewFile(file) {
//     console.log("Your upload file:", file);
//     // Your process logic. Here we just mock to the same file
//     return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
//       method: "POST",
//       body: file
//     })
//       .then(res => res.json())
//       .then(({ thumbnail }) => thumbnail);
//   }
// };

export default class SeverityConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    severityId: "",
    severityName: "Severity",
    severityValue: "",
    severityIcon: "",
    severityColor: "",
    getAllSeverity: []
  };

  // onChangeDefectSeverityName(e) {
  //   this.setState({
  //     severityName: e.target.value
  //   });
  // }
  onChangeIcon = value => {
    console.log("changed", value);
    this.setState({ severityIcon: value });
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
    // this.setState({
    //   visible: false
    // });

    e.preventDefault();
    const Severity = {
      severityName: this.state.severityName,
      severityValue: this.state.severityValue,
      severityIcon: this.state.severityIcon,
      severityColor: this.state.severityColor
    };

    SeverityConfigController.AddSeverityApi(Severity);
    console.log(Severity);
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

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.rgb, severityColor: color.hex });
    console.log(color.hex);
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

  fetchAllSeverity = () => {
    fetch(`http://localhost:8083/productservice/Severitys`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          getAllSeverity: data
        });
        console.log(data);
      });
  };

  txtOnChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(e.target.value);
  };

  componentDidMount() {
    this.fetchAllSeverity();
  }

  handleDelete = severityId => {
    SeverityConfigController.DeleteSeverityApi(severityId);
    console.log(" Successfully deleted " + severityId);
    const getAllSeverity = this.state.getAllSeverity.filter(getAllSeverity => {
      return getAllSeverity.severityId != severityId;
    });

    this.setState({
      getAllSeverity
    });
  };

  render() {
    // const { visible, loading } = this.state.getAllSeverity;
    const columns = [
      {
        title: "Severity",
        dataIndex: "severityName",
        key: "name"
      },
      {
        title: "Description",
        dataIndex: "severityValue",
        key: "Description"
      },
      {
        title: "Icon",
        dataIndex: "severityIcon",
        key: "Icon",
        render: icon => <Icon type={icon} />
      },
      {
        title: "Color",
        key: "Color",
        dataIndex: "severityColor",
        render: colour => (
          <Icon
            type="minus-square"
            style={{ color: colour, background: colour }}
          />
        )
      },
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
              onConfirm={() => this.handleDelete(data.severityId)}
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
    const { Option } = Select;
    return (
      <React.Fragment>
        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: "200px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
          }}
        >
          <Row>
            <Col span={8}>
              <h3>Severity Configuration</h3>
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
                    Add severity
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
            title=" Add severity"
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
                    id="severityName"
                    value={this.state.severityName}
                    onChange={e => this.txtOnChange(e)}
                    // readOnly
                  />
                </Form.Item> */}
                <Form.Item label="Value">
                  <Input
                    id="severityValue"
                    value={this.state.severityValue}
                    onChange={e => this.txtOnChange(e)}
                  />
                </Form.Item>

                <Form.Item label="Icon">
                  <Select
                    name="icon"
                    id="icon"
                    value={this.state.severityIcon}
                    defaultValue="Select Icon"
                    style={{ width: 120 }}
                    onChange={this.onChangeIcon}
                  >
                    <Option key="up" value="caret-up">
                      <Icon type="caret-up" />
                    </Option>
                    <Option key="up" value="up">
                      <Icon type="up" />
                    </Option>
                    <Option key="up" value="vertical-align-top">
                      <Icon type="vertical-align-top" />
                    </Option>
                    <Option key="up" value="arrow-up">
                      <Icon type="arrow-up" />
                    </Option>
                    <Option key="up" value="vertical-align-middle">
                      <Icon type="vertical-align-middle" />
                    </Option>
                    <Option key="up" value="swap">
                      <Icon type="swap" />
                    </Option>
                    <Option key="up" value="minus">
                      <Icon type="minus" />
                    </Option>
                    <Option key="up" value="column-width">
                      <Icon type="column-width" />
                    </Option>
                    <Option key="up" value="down">
                      <Icon type="down" />
                    </Option>
                    <Option key="up" value="vertical-align-bottom">
                      <Icon type="vertical-align-bottom" />
                    </Option>
                    <Option key="up" value="arrow-down">
                      <Icon type="arrow-down" />
                    </Option>
                    <Option key="up" value="caret-down">
                      <Icon type="caret-down" />
                    </Option>
                  </Select>
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
            title="Edit Severity"
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
                <Form.Item label="Name">
                  <Input />
                </Form.Item>
                <Form.Item label="Description">
                  <Input />
                </Form.Item>
                {/* <Form.Item label="Icon">
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> Upload
                    </Button>
                  </Upload>
                </Form.Item> */}

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
          <Table columns={columns} dataSource={this.state.getAllSeverity} />

          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}
