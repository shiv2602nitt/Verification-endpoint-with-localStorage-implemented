import React from "react";
import {Row,Col,Alert} from "antd";
import {Redirect} from "react-router-dom"
import * as geolib from 'geolib'
import utils from "../utils";

class VerifyPage extends React.Component{
    constructor(props){
        super(props);
        let data = {
            _id:localStorage.getItem("_id"),
            reqId:localStorage.getItem("reqId"),
        };

        this.state = {
            auth : data._id ? true:false,
            currPos : false,
            _id : data._id,
            reqId : data.reqId
        }
    }

    componentDidMount(){
        let bankLoc = JSON.parse(localStorage.getItem("bank"))

        if(bankLoc){
            if(window.navigator.geolocation){
                window.navigator.geolocation
                .getCurrentPosition((loc)=>{

                    let isAtBank = geolib.isPointWithinRadius(loc.coords,{
                        latitude:bankLoc.lat,
                        longitude:bankLoc.lng,
                        },
                        200)
                    this.setState({
                        auth:true,
                        currPos:isAtBank
                    }) 
                },
                ()=>{
                    console.log("Give Location Access")
                });
                
            }
        }else{
            this.setState({
                auth:false
            })
        }
    }

    render(){
        return(
            <div>
                {
                    this.state.auth ? (
                        <Row style={{marginTop:"12%"}}justify="space-around" gutter = {16} align="middle">
                            <Col>
                                {
                                    this.state.currPos ? (
                                        <Alert message="Reached bank" type="success"/>
                                    ):(
                                        <Alert message="Not near the selected bank area! :(" type="error"/>
                                    )
                                }
                            </Col>
                        </Row>
                    ):(
                        <Redirect to="/"/>
                    )
                }
            </div>
        )
    }
}

export default VerifyPage;