
const axios = require('axios');
const { response } = require('express');
const https = require('https');

let url ='https://www.simur.gov.co:443/taxis/consulta-conductores-placa';

var body;



async function getPlate(plate="",event,steps) {

  var config ={
    url:url,
    method:'get',
    params: {
      text: plate
    },
    Headers:{'Accept': 'application/json, text/javascript, */*; q=0.01'},
    httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  };

  
  try {
      const response= await  axios(config);
      body =response.data

      httpPlate(JSON.stringify(response.data))
    
  } catch (error) {
    console.error(error);
  }


};

function httpPlate(plate){
  
  var data = plate

  return data 
}



module.exports = { getPlate}
  //openssl s_client -connect simur.gov.co:443 -servername simur.gov.co | tee logcertfile
  //openssl x509 -in logcertfile -noout -text | grep -i "issuer"
  //curl --output intermediate.crt http://cacerts.digicert.com/DigiCertSHA2SecureServerCA.crt))