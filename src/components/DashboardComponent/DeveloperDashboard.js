
import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { PageHeader, Statistic, Col, Row, Progress, Breadcrumb } from 'antd';
import DashboardConfig from './DashboardConfig';


//const InputGroup = Input.Group;

class DevDashboard extends Component {



  render() {
    const data = {
      labels: ['New', 'Open', 'Reject', 'Closed'],
      datasets: [
        {
          data: [55, 5, 10, 30],
          backgroundColor: [
            "#FF6384",
            "#4CAF50",
            "#FFCE56",
            "#36A2EB"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#4CAF50",
            "#FFCE56",
            "#36A2EB"
          ]
        }]
    };

    const data2 = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [{
        type: 'bar',
        label: 'Total Defect',
        backgroundColor: '#4CAF50',
        data: [
          40,
          55,
          60,
          85,
          100
        ],
        borderColor: 'white',
        borderWidth: 2
      }, {
        type: 'bar',
        label: 'Closed Defect',
        backgroundColor: '#FFC107',
        data: [
          9,
          14,
          21,
          29,
          40
        ]
      }]
    };

    const options = {
      responsive: true,
      title: {
        display: true,
        text: ' '
      },
      tooltips: {
        mode: 'index',
        intersect: true
      }
    };

    const data3 = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };

    const multiAxisData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Severity',
        fill: false,
        backgroundColor: '#42A5F5',
        borderColor: '#42A5F5',
        yAxisID: 'y-axis-1',
        data: [65, 59, 80, 81, 56, 55, 40]
      }, {
        label: 'Priority',
        fill: false,
        backgroundColor: '#66BB6A',
        borderColor: '#66BB6A',
        yAxisID: 'y-axis-2',
        data: [28, 48, 40, 19, 45, 52, 90]
      }]
    };

    const multiAxisOptions = {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        }, {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnChartArea: false
          }
        }]
      }
    }


    return (
      <React.Fragment>
        <Row>
          <Col span={23}>
            <Breadcrumb style={{
              marginBottom: '6px',
              marginTop: '-10px'
            }}>
              <Breadcrumb.Item>Dashboard Component</Breadcrumb.Item>
              <Breadcrumb.Item>Developer Dashboard</Breadcrumb.Item>

            </Breadcrumb>
          </Col>
          <Col span={1} >
            <div id="components-dropdown-demo-dropdown-button" style={{ marginLeft: "-2.1em" }}>
              <DashboardConfig />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "10px 0 0 0 " }}>
          <Col span={16}>
            <PageHeader title="Defect Status Chart" style={{ marginRight: '20px' }} />
            <div style={{ padding: 24, background: '#fff', minHeight: 360, marginRight: '20px' }}    >

              <Row >
                <Col span={24}>

                  <div style={{ padding: 24, background: '#fff', minHeight: 50 }} >
                    <div className="content-section introduction">

                    </div>
                    <div className="content-section implementation">
                      <br />
                      <Chart type="pie" data={data} />
                    </div>
                  </div>


                </Col>
              </Row>
            </div>
          </Col>

          <Col span={8}>
            <Col span={24}>
              <PageHeader title="Defect Details" />
              <div style={{ padding: 24, background: '#fff', minHeight: 50 }}>

                <Row>
                  <div className="content-section introduction">

                  </div>
                  <Col span={8}>
                    <Statistic title="Total " value={100} />
                  </Col>
                  <Col span={8}>
                    <Statistic title="New" value={55} suffix="/ 100" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Closed" value={30} suffix="/ 100" />
                  </Col>

                </Row>
              </div>
            </Col>
            <Col span={24}>

              <div style={{ padding: 24, background: '#fff', minHeight: 50, marginTop: '20px' }}>
                <PageHeader title="Defect" style={{ padding: 0, minHeight: 30 }} />
                <Row >

                  <Col span={24}>

                    <h3>New</h3>
                    <Progress percent={55} />
                    <h3>Open</h3>
                    <Progress percent={5} />
                    <h3>Reject</h3>
                    <Progress percent={10} />
                    <h3>Closed</h3>
                    <Progress percent={30} />


                  </Col>
                </Row>
              </div>
            </Col>
          </Col>










          <Col span={12}>
            <br />
            <PageHeader title="Total Defect & Closed Defect" style={{ marginRight: '20px' }} />
            <div style={{ padding: 24, background: '#fff', minHeight: 250, marginRight: '20px' }}>

              <Row >
                <Col span={24}>

                  <div style={{ padding: 24, background: '#fff', minHeight: 50 }} >



                    <div className="content-section implementation">

                      <Chart type="bar" data={data2} options={options} />

                    </div>



                  </div>


                </Col>
              </Row>
            </div>
          </Col>

          <Col span={12}>
            <br />
            <PageHeader title="RadarChart" />
            <div style={{ padding: 30, background: '#fff', minHeight: 307 }}>

              <Row>
                <div>


                  <div className="content-section implementation">

                    <Chart type="radar" data={data3} />
                  </div>
                </div>

              </Row>
            </div>
          </Col>
        </Row>
        <br />
        <Col span={24}>
          <PageHeader title="Severity & Priority" style={{ marginRight: '0px' }} />
          <div style={{ padding: 24, background: '#fff', minHeight: 360, marginRight: '00px' }}>
            <div className="content-section implementation">
              <Chart type="line" data={multiAxisData} options={multiAxisOptions} />
            </div>
          </div>




        </Col>
      </React.Fragment >


    );
  }


}

export default DevDashboard;