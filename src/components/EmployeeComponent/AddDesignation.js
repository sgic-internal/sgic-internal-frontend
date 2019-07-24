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
  
  
  
  export default class AddDesignation extends React.Component {
      constructor(props){
          super(props);
           
          this.state = {
              designationName: "",
              visible: false,
          }

          this.onChangeDesignationName = this.onChangeDesignationName.bind(this);
      }
   
    state = { visible: false };

      onChangeDesignationName(e){
          this.setState({
              designationName:e.target.value
          })
      }

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

      e.preventDefault();

      const designationData = {
        designationname:this.state.designationName
      }

      axios
        .post(
          "http://localhost:8084/employeeservice/createdesignation",
          designationData
        )
        .then(res => console.log(res.data))
        .catch(error => {
          console.log(error);
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
        <React.Fragment>

            <Button onClick={this.showModal} type="primary">Add Designation</Button>
            <br/>
          <div>
            <Modal
              title="Add Designation"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
             width="500px"
            >
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                
                
                    <Form.Item label=" Name">
                      <Input
                        placeholder="Designation Name"
                        value={this.state.designationName}
                        onChange={this.onChangeDesignationName}
                        
                      />
                    </Form.Item>
          
                  
               
                   
                 
                
              </Form>
            </Modal>
          </div>
         
        </React.Fragment>
      );
    }
  }
  