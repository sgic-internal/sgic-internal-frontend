import React, { Component } from "react";
//  import {Chart} from 'primereact/chart';
import {
  PageHeader,
  Statistic,
  Col,
  Row,
  Progress,
  Icon,
  Breadcrumb
} from "antd";
import DashboardConfig from "./DashboardConfig";
class QADashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={23}>
            <Breadcrumb
              style={{
                marginBottom: "6px",
                marginTop: "-10px"
              }}
            >
              <Breadcrumb.Item>Dashboard Component</Breadcrumb.Item>
              <Breadcrumb.Item>QA Dashboard</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={1}>
            <div
              id="components-dropdown-demo-dropdown-button"
              style={{ marginLeft: "-2.1em" }}
            >
              <DashboardConfig />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "10px 0 0 0 " }}>
          <Col span={16}>
            <PageHeader
              title="Defect Status Chart"
              style={{ marginRight: "20px" }}
            />
            <div
              ClassName="defectstatus"
              style={{
                padding: 20,
                background: "#fff",
                minHeight: 420,
                marginRight: "20px"
              }}
            >
              <Row>
                <Col span={24}>
                  <div>
                    <h3 style={{ marginTop: 9 }}>Library System</h3>
                    <Progress percent={90} />
                    <h3 style={{ marginTop: 9 }}>Defect System</h3>
                    <Progress percent={70} />
                    <h3 style={{ marginTop: 9 }}>HRM System</h3>
                    <Progress percent={100} />
                    <h3 style={{ marginTop: 9 }}>Leave Management System</h3>
                    <Progress percent={80} />
                    <h3 style={{ marginTop: 9 }}>School Management System</h3>
                    <Progress percent={50} />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={8}>
            <Col span={24}>
              <PageHeader title="Defect Details" />
              <div style={{ padding: 24, background: "#fff", minHeight: 50 }}>
                <Row>
                  <div className="content-section introduction" />
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
              <div
                style={{
                  padding: 24,
                  background: "#fff",
                  minHeight: 50,
                  marginTop: "20px"
                }}
              >
                <PageHeader
                  title="Defect"
                  style={{ padding: 0, minHeight: 30 }}
                />
                <Row>
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

          {/* start */}
          <Col span={12}>
            <br />
            <PageHeader
              title="Total Defect & Closed Defect"
              style={{ marginRight: "20px" }}
            />
            <div
              style={{
                padding: 24,
                background: "#fff",
                minHeight: 250,
                marginRight: "20px"
              }}
            >
              <Row>
                <Col span={24}>
                  <div>
                    <Col span={8}>
                      <Progress type="circle" percent={75} width={150} />
                    </Col>
                    <Col span={8}>
                      <Progress
                        type="circle"
                        percent={70}
                        width={150}
                        status="exception"
                      />
                    </Col>
                    <Col span={8}>
                      <Progress type="circle" percent={100} width={150} />
                    </Col>
                  </div>
                  ,
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={12}>
            <br />
            <PageHeader title="Total Active Defects" />
            <div style={{ padding: 24, background: "#fff", minHeight: 250 }}>
              <Row>
                <div style={{ background: "#fff", padding: "60px" }}>
                  <Row gutter={18}>
                    <Col span={12}>
                      <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<Icon type="arrow-up" />}
                        suffix="%"
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Idle"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: "#cf1322" }}
                        prefix={<Icon type="arrow-down" />}
                        suffix="%"
                      />
                    </Col>
                  </Row>
                </div>
                ,
              </Row>
            </div>
          </Col>
        </Row>
        <br />
      </React.Fragment>
    );
  }
}

export default QADashboard;
