import { Modal, Button, Select } from 'antd';
import React from 'react';
import AddMember from './AddMember';


const { Option, OptGroup } = Select;

export default class Allocation extends React.Component {
    state = {
        loading: false,
        visible: false,
    };

    handleChange(value) {
        console.log(`selected ${value}`);
    }

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

    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Allocate
                </Button>
                <br />
                <Modal

                    style={{ top: 20 }}

                    visible={visible}
                    title="Allocating Members for Project"
                    width="60%"
                    height="30%"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancel
            </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk} theme="filled">
                            Submit
            </Button>,
                    ]}>
                    <div><Select defaultValue="Project" style={{ width: 200 }} onChange={this.handleChange}>
                        <OptGroup label="Projects">
                            <Option value="School Management System">School Management System</Option>
                            <Option value="Defect Tracker System">Defect Tracker System</Option>
                            <Option value="Library Management System">Library Management System</Option>
                            <Option value="Wedding Hall System">Wedding Hall System</Option>
                        </OptGroup>
                    </Select></div>
                    <br />
                    <AddMember />
                </Modal>
            </div>
        );
    }
}
