import { Modal, Form, Row, Col, Input, Icon, DatePicker } from "antd";
import Table from "./Table"
import React from "react";
import axios from "axios";

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

export default class Model extends React.Component {


  constructor(props) {
    super(props);
    this.onChangeprojectId = this.onChangeprojectId.bind(this);
    this.onChangeprojectName =this.onChangeprojectName.bind(this);
    this.onChangeDuration=this.onChangeDuration.bind(this);
    this.onChangeStatus=this.onChangeStatus.bind(this);
    this.onChangeType=this.onChangeType.bind(this);
    this.onChangeEndDate=this.onChangeEndDate.bind(this);
    this.onChangeStartDate=this.onChangeStartDate.bind(this);
    this.handleEditOk= this.handleEditOk.bind(this);

    
  


  this.state = {
 
    projectId:this.props.projectProps,
    projectName:'',
    duration:'',
    startDate:'',
    endDate:'',
    status:'',
    type:'',
    
    
  }
  };


  componentDidMount(){

    
  }
  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  };
  onChangeprojectId = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      projectId: e.target.value
    });
  };
  onChangeprojectName = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      projectName: e.target.value
    });
  };
  onChangeType = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      type: e.target.value
    });
  };
  onChangeDuration = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      duration: e.target.value
    });
  };
  onChangeStatus = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      status: e.target.value
    });
  };

  onChange = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      checked: e.target.checked
    });
  };
  

  onChangeStartDate(date, startDate) {
    //this.setState({startDate: dateString});

    this.setState({ startDate: startDate }, () =>
      console.log(this.state.startDate)
    );
    console.log(this.state.startDate);
  }

  onChangeEndDate(date, dateString) {
    this.setState({ endDate: dateString }, () =>
      console.log(this.state.endDate)
    );

    console.log(this.state.endDate);
  }
 
  showEditModal = () => {
    console.log("showEditModal");
    console.log(this.state.projectId);
    this.handleEdit(this.state.projectId);
    this.setState({
      visibleEditModal:true,
    });
  }

  handleEdit = (projectId) => {

    this.setState({projectId:projectId});

    axios
      .get(`http://localhost:8081/project_service/getProjectById/` + projectId)

      .then(response => {
        this.setState({
    
        projectName:response.data.projectName,
        duration:response.data.duration,
        status:response.data.status,
        startDate:response.data.startDate,
        endDate:response.data.endDate,
        type:response.data.type,
    
      });
      console.log(response.data);
    })
      .catch(err => console.log(err));

    
 

  };



  handleEditOk = (projectId) => {
    const obj = {
      projectId:this.state.projectId,
      projectName:this.state.projectName,
      duration:this.state.duration,
      status:this.state.status,
      startDate:this.state.startDate,
      endDate:this.state.endDate,
      type:this.state.type
    }
    axios.put(`http://localhost:8081/project_service/updateProject/${projectId}`, obj)
      .then(res => this.handleGet());

      this.setState({
        projectId:'',
        projectName:'',
        duration:'',
        status:'',
        startDate:'',
        endDate:'',
        type:'',
        visibleEditModal:false
       });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false
    });
  };





 
  render() {
    return (
      <div>
        <Icon
          type="edit"
          onClick={this.showEditModal}
          style={{ fontSize: "18px", color: "Blue" }}
        />
        <br />
        <Modal
          title="Edit Project"
          visible={this.state.visibleEditModal}
          onOk={this.handleEditOk}
          onCancel={this.handleCancel}
          width="600px"
          okText="Update"
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Id">
                  <Input
                    placeholder="Project Id"
                    value={this.state.projectId}
                    onChange={this.onChangeprojectId}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Name">
                  <Input
                    placeholder="Project Name"
                    value={this.state.projectName}
                    onChange={this.onChangeprojectName}
                  />
                </Form.Item>{" "}
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Type">
                  <Input
                    placeholder="Type"
                    value={this.state.type}
                    onChange={this.onChangeType}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={8}>
                <Form.Item label="Start Date">
                  <Form.Item>
                    <DatePicker
                    // dateRender={this.state.startDate}
                       startDate={this.state.startDate}
                      onChange={this.onChangeStartDate}
                      placeholder="Start Date"
                    />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="End Date">
                  <Form.Item>
                    <DatePicker
                      endDate={this.state.endDate}
                      onChange={this.onChangeEndDate}
                      placeholder="End Date"
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Duration">
                  <Input
                    placeholder="Duration"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Status">
                  <Input
                    placeholder="Status"
                    value={this.state.status}
                    onChange={this.onChangeStatus}
                  />
                </Form.Item>
              </Col>
              {/* 
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Config Id">
                  <Input
                    placeholder="Config Id"
                    value={this.state.configId}
                    onChange={this.onChangeconfigId}
                  />
                </Form.Item>{" "}
              </Col> */}
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
