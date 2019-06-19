import { Modal, Icon, Row, Col, Form  } from 'antd';
import React from 'react';

export default class ViewModel extends React.Component {
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
      <Col span={3}> 
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
        <div style={{margin:"0 -20px 0 0",
        background:'#fff',
        minHeight:'150px',
      }}>
        <Form layout="vertical">
<Row>
    <Col  span={6} style={{padding: "5px"}}>
        <Form.Item label="Project Name">
        </Form.Item>{" "}
    </Col>
    <Col span={6} style={{padding: "5px"}}>
    <Form.Item >Pro1</Form.Item>
    </Col>
    
   </Row>
   <Row>
    <Col  span={6} style={{padding: "5px"}}>
        <Form.Item label="Abbrivation">
        </Form.Item>{" "}
    </Col>
    <Col span={6} style={{padding: "5px"}}>
    <Form.Item >DT</Form.Item>
    </Col>
    
   </Row>
   
      </Form>
      </div>
        </Modal>
      </div>
      </Col>  
    );
  }
}

