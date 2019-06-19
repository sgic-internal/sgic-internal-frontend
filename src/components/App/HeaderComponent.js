import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {collapseSideBar, expandSideBar} from '../../actions/index';
import {
    Layout,
    Icon,
    Badge,
    Row,
    Col,
    Menu,
    Avatar,
    Dropdown,
    Input,
    Tag,
    Divider,
} from 'antd';
import {Link} from 'react-router-dom';
//import './Dashboard.css';
const Search = Input.Search;
const {Header} = Layout;
const menu = (
    <Menu style={{
        width: "350px"
    }}>
        <b style={{
            padding: "10px"
        }}>Notification</b>
        
        <Divider type="vertical" />
        <a
            style={{
            float: "right",
            paddingRight: "10px",
            fontSize: "12px",
            margin: '0'
        }}
            href="#">
            View all
        </a>
        <Menu.Divider/>
        <Menu.Item key="0">
            <Avatar
                style={{
                display: "inline-block",
                position: 'sticky',
                marginTop: '-40px',
                backgroundColor: '#87d068'
            }} icon="user"/>
            <div
                className="notification-item"
                style={{
                display: "inline-block"
            }}>
                <div
                    style={{
                    paddingLeft: "10px",
                    fontSize: "0.8em",
                    margin: "0",
                    top: "0"
                }}>
                    #DT16 Functionality Defect  with <Tag color="orange">Medium priority</Tag> !
                </div>
                <div
                    className="notification-item-time"
                    style={{
                    display: "inline-block",
                    paddingLeft: "10px",
                    fontSize: "0.5em"
                }}>
                    57m
                </div>
            </div>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="1">
            <Avatar
                style={{
                display: "inline-block",
                position: 'sticky',
                marginTop: '-40px',
                backgroundColor: '#87d068'
            }} icon="user"/>
            <div
                className="notification-item"
                style={{
                display: "inline-block"
            }}>
                <div
                    style={{
                    paddingLeft: "10px",
                    fontSize: "0.8em",
                    margin: "0",
                    top: "0"
                }}>
                    #DT12 UI Defect  with <Tag color="red">High priority</Tag> !
                </div>
                <div
                    className="notification-item-time"
                    style={{
                    display: "inline-block",
                    paddingLeft: "10px",
                    fontSize: "0.5em"
                }}>
                    57m
                </div>
            </div>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">
            <Avatar
                style={{
                display: "inline-block",
                position: 'sticky',
                marginTop: '-40px',
                backgroundColor: '#87d068'
            }} icon="user"/>
            <div
                className="notification-item"
                style={{
                display: "inline-block"
            }}>
                <div
                    style={{
                    paddingLeft: "10px",
                    fontSize: "0.8em",
                    margin: "0",
                    top: "0"
                }}>
                    #DT22 UI Defect  with <Tag color="green">Low priority</Tag> !
                </div>
                <div
                    className="notification-item-time"
                    style={{
                    display: "inline-block",
                    paddingLeft: "10px",
                    fontSize: "0.5em"
                }}>
                    57m
                </div>
            </div>
        </Menu.Item>
        <Menu.Divider/>
        <p
            style={{
            textAlign: "center",
            margin: "0",
            fontSize: '13px'
        }}>
            <a href="">Clear All</a>
       
        <Divider type="vertical" />
      
       
            <a href="">Show all</a>
        </p>
    </Menu>
);


class HeaderComponent extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    onClickcollapseSidebar = (event) => {

        if (this.props.sidebar.isCollapsed == true) {
            console.log("expand");
            console.log(this.props);
            this
                .props
                .expandSideBar();
        } else if (this.props.sidebar.isCollapsed == false) {

            console.log("collapsed");
            console.log(this.props);
            this
                .props
                .collapseSideBar();
        } else {}
    }

    logout = () => {
        this
            .props
            .history
            .push('/login')
    }

    render() {
        return (

            <Header
                style={{
                background: '#fff',
                paddingLeft: '14px',
                position: 'relative',
                height: '64px',
                padding: 0,
                boxShadow: '0 1px 4px rgba(0,21,41,.08)'
            }}>
                <div style={{
                    float: 'left'
                }}>

                    <Icon
                        style={{
                        fontSize: '18px',
                        padding: '20px',
                    }}
                        className="trigger"
                        type={this.props.sidebar.isCollapsed
                        ? 'menu-unfold'
                        : 'menu-fold'}
                        onClick={this.onClickcollapseSidebar}/>
                        
                </div>
                <div style={{
                    float: 'left',
                    marginTop: '16px',
                    width: '250px'
                }}>
<Search placeholder="Search .." onSearch={value => console.log(value)} enterButton />
                    </div>
                <Row
                    style={{
                    width: '150px',
                    float: 'right'
                }}
                    type="flex"
                    justify="end">
                    <Col span={8}>
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <a className="ant-dropdown-link" href="#">
                                <Badge count={3} showZero>
                                    <Icon
                                        style={{
                                        fontSize: "18px",
                                        float: "right"
                                    }}
                                        align="right"
                                        type="bell"/>
                                </Badge>
                            </a>
                        </Dropdown>
                    </Col>
                    <Col span={8}>
                      
                               <Badge count={0} showZero>
                                    <Icon
                                        style={{
                                        fontSize: "18px",
                                        float: "right"
                                    }}
                                        align="right"
                                        type="question-circle"/>
                               </Badge>
                          
                    </Col>
                    <Col span={8}>
                        <Link to="/login">
                            <Icon
                                style={{
                                fontSize: '18px',
                            }}
                                align="right"
                                type="logout"
                                onClick={this.logout}/>
                        </Link>
                    </Col>
                </Row>
            </Header>

        ); 

    }
}

function mapStateToProps(state) {
    return {sidebar: state.isCollapsed}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        collapseSideBar: collapseSideBar,
        expandSideBar: expandSideBar
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HeaderComponent);
