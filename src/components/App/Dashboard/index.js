import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom'
import './index.css';
import HeaderComponent from '../HeaderComponent';
import SiderComponent from '../SiderComponent';

// Dashboard Components
import DefectDashboard from '../../DashboardComponent/DefectDashboard';
import CompanyDashboard from '../../DashboardComponent/CompanyDashboard';
import DeveloperDashboard from '../../DashboardComponent/DeveloperDashboard'
import ProjectManagerDashboard from '../../DashboardComponent/ProjectManagerDashboard';
import CompanyComponent from '../../CompanyComponent';
import DefectComponent from '../../DefectComponent';
import HRAllocationComponent from '../../HRAllocationComponent';
import EmployeeComponent from '../../EmployeeComponent';
import ModuleComponent from '../../ModuleComponent';
import DefectStatusFlowComponent from '../../WorkFlow/DefectStatusFlow';
import DefectRolesFlowComponent from '../../WorkFlow/DefectRolesFlow';
import ProjectManageAllocation from '../../ProjectAllocationComponent';
import ProjectComponent from '../../ProjectComponent';
import CompanyPrivilege from '../../PrivilegeComponent/CompanyPrivilege';
import ProjectPrivilege from '../../PrivilegeComponent/ProjectPrivilege';
import QAPrivilege from '../../PrivilegeComponent/QALeadPrivilege';
import TechLeadPrivilege from '../../PrivilegeComponent/TechLeadPrivilege';
import QADashboard from '../../DashboardComponent/QADashboard';
import PriorityConfig from '../../SettingComponent/Config/PriorityConfig';
import SeverityConfig from '../../SettingComponent/Config/SeverityConfig';
import DefectStatusConfig from '../../SettingComponent/Config/StatusConfig';
import DefectTypeConfig from '../../SettingComponent/Config/DefectTypeConfig';
import AuditLog from '../../SettingComponent/GeneralConfiguration/AuditLog';
import LookAndFeel from '../../SettingComponent/GeneralConfiguration/LookAndFeel';
import GeneralSetting from '../../SettingComponent/GeneralConfiguration/GeneralSetting';
import CompanyAdministration from '../../CompanyAdministrationComponent/';
import ProfileScreen from '../../SettingComponent/ProfileScreen';
import ProductAdministration from '../../ProductAdministration';

// Company Components


const {Content, Footer} = Layout;

class Dashboard extends React.Component {

    render() {
        return (
            <Layout style={{
                minHeight: '100vh'
            }}>
                
                <Route exact path="/">
                    <SiderComponent/>
                </Route>

                <Layout>

                    <Route path="/">
                        <HeaderComponent/>
                    </Route>

                    <Content
                        style={{
                        margin: '24px 16px 0'
                    }}>

                        <Switch>
                            
                            {/* Dashboard Route*/}
                            <Route exact path='/'>
                                <CompanyDashboard/>
                            </Route>
                            <Route path='/dashboard/defect'>
                                <DefectDashboard/>
                            </Route>
                            <Route path='/dashboard/developer'>
                                <DeveloperDashboard/>
                            </Route>
                            <Route path='/dashboard/projectmanager'>
                                <ProjectManagerDashboard/>
                            </Route>
                            <Route path='/dashboard/qa'>
                                <QADashboard/>
                            </Route>

                            {/* Product Administration Route*/}
                            <Route path='/productadministration'>
                                <ProductAdministration/>
                            </Route>
                            
                            {/* Company Administration Route*/}
                            <Route path='/companyadministration'>
                                <CompanyAdministration/>
                            </Route>

                            {/* Defect Route*/}
                            <Route path='/defect'>
                                <DefectComponent/>
                            </Route>

                            {/* Company Route*/}
                            <Route exact path='/company'>
                                <CompanyComponent/>
                            </Route> 

                            {/* Company Route*/}
                            <Route exact path='/project'>
                                <ProjectComponent/>
                            </Route> 
                            
                            {/* HR Allocation Route*/}
                            <Route path='/company/hrallocation'>
                                <HRAllocationComponent/>
                            </Route>

                            {/* Employee Route*/}
                            <Route path='/company/employee'>
                                <EmployeeComponent/>
                            </Route>

                            {/* Module Route*/}
                            <Route path='/module'>
                                <ModuleComponent/>
                            </Route>

                            {/* Module Route*/}
                            <Route path='/projectallocation'>
                                <ProjectManageAllocation/>
                            </Route>

                          

                                {/* General configuration -----------------------------------*/}
                                {/* Setting -> General configuration -> Priority Route*/}
                                <Route path='/config/priority'>
                                    <PriorityConfig/>
                                </Route>

                                {/* Setting -> General configuration -> Severity Route*/}
                                <Route path='/config/severity'>
                                    <SeverityConfig/>
                                </Route>

                                {/* Setting -> General configuration -> Defect type Route*/}
                                <Route path='/config/defecttype'>
                                    <DefectTypeConfig/>
                                </Route>

                                {/* Setting -> General configuration -> Defect status Route*/}
                                <Route path='/config/defectstatus'>
                                    <DefectStatusConfig/>
                                </Route>

                                {/* Additional Setting -----------------------------------*/}
                                {/* Setting -> General configuration -> Priority Route*/}
                                <Route path='/settings/auditlog'>
                                    <AuditLog/>
                                </Route>

                                {/* Setting -> General configuration -> Severity Route*/}
                                <Route path='/settings/lookandfeel'>
                                    <LookAndFeel/>
                                </Route>

                                {/* Setting -> General configuration -> Defect type Route*/}
                                <Route path='/settings/generalsetting'>
                                    <GeneralSetting/>
                                </Route>

                                {/* Setting -> General configuration -> Defect status Route*/}
                                <Route path='/settings/profilescreen'>
                                    <ProfileScreen/>
                                </Route>


                                {/* Privilege -----------------------------------*/}
                                {/* Setting -> Privilege -> Company Route*/}
                                <Route path='/privilege/company'>
                                    <CompanyPrivilege/>
                                </Route>

                                {/* Setting -> Privilege -> Project Route*/}
                                <Route path='/privilege/project'>
                                    <ProjectPrivilege/>
                                </Route>

                                {/* Setting -> Privilege -> QA Lead Route*/}
                                <Route path='/privilege/qalead'>
                                    <QAPrivilege/>
                                </Route>

                                {/* Setting -> Privilege -> Tech Lead Route*/}
                                <Route path='/privilege/techlead'>
                                    <TechLeadPrivilege/>
                                </Route>


                                {/* Work Flow -----------------------------------*/}
                                {/* Setting -> Workflow -> DefectStatusFlow Route*/}
                                <Route path='/workflow/defectstatus'>
                                    <DefectStatusFlowComponent/>
                                </Route>

                                {/* Setting -> Workflow -> DefectRolesFlow Route*/}
                                <Route path='/workflow/defectroles'>
                                    <DefectRolesFlowComponent/>
                                </Route>

                        </Switch>

                    </Content>
                    <Footer
                        style={{
                        textAlign: 'center'
                    }}>
                        Defect Tracker ©2019 Created by SGIC
                    </Footer>
                </Layout>
            </Layout>

        );

    }
}

export default Dashboard;
