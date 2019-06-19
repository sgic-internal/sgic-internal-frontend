import { Modal, Button, Icon, Row, Col, Form  } from 'antd';
import React from 'react';

export default class ViewDefectModel extends React.Component {
  state = { visible: false };

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
      <div>
        <Icon 
        type="fullscreen" 
        onClick={this.showModal}
        style={{fontSize:'18px', color:'black'}} />
        <br/>
        <Modal
          title="More Info "
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Form layout="vertical">
<Row>
    <Col  span={6} style={{padding: "5px"}}>
        <Form.Item label="Project Id">
        </Form.Item>{" "}
    </Col>
    <Col span={18} style={{padding: "5px"}}>
    <Form.Item >Pro1</Form.Item>
    </Col>
    
   </Row>
   <Row>
    <Col  span={6} style={{padding: "5px"}}>
        <Form.Item label="Project Name">
        </Form.Item>{" "}
    </Col>
    <Col span={18} style={{padding: "5px"}}>
    <Form.Item >Project01</Form.Item>
    </Col>
    
   </Row>
   <Row>
    <Col  span={6} style={{padding: "5px"}}>
        <Form.Item label="Duration">
        </Form.Item>{" "}
    </Col>
    <Col span={18} style={{padding: "5px"}}>
    <Form.Item >Duration</Form.Item>
    </Col>
    
   </Row>
   <Row>
    <Col  span={6} style={{padding: "5px"}}>
        <Form.Item label="Assigned To">
        </Form.Item>{" "}
    </Col>
    <Col span={18} style={{padding: "5px"}}>
    <Form.Item >Assigned To </Form.Item>
    </Col>
    
   </Row>
      </Form>
        </Modal>
      </div>
    );
  }
}

