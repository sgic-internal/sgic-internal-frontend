import React from 'react';
import { Transfer, Switch, Table, Tag, Icon, Modal, Input, Row, Col, Select } from 'antd';
import difference from 'lodash/difference';

const { Option } = Select;

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false} >
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const mockDesignation = ['Software Engineer', 'QA Engineer', 'Software Engineer', 'QA Engineer'];
const mockRole = ['Tech lead', 'QA Lead', 'Junior Software Engineer', 'Junior QA', 'Software Engineer', 'Senior Software Engineer', 'QA Engineer', 'Senior QA Engineer'];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    empname: `content${i + 1}`,
    designation: mockDesignation[i % 3],
    role: mockRole[i % 3],
    disabled: i % 4 === 0,
  });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);


export default class RollAllocate extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
    visible: false,
  };

  onChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
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

    handleRollChange(value) {
      console.log(`selected ${value}`);
    }

  render() {
    const leftTableColumns = [
  {
    dataIndex: 'key',
    title: 'Emp ID',
  },
  {
    dataIndex: 'empname',
    title: 'Full name',
  },
  {
    dataIndex: 'designation',
    title: 'Designation',
    render: designation => <Tag>{designation}</Tag>,
  },
];
const rightTableColumns = [
   {
    dataIndex: 'key',
    title: 'Emp ID',
  },{
    dataIndex: 'empname',
    title: 'Full name',
  },{
    dataIndex: 'designation',
    title: 'Designation',
    render: designation => <Tag>{designation}</Tag>,
  },{
    dataIndex: 'role',
    title: 'Role',
    render: role => <Tag>{role}</Tag>,
  },{
    dataIndex: 'actions',
    title: 'Actions',
    render: actions => <a onClick={this.showModal}><Icon type="edit" style={{fontSize:'14px', color:'blue'}} /></a>,
  },
];
    return (
     
      <div>
        <TableTransfer
          dataSource={mockData}
          targetKeys={this.state.targetKeys}
          showSearch={true}
          onChange={this.onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
         <Modal
          title="Edit Role"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={12}>
                <p><b>Emp ID: </b></p>
                <p><b>Name: </b></p>
                <p><b>Designation: </b></p>
                <p><b>Select Role: </b></p>

            </Col>
               
            <Col span={12}>
               <p>EMP001</p>
                <p>John Doe</p>
                <p>Software Engineer</p>
                <p>
                  <Select defaultValue="Select Role" style={{ width: 200 }} onChange={this.handleRollChange}>
                      <Option value="Tech Lead">Tech Lead</Option>
                      <Option value="QA Lead">QA Lead</Option>
                      <Option value="Software Engineer">Software Engineer</Option>
                      <Option value="Senior Software Engineer">Senior Software Engineer</Option>
                      <Option value="Junior Software Engineer">Senior Software Engineer</Option>
                    </Select>
                </p>
            </Col>
          </Row>
          
        </Modal>
      </div>
    );
  }
}