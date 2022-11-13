const dayjs = require("dayjs")
const { messagePlate } = require("./messageplate.js")

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

    console.group("---driverDate---")
    let p3 = checkparams(taxiDriver,data2,false)
    console.groupEnd()

    console.group("---TaxiDate---")
    let p1 = checkparams(taxiData,data[0],false)
    console.groupEnd()

    console.group("---Dates---")
    let p2= checkparams(taxiDates,data[0],false)
    let p4 = checkdates(taxiDates,data[0],false)
    console.groupEnd()

    if(p1 || p2 ){
        riesgo ="ALTO"
    }else if( p3 ){
        riesgo = "MEDIO"
    }

//mensaje predeterminado SI se encuetra la placa
    message =[
      "Nivel de Riesgo: "+riesgo,
      'Nombres: '+checkdata("nombres",data2),
      'Apellidos: '+checkdata("apellidos",data2),
      'Numero de Identificacion: '+checkdata("numeroIdentificacion",data2),
      "SOAT: "+checkdates("fechaVencimientoSoat",data[0],true),
      'Tarjeta de Control: '+checkdates("fechaVencimientoTO",data[0],true),
      "Empresa: "+checkdata("nombreEmpresa",data[0]),
    ]

    messagePlate("",message)

    console.log("Riesgo:"+riesgo)
  
  }


//verificador de existencia de parametros
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

//verificador de existencia de datos a partir de los parametros
  function checkdata(key,totalData) {
    let data =""
    if(totalData[key] === null ||totalData[key] === 0 || totalData[key]=== undefined){
        data = "Sin datos"
   }
    return data = totalData[key]
  }

 //verificador de logico de fechas
  function checkdates(keys,totalData2, mode=false) {
    valide =""
    var dateCurrent = dayjs()

    let date =""

    if(mode){

      d = new Date( totalData2[keys] )
      date = dayjs(d)

      if( date > dateCurrent ){
        valide = "Vigente"
      }else{ valide ="No Vigente" }
  
      return valide

    }else{
      for(i=0;i< keys.length;i++){
        date =new Date(totalData2[keys[i]])

        console.log(keys[i]+": "+ date)
      }
      
    }


  }



  
  module.exports = { securityAlgorith }  