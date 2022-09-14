console.log("hola")
const https = require('https');

let plate ='TUP727'

let options ={
    host: 'www.simur.gov.co',
    path:  '/taxis/consulta-conductores-placa?text=TUP727',
    method:'GET',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36' }
}

let request = https.request(options, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    let json = JSON.parse(data);
    console.log(data)
  });
});

request.on("error", (err)  => {
    console.log("hola error")
    console.log("Error: " + err.message);
})

request.end()