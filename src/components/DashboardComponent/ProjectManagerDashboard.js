import React from 'react';
import { Breadcrumb, Statistic, Card, Row, Col, Icon, Timeline, Divider, Progress, Table, Button } from 'antd';
import ChartBar from './assets/ChartBar';
import ChartPolar from './assets/ChartPolar';
import { Chart } from 'primereact/chart';

//import PrimeReact from './PrimeReact';
import DashboardConfig from './DashboardConfig';
import axios from 'axios';

//table data



// Table data end

class ProjectManagerDashboard extends React.Component {
    // Chart Component
    state = {
        filteredInfo: null,
        sortedInfo: null,
        color:'',
        highsev:'',
        mediumsev:'',
        lowsev:'',
      DefectCount: [],
      value:'',
      density:'',
      StatusNew:'',
      StatusOpen:'',
      StatusClose:'',
      StatusRejected:'',
      StatusReOpen:'',
      StatusFixed:'',
      StatusDefered:'',
      ratio:''



    };
    
getHigh(){

        axios
        .get('http://localhost:8081/defectservices/getseverityhigcount')
        .then(res=>{
            console.log(res.data)
            this.setState({
                highsev:res.data
            })
        })
}

getMedium(){
    axios
    .get('http://localhost:8081/defectservices/getseveritymediumcount')
    .then(res=>{
        console.log(res.data)
        this.setState({
            mediumsev:res.data
        })
    })
}

getLow(){
    axios
    .get('http://localhost:8081/defectservices/getseveritylowcount')
    .then(res=>{
        console.log(res.data)
        this.setState({
            lowsev:res.data
        })
    })
}



    // constructor(props) {
    //     super(props)
    //     this.state = {
    //           value:'',
    //          density:'',
          
    //     }
    //     // this.componentWillMount = this.componentWillMount.bind(this);
    //   };
    

    //Table Declaration
    

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    setIdSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'id',
            },
        });
    };


    getStatusNew(){
        axios
        .get('http://localhost:8081/defectservices/getStatusNew')
        .then(res=> {
            this.setState({
                StatusNew:res.data
            })

        })
    }

    getStatusOpen(){
        axios
        .get('http://localhost:8081/defectservices/getStatusOpen')
        .then(res=> {
            this.setState({
                StatusOpen:res.data
            })
        })
    }

    getStatusClose(){
        axios
        .get('http://localhost:8081/defectservices/getStatusClose')
        .then(res=> {
            this.setState({
                StatusClose:res.data
            })
        })

    }
    getStatusRejected(){
        axios
        .get('http://localhost:8081/defectservices/getStatusRejected')
        .then(res=> {
            this.setState({
              StatusRejected:res.data  
            })
        })

    }
    getStatusReOpen(){
        axios
        .get('http://localhost:8081/defectservices/getStatusReOpen')
        .then(res=> {
            this.setState({
                StatusReOpen:res.data
            })
        })

    }

    getStatusFixed(){
        axios
        .get('http://localhost:8081/defectservices/getStatusFixed')
        .then(res=> {
            this.setState({
                StatusFixed:res.data
            })
        })

    }
    getStatusDefered(){
        axios
        .get('http://localhost:8081/defectservices/getStatusDefered')
        .then(res=> {
            this.setState({
              StatusDefered:res.data  
            })
        })

    }
    // table decalration End
    /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */
getHigh1(){
    axios
        .get('http://localhost:8081/defectservices/gethightcount')
        .then(res=> {
            let color=""
            if(3>res.data){
               color='#12cc1f'
            }else{
                color='#d60f0f'
            }
            
            console.log(res.data)
              this.setState({
                  high:res.data,
                  color
              })  
              console.log(this.state.color)
            })
}


getLow1(){
    axios
        .get('http://localhost:8081/defectservices/getlowcount')
        .then(res=> {
            let color=""
            if(3>res.data){
               color='#12cc1f'
            }else{
                color='#d60f0f'
            }
            
            console.log(res.data)
              this.setState({
                  low:res.data,
                  color
              })  
              console.log(this.state.color)
            })
}

getMedium1(){
    axios
        .get('http://localhost:8081/defectservices/getcountmedium')
        .then(res=> {
            let color=""
            if(3>res.data){
               color='#12cc1f'
            }else{
                color='#d60f0f'
            }
            
            console.log(res.data)
              this.setState({
                  medium:res.data,
                  color
              })  
              console.log(this.state.color)
            })
}

