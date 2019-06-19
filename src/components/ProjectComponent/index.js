import React from 'react';
import Table from './Table';
import Model from './Model';
import {
    PageHeader
} from 'antd';


class ProjectComponent extends React.Component {

  
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount(){
    }

    render() {
        
        const routes = [{
                path: 'index',
                breadcrumbName: 'Home',
            },
            {
                path: 'first',
                breadcrumbName: 'Project',
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Project" breadcrumb={{ routes }} />
                <div
                    style={{
                    padding: '0 24px 24px 24px',
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
                    
                    <Model/>
                    <br/>
               <Table />
            
                </div>
                
            </React.Fragment>
            

        );
    }
}


export default ProjectComponent;
