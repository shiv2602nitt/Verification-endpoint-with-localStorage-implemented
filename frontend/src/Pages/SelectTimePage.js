import React from "react";
import {Row,Col,Button, Divider} from "antd";
import utils from "../utils";
import {Redirect} from "react-router-dom";
import TimeSlots from "../Components/TimeSlots";
import Summary from "../Components/Summary"

class SelectTimePage extends React.Component{
    constructor(props){
        super(props);

        if(localStorage.getItem("_id")){
            this.state = {
                auth:true,
                error:false,
                alloted:true,
                reqId:localStorage.getItem("reqId"),
                selectedSlot:localStorage.getItem("s"),
                _id:localStorage.getItem("_id"),
                bank:JSON.parse(localStorage.getItem("bank")),
                date:new Date(localStorage.getItem("date")),
                mobile:localStorage.getItem("mobile"),
                slots:JSON.parse(localStorage.getItem("slots")) 
            }
        }
        else if(this.props.location && this.props.location.state){
            this.state = {
                auth:true,
                error:false,
                alloted:false,
                slots:[],
                ...this.props.location.state
            }
        }else{
            this.state = {
                auth:true,      //change it to false once dev is complete
                bank: {},
                date: "",
                mobile: "",
                reqId: "",
                slots:[],
                selectedSlot:-1,
                error:false,
                alloted:false,
                _id:"",
            }
        }

        this.selectSlot = this.selectSlot.bind(this);
        this.bookSlot = this.bookSlot.bind(this);
    }

    componentDidMount(){
        //Auth Code for prvs user//
        
        if(!localStorage.getItem("_id")){
            utils.verifyAuth().then(data=>{
                console.log(data)
                if(data.status){
                    this.setState({
                        auth:true
                    })
                }else{
                    this.setState({
                        auth:false
                    })
                }
            })
    
            utils.getBankSlots({
                lat:this.state.bank.lat,
                lng:this.state.bank.lng,
                date:this.state.date
            }).then(data=>{
                console.log(data)
                this.setState({
                    slots:data[0].timeSlots
                })
            })    
        }
        
    }

    selectSlot(index){
        console.log(index)
        this.setState({
            selectedSlot:index
        })
    }

    bookSlot(){
        const slot = {
            reqId:this.state.reqId,
            mobile:this.state.mobile,
            date:this.state.date,
            selectedSlot:this.state.selectedSlot,
            collectionName:this.state.bank.lat.concat(this.state.bank.lng)
        }

        utils.bookSlot(slot).then(data=>{
            if(data.status){
                if(data.reqId === this.state.reqId){

                    localStorage.setItem("_id",data._id)
                    localStorage.setItem("s",data.slot)
                    localStorage.setItem("reqId",this.state.reqId)
                    localStorage.setItem("collName",this.state.bank.lat.concat(this.state.bank.lng))
                    localStorage.setItem("bank",JSON.stringify(this.state.bank))
                    localStorage.setItem("date",this.state.date)
                    localStorage.setItem("mobile",this.state.mobile)
                    localStorage.setItem("slots",JSON.stringify(this.state.slots))

                    this.setState({
                        error:false,
                        alloted:true,
                        selectedSlot:data.slot,
                        _id:data._id
                    })
                }
            }else{
                this.setState({
                    error:true,
                    alloted:false
                })
            }
        })
    }

    render(){
        return(
            <div>
                {   
                    (this.state.auth && this.state.date) ? (
                        <div>
                            <Row gutter={16} justify="space-around">
                                <TimeSlots 
                                    bank={this.state.bank}
                                    date={this.state.date}
                                    mobile={this.state.mobile}
                                    reqId={this.state.reqId}
                                    slots={this.state.slots}
                                    selectSlot={this.selectSlot}
                                    selectedSlot={this.state.selectedSlot}
                                    alloted={this.state.alloted}
                                />
                            </Row>
                            {this.state.selectedSlot !== -1 && (this.state.selectedSlot || this.state.selectedSlot === 0 ) && (
                                <Row gutter={16} justify="center">
                                <Col offset={1}> 
                                    <Summary
                                        bank={this.state.bank}
                                        selectedSlot={this.state.selectedSlot}
                                        date={this.state.date}
                                        mobile={this.state.mobile}
                                        slots={this.state.slots}
                                        reqId={this.state.reqId}
                                        alloted={this.state.alloted}
                                        error={this.state.error}
                                        _id={this.state._id}
                                    />
                                    <Divider/>
                                    {!this.state.alloted && (
                                        <Button type="danger" size="large" onClick={this.bookSlot}>
                                            Book
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                            )}
                        </div>
                    ):(
                        <Redirect to="/" />
                    )
                }
            </div>
        )
    }
}

export default SelectTimePage;