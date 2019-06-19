import React from 'react';
import { Table, Button, Input, Icon, Modal, Row, Col, Pagination, Card } from 'antd';
import AddEmployee from './AddEmployee';
import UploadEmployee from './UploadEmployee';

const Search = Input.Search;
const data = [
  {
    key: '1',
    id: 1,
    name: 'John Brown',
    role: 'Qa Engineer',
    detalis: '',
    email: 'John@gmail.com',
  },
  {
    key: '2',
    id: 2,
    name: 'Jim Green',
    role: 'Software Engineer',
    detalis: '',
    email: 'Jim@gmail.com',
  },
  {
    key: '3',
    id: 3,
    name: 'Joe Black',
    role: 'Human Resource',
    detalis: '',
    email: 'Joe@live.com',
  },
  {
    key: '4',
    id: 4,
    name: 'Jim Red',
    role: 'Project Manager',
    detalis: '',
    email: 'Jim@live.com',
  },
];

export default class CompanyEmployee extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: '',
    visible: false,
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

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,

      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        filters: [{ text: 'Software Engineer', value: 'software Engineer' }, { text: 'Human Resource', value: 'Human Resource' }, { text: 'Projectmanager', value: 'Project Manager' }, { text: 'Qa Engineer', value: 'Qa Engineer' }],
        filteredValue: filteredInfo.role || null,
        onFilter: (value, record) => record.role.includes(value),
        sorter: (a, b) => a.role.length - b.role.length,
        sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        filters: [{ text: 'gmail', value: 'gmail' }, { text: 'live', value: 'live' }],
        filteredValue: filteredInfo.email || null,
        onFilter: (value, record) => record.email.includes(value),
        sorter: (a, b) => a.email.length - b.email.length,
        sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
      },
      {
        title: 'Detalis',
        dataIndex: 'detalis',
        key: 'detalis',
        render: () => <a onClick={this.showModal}><Icon type="solution" /></a>,

      },
      // {
      //   title: 'Action',
      //   key: 'action',
      //   render: () => (
      //     <span>

      //       <a onClick={this.showEditModal}>Edit</a>
      //       <Divider type="vertical" />
      //       <a >Delete</a>
      //       {/* <Button type="danger">
      //         Delete
      //       </Button> */}
      //     </span>
      //   ),
      // },

    ];
    return (
      <div>

        <div className="table-operations">
          <Row>
            <Col span={19}>



              <Col span={4}>
                <AddEmployee />

              </Col>
              <Col span={4}>
            
                <UploadEmployee />
              </Col>

              <Button onClick={this.clearAll} style={{ marginLeft: "10px" }}>More View</Button>

            </Col>
            <Col span={5}>
              <Search
                placeholder=" search ......"
                onSearch={value => console.log(value)}
                style={{ width: 215 }}
                enterButton
              /></Col>

          </Row>
        </div>
        <br>
        </br>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />

        <Modal
          title="Employee Detalis"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div
            style={{
              padding: 24,
              background: '#fff',
              minHeight: '350px',

            }}>
      
            <Card
              style={{ margin: "-40px -40px 0 -40px", height: "300px",borderStyle:"none" }}>

<Row>



              <Col span={8}>
              <img
                style={{
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                  marginRight:"40px"

                }}
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
               
              />
              </Col>
              <Col span={16}>


                Name   :   Kishan
                <br/>
                <br/>
                Role   :   softwareEngineer
                <br/>
                <br/>
                Email   :   Kishan@gmail.com
                
              </Col>
           
</Row>
<br>
</br>
<Row>
Position   :   Project Manager
 <br></br>
 <br></br>
Description  :  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
</Row>

            </Card>

          </div>
          <Row>
            <Col span={6}></Col>
            <Col span={12}> <Pagination simple defaultCurrent={2} total={50} style={{ alignContent: "center" }} /></Col>
            <Col span={6}></Col>
          </Row>

        </Modal>
      </div>
    );
  }
}