getSeverityIndex(){
    axios
        .get('http://localhost:8081/defectservices/getseverityindex')
        .then(res=> {
            let color=""
            if(3>res.data){
               color='#12cc1f'
            }else{
                color='#d60f0f'
            }
            
            console.log(res.data)
              this.setState({
                  severityindex:res.data,
                  color
              })  
              console.log(this.state.color)
            })
}

    componentDidMount() {
       this.getHigh1();
       this.getHigh();
       this.getMedium();
       this.getLow();
       this.getLow1();
       this.getMedium1();
       this.getSeverityIndex();
       this.getdefectdensity();
       this.getdefectcount();
       this.getStatusClose();
       this.getStatusDefered();
       this.getStatusFixed();
       this.getStatusNew();
       this.getStatusOpen();
       this.getStatusReOpen();
       this.getStatusRejected();
        this.getDefectRatio();

    }
    getDefectRatio(){
        axios
        .get('http://localhost:8081/defectservices/getCount')
        .then(res=>{

            this.setState({
                ratio:res.data
            })
            
        })
    }

     getdefectcount() {
        const url = 'http://localhost:8081/defectservices/getTotalDefectCount';
        axios.get(url)
    
          .then(response => this.setState({
            value: response.data,
          }))
          .catch(function (error) {
            console.log(error);
          });
    
      }
       getdefectdensity(){
        const url = 'http://localhost:8081/defectservices/getDefectDensity';
        axios.get(url)
    
          .then(response => this.setState({
            density: response.data,
          }))
          .catch(function (error) {
            console.log(error);
          });
    
      }
      gettotaldefectwithRe(){
          var _this=this
        axios
        .get("http://localhost:8081/defectservices/getAllDefects")
        .then(response => {
          console.warn(response.data);
             var openHigh=0;
          response.data.map((post,index)=>{
            // var openHigh=0;
              if(post.severity=="High" && post.status=="Open"){
                  openHigh=openHigh+1;
                  
              }
              
          });
          console.log(openHigh)
          _this.setState({ openHigh });

          console.log(this.state.op)



//       componentDidMount() {
//         this.getdefectdensity()
//         this.getdefectcount()

//     }

        })
    }
        

    render() {

        console.log(this.state.highsev)
        // For Table functions
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id,
                sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            },
            {
                title: 'Project Name',
                dataIndex: 'name',
                key: 'name',
                filters: [{ text: 'Task', value: 'Task' }, { text: 'Management', value: 'Management' }],
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: 'Member',
                dataIndex: 'member',
                key: 'member',
                filters: [{ text: 'Thuva', value: 'Thuva' }, { text: 'Kishanth', value: 'Kishanth' }],
                filteredValue: filteredInfo.member || null,
                onFilter: (value, record) => record.member.includes(value),
                sorter: (a, b) => a.member.length - b.member.length,
                sortOrder: sortedInfo.columnKey === 'member' && sortedInfo.order,
            },

            {
                title: 'View Member',
                dataIndex: 'viewmember',
                key: 'viewmember',
                render: () => <Button style={{ marginLeft: '1rem' }}><Icon type="security-scan" /></Button>
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'edit',
                render: () => <Button type="primary">Edit</Button>
            },


        ];

        const data5 = {
            labels: ['High', 'Medium', 'Low'],
            datasets: [
              {
                data: [this.state.highsev, this.state.mediumsev,this.state.lowsev],
                backgroundColor: [
                  "#FF6384",
                  "#4CAF50",
                  "#FFCE56",
                  
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#4CAF50",
                  "#FFCE56",
              
                ]
              }]
          };

        // Table functions End
        //Chart data

        // chart data end

        return (
            <React.Fragment>
                <Row>
                    <Col span={23}>
                        <Breadcrumb style={{
                            marginBottom: '6px',
                            marginTop: '-10px'
                        }}>

                            <Breadcrumb.Item>Dashboard Component</Breadcrumb.Item>
                            <Breadcrumb.Item>PM Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={1} >
                        <div id="components-dropdown-demo-dropdown-button" style={{ marginLeft: "-2.1em" }}>
                            <DashboardConfig />
                        </div>
                    </Col>
                </Row>
                <div style={{

                    padding: "0 0 10px 0 "



                }}>
                    <Row>
                        

                            <Col span={6}>
                            <Card style={{ margin: "10px 5px 0 -2px", borderRadius: "5px" }}>
                                <Statistic
                                    title="High Severity"
                                    value={this.state.high}
                                    // precision={2}
                                    valueStyle={{ color: this.state.color }}
                                    prefix={<Icon type="arrow-up" style={{color:"red"}}/>}
                                  
                                    suffix="%"
                                />
                            </Card>



                        </Col>
                        <Col span={6}>
                            <Card style={{ margin: "10px 5px", borderRadius: "5px" }}>
                                <Statistic

                                    title="Medium Severity"
                                    value={this.state.medium}
                                    // precision={2}
                                    valueStyle={{ color: this.state.color  }}
                                    prefix={<Icon type="arrow-up" style={{color:"orange"}}/>}

                                    
                                    suffix="%"
                                />
                            </Card></Col>
                              

                        <Col span={6}>
                            <Card style={{ margin: "10px 5px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Low Severity"
                                    value={this.state.low}

                                    valueStyle={{ color: this.state.color }}
                                    prefix={<Icon type="arrow-down" style={{color:"green"}}/>}
                                    suffix="%"

                                />
                            </Card></Col>
                        <Col span={6}>
                            <Card style={{ margin: "10px 2px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Severity Index"
                                    value={this.state.severityindex}
                                    valueStyle={{ color: '#007673' }}
                                    precision={2}
                                    prefix={<Icon type="sync" spin />}
                                    // suffix="%"

                                />
                            </Card></Col>
                            <Col span={6}>
                            <Card style={{ margin: "10px 5px 0 -2px", borderRadius: "5px" }}>
                                <Statistic
                                    
                                    title="Defect to Remarks Ratio"
                                    value={this.state.ratio}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="safety-certificate" theme="filled" />}

                                    suffix="%"
                                />
                            </Card>
                        </Col>


                        <Col span={6}>
                            <Card style={{ margin: "10px 5px", borderRadius: "5px" }}>
                                <Statistic

                                    

                                    title="Defect Density"
                                    value={this.state.density}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="fund" theme="filled" />}

                                    suffix="%"
                                />
                            </Card></Col>
                            <Col span={6}>
                            <Card style={{ margin: "10px 5px 0 -2px", borderRadius: "5px" }}>
                                <Statistic
                                    
                                    title="Total Defect"
                                    value={this.state.value}
                                    
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="safety-certificate" theme="filled" />}

                                    
                                />
                            </Card>
                        </Col>

                        <Col span={6}>
                            <Card style={{ margin: "10px 5px 0 -2px", borderRadius: "5px" }}>
                                <Statistic
                                    
                                    title="Total Open High"
                                    value={this.state.openHigh}
                                    
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="safety-certificate" theme="filled" style={{color:'#e30931'}} />}

                                    
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div>



                    <div>
                        <br />
                    </div>

                    <Row style={{ margin: "-20px 0 0 0 " }}>
                        <Col span={12}>
                        <div className="content-section implementation" style={{ borderRadius: "5px", margin: "0 0 0 5px" }} >


                            <ChartBar  />
                            </div>
                        </Col>
                        <Col span={12}>
                            <Card title="Defects Status" style={{ borderRadius: "5px", margin: "0 0 0 5px" }}>
                                <div >
                                    <label>New</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        percent={this.state.StatusNew} status="active"
                                    />
                                    <label>Opened</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#eee000',
                                            '100%': '#766766',
                                        }}
                                        percent={this.state.StatusOpen} status="active"
                                    />
                                    <label>Fixed</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#11FF00',
                                            '100%': '#91C8F9',
                                        }}
                                        percent={this.state.StatusFixed} status="active"
                                    />
                                    <label>Reopen</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#F60C0C',
                                            '100%': '#171515',
                                        }}
                                        percent={this.state.StatusReOpen} status="active"
                                    />
                                    <label>Closed</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#095725',
                                            '100%': '#B1FF29',
                                        }}
                                        percent={this.state.StatusClose} status="active"
                                    />
                                    <label>Rejected</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#FFF700',
                                            '100%': '#4BF90C',
                                        }}
                                        percent={this.state.StatusRejected} status="active"
                                    />
                                    <label>Deferred</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#0A0A00',
                                            '100%': '#FF5500',
                                        }}
                                        percent={this.state.StatusDefered} status="active"
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div>
                        <br />
                    </div>
                    <Row style={{ margin: "-10px 0 0 0 " }}>
                        <Col span={12}>
                            {/* <ChartPolar /> */}<div style={{ padding: 30, background: '#fff', minHeight: 307 }} >
                            <Chart type="pie" data={data5} style={{ padding: "0 0 120px 0" }} />
                            </div>
                            
                        </Col>
                        <Col span={12}>


                            <Card title="Ongoing Project Updates" style={{ minHeight: '22.4rem', height: '22.4rem', borderRadius: "5px", margin: "0 0 0 5px" }}>
                                <Timeline>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="red">
                                        Solve initial network problems 1
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        Technical testing
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        Manual testing
                                    </Timeline.Item>
                                    <Timeline.Item color="red">
                                        Solve initial network problems 2
                                    </Timeline.Item>
                                </Timeline>
                            </Card>

                        </Col>

                    </Row>

                    <div>
                        <br />
                    </div>

                    {/* <div
                        style={{

                            padding: 24,
                            background: '#fff',
                            minHeight: '500px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                            borderRadius: "5px",
                            margin: "-10px 0 0 0 "
                        }}>


                        <Row >
                            <Col span={24}>
                                <div className="table-operations" >

                                    <Button onClick={this.clearFilters} type="primary">Clear filters</Button>

                                </div>
                                <div>
                                    <br />
                                </div>
                                


                            </Col>

                        </Row>




                    </div> */}
                </div>

            </React.Fragment>

        );
    }
}

export default ProjectManagerDashboard;
