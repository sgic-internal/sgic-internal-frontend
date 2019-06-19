import React from 'react';
import CompanyEmployee from './CompanyEmployee';
import {
    Breadcrumb
} from 'antd';

class CompanyAdministration extends React.Component {

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
        
        return (
            <React.Fragment>
                <Breadcrumb style={{
                    margin: '16px 0'
                }}>
                    <Breadcrumb.Item>Sample Component</Breadcrumb.Item>
                    <Breadcrumb.Item>Sample SubComponent</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                    padding: 24,
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
               
                <CompanyEmployee/>
            
                </div>
                
            </React.Fragment>

        );
    }
}

export default CompanyAdministration;
