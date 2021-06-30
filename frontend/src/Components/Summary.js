import React from "react";
import {Descriptions,Alert} from "antd";
import {EnvironmentTwoTone} from "@ant-design/icons";
import {Link} from "react-router-dom";

const Summary = function(props){
    const formDate = `${props.date.getDate()} / ${props.date.getMonth()+1} /${props.date.getFullYear()}`;
    let slotBooked = props.slots[props.selectedSlot];
    return(
        <Descriptions title="Summary" bordered>
            <Descriptions.Item label="Bank">{props.bank.name}</Descriptions.Item>
            <Descriptions.Item label="Mobile">{props.mobile}</Descriptions.Item>
            <Descriptions.Item label="Date">{formDate}</Descriptions.Item>
            <Descriptions.Item label="Time-Slot">{`${slotBooked.start}-${slotBooked.end}`}</Descriptions.Item>
            <Descriptions.Item label="Location">
                <a href={`http://maps.google.com/?q=${props.bank.lat},${props.bank.lng}`} target="_blank" rel="noreferrer">
                    <EnvironmentTwoTone/>
                </a>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
                {props.error && !props.alloted  && <Alert message="You already have a scheduled booking" type="error" />}
                {props.alloted && !props.error && (<div>
                    <Alert message="Booked successfully. Your verification link is: " type="success" />
                    <Link to={{
                        pathname:`/verify`,
                        state:{
                            reqId:props.reqId,
                            collName:props.bank.lat.concat(props.bank.lng),
                            slotIndex:props.selectedSlot,
                            _id:props._id
                        }
                    }}>Click here </Link>
                    </div>
                )}
            </Descriptions.Item>
        </Descriptions>
    );
}

export default Summary;