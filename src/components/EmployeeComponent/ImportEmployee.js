import React from "react";
import { Modal, Button, message, Upload, Icon } from "antd";


const props = {
  name: "uploadfile",
  action: "http://localhost:8084/employeeservice/database",
  headers: {
    authorization: "authorization-text"
  }
};
export default class ImportEmployee extends React.Component {
  state = { visible: false, value: undefined };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {

    //const {props}=this.props;
    return (
      <React.Fragment>
        <Button type="primary" onClick={this.showModal}>
          <Icon />
          Import Employees
        </Button>

        <Modal
          title="Import Employees"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
        >

          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Modal>

      </React.Fragment>

    );
  }
}
