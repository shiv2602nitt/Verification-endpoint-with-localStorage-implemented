import React from "react";
import {Select} from "antd";
const { Option } = Select;


const BankSelector = function(props){
    return(
        <Select style={{width:"80%"}} placeholder="Select Bank" onChange={(value)=>{props.handleBankChange(value)}}>
            
            {props.banks.map((bank,index) => {
                //console.log(bank);
                return(
                    <Option value={index} key={bank._id}>
                        {bank.name}
                    </Option>
                );
            })}
        </Select>
    );
}

export default BankSelector;