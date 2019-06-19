import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import React from 'react';

const data = [
  {
    key: '1',
    defectid: 'pro1',
    projectname: 'project1',
    modulename:'module',
    severity: 'duration',
    priority:'assignedto',
    type: 'project1',
    status: 'duration',
    more:<Icon type="fullscreen" style={{fontSize:'20px', color:'black'}} />
    
   
  },
  {
    key: '1',
    defectid: 'pro1',
    projectname: 'project1',
    modulename:'module',
    severity: 'duration',
    priority:'assignedto',
    type: 'project1',
    status: 'duration',
    more:<Icon type="fullscreen" style={{fontSize:'20px', color:'black'}} />
    
   
  },
  {
    key: '1',
    defectid: 'pro1',
    projectname: 'project1',
    modulename:'module',
    severity: 'duration',
    priority:'assignedto',
    type: 'project1',
    status: 'duration',
    more:<Icon type="fullscreen" style={{fontSize:'20px', color:'black'}} />
    
   
  },
];

 export default class App extends React.Component {
  state = {
    searchText: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'DefectId ',
        dataIndex: 'defectid',
        key: 'defectid',
        width: '10%',
      
      },
      {
        title: 'ProjectName',
        dataIndex: 'projectname',
        key: 'projectname',
        width: '10%',
       
      },
      {
        title: 'ModuleName',
        dataIndex: 'modulename',
        key: 'modulename',
        width: '10%',
      },
      {
        title: 'Severity  ',
        dataIndex: 'severity',
        key: 'severity',
        width: '10%',
      },
      {
        title: 'Priority ',
        dataIndex: 'priority',
        key: 'priority',
        width: '10%',
      },
      {
        title: 'Type ',
        dataIndex: 'type',
        key: 'type',
        width: '10%',
      },
      {
        title: 'Stauts ',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
      },
      {
        title: 'More ',
        dataIndex: 'more',
        key: 'more',
        width: '10%',
      },
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}
