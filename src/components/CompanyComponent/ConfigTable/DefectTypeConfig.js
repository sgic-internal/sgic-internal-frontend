import React from "react";
import {
  Table,
  Divider,
  Modal,
  Button,
  Icon,
  Form,
  Input,
  Popconfirm,
  Select
} from "antd";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import { Row, Col } from "antd";
import DefectTypeConfigController from "./DefectTypeConfigController";
const { Option } = Select;

const data = [
  {
    key: "1",
    name: "UI",
    Description: "UI",
    Colour: "#ff5e57"
  },
  {
    key: "2",
    name: "Functionality",
    Description: "Functionality",
    Colour: "#0be881"
  },
  {
    key: "3",
    name: "Enhancement",
    Description: "Enhancement",
    Colour: "#ffdd59"
  },
  {
    key: "4",
    name: "Performance",
    Description: "Performance",
    Colour: "#00d8d6"
  }
];

export default class DefectTypeConfic extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    typeId: "",
    typeName: "",
    typeValue: "",
    getAllType: []
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
    e.preventDefault();
    const DefectType = {
      typeName: this.state.typeName,
      typeValue: this.state.typeValue
    };
    DefectTypeConfigController.AddTypeApi(DefectType);
    console.log(DefectType);

    this.setState({
      visible: false,
      typeValue: ""
    });
  };

  txtOnChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(e.target.value);
  };

  fetchAllType = () => {
    fetch(`http://localhost:8083/productservice/Types`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          getAllType: data
        });
        console.log(data);
      });
  };
  componentDidMount() {
    this.fetchAllType();
  }

  handleDelete = typeId => {
    DefectTypeConfigController.DeleteTypeApi(typeId);
    console.log(" Successfully deleted " + typeId);
    const getAllType = this.state.getAllType.filter(getAllType => {
      return getAllType.typeId != typeId;
    });

    this.setState({
      getAllType
    });
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
    this.setState({ color: color.rgb });
  };
  handleSubmit = e => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log("Received values of form: ", values);
    //   }
    // });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const columns = [
      {
        title: "DefectType",
        dataIndex: "typeName",
        key: "typeName"
      },
      {
        title: "Value",
        dataIndex: "typeValue",
        key: "typeValue"
      },
      {
        title: "Action",
        key: "action",
        render: (data = this.state.getAllType) => (
          <span>
            {/* <a onClick={this.showEditModal}>
              <Icon type="edit" style={{ fontSize: "17px", color: "blue" }} />
            </a>
            <Divider type="vertical" /> */}
            <Popconfirm
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: "red" }} />}
              onConfirm={() => this.handleDelete(data.typeId)}
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
              <h3>Defect Type Configuration</h3>
            </Col>
            <Col span={6} />
            <Col span={10} />
          </Row>

          <br />
          <Row>
            <Col span={4}>
              {" "}
              <div>
                <Button type="primary" onClick={this.showModal}>
                  Add Defect Type
                </Button>
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
            title=" Add Defect Type"
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
                {/* <Form.Item label="TypeName">
                  <Input />
                </Form.Item> */}
                <Form.Item label="Value">
                  <Input
                    id="typeValue"
                    value={this.state.typeValue}
                    onChange={e => this.txtOnChange(e)}
                  />
                </Form.Item>

                {/* <Form.Item label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? (
                    <div style={styles.popover}>
                      <div
                        style={styles.cover}
                        onClick={this.handleClose}
                      />
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

          <Modal
            title="Edit DefectType"
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
                {/* <Form.Item label="TypeName">
                  <Input />
                </Form.Item> */}
                <Form.Item label="Description">
                  <Input
                    id="priorityValue"
                    value={this.state.typeValue}
                    onChange={e => this.txtOnChange(e)}
                  />
                </Form.Item>

                {/* <Form.Item label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? (
                    <div style={styles.popover}>
                      <div
                        style={styles.cover}
                        onClick={this.handleClose}
                      />
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
          <Table columns={columns} dataSource={this.state.getAllType} />

          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}
