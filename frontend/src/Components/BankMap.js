import React from "react";
import {Map,GoogleApiWrapper,Marker} from "google-maps-react";
import {Card} from "antd";

const BankMap = function(props){
    const containerStyle = { 
        width: '100%',
        height: '100%'
    }
    const location = {
        lat : props.location.lat,
        lng : props.location.lng
    }
    return(   
        <Card title="Location" style={{
            width: '40vw',
            height: '73vh'
          }}>
            {(props.location.lat && props.location.lng) ? 
            (<Map 
                google={props.google}
                containerStyle={containerStyle}
                style={{height:"75%",width:"90%"}}
                initialCenter = {location}
                center={location}
                zoom = {16}
            >
                <Marker
                    position={location}
                    name={props.location.name}
                />
            </Map>):(
                <p>Select a bank to know its location!</p> 
            )}
        </Card> 
    )
}

export default GoogleApiWrapper((props) => ({
    apiKey: props.location.key,
  }
))(BankMap);