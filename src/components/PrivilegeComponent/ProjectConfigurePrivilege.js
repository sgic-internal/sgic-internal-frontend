import React, { Component } from 'react'
import { Table, Switch, Button, Input, PageHeader} from 'antd';

const Search = Input.Search;
const columns = [
    {
        title: 'Project',
        dataIndex: 'name',
        render: text => <a href=" ">{text}</a>
    },
    {
        title: 'ConfigPrivilege',
        render: (e, record) => (< Switch defaultChecked={e} />)
    }

];
const data = [
    {
        key: '1',
        name: 'HRM'
    },
    {
        key: '2',
        name: 'DefectTracker'
    },
    {
        key: '3',
        name: 'LeaveSystem'
    },
    {
        key: '4',
        name: 'TimeTracker'
    },
    {
        key: '5',
        name: 'LMS'
    }
    
];

export default class ProjectConfigurePrivilege extends Component {
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
                breadcrumbName: 'ProjectConfigurePrivilege',
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Project Configure Privilege" breadcrumb={{ routes }} />
                <div
                    style={{
                    padding: '0 24px 24px 24px',
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
               
                
                    <Search style={{width: '200px', marginBottom: '10px'}} placeholder="Search" onSearch={value => console.log(value)} enterButton />
                
                <Table columns={columns} dataSource={data} onChange={handleSwitchChange} pagination={{ pageSize: 10 }}

                />

                <p align="right"><Button type="primary">Set Privilages</Button></p>
            </div>
            </React.Fragment>
        )
    }
}
