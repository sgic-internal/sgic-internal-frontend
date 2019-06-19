import React from 'react';
import {
    PageHeader
} from 'antd';
import DefectStatusFlow from './Editor/GGEditor/DefectStatusFlow';


class DefectStatusFlowComponent extends React.Component {

    /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */
  

    componentWillMount() {
    }

    componentDidMount(){
    }

    render() {
        
         const routes = [{
                path: 'index',
                breadcrumbName: 'Settings',
            },
            {
                path: 'first',
                breadcrumbName: 'Workflow',
            },
            {
                path: 'second',
                breadcrumbName: 'Defect Status Workflow',
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Defect Status Workflow" breadcrumb={{ routes }} />
                <div
                    style={{
                    padding: '0 24px 24px 24px',
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
                    <DefectStatusFlow/>
            
                </div>
                
            </React.Fragment>

        );
    }
}

export default DefectStatusFlowComponent;
