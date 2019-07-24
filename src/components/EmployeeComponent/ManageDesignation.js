import {
    Table,
    Input,
    Button,
    Icon,
    Modal,
    Form,
    Select,
    Row,
    Col,
    Popconfirm,
    message
  } from "antd";
  import Highlighter from "react-highlight-words";
  import React from "react";
  import axios from "axios";
  import AddDesignation from './AddDesignation';
  
  const { Option } = Select;
  
  function confirm(e) {
    console.log(e);
    message.success("Successfully Deleted");
  }
  
  function cancel(e) {
    console.log(e);
    // message.error('Click on No');
  }
  
  function onChange(sorter) {
    console.log("params", sorter);
  }
  
  
  
  export default class ManageDesignation extends React.Component {
   
      
  
    
  
    state1 = {
      filteredInfo: null,
      sortedInfo: null
    };
  
    state = { visible: false };
  
    showModal = () => {
      this.setState({
        visible: true
      });
    };
    fetchDesignations() {
        var _this = this;
        axios
          .get("http://localhost:8084/employeeservice/getAllDesignation")
          .then(function(response) {
            // handle success
            console.log(response.data);
            _this.setState({ designations: response.data });
           
          });
      }
    
    componentDidMount() {
       this.fetchDesignations();
    }
  
   
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    //fetching the employee with get all employee
  
    handleChange = (pagination, filters, sorter) => {
      console.log("Various parameters", pagination, filters, sorter);
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter
      });
    };
  
    handleEdit = () => {
      this.showModal();
     
     
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };


    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text}
        />
      )
    });
  
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: "" });
    };
  
    render() {
      // For Table functions
      let { sortedInfo, filteredInfo } = this.state;
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns = [
        {
          title: " Id",
          dataIndex: "designationid",
          key: "designationid",
          width: "10%",
          defaultSortOrder: "descend",
        //   sorter: (a, b) => a.employeeid.length - b.employeeid.length
        },
        {
          title: "Designation Name",
          dataIndex: "designationname",
          key: "designationname",
          width: "25%",
          ...this.getColumnSearchProps("designationname")
        },
       
  
        {
          title: "Edit",
          render: (text, data = this.state.patients) => (
            <a>
              <Icon
                type="edit"
                onClick={this.handleEdit.bind(this, data.empId)}
                style={{ fontSize: "18px", color: "green" }}
              />
            </a>
          ),
          key: "edit",
          width: "7%"
        },
        {
          title: "Delete",
          dataIndex: "empId",
          key: "empId",
          // ...this.getColumnSearchProps("empId"),
          render: (text, data = this.state.patients) => (
            <Popconfirm
              title="Are you sure delete this Row?"
            //   onConfirm={this.handleDelete.bind(this, data.empId)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a>
                <Icon type="delete" style={{ fontSize: "18px", color: "red" }} />
              </a>
            </Popconfirm>
          ),
          key: "delete",
          width: "8%"
        }
  
      ];
      return (
        <React.Fragment>

            <AddDesignation/>
            
          <div>
            <Modal
              title="Edit Designation"
              visible={this.state.visible}
              onOk={this.handleOk.bind(this, this.state.empId)}
              onCancel={this.handleCancel}
              width="500px"
            >
              <Form>
                <Row>
                  <Col span={8} style={{ padding: "5px" }}>
                    <Form.Item label="Designation Name">
                      <Input
                        placeholder="Designation Name"
                        value={this.state.DesignationName}
                        onChange={this.onChangeDesignationName}
                        
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ padding: "5px" }}>
                    
                  </Col>
                  <Col span={8} style={{ padding: "5px" }}>
                    
                  </Col>
                </Row>
                <Row>
                  <Col span={8} style={{ padding: "5px" }}>
                   
                  </Col>
                  <Col span={16} style={{ padding: "5px" }}>
                   
                  </Col>
                </Row>
              </Form>
            </Modal>
          </div>
          <br/>
          <Table
            columns={columns}
             dataSource={this.state.designations}
            pagination={{
              total: this.state.Total,
              //  showTotal: total => `Total ${total} employees`
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              pageSize: 10,
              showSizeChanger: true
              // showQuickJumper: true
            }}
          />
        </React.Fragment>
      );
    }
  }
  