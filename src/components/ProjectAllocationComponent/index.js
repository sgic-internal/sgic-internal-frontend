import {
    Modal,
    Button,
    TreeSelect,
    Select,
    Row,
    Col,
    PageHeader,
    Table,
    Progress,
    Statistic,
    Pagination
} from 'antd';
import React from 'react';
import App from './AllocateMember';
import DeApp from './DeAllocateMember';
import Roll from './RollAllocate';

//const { Option, OptGroup } = Select;
const TreeNode = TreeSelect.TreeNode;
const {Option} = Select;
//const { SubMenu  } = Menu;

const Countdown = Statistic.Countdown;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 10 + 1000 * 50; // Moment is also OK
const deadline1 = Date.now() + 1000 * 60 * 60 * 24 * 20 + 1000 * 30;
const deadline2 = Date.now() + 1000 * 60 * 60 * 24 * 35 + 1000 * 10;
const deadline3 = Date.now() + 1000 * 60 * 60 * 24 * 50 + 1000 * 60;
const deadline4 = Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 25;

const dataSource = [
    {
        key: '1',
        project: 'Defect System',
        se: 28,
        ase: 70,
        td: 3,
        qatd: 3,
        sqa: 14,
        aqa: 2
    }, {
        key: '2',
        project: 'Leave Management System',
        se: 18,
        ase: 50,
        td: 3,
        qatd: 5,
        sqa: 12,
        aqa: 5
    }, {
        key: '2',
        project: 'HRM System',
        se: 25,
        ase: 60,
        td: 3,
        qatd: 6,
        sqa: 10,
        aqa: 3
    }, {
        key: '2',
        project: 'School Management System',
        se: 20,
        ase: 40,
        td: 2,
        qatd: 2,
        sqa: 5,
        aqa: 2
    }
];

const columns = [
    {
        title: 'Project',
        dataIndex: 'project',
        key: 'project'
    }, {
        title: 'Software Engineer',
        dataIndex: 'se',
        key: 'se'
    }, {
        title: 'Associate Software Engineer',
        dataIndex: 'ase',
        key: 'ase'
    }, {
        title: 'Tech Lead',
        dataIndex: 'td',
        key: 'td'
    }, {
        title: 'QA Tech Lead',
        dataIndex: 'qatd',
        key: 'qatd'
    }, {
        title: 'Senior QA',
        dataIndex: 'sqa',
        key: 'sqa'
    }, {
        title: 'Associate QA',
        dataIndex: 'aqa',
        key: 'aqa'
    }
];

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

export default class ProjectManageAllocation extends React.Component {

    state = {
        modal1Visible: false,
        modal2Visible: false,
        modal3Visible: false
    };

    setModal1Visible(modal1Visible) {
        this.setState({modal1Visible});
    }

    setModal2Visible(modal2Visible) {
        this.setState({modal2Visible});
    }

    setModal3Visible(modal3Visible) {
        this.setState({modal3Visible});
    }

     onChange = value => {
         console.log(value);
         this.setState({
             value
         });
     };

