
const axios = require('axios');
//const { response } = require('express');
const https = require('https');

const { isPlate } = require('./plate'); //verificador de placas 
const { securityAlgorith } = require('./algorith.js'); //algoritmo de seguridad
const { messagePlate } =require("./messageplate.js")

const plateHttp  = async(plate="") =>{

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
        console.log("htto 29")
        let res =await messagePlate("",message_)
        return res
        
      }else if(response.data.length === 0){
        console.log("control http -33")
        let res = await messagePlate("plateFound");
        return res

      }else{
        let res = await messagePlate()
        return res
      }

    }else{
      //si la placa no cumple con la sintaxis 
      let res = await messagePlate("plateSintax")
      return res
    }

  } catch (error) {
    console.log(error)
    await messagePlate();
  }
}

module.exports = { plateHttp}