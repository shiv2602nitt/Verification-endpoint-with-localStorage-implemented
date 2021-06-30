import React from "react";
import {Redirect} from "react-router-dom";
import {Row,Col,Divider,Button,Alert,Modal,Form,Input,Spin} from "antd";
import {RightOutlined} from "@ant-design/icons"; 
import BankSelector from "../Components/BankSelector";
import BankMap from "../Components/BankMap";
import Availability from "../Components/Availability";
import utils from "../utils";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        localStorage.clear()
        this.state = {
            banks : [],
            bank : {},
            key : "",
            date : "",
            otpVerify : false,
            loading : false,
            mobile:"",
            error:false,
            reqId:""
        }

        this.onDateSelect = this.onDateSelect.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.sendOTP = this.sendOTP.bind(this);
        this.verifyOTP = this.verifyOTP.bind(this);
    }

    componentDidMount(){
        utils.fetchBanks().then((banks)=>{
            // console.log(banks)
            this.setState({banks})
        })

        utils.fetchAPIkey().then(key=>{
            this.setState({key})
        })
    }
    
    handleBankChange(index){
        this.setState(prevState=>({
            bank : prevState.banks[index]
        }))
    }

    onDateSelect(date){
        console.log(date._d)
        this.setState({
            date: new Date((new Date(date._d)).setUTCHours(0,0,0,0))
        })
    }

    onNextClick(){
        this.setState({otpVerify:true})
    }

    handleCancel(){
        this.setState({otpVerify:false})
    }

    sendOTP(value){
        const {mobile} = value;
        if(mobile.length === 10){
            this.setState({
                error:false,
                loading:true
            })
            utils.sendOTP(mobile).then(data=>{
                console.log(data)
                if(data.status){
                    this.setState({
                        loading:false,
                        mobile,
                        reqId : data.req_id
                    })
                }else{
                    this.setState({
                        loading:false,
                        error:true
                    })
                }
            })
        }
    }

    verifyOTP(value){
        const {otp} = value;
        if(otp.length === 4 && this.state.reqId){
            this.setState({
                loading:true,
                error:false,
            })
            utils.verifyOTP({otp,reqId:this.state.reqId}).then(data=>{
                if(data.status){
                    this.setState({
                        loading:false,
                        otpVerify:false,
                    })
                }
            })
        }else{
            this.setState({
                loading:false,
                error:true
            })
        }
    }

    render(){
        var disbaled = !(this.state.bank && this.state.date);
        var nextPage = (this.state.mobile && !this.state.otpVerify && this.state.reqId && !this.state.error && !this.state.loading);

        const tailLayout = {
            wrapperCol: {
              offset: 20,
              span: 16,
            },
        };
        return(
            <div>
                {nextPage ? (
                    <Redirect to={{
                        pathname:"selectTime",
                        state : {
                            bank: this.state.bank,
                            date: this.state.date,
                            mobile: this.state.mobile,
                            reqId: this.state.reqId
                        }
                    }}/>
                ):(
                    <Row justify="center" align="middle" gutter={24}>
                        <Modal okText="Verify" title="OTP verification" visible={this.state.otpVerify} onCancel={this.handleCancel} footer={[]}>
                            {this.state.error && !this.state.mobile && <Alert message="Something went wrong" type="error" showIcon closable/> }
                            {this.state.mobile ? (
                                <Form name="otp" onFinish={this.verifyOTP}>
                                    <Form.Item
                                        label="OTP"
                                        name="otp"
                                        hidden={this.state.loading}
                                        rules={[
                                            {
                                                required:true,
                                                message: "Please enter sent OTP!"
                                            }
                                        ]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>
                                    <Form.Item {...tailLayout} hidden={this.state.loading}>
                                        <Button type="primary" htmlType="submit">
                                            Verify OTP
                                        </Button>
                                    </Form.Item>
                                    {this.state.loading && <Spin size="large"/>}
                                </Form>
                            ) : (
                                <Form name="otpDetails" onFinish={this.sendOTP}>
                                    <Form.Item
                                        label="Mobile number"
                                        name="mobile"
                                        hidden={this.state.loading}
                                        rules={[
                                            {
                                                required:true,
                                                message: "Please enter your mobile number!"
                                            }
                                        ]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>
                                    <Form.Item {...tailLayout} hidden={this.state.loading}>
                                        <Button type="primary" htmlType="submit">
                                            Send OTP
                                        </Button>
                                    </Form.Item>
                                    {this.state.loading && <Spin size="large"/>}
                                </Form>
                            )}
                        </Modal> 
                        <Col className = "gutter-row" offset = {1} span={10}>
                            <BankSelector banks={this.state.banks} handleBankChange={(index)=>{this.handleBankChange(index)}}/>
                            <Divider/>
                            <Availability avbl = {this.state.bank.avbl} selectedDate={this.state.date} onDateSelect={this.onDateSelect}/>
                        </Col>
                        <Col className = "gutter-row" offset = {1} span={10}>
                            <BankMap location={{
                                    lat:this.state.bank.lat,
                                    lng:this.state.bank.lng,
                                    key: this.state.key,
                                    name : this.state.bank.name
                                }}/>
                            <Divider/>
                            <Row justify="end">
                                <Button size="large" icon={<RightOutlined />} type="primary"  disabled={disbaled} onClick={this.onNextClick}>
                                    Next
                                </Button>  
                            </Row>
                        </Col>
                    </Row>     
                )}
            </div>
        ); 
    }
};


export default (HomePage);
