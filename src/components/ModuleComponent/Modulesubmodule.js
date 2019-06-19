import { Table,Modal,Form,Input,Icon,Popconfirm, message,Button,Popover } from 'antd';
import { Component } from 'react';
import React from 'react';

class Modulesubmodule extends Component{
  state = {
    hovered: false,
  };

  hide = () => {
    this.setState({
      hovered: false,
    });
  };

  handleHoverChange = visible => {
    this.setState({
      hovered: visible,
    });
  };

  handleClickChange = visible => {
    this.setState({
      hovered: false,
    });
  };
    constructor() {
        super();
        this.state = {
          formLayout: 'horizontal',
          
        };
      }

confirm = () => {
  message.info("Clicked on Yes.");
}
    
      handleFormLayoutChange = e => {
        this.setState({ formLayout: e.target.value });
      };
    state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

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

  
  showModal1 = () => {
    this.setState({
      visible1: true
    });
  };

  handleOk1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };

  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };

  showModal2 = () => {
    this.setState({
      visible2: true
    });
  };

  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };
  handleOk2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };

  showModal3 = () => {
    this.setState({
      visible3: true
    });
  };

  handleCancel3 = e => {
    console.log(e);
    this.setState({
      visible3: false
    });
  };
  handleOk3 = e => {
    console.log(e);
    this.setState({
      visible3: false
    });
  };


  
  
render()
{
  const hoverContent = <h5>Add Sub Module</h5>;
  const expandedRowRender = () => {
    const columns = [
      { title: 'Submodule ID', dataIndex: 'date', key: 'date' },
      { title: 'Submodule Name', dataIndex: 'name', key: 'name' },
      {render:()=><Icon type="edit" onClick={this.showModal2} style={{color:'blue'}}></Icon>},
      {render:()=><Popconfirm placement="topLeft" title={text} okText="Yes" cancelText="No">
                    <Icon type="delete" style={{color:'red'}}/>
                  </Popconfirm>},
    ];

    const data = [
      {
      key: 1,
      date: '001',
      name: 'Form Design',
      },
      {
        key: 4,
        date: '002',
        name: 'Form Design',
      },
    ];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const text = "Are you sure to delete this item?";
  const columns = [
    { title: 'Module ID', dataIndex: 'name', key: 'name' },
    { title: 'Module Name', dataIndex: 'platform', key: 'platform' },
    {render:()=><Popover
        style={{ width: 500 }}
        content={hoverContent}
        trigger="hover"
        onVisibleChange={this.handleHoverChange}>
        <Icon type="plus-circle" onClick={this.showModal} style={{color:'green'}}></Icon>
      </Popover>},
    {render:()=><Icon type="edit" onClick={this.showModal1} style={{color:'blue'}}></Icon>},
    {render:()=><Popconfirm placement="topLeft" title={text} okText="Yes" cancelText="No">
                  <Icon type="delete" style={{color:'red'}}/>
                </Popconfirm>},
  ];

  const data = [
    {
      key: 2,
      name: '01',
      platform: 'Login',
    },
    {
      key: 3,
      name: '02',
      platform: 'QA Dashboard',
    },
  ];
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : null;
  
      const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
          },
        };
          return (
            <div>
              <div style={{paddingBottom:'20px'}}><Button type="primary" onClick={this.showModal3}>Add Module</Button></div>
                <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={expandedRowRender}
                dataSource={data}/>
                <Modal
                    title="Add Submodule"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="Add">
                    
                        <Form layout={formLayout}>
                            <Form.Item label="Module ID" >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                            <Form.Item label="Submodule Name:" >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                        </Form>
                </Modal>
                <Modal
                    title="Edit Module"
                    visible={this.state.visible1}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    okText="Edit">
                        <Form layout={formLayout}>
                            <Form.Item label="Module ID" >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                            <Form.Item label="Module Name:" >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                        </Form>
                </Modal>
                <Modal
                    title="Edit Sub Module"
                    visible={this.state.visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    okText="Edit">
                        <Form layout={formLayout}>
                            <Form.Item label="Sub Module ID" >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                            <Form.Item label="Sub Module Name:" >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                        </Form>
                </Modal>
                <Modal
                    title="Add Module"
                    visible={this.state.visible3}
                    onOk={this.handleOk3}
                    onCancel={this.handleCancel3}
                    okText="Add">
                        <Form layout={formLayout}>
                            <Form.Item label="Module ID" >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                            <Form.Item label="Module Name:" >
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                        </Form>
                </Modal>
            </div>
          );
  }
}
export default Modulesubmodule;