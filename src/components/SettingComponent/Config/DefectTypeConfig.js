import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Popconfirm } from 'antd';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import axios from 'axios';
import { Row, Col } from 'antd';

// const data = [
//   {
//     key: '1',
//     name: 'UI',
//     Description: 'UI',
//     Colour: "#ff5e57",
//   },
//   {
//     key: '2',
//     name: 'Functionality',
//     Description: 'Functionality',
//     Colour: "#0be881",
//   },
//   {
//     key: '3',
//     name: 'Enhancement',
//     Description: 'Enhancement',
//     Colour: "#ffdd59",
//   },
//   {
//     key: '4',
//     name: 'Performance',
//     Description: 'Performance',
//     Colour: "#00d8d6",
//   },
// ];


export default class DefectTypeConfic extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    DefectType: [],
    def: []

  };

  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteDefect = this.deleteDefect.bind(this);

    this.state = {
      name: '',
      value: '',
      id: ''
    }
    // this.componentWillMount = this.componentWillMount.bind(this);
  };


  componentDidMount() {
    this.componentWillMount()
    //setInterval(this.componentWillMount);

  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  };
  onChangeValue(e) {
    this.setState({
      value: e.target.value
    })
  };
  getdefectType() {
    const url = 'http://localhost:8081/defectservices/defecttypes';
    axios.get(url)

      .then(response => this.setState({
        DefectType: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });

  }
  componentDidMount() {

    //Simple Axios
    this.getdefectType()
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  editDefect = (id) => {
    this.showEditModal();
    this.setState({ id: id })
    console.log(id);

    axios.get('http://localhost:8081/defectservices/defecttype/' + id)

      .then(response => {
        this.setState({
          name: response.data.name,
          value: response.data.value
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ visible: false })
  }

  deleteDefect(id) {

    //this.showEditModal();

    // this.setState({ id: id })
    // console.log(id);
    // axios.get('http://localhost:8081/defectservice/defecttype/' + id)
    //   .then(response => {
    //     this.setState({
    //       name: response.data.name,
    //       value: response.data.value
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    // this.setState({ visible: false })
    console.log(id)

    fetch(`http://localhost:8081/defectservices/defecttype/` + id, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(id);
    const DefectType = this.state.DefectType.filter(DefectType => {
      return DefectType.id !== id;
    });
    this.setState({
      DefectType
    })

    // axios.delete(`http://localhost:8081/defectservice/defecttype/${id}`)
    //   .then(response => {
    //     console.log(response)
    //     this.setState({
    //       name: response.data.name,
    //       value: response.data.value
    //     });
    //   })
    //   .catch(err => console.log(err))

  }



  showEditModal = () => {
    console.log("showEditModal clicked");
    this.setState({
      visibleEditModal: true,
    });


  };

  handleOk = e => {
    this.getdefectType();
    const obj = {
      name: this.state.name,
      value: this.state.value
    }

    axios.post('http://localhost:8081/defectservices/defecttype/', obj)

      .then(res => this.getdefectType());

    this.setState({
      name: '',
      value: '',
      visible: false
    })
  };

  handleEditOk = (id) => {
    const obj = {
      name: this.state.name,
      value: this.state.value
    }

    axios.put(`http://localhost:8081/defectservices/defecttype/${id}`, obj)

      .then(res => this.getdefectType());

    this.setState({
      name: '',
      value: '',
      visibleEditModal: false
    })
  };



  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleEditPriorityCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
    });

  };

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

    const columns = [
      // {
      //   title: 'Defect Id',
      //   dataIndex: 'id',
      //   key: 'id',

      // },
      {
        title: 'DefectType',
        dataIndex: 'name',
        key: 'name',

      },
      {
        title: 'Description',
        dataIndex: 'value',
        key: 'Description',
      },
      // {
      //   title: 'Colour',
      //   key: 'Colour',
      //   dataIndex: 'Colour',
      //   render: (colour) => <Icon type="border" style={{ color: colour, background: colour }} />,
      // },
      {
        title: 'Action',
        key: 'Action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon onClick={this.editDefect.bind(this, data.id)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />


            <Divider type="vertical" />

            {/* <Popconfirm
    title="Are you sure？"
    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
  >
    <a href="#">Delete</a>
  </Popconfirm> */}

            <Popconfirm
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}

              />}
              onConfirm={this.deleteDefect.bind(this, data.id)}
            >
              <Icon type="delete" style={{ fontSize: '17px', color: 'red' }} />
            </Popconfirm>

          </span>
        ),
      },
    ];


    return (

      <React.Fragment>

        <div
          style={{
            padding: 24,
            background: '#fff',
            minHeight: '500px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
          }}>

          <Row>
            <Col span={8}><h3>Defect Type Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>


          <br></br>
          <div>
            <Button type="primary" onClick={this.showModal}>
              Add Defect Type
        </Button>
          </div>
          <br></br>

          <Modal
            title=" Add Defect Type"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ padding: "60px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>

              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                <Form.Item label="TypeName">
                  <Input type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName} />
                </Form.Item>
                <Form.Item label="Description">
                  <Input type="text"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.onChangeValue} />
                </Form.Item>


                {/* <Form.Item label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                  </div> : null}

                </Form.Item> */}


              </Form>
            </div>

          </Modal>

          <Modal
            title="Edit DefectType"
            visible={this.state.visibleEditModal}
            onOk={this.handleEditOk.bind(this, this.state.id)}
            onCancel={this.handleEditPriorityCancel}
            style={{ padding: "60px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="TypeName">
                  <Input type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName} />
                </Form.Item>
                <Form.Item label="Description">
                  <Input type="text"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.onChangeValue} />
                </Form.Item>


                {/* <Form.Item label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                  </div> : null}
                </Form.Item> */}


              </Form>
            </div>

          </Modal>
          <Table columns={columns} dataSource={this.state.DefectType} />

          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}