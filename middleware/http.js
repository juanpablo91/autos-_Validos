
const axios = require('axios');
//const { response } = require('express');
const https = require('https');

const { isPlate } = require('./plate'); //verificador de placas 
const { securityAlgorith } = require('./algorith.js'); //algoritmo de seguridad
const { messagePlate } =require("./messageplate.js")

const plateHttp  = async(plate="") =>{
  
  result=false

  let config ={
    method: 'get',
    url: 'https://www.simur.gov.co:443/taxis/consulta-conductores-placa',
    params: {
      text: plate
    },
    httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  };
  
  try {

    if( isPlate(plate) ) {
      // si la placa si cumple la sintaxis llamado get htpp
      const response = await axios(config)
      
      if(response.status === 200 && response.data.length != 0){
        let message_ = securityAlgorith(response.data);
        messagePlate(message_)
      }else if(response.data.length === 0){
        console.log("control http -33")
        messagePlate("plateFound");
      }else{
        messagePlate();
      }

      result = true;
    }else{
      //si la placa no cumple con la sintaxis 
      messagePlate("plateSintax")
      result = true;
    }
  } catch (error) {
    console.log(error)
    messagePlate();
  }

  return result
}

module.exports = { plateHttp}