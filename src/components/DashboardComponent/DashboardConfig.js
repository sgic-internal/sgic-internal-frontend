import React from "react";
import { Drawer, Button, Row, Col, Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Opened Defects', 'Fixed Defects', 'Reopened Defects', 'Rejected Defects', 'Severity Meter', 'DoughnutChart', 'LineChart', 'Projects', 'Project Managers', 'QA Leads', 'Tech Leads', 'Software Engineers', 'QA Engineers', 'Productivity Meter', 'Timeline', 'Our Clients', 'Defect Status Chart', 'Defect', 'RadarChart', 'Total Defect', 'Severity & Priority', 'Success Ratio', 'Defects Ratio', 'Software Engineers', 'Software Engineers', 'QA Engineers'];
const defaultCheckedList = ['Opened Defects', 'Reopened Defects'];
export default class DashboardConfig extends React.Component {
    state = {
        visible: false,
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false
    };

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };
    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <Button onClick={this.showDrawer}>
                        <img src="https://img.icons8.com/ios/20/000000/filter.png" alt="sorry no img" />
                    </Button>
                    <div style={{ marginLeft: '20px' }}>
                        <Row>
                            <Col span={4}>
                            </Col>
                            <Col span={20}>
                                <Drawer
                                    title="Configurations"
                                    placement="right"
                                    closable={false}
                                    onClose={this.onClose}
                                    width="220px"
                                    visible={this.state.visible}
                                    style={{ marginLeft: "18%" }}
                                >
                                    <div>

                                        <Checkbox
                                            indeterminate={this.state.indeterminate}
                                            onChange={this.onCheckAllChange}
                                            checked={this.state.checkAll}
                                        >
                                            Check all
                                            </Checkbox>
                                    </div>
                                    <br />
                                    <CheckboxGroup style={{ width: '160px' }}
                                        options={plainOptions}
                                        value={this.state.checkedList}
                                        onChange={this.onChange}
                                    />

                                </Drawer>

                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}