import React from "react";
import {Row,Col,Card, Divider,Descriptions,Tag,Checkbox} from "antd";

const TimeSlots = function(props){
    let date = new Date(props.date);
    const formDate = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+ date.getDate(); 
    return(
        <div>
            {props.slots && !props.alloted && (   
                <Row justify="center" gutter={16}>
                    <Card title={`Bank : ${props.bank.name}`} extra={`Date: ${formDate} | Mobile: ${props.mobile}`} >
                        <Row justify="center" gutter={16}>
                        {props.slots.map((slot,index)=>{
                            const ratio = parseFloat(slot.alloted)/parseFloat(props.bank.cap)
                            let slotProp = {};
                            const checked = props.selectedSlot === index;
                            if(ratio < 0.5)slotProp = {color:"green",text:"Available"};
                            else if(ratio >= 0.5 && ratio < 0.7)slotProp = {color:"orange",text:"Crowding"};
                            else if(ratio >= 0.7 && ratio < 1 )slotProp = {color:"red",text:"Almost full"}
                            else slotProp = {color:"volcano",text:"Crowded"}

                            return(
                                <Col>
                                    <Card hoverable={ratio === 1?false:true}>
                                        <Descriptions.Item>
                                            {` Time: ${slot.start} - ${slot.end}` }
                                            <br/>
                                            <br/>
                                            <Tag color={slotProp.color}>{slotProp.text}</Tag>
                                            <br/>
                                            <br/>
                                            {ratio !== 1 && <Checkbox checked={checked} onChange={()=>props.selectSlot(index)}/>}
                                        </Descriptions.Item>
                                    </Card>   
                                </Col>
                            )
                        })}
                        </Row>
                    </Card>
                    <Divider/>
                </Row>
            )}
        </div>
    )
}

export default TimeSlots;



