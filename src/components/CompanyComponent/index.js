import React from "react";
import { PageHeader } from "antd";
import AddCompany from "./AddCompany";
import ManageCompany from "./ManageCompany";
class CompanyComponent extends React.Component {
  /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */


  componentWillMount() {}

  componentDidMount() {}

   render() {
        
        const routes = [{
                path: 'index',
                breadcrumbName: 'Home',
            },
            {
                path: 'first',
                breadcrumbName: 'Company',
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Company" breadcrumb={{ routes }} ><AddCompany /></PageHeader>
                <div
                    style={{
                    padding: '0 24px 24px 24px',
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
          
          <br />
          <ManageCompany />
        </div>
      </React.Fragment>
    );
  }
}

export default CompanyComponent;