    render() {

        return (
            <React.Fragment>
                <Row>
                    <Col span={24}>

                        <div
                            style={{
                            padding: 24,
                            background: '#fff',
                            minHeight: 360,
                            marginRight: '0px'
                        }}>
                            <Col span={0}></Col>

                            <Col span={3}>

                                <div>

                                    <Button type="primary" onClick={() => this.setModal1Visible(true)}>
                                        Roll Allocation
                                    </Button>

                                    <Modal
                                        title="Project Allocation"
                                        width="80%"
                                        visible={this.state.modal1Visible}
                                        onOk={() => this.setModal1Visible(false)}
                                        onCancel={() => this.setModal1Visible(false)}>

                                        <Select
                                            showSearch
                                            style={{
                                            width: 200,
                                            marignBottom: '20px'
                                        }}
                                            placeholder="Select a Role"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            onSearch={onSearch}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            <Option value="Software Engineer">Software Engineer</Option>
                                            <Option value="Associate Software Engineer">Associate Software Engineer</Option>
                                            <Option value="TechLead">TechLead</Option>
                                            <Option value="QA TechLead">QA TechLead</Option>
                                            <Option value="Senior QA">Senior QA</Option>
                                            <Option value="Associate QA">Associate QA</Option>
                                        </Select>

                                        <Roll/>
                                    </Modal>
                                </div>
                            </Col>
                            <Col span={3}>

                                <div>

                                    <Button
                                        style={{
                                        backgroundColor: '#ff3f34',
                                        color: '#fff'
                                    }}
                                        onClick={() => this.setModal2Visible(true)}>
                                        Deallocation
                                    </Button>

                                    <Modal
                                        title="20px to Top"
                                        width="60%"
                                        style={{
                                        top: 20
                                    }}
                                        visible={this.state.modal2Visible}
                                        onOk={() => this.setModal2Visible(false)}
                                        onCancel={() => this.setModal2Visible(false)}>

                                        <DeApp/>
                                    </Modal>
                                </div>
                            </Col>

                            <Col span={3}>
                                <div>
                                    <Button type="primary" onClick={() => this.setModal3Visible(true)}>
                                        Module Allocation
                                    </Button>

                                    <Modal
                                        title="Project Allocation"
                                        width="60%"
                                        style={{
                                        top: 20
                                    }}
                                        visible={this.state.modal3Visible}
                                        onOk={() => this.setModal3Visible(false)}
                                        onCancel={() => this.setModal3Visible(false)}>
                                        <TreeSelect
                                            showSearch
                                            style={{
                                            width: 300
                                        }}
                                            value={this.state.value}
                                            dropdownStyle={{
                                            maxHeight: 400,
                                            overflow: 'auto'
                                        }}
                                            placeholder="Please select Module"
                                            allowClear
                                            multiple
                                            treeDefaultExpandAll
                                            onChange={this.onChange}>
                                            <TreeNode value="Defect System " title="Defect System " key="0-1">
                                                <TreeNode value="UI" title="UI" key="0-1-1">
                                                    <TreeNode value="submodule1" title="submodule1" key="random"/>
                                                    <TreeNode value="submodule2" title="submodule2" key="random1"/>
                                                </TreeNode>
                                                <TreeNode value="Login" title="Login" key="random2">
                                                    <TreeNode value="submodule1" title="submodule1" key="random3"/>
                                                </TreeNode>
                                            </TreeNode>
                                            <TreeNode value="HRM System " title="HRM System " key="1-2">
                                                <TreeNode value="UI" title="UI" key="1-2-1">
                                                    <TreeNode value="submodule1" title="submodule1" key="random4"/>
                                                    <TreeNode value="submodule2" title="submodule2" key="random5"/>
                                                </TreeNode>
                                                <TreeNode value="Login" title="Login" key="random6">
                                                    <TreeNode value="submodule1" title="submodule1" key="random7"/>
                                                </TreeNode>
                                            </TreeNode>
                                            <TreeNode
                                                value="Leave Management System "
                                                title="Leave Management System "
                                                key="2-3">
                                                <TreeNode value="UI" title="UI" key="2-3-1">
                                                    <TreeNode value="submodule1" title="submodule1" key="random8"/>
                                                    <TreeNode value="submodule2" title="submodule2" key="random9"/>
                                                </TreeNode>
                                                <TreeNode value="Login" title="Login" key="random10">
                                                    <TreeNode value="submodule1" title="submodule1" key="random11"/>
                                                </TreeNode>
                                            </TreeNode>
                                        </TreeSelect>

                                        <br/>
                                        <App/>
                                    </Modal>
                                </div>
                            </Col>

                            <br/>
                            <br/>
                            <Table dataSource={dataSource} columns={columns}/>

                        </div>
                    </Col>

                    <Col span={12}>
                        <br/>
                        <PageHeader
                            title="Project Performance"
                            style={{
                            marginRight: '20px'
                        }}/>
                        <div
                            style={{
                            padding: 24,
                            background: '#fff',
                            minHeight: 300,
                            marginRight: '20px'
                        }}>
                            <div>
                                <h3
                                    style={{
                                    marginTop: 9
                                }}>Library System</h3><Progress percent={100}/>
                                <h3
                                    style={{
                                    marginTop: 9
                                }}>Defect System</h3><Progress percent={70}/>
                                <h3
                                    style={{
                                    marginTop: 9
                                }}>HRM System</h3><Progress percent={30}/>
                                <h3
                                    style={{
                                    marginTop: 9
                                }}>Leave Management System</h3><Progress percent={30}/>
                                <h3
                                    style={{
                                    marginTop: 9
                                }}>School Management System</h3><Progress percent={50}/>

                            </div>

                        </div>
                    </Col>

                    <Col span={12}>
                        <br/>
                        <PageHeader title="Project Remaining  Time"/>
                        <div
                            style={{
                            padding: 30,
                            background: '#fff',
                            minHeight: 307
                        }}>
                            <Row gutter={16}>
                                <Col
                                    span={12}
                                    style={{
                                    marginTop: 15
                                }}>
                                    <Countdown title="Library System" value={deadline4} format="D - H:m:s"/>
                                </Col>
                                <Col
                                    span={12}
                                    style={{
                                    marginTop: 15
                                }}>
                                    <Countdown title="Defect System" value={deadline} format="D - H:m:s"/>
                                </Col>
                                <Col
                                    span={12}
                                    style={{
                                    marginTop: 15
                                }}>
                                    <Countdown title="HRM System" value={deadline1} format="D - H:m:s"/>
                                </Col>
                                <Col
                                    span={12}
                                    style={{
                                    marginTop: 15
                                }}>
                                    <Countdown
                                        title="Leave Management System"
                                        value={deadline2}
                                        format="D - H:m:s"/>
                                </Col>
                                <Col
                                    span={24}
                                    style={{
                                    marginTop: 15
                                }}>
                                    <Countdown
                                        title="School Management System"
                                        value={deadline3}
                                        format="D - H:m:s"/>
                                </Col>

                                <Col
                                    span={16}
                                    style={{
                                    marginTop: 15
                                }}></Col>
                                <Col
                                    span={8}
                                    style={{
                                    marginTop: 15
                                }}>
                                    <Pagination defaultCurrent={1} total={10}/>
                                </Col>

                            </Row>,

                        </div>
                    </Col>
                </Row>
                <br/>

            </React.Fragment>

        );
    }

}
