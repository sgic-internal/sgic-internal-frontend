import React, { Component } from 'react'
import { Table, Switch, Button, PageHeader} from 'antd';
import './index.css';
const columns = [
    {
        title: 'Project Admin Privillages',
        dataIndex: 'name',
        render: text => <a href=" ">{text}</a>
    },
    {
        title: 'Developer',
        width: '17.5%',
        render: (e, record) => (< Switch defaultChecked={e} />)
    },
    {
        title: 'QA',
        width: '17.5%',
        render: (e, record) => (< Switch defaultChecked={e} />)
    },
    {
        title: 'Tech Lead',
        width: '17.5%',
        render: (e, record) => (< Switch defaultChecked={e} />)
    },
    {
        title: 'QA Lead',
        width: '17.5%',
        render: (e, record) => (< Switch defaultChecked={e} />)
    }
];
const data = [
    {
        key: '1',
        name: 'Add Defect'
    },
    {
        key: '2',
        name: 'Edit Defect'
    },
    {
        key: '3',
        name: 'Manage Defect'
    },
    {
        key: '4',
        name: 'Defect Dashboard'
    },
    {
        key: '5',
        name: 'Add Module'
    },
    {
        key: '6',
        name: 'Edit Module'
    },
    {
        key: '7',
        name: 'Manage Module'
    },
    {
        key: '8',
        name: 'Add SubModule'
    },
    {
        key: '9',
        name: 'Edit SubModule'
    },
    {
        key: '10',
        name: 'Manage SubModule'
    },
    {
        key: '17',
        name: 'PM Manage Allocation'
    },
    {
        key: '18',
        name: 'PM Edit Allocation'
    },
    {
        key: '19',
        name: 'PM Add Allocation'
    },
    {
        key: '24',
        name: 'PM Dashboard'
    },
    {
        key: '25',
        name: 'QA Dashboard'
    },
    {
        key: '26',
        name: 'Developer Dashboard'
    },
    {
        key: '28',
        name: 'TechLead Privilage'
    },
    {
        key: '29',
        name: 'QALead Privilage'
    },
    {
        key: '30',
        name: 'Developer Privilage'
    },
    {
        key: '31',
        name: 'QA Privilage'
    }
];

export default class ProjectPrivilege extends Component {

    render() {
        const { handleSwitchChange } = this.props;
         const routes = [{
                path: 'index',
                breadcrumbName: 'Settings',
            },
            {
                path: 'first',
                breadcrumbName: 'Privilege',
            },
            {
                path: 'second',
                breadcrumbName: 'Project Privilege',
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Project Privilege" breadcrumb={{ routes }} />
                <div
                    style={{
                    padding: '0 24px 24px 24px',
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
                <Table columns={columns} dataSource={data} onChange={handleSwitchChange} pagination={{ pageSize: 10 }} />
                <p align="right"><Button type="primary">Set Privilages</Button></p>
            </div>
            </React.Fragment>
        )
    }
}
