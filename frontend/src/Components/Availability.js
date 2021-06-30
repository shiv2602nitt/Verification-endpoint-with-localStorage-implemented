import React from "react";
import {Calendar,Card,Alert} from "antd";

const Availability = function(props){
    
    return(    
        <Card title="Availability: 14 Days *Including Weekends">
            {props.avbl ? (
                <div>
                    <Alert
                        message={`You selected date: ${props.selectedDate && new Date(props.selectedDate).toDateString()}`}
                    />
                    <Calendar fullscreen={false} 
                        disabledDate={
                            date=>filterDate(date,props.avbl)
                        }
                        onSelect={props.onDateSelect}
                        headerRender={()=>null}
                    />
                </div>
            ):(
                <p>Select a bank to list dates!</p>
            )}
        </Card>
        
    );
}

const filterDate = function(date,avblDates){
    const currDate = date._d;
    const day = date.day();
    const diff = +currDate-Date.now();
    //console.log(day)
    if(day === 0 || day === 6)return true;
    if(diff < -86400000)return true;
    if(diff > 14*1000*60*60*24)return true;     //14 days advance 
    const found = avblDates.find((dateElem)=>{
        const avblDate = new Date(dateElem);
        return currDate.getDate() === avblDate.getDate()
    })

    return !found;
}


export default Availability;
