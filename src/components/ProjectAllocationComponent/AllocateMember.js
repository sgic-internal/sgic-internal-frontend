import React from 'react';
import { Transfer, Switch, Table, Tag, Icon, Modal, Input, Row, Col, Select, TreeSelect } from 'antd';
import difference from 'lodash/difference';

const { Option } = Select;
const TreeNode = TreeSelect.TreeNode;
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

const mockRole = ['Tech lead', 'QA Lead', 'Junior Software Engineer', 'Junior QA', 'Software Engineer', 'Senior Software Engineer', 'QA Engineer', 'Senior QA Engineer'];
const mockModule = ['Login','Register', 'Logout', 'API Developement']
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    empname: `content${i + 1}`,
    role: mockRole[i % 3],
    module: mockModule[i % 3],
    disabled: i % 4 === 0,
  });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);


export default class ModuleAllocate extends React.Component {
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
     onChangeModule = value => {
       console.log(value);
       this.setState({
         value
       });
     };

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
    dataIndex: 'role',
    title: 'Role',
    render: role => <Tag>{role}</Tag>,
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
    dataIndex: 'role',
    title: 'Role',
    render: role => <Tag>{role}</Tag>,
  },{
    dataIndex: 'module',
    title: 'Module Alloc.',
    render: module => <Tag>{module}</Tag>,
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
          title="Edit Module"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="700px"
        >
          <Row>
            <Col span={12}>
                <p><b>Emp ID: </b></p>
                <p><b>Name: </b></p>
                <p><b>Designation: </b></p>
                <p><b>Role: </b></p>
                <p><b>Select Module: </b></p>

            </Col>
               
            <Col span={12}>
               <p>EMP001</p>
                <p>John Doe</p>
                <p>Software Engineer</p>
                <p>Tech Lead</p>
                <p>
                   <TreeSelect
                      showSearch
                      style={{
                      width: 300
                  }}
                      value={this.state.value}
                      dropdownStyle={{
                      maxHeight: 400,
                      overflow: 'auto'
                  }}
                      placeholder="Please select Module"
                      allowClear
                      multiple
                      treeDefaultExpandAll
                      onChange={this.onChangeModule}>
                      <TreeNode value="Defect System " title="Defect System " key="0-1">
                          <TreeNode value="UI" title="UI" key="0-1-1">
                              <TreeNode value="submodule1" title="submodule1" key="random"/>
                              <TreeNode value="submodule2" title="submodule2" key="random1"/>
                          </TreeNode>
                          <TreeNode value="Login" title="Login" key="random2">
                              <TreeNode value="submodule1" title="submodule1" key="random3"/>
                          </TreeNode>
                      </TreeNode>
                      <TreeNode value="HRM System " title="HRM System " key="1-2">
                          <TreeNode value="UI" title="UI" key="1-2-1">
                              <TreeNode value="submodule1" title="submodule1" key="random4"/>
                              <TreeNode value="submodule2" title="submodule2" key="random5"/>
                          </TreeNode>
                          <TreeNode value="Login" title="Login" key="random6">
                              <TreeNode value="submodule1" title="submodule1" key="random7"/>
                          </TreeNode>
                      </TreeNode>
                      <TreeNode
                          value="Leave Management System "
                          title="Leave Management System "
                          key="2-3">
                          <TreeNode value="UI" title="UI" key="2-3-1">
                              <TreeNode value="submodule1" title="submodule1" key="random8"/>
                              <TreeNode value="submodule2" title="submodule2" key="random9"/>
                          </TreeNode>
                          <TreeNode value="Login" title="Login" key="random10">
                              <TreeNode value="submodule1" title="submodule1" key="random11"/>
                          </TreeNode>
                      </TreeNode>
                  </TreeSelect>
                </p>
            </Col>
          </Row>
          
        </Modal>
      </div>
    );
  }
}