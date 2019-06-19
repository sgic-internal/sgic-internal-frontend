import React from 'react';
import {
    Breadcrumb, Row, Col, Button, Input, Icon
} from 'antd';
import UserIcon from './images/user.png';

class ProfileScreen extends React.Component {

    state = {
        user: "U",
        color: "tomato",
        size: "10px"
    }
    /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {

        return (
            <React.Fragment>
                <Breadcrumb style={{
                    margin: '16px 0'
                }}>
                    <Breadcrumb.Item>User Component</Breadcrumb.Item>
                    <Breadcrumb.Item>User Edit</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        background: '#fff',
                        minHeight: '500px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                    }}>

                    {/* first row */}
                    <Row>
                        <Col span={24}>
                            <h2>Profile Photo</h2>
                        </Col>
                    </Row>
                    <br />

                    {/* profile image area */}
                    <Row gutter={10}>
                        <Col span={4}>
                            <img src={UserIcon} alt="sorry no img" style={{ height: "10em" }} />
                            {/* <Avatar
                                style={{ backgroundColor: this.state.color, verticalAlign: "middle" }}
                                size="large"
                            >
                                {this.state.user}
                            </Avatar> */}
                        </Col>
                        <Col span={20}>
                            <h2>Upload Your Photo</h2>
                            <p>Photo should be atleast 300px x 300px</p>
                            {/* upload button */}
                            <Button type="primary" icon="upload" size={this.state.size}>
                                Upload Photo
                            </Button>

                            <Button type="default" icon="camera" size={this.state.size} style={{ marginLeft: "1em" }}>
                                Take Photo
                            </Button>
                        </Col>
                    </Row>

                    <br /><br />
                    {/* form area     */}
                    <Row gutter={10}>
                        <Col span={12}>
                            <h2>Basic Information</h2>
                            <br />

                            {/* basic information form */}
                            <form action="" style={{ width: "25em" }}>
                                <label>Username</label>
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Krish007"
                                />
                                <br /><br />
                                <label>First Name</label>
                                <Input
                                    prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Kishanth"
                                />
                                <br /><br />
                                <label>Last Name</label>
                                <Input
                                    prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Shanthakumar"
                                />
                                <br /><br />
                                <label>Email</label>
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="kishanth001@gmail.com"
                                />
                                <br /><br />
                                <label>Website</label>
                                <Input
                                    prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="www.krishglob.com"
                                />
                            </form>
                            <br />
                            <Button className="customBtn" icon="upload" size={this.state.size}>
                                Update
                            </Button>

                        </Col>
                        <Col span={12}>
                            <h2>Change Password</h2>
                            <br />

                            <form action="" style={{ width: "25em" }}>
                                <label>Verify Current Password</label>
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                                <br /><br />
                                <label>New Password</label ><span style={{ marginLeft: "6.5em", textDecoration: "underline", color: "blue" }}>Generate Strong Password</span>
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                                <br />  <br />

                                {/* list items for password warnings 
                                <Row gutter={2}>
                                    <Col span={12}>
                                        <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />One LowerCase Character</div>
                                        <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />One UpperCase Character</div>
                                        <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />One Number</div>
                                    </Col>
                                    <Col span={12}>
                                        <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />One Special Character</div>
                                        <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />8 Character Minimum</div>
                                        <div style={{ color: "#ff8246" }}><Icon type="warning" theme="filled" />50 Character Maximum</div>
                                    </Col>
                                < /Row>*/
                                }
                                <br />
                                <br />
                                <label>Verify New Password</label>
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </form>
                            <br />
                            <div className="customBtn">
                                <Button icon="upload" size={this.state.size}>
                                    Update
                            </Button>
                            </div>
                        </Col>
                    </Row>
                </div>

            </React.Fragment>

        );
    }
}

export default ProfileScreen;