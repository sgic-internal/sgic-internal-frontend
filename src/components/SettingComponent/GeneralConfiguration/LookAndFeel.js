import React from 'react';
import {
  Breadcrumb,
  Row,
  Col,
  Upload,
  Button,
  Icon,
  message,
  Checkbox,
  Modal,
  Form,
  Input,
  Divider

} from 'antd';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import Imags from '../../../Assets/Logo1.png';
import Imags1 from '../../../Assets/logo5.png';

class LookAndFeel extends React.Component {

  state = {
    visible: false,

  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showEditModal = () => {
    console.log("showEditModal clicked");
    this.setState({
      visibleEditModal: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  onChange1(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };


  render() {

    // const props = {
    //     name: 'file',
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     headers: {
    //       authorization: 'authorization-text',
    //     };

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <React.Fragment>
        <Breadcrumb style={{
          margin: '16px 0'
        }}>
          <Breadcrumb.Item>User Interface</Breadcrumb.Item>
          <Breadcrumb.Item>Look and feel</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            background: '#fff',
            minHeight: '500px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
          }}>

          <Modal
            title="pick Color"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ padding: "60px 100px 50px 100px"}}
          >
            <div
              style={{
                margin: "0 0 0 50px",
                background: '#fff',
                minHeight: '30px',

              }}>

              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>

                <Form.Item label="Color">
                  <div style={styles.swatch} onClick={this.handleClick} style={{ margin:"12px"}}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                  </div> : null}
                </Form.Item>

              </Form>
            </div>

          </Modal>
          <Row>
            <Col span={8}><h2>System Setting</h2></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <br></br>

          <Row>
            <Col span={8}><h3>Logo</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <Row>
            <Col span={8}>
              <img src={Imags} />
              <p><h5>We Suggest a logo size of 368px width by 64px height</h5></p>
            </Col>
            <Col span={4}>
              <a>Reset to default</a>
            </Col>
            <Col span={8}>

            </Col>
            <Col span={12}>

            </Col>
          </Row>
          <br>
          </br>
          <Row>

            <p>Upload a file</p>
            <Upload >
              <Button>
                <Icon type="upload" />  Upload Logo
    </Button>
            </Upload>
          </Row>
          <br>
          </br>
          <Divider/>
          <Row>
            <Col span={8}><h3>Title</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <p>Title appear in your browser tap and when switching application. Change your title in General configuration > Edit Setting</p>
          <Checkbox onChange={this.onChange1}>Show on dashboard sidebar</Checkbox>
          <p style={{ color: "#d2dae2" }}>When enabled, the title will appear below the logo.</p>
          <a>Update</a>
          <br>
          </br>
          <Divider/>
          <Row>
            <Col span={8}><h3>Favicon</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col span={8}>
              <img src={Imags1} />
              <p><h5>We Suggest a logo size of 368px width by 64px height</h5></p>
            </Col>
            <Col span={4}>
              <a>Reset to default</a>
            </Col>
            <Col span={8}>

            </Col>
            <Col span={12}>

            </Col>
          </Row>
          <br></br>
          <Row>

            <p>Upload a file</p>
            <Upload >
              <Button>
                <Icon type="upload" />  Upload Favicon
    </Button>
            </Upload>
          </Row>
          <br>
          </br>
          <Divider/>
          <Row>
            <Col span={8}><h3>Sidebar color</h3></Col>
          </Row>
          <br></br>
          <br></br>

          <Row>
            <Col span={6}>
              <p>Sidebar</p>
            </Col>
            <Col span={4}>
              <p>#45612</p>

            </Col>
            <Col span={1}>
              <Icon type="border" style={{ color: "#0be881", background: "#0be881" }} />

            </Col>
            <Col span={13}>

              <a onClick={this.showModal} ><Icon type="edit" style={{ color: "blue" }} /></a>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col span={6}>
              <p>Text and icon</p>
            </Col>
            <Col span={4}>
              <p>#eb512</p>

            </Col>
            <Col span={1}>
              <Icon type="border" style={{ color: "#ffc048", background: "#ffc048" }} />
            </Col>
            <Col span={13}>
              <a onClick={this.showModal} ><Icon type="edit" style={{ color: "blue" }} /></a>
            </Col>
          </Row>
          <br>
          </br>
          <Divider/>
          <Row>
            <Col span={8}><h3>Date and Time formats</h3></Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col span={6}>
              Time Format
            </Col>
            <Col span={4}>
              <p style={{ display: "inline" }}>h:mm a</p>
            </Col>
            <Col span={14}>
              <p style={{ color: "#d2dae2" }}>Eg 7:45 AM</p>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col span={6}>
              Day Format
            </Col>
            <Col span={4}>
              <p style={{ display: "inline" }}>EEEE h:mm a</p>
            </Col>
            <Col span={14}>
              <p style={{ color: "#d2dae2" }}>Eg Friday 2:35 AM</p>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col span={6}>
              Complete Date/Time Format
            </Col>
            <Col span={4}>
              <p style={{ display: "inline" }}>DD/MM/YY h:mm p</p>
            </Col>
            <Col span={14}>
              <p style={{ color: "#d2dae2" }}>Eg 08/Aug/13 5:45 PM</p>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col span={6}>
              Day/Month/Year Format
            </Col>
            <Col span={4}>
              <p style={{ display: "inline" }}>DD/MM/YY</p>
            </Col>
            <Col span={14}>
              <p style={{ color: "#d2dae2" }}>Eg 5/11/19</p>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col span={6}>
              Edit Date and Time Format
            </Col>
            <Col span={18}>
              <a>Edit</a>
            </Col>
          </Row>


        </div>

      </React.Fragment>

    );
  }
}

export default LookAndFeel;
