

const fs = require("fs").promises
  // Este modulo es el creador de mensajes por placa 

  function messagePlate( messagetype=null,defaultMs="") {

    messagePlateSintax=[
      "Lo siento la placa no es correcta por favor verifique:",
      "\n-No tenga Signos especiales (#, $, &, /)",
      "\n-La placa tiene 6 caracteres alfanuméricos en total (3 letras y 3 números)",
      "\n-No contenga puntos ni comas",
      "\nPlaca correcta: TUP727 "
    ];

    messagePlateFound=[
      "La Placa es correcta, pero no se encuentra en el sistema SIMUR",
      "de Bogotá, VERIFIQUE:", 
      "1- La placa es de Colombia y de la ciudad de Bogotá", 
      "2- placa es de servicio público y", 
      "es de taxi específicamente", 
      "SI ya hizo la verificación de estas condiciones y ",
      "no hay resultado, puede ser:",
      "Riesgo: Alto",
      "El vehículo puede tener placas falsas, adulteración de estas, sustitución",
      "por otro vehículo no registrado en Bogotá y adscrito a SIMUR" 
    ];
    messageDefaulterr=[
      "Lo sentimos, hubo un error interno, estamos trabajando para arreglarlo...",
      "Para hacer la verificación manual ingrese a https://www.simur.gov.co/conductores-de-taxi "
    ]

    switch (messagetype) {
      case "":
        message= defaultMs;
        break;
      case "plateSintax":
        message= messagePlateSintax;
        break;
      case "plateFound":
        message= messagePlateFound;
        break;
      default:
        message= messageDefaulterr;
        break;
    }

    console.group("\n---Message final---")
    console.log(message)
    console.groupEnd()

    messagePlateCreation(message)
    .then(res => console.log( "hh"+res))
    
  }
  

  async function messagePlateCreation(message){
  let fn = "flow/response.json";

  fs.readFile(fn, 'utf8') 
        .then(data => { 
                let json = JSON.parse(data);
                json.DEFAULT.replyMessage = message
                
                fs.writeFile(fn, JSON.stringify(json))
                        .then(  () => { console.log('Update Success')
                        console.log(json.DEFAULT.replyMessage)

                      })
                        .catch(err => { console.log("Update Failed: " + err);});
            })
        .catch(err => { console.log("Read Error: " +err);});

        return "message Create success"
  
}



module.exports = { messagePlate}  
