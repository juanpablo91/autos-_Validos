

const fs = require("fs").promises
  // Este modulo es el creador de mensajes por placa 

  async function messagePlate( messagetype=null,defaultMs="") {
    //this function build de message deppending to which messatype its receives

    messagePlateSintax=[
      "Lo siento la placa no es correcta por favor verifique:",
      "\n-No tenga Signos especiales (#, $, &, /)",
      "\n-La placa tiene 6 caracteres alfanuméricos en total (3 letras y 3 números)",
      "\n-No contenga puntos ni comas",
      "\nPlaca correcta: TUP727 "
    ];

    messagePlateFound=[
      "La Placa es correcta, pero no se encuentra en el sistema SIMUR ",
      "\nde Bogotá, VERIFIQUE:\n", 
      "\n1- La placa es de Colombia y de la ciudad de Bogotá\n", 
      "\n2- La placa es de servicio público y", 
      "\nes de taxi específicamente\n", 
      "\nSI ya hizo la verificación de estas condiciones y no hay resultado",
      "\npuede ser:",
      "\n*El vehículo puede tener placas ",
      "\nfalsificadas,adulteradas,",
      "\nsustiudas, o no esta registrado en Bogota\n",
      "\nRiesgo: Alto"
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
        console.log("39 control")
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

    return message

    /*
    let res = await messagePlateCreation(message)
    .then((res)=> {
      console.log( "message:"+res)
      return res;
    })
    .catch( err => console.log( err ))

    if( res ){
      return message
    }
    */

  }
  
/*

this function (read an write ) the message build previsuly by messagePlate(),in response.json
now is desactived, because the file save a instance past of response.json
and can not update when the response.json changes its value

  async function messagePlateCreation(message){
   let fn = "flow/response.json";

  let res = await fs.readFile(fn, 'utf8') 
        .then(data => { 
                let json = JSON.parse(data);
                json.DEFAULT.replyMessage = message

                let res = await = fs.writeFile(fn, JSON.stringify(json))
                    .then(  () => { 
                     console.log('Update Success')
                     console.log(json.DEFAULT.replyMessage)
                     return true
                     
                  })
                  .catch(err => { console.log("Update Failed: " + err);});
                  return res
            })
        .catch(err => { console.log("Read Error: " +err);})

        return res
}
*/
module.exports = { messagePlate}  
