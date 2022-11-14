
const axios = require('axios');
const { response } = require('express');
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
      const response = await axios(config)
      if(response.status === 200 ){
        securityAlgorith(response.data)
        result = true
        return result
        
      }
    }

  } catch (error) {
    console.log(error)
  }

}

//platehttp("TUP727")

module.exports = { plateHttp}
  //openssl s_client -connect simur.gov.co:443 -servername simur.gov.co | tee logcertfile
  //openssl x509 -in logcertfile -noout -text | grep -i "issuer"
  //curl --output intermediate.crt http://cacerts.digicert.com/DigiCertSHA2SecureServerCA.crt))