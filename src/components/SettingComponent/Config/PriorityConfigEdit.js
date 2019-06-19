import React from 'react';
import { Form, Input, Button, Divider, Upload, Icon, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

const props = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  previewFile(file) {
    console.log('Your upload file:', file);
    // Your process logic. Here we just mock to the same file
    return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then(res => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};

export default class EditPriorty extends React.Component {
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  render() {

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
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
            <Form.Item label="PriorityName">
              <Input />
            </Form.Item>
            <Form.Item label="Description">
              <Input />
            </Form.Item>
            <Form.Item label="Icon"  >
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Upload
      </Button>
              </Upload>

            </Form.Item>

            <Form.Item label="Colour">
              <div style={styles.swatch} onClick={this.handleClick}>
                <div style={styles.color} />
              </div>
              {this.state.displayColorPicker ? <div style={styles.popover}>
                <div style={styles.cover} onClick={this.handleClose} />
                <SketchPicker color={this.state.color} onChange={this.handleChange} />
              </div> : null}

            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Save
          </Button>
              <Divider type="vertical" />
              <Link to="/Cancel"> <Button type="primary" htmlType="submit">
                Cancel
          </Button></Link>
            </Form.Item>
          </Form>
        </div>

      </React.Fragment>
    );
  }
}


