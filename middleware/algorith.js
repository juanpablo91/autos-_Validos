function securityAlgorith(data=""){

    var riesgo="BAJO";
    data2 = data[0].conductorDTO.persona
 
    let taxiData=[
      'numeroTarjetaControl',
      'placa',                             
      'nroSOAT',
      'nroTarjetaOperacion',   
      'eps',                 
      'nombreEmpresa',       
      'nitEmpresa',   
      'arl',
    ]
  
    let taxiDates = [
      'fechaExpedicion',  
      'fechaValidez',
      'fechaVigencia',      
      'fechaVencimientoSoat',
      'fechaVencimientoTO',
    ]
  
    let taxiDriver =[
      'nombres',
      'apellidos',
      'numeroIdentificacion',

    ]

    let p3 = checkparams(taxiDriver,data2,false)
    let p1 = checkparams(taxiData,data[0],false)
    let p2= checkparams(taxiDates,data[0],false)
    let p4 = checkdates(taxiDates,data[0])

    if(p1 || p2 ){
        riesgo ="ALTO"
    }else if( p3 ){
        riesgo = "MEDIO"
    }

    var messagedata =[]

    messagePlate(data[0],data2,riesgo)

    console.log(riesgo)

  
  }


  function checkparams(keys,totalData,p) {
    for(i=0;i< keys.length;i++){
        if(totalData[keys[i]] === null ||totalData[keys[i]] === 0){
             p= true;
            console.log("No existe:"+keys[i])
        }
        console.log(keys[i]+": "+totalData[keys[i]])
    }
    console.log("\n")
    return p
  }

  function checkdata(key,totalData) {
    let data =""
    if(totalData[key] === null ||totalData[key] === 0 || totalData[key]=== undefined){
        data = "Sin datos"
   }
    return data = totalData[key]
  }

  function checkdates(keys,totalData2) {
    var dateCurrent = new Date()

    let date =""

    for(i=0;i< keys.length;i++){
        date =new Date(totalData2[keys[i]])

        console.log(keys[i]+": "+ date)
    }

    if

  }

  function messagePlate(totalData,totaldata2,riesgo) {


    message =[
        "Nivel de Riesgo: "+riesgo,
        'Nombres: '+checkdata("nombres",totaldata2),
        'Apellidos: '+checkdata("apellidos",totaldata2),
        'Numero de Identificacion: '+checkdata("numeroIdentificacion",totaldata2),
        "SOAT",
        "Targeta de control",
        'numeroTarjetaControl',
  
    ]

    console.log(message)

    return message
    
  }


  
  module.exports = { securityAlgorith }  