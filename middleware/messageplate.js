  //creador de mensajes automatico

const fs = require("fs").promises

  function messagePlate( messagetype="",defaultMs="") {

    if(messagetype===""){
      message= defaultMs
    }else if(messagetype==="plateError"){
      message=[
        "La Placa ingresada no corresponde con una placa valida verifique ",
        defaultMs
      ]
    }

    console.group("\n---Message final---")
    console.log(message)
    console.groupEnd()

    messagePlateCreation(message)
    
  }
  

  function messagePlateCreation(message){
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

  
}



module.exports = { messagePlate}  
