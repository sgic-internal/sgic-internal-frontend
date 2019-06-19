import { Table, Input, Button, Icon, Popconfirm, message } from 'antd';
import Highlighter from 'react-highlight-words';
import React from 'react';
import EditModel from './EditModel';
import ViewModel from './ViewModel';


function confirm(e) {
  console.log(e);
  message.success('Deleted Succesfully');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}


const data = [
  {
    key: '1',
    projectid: 'pro1',
    projectname: 'project1',
    abbrevation: 'DT',
    edit:<EditModel />,
    delete:<Icon type="delete" style={{fontSize:'18px', color:'red'}} ><Popconfirm
    title="Are you sure delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <a href="#">Delete</a>
  </Popconfirm></Icon>,
    viewmore:<ViewModel/>
  },
  {
    key: '2',
    projectid: 'pro2',
    projectname: 'project2',
    abbrevation: 'DT',
    edit:<EditModel />,
    delete:<Icon type="delete" style={{fontSize:'18px', color:'red'}} />,
    viewmore:<ViewModel/>
  },
  {
    key: '3',
    projectid: 'pro3',
    projectname: 'project3',
    abbrevation: 'DT',
    edit:<EditModel />,
    delete:<Icon type="delete" style={{fontSize:'18px', color:'red'}} />,
    viewmore:<ViewModel/>

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
        title: 'Project Id ',
        dataIndex: 'projectid',
        key: 'projectid',
        width: '20%',
      
      },
      {
        title: 'Project Name',
        dataIndex: 'projectname',
        key: 'projectname',
        width: '20%',
       
      },
      {
        title: 'Abbrevation',
        dataIndex: 'abbrevation',
        key: 'Abbrevation',
        width: '20%',
       
      },
     
      {
        title: 'Edit ',
        dataIndex: 'edit',
        key: 'edit',
        width: '10%',
      },
      {
        title: 'Delete ',
        dataIndex: 'delete',
        key: 'delete',
        width: '10%',
        render:(text, record)=>(
          <span>
            <Popconfirm
    title="Are you sure delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <a href="#"><Icon type="delete" style={{fontSize:'18px', color:'red'}} /></a>
  </Popconfirm>
          </span>
        )
      },
      {
        title: 'View More ',
        dataIndex: 'viewmore',
        key: 'viewmore',
        width: '10%',

      },
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}
