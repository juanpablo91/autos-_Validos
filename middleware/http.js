
const axios = require('axios');
const https = require('https');

let url ='https://www.simur.gov.co:443/taxis/consulta-conductores-placa';

function httpPlate(plate=""){
  axios.get(url,{
  params: {
    text: plate
  },
  Headers:{'Accept': 'application/json, text/javascript, */*; q=0.01'},
  httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
})
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);
    console.log(JSON.stringify(res.data, undefined, 1))
  
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });
}

module.exports = { httpPlate }
  //openssl s_client -connect simur.gov.co:443 -servername simur.gov.co | tee logcertfile
  //openssl x509 -in logcertfile -noout -text | grep -i "issuer"
  //curl --output intermediate.crt http://cacerts.digicert.com/DigiCertSHA2SecureServerCA.crt))