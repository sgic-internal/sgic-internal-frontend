import React from 'react';
import Modulesubmodule from './Modulesubmodule';
import {
    PageHeader
} from 'antd';


class ModuleComponent extends React.Component {

    /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount(){
    }

    render() {
        
      
        const { handleSwitchChange } = this.props;
        const routes = [{
                path: 'index',
                breadcrumbName: 'Home',
            },
            {
                path: 'first',
                breadcrumbName: 'Module',
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Module" breadcrumb={{ routes }} />
                <div
                    style={{
                    padding: '0 24px 24px 24px',
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
                    <Modulesubmodule/>
            
                </div>
                
            </React.Fragment>

        );
    }
}

export default ModuleComponent;
