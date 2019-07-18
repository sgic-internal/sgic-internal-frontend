import React from "react";
import { PageHeader, Row, Col, Select,Transfer,Button ,Modal} from "antd";
import { Link } from 'react-router-dom';


const { Option } = Select;

class Configuration extends React.Component {
  /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */
     state = {
        mockData: [],
        targetKeys: [],
        loading: false,
    visible: false,
      };

      getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
          const data = {
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            chosen: Math.random() * 2 > 1,
          };
          if (data.chosen) {
            targetKeys.push(data.key);
          }
          mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
      };
    
      handleChange = (targetKeys, direction, moveKeys) => {
        console.log(targetKeys, direction, moveKeys);
        this.setState({ targetKeys });
      };
    
      renderItem = item => {
        const customLabel = (
          <span className="custom-item">
            {item.title} - {item.description}
          </span>
        );
    
        return {
          label: customLabel, // for displayed item
          value: item.title, // for title and filter matching
        };
      };
      
      showModal = () => {
        this.setState({
          visible: true,
        });
      };

      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      };   
      
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
  componentWillMount() {}

  componentDidMount() {
    this.getMock();
  }

   render() {
    const { visible, loading } = this.state;
        const routes = [{
                path: 'index',
                breadcrumbName: 'Home',
            },
            {
                path: 'first',
                breadcrumbName: 'Company',
            },
            {
                path: 'second',
                breadcrumbName: 'Configuration',
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Configuration" breadcrumb={{ routes }} ></PageHeader>
                <div
                    style={{
                    padding: '0 24px 24px 24px',
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
          
          <br />
          <div>
        <Button type="primary" onClick={this.showModal}>
        Configuration
        </Button>
        <Modal
          visible={visible}
          title="Set Configuration"
          width="55%"
          height="30%"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Row>
            <Col span={6}> <div>
            <Select defaultValue="Select Project" style={{ width: 120 }} onChange={this.handleChange}>
      <Option value="HRM">HRM</Option>
      <Option value="DEFECTTRACKER">DEFECTTRACKER</Option>
    </Select>
          </div></Col>
            <Col span={6}>

            <Select defaultValue="Select Configuration" style={{ width: 120 }} onChange={this.handleChange}>
      <Option value="HRM">DefectType</Option>
      <Option value="DEFECTTRACKER">Priority</Option>
      <Option value="DEFECTTRACKER">Severity</Option>
      <Option value="DEFECTTRACKER">Status</Option>
    </Select>
            </Col>
            <Col span={12}></Col>
          </Row>
          <br/>
          <Transfer
        dataSource={this.state.mockData}
        listStyle={{
          width: 300,
          height: 300,
        }}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={this.renderItem}
      />
        </Modal>
      </div>
         <br/>
          <Row>
      <Col span={8}>  
     <h4>Configuration Name</h4> 
     </Col>
      <Col span={8}>
     <h4> View</h4>
    </Col>
      <Col span={8}>
       
      </Col>
    </Row> 
<br/>
<br/>
<Row>
      <Col span={8}>  
      DefectTypeConfiguration 
     </Col>
      <Col span={8}>
      <Link to="/DefectType" >DefectType</Link> 
    </Col>
      <Col span={8}>
   
      </Col>
    </Row> 

    <br/>
<br/>
<Row>
      <Col span={8}>  
      PriorityConfiguration 
     </Col>
      <Col span={8}>
      <Link to="/Priority" >Priority</Link> 
    </Col>
      <Col span={8}>
    
      </Col>
    </Row> 
    <br/>
<br/>
<Row>
      <Col span={8}>  
      SeverityConfiguration 
     </Col>
      <Col span={8}>
      <Link to="/Severity" >Severity</Link> 
    </Col>
      <Col span={8}>
   
      </Col>
    </Row> 
    <br/>
<br/>
<Row>
      <Col span={8}>  
      StatusConfiguration 
     </Col>
      <Col span={8}>
      <Link to="/Status" >Status</Link> 
    </Col>
      <Col span={8}>
   
      </Col>
    </Row> 


        </div>
      </React.Fragment>
    );
  }
}

export default Configuration;
