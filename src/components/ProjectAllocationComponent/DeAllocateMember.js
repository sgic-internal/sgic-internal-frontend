import { Transfer,  Row, div, Col,PageHeader } from 'antd';
import React from 'react';


export default class DeAllocateMember extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  };



  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 5; i++) {
      const data = {
        key: i.toString(),
        title: `EM${i + 1}`,
        description: `Member${i + 1}`,
        tag: `Software Engineer`,
        //chosen: Math.random() * 2 > 1,
      };


      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    for (let i = 5; i < 10; i++) {
      const data = {
        key: i.toString(),
        title: `EM${i + 1}`,
        description: `Member${i + 1}`,
        tag: `Associate Software Engineer`,
        //chosen: Math.random() * 2 > 1,
      };


      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    for (let i = 10; i < 15; i++) {
      const data = {
        key: i.toString(),
        title: `EM${i + 1}`,
        description: `Member${i + 1}`,
        tag: `TechLead`,
       // chosen: Math.random() * 2 > 1,
      };


      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    for (let i = 15; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `EM${i + 1}`,
        description: `Member${i + 1}`,
        tag: `QA TechLead`,
        //chosen: Math.random() * 2 > 1,
      };


      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }

    for (let i = 20; i < 25; i++) {
      const data = {
        key: i.toString(),
        title: `EM${i + 1}`,
        description: `Member${i + 1}`,
        tag: `Senior QA`,
        //chosen: Math.random() * 2 > 1,
      };


      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }

    for (let i = 25; i < 30; i++) {
      const data = {
        key: i.toString(),
        title: `EM${i + 1}`,
        description: `Member${i + 1}`,
        tag: `Associate QA`,
        //chosen: Math.random() * 2 > 1,
      };


      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };



  render() {
    return (
     
      <div>
         <br/>
        
         <Col span={11}> <PageHeader title="Allocated members"  /></Col>
         <Col span={10}> <PageHeader title="Deallocated members"  /></Col>
        <Row>
          
          <Col span={24}>

            <Transfer
              dataSource={this.state.mockData}
              showSearch
              listStyle={{
                width: 300,
                height: 400,
              }}
              //operations={['De Allocate','    Return    ']}
              targetKeys={this.state.targetKeys}
              onChange={this.handleChange}

              render={item => `${item.title} |
          ${item.description} | ${item.tag}`}
            />
          </Col>
        </Row>
      </div>
    );
  }
}