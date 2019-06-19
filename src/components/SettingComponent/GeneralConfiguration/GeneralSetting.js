import React from "react";
import { Modal, Button, Form, Input, Row, Col,Breadcrumb } from 'antd';



class GeneralSetting extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    fullname:null
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

   
    render() {
        
        return (
            <React.Fragment>
                <Breadcrumb style={{
                    margin: '16px 0'
                }}>
                    <Breadcrumb.Item>General Configuration</Breadcrumb.Item>
                    <Breadcrumb.Item>General Setting</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                    padding: 24,
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
                   <Row>
            <Col span={8}><h3>General Setting</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>

<Row>
      <Col span={6}>Title</Col>
      <Col span={6}>Defect Tracket</Col>
      <Col span={12}><a onClick={this.showModal}>Edit</a></Col>
     
    </Row>
<br></br>
    <Row>
      <Col span={6}>Email From</Col>
      <Col span={6}>$(fullname)(Defecttracker)</Col>
      <Col span={12}><a onClick={this.showModal}>Edit</a></Col>
     
    </Row>

    <Modal
            title=" Edit Title"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ padding: "60px", }}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                
                onClick={this.handleOk}
              >
                Update
              </Button>
            ]}
          >
            <div
              style={{
                margin: "0 -20px -100px 0",
                background: '#fff',
                minHeight: '150px',

              }}>

              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Title Name">
                  <Input />
                </Form.Item>
               


              </Form>
            </div>

          </Modal>

          <Modal
            title=" Edit Email From"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ padding: "60px", }}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                
                onClick={this.handleOk}
              >
                Update
              </Button>
            ]}
          >
            <div
              style={{
                margin: "0 -20px -100px 0",
                background: '#fff',
                minHeight: '150px',

              }}>

              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Email From">
                  <Input />
                </Form.Item>
               


              </Form>
            </div>

          </Modal>
                </div>
                
            </React.Fragment>

        );
    }
}

export default GeneralSetting;



