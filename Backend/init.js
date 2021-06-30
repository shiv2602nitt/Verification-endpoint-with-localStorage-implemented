const constants = require("./constants");
const db = require("./db");
//Console
const readline = require("readline");
const { Db } = require("mongodb");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createDateArray = function(){
    let dates = [];
    for(let i = 0; i < 14; i++){
        let date = new Date().setUTCHours(0,0,0,0)
        date = new Date(date);
        date = date.setDate(date.getDate() + i)
        date = new Date(date)
        dates.push(date);
    }
    return dates;
}

module.exports = {
    initDB : function(client){
        rl.question(constants.init.ADD_NEW_BANK, answer=>{
            if(answer === 'y'){
                let bank = {}    
                rl.question(constants.init.BANK_NAME, name=>{
                    bank.name = name;
                    rl.question(constants.init.BANK_LAT, lat=>{
                        bank.lat = lat;
                        rl.question(constants.init.BANK_LNG, lng=>{
                            bank.lng = lng;
                            rl.question(constants.init.BANK_CAP, cap=>{
                                bank.cap = cap;
                                bank.avbl = createDateArray();
                                db.addBank(bank,client)
                            })
                        })
                    })
                })
            }else{
              console.log(constants.init.DEFAULT_LIST);
            }
        })
    }
}