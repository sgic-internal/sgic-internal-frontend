import React from 'react';
import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';
import axios from "axios";

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false} >
    
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

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
        selectedRowKeys: listSelectedKeys
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            }
          })}
        />
      );
    }}
  </Transfer>
);

axios.get('http://localhost:8081/defectservices/GetAllresources')
  .then(function (response) {
    // handle success
    console.log(response.data);
    // this.setState()

  });

const employee = []
const originTargetKeys = employee.filter(item => +item.key % 5 > 1).map(item => item.key);

const leftTableColumns = [
  {
    title: "EmpId",
    dataIndex: "employeeid",
    key: "employeeid",
  },

  {
    title: "EmpName",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Designation",
    dataIndex: "designationname",
    key: "designationname",
  },
  {
    title: "Availability",
    dataIndex: "availability",
    key: "availability",
  },
];

const rightTableColumns = [
  {
    title: "EmpId",
    dataIndex: "employeeid",
    key: "employeeid",
  },

  {
    title: "EmpName",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Designation",
    dataIndex: "designationname",
    key: "designationname",
  },
  {
    title: "Availability",
    dataIndex: "availability",
    key: "availability",
  },

];

class AddMember extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
  };

  onChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  triggerDisable = disabled => {
    this.setState({ disabled });
  };

  

  componentDidMount() {
    this.fetchEmployee();
  }
  fetchEmployee() {
    var _this = this;
    axios.get('http://localhost:8081/defectservices/GetAllresources')
      .then(function (response) {
        // handle success
        console.log(response.data);
        let emp = response.data
        _this.setState({ emp: emp });
        console.log(_this.state.employee);
        const list = []
        console.log("dfgdgdgd" + emp)
        response.data.map((post, index) => {
          list.push({
            key: index,
            employeeid: post.employeeid,
            name: post.name,
            email: post.email,
            designationname: post.designationname,
            availability:post.availability,

          });
          _this.setState({
            list: list
          })
        })


      });
  }
  triggerShowSearch = showSearch => {
    this.setState({ showSearch });
  };

  render() {
    const { targetKeys, disabled, showSearch } = this.state;
    return (
      <div>
        <TableTransfer
          dataSource={this.state.list}
          targetKeys={targetKeys}
          disabled={disabled}
          showSearch={showSearch}
          onChange={this.onChange}
          filterOption={(inputValue, item) =>
            item.employeeid.indexOf(inputValue) !== -1 ||
            item.name.indexOf(inputValue) !== -1 ||
            item.email.indexOf(inputValue) !== -1 ||
            item.designationname.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={this.triggerDisable}
          style={{ marginTop: 10 }}
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={this.triggerShowSearch}
          style={{ marginTop: 10 }}
        />
      </div>
    );
  }
}

export default AddMember;
