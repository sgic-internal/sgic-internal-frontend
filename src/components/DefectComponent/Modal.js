import React from 'react';
import { Modal, Button, Icon , Menu, Dropdown, message,Form, Select, Row, Col,Upload} from 'antd';
import { Input } from 'antd';
import { TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
//import { Input } from 'antd';
const { TextArea } = Input;
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    }
  }
export default class ModalB extends React.Component {
  state = { visible: false , value: undefined };

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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

    handleChange = value => {
    console.log(`selected ${value}`);
  }

  onChange=(info)=> {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  
  render() {
      //const {props}=this.props;
    return (
   
          <React.Fragment>
        <Button type="primary" onClick={this.showModal}>
        <Icon type="plus-circle" theme="twoTone" />Add
        </Button>
        <Modal
          title="Add Defects"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
        >
            <Form onSubmit={this.handleSubmit}>
            <Row>
                <Col span={12} style={{padding: '5px'}}>

            
        <Form.Item label = "Defect Id: ">
            
            <Input
              placeholder="Defect Id"
              disabled="true"
            />
        </Form.Item>
   
   </Col>
   <Col span={12} style={{padding: '5px'}}>
   <Form.Item label = "Module: ">
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
        <Col span={8} style={{padding: '5px'}}>

      
      <Form.Item label = "Type: ">
      <Select defaultValue="Type-1" style={{ width: '100%' }} onChange={this.handleChange}>
      <Option value="Type-1">Type-1</Option>
      <Option value="Type-2">Type-2</Option>
      <Option value="Type-3">Type-3</Option>
    </Select>
    </Form.Item>
    </Col>
    <Col span={8} style={{padding: '5px'}}>
  
      <Form.Item label = "Severity">
      <Select defaultValue="high" style={{ width: '100%' }} onChange={this.handleChange}>
      <Option value="high">High</Option>
      <Option value="medium">Medium</Option>
      <Option value="low">Low</Option>
    </Select>
    </Form.Item>
   </Col>
   <Col span={8} style={{padding: '5px'}}>
      <Form.Item label = "Priority:  ">
      <Select defaultValue="high" style={{ width: '100%' }} onChange={this.handleChange}>
      <Option value="high">High</Option>
      <Option value="medium">Medium</Option>
      <Option value="low">Low</Option>
    </Select>
    </Form.Item>
    </Col>
        </Row>
     
    <Form.Item label = "Description: ">
    <TextArea placeholder="Description" autosize />
    </Form.Item>
    
    <Form.Item label = "Steps to Re-create: ">
    <TextArea
      placeholder=""
      autosize={{ minRows: 2, maxRows: 6 }}
    />
        </Form.Item>
         
    
        <Form.Item label = "Assigned To: ">
            
        <Select defaultValue="high" style={{ width: '100%' }} onChange={this.handleChange}>
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
     
      </React.Fragment>
      
    );
  }

};