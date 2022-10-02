const { httpPlate, getPlate } = require("./http")


function isPlate(plate=""){

    let isplate = false
    let alphaplate= ""
    let numberplate = ""
    let letters = /^[A-Za-z]+$/;

    if(plate.length === 6){

        alphaplate = plate.substring(0,3)
        numberplate = plate.substring(3)
        numberplate = numberplate.split("")

        function onlyNumbers(array) {
            return array.every(element => {
              return Number.isInteger(Number(element));
            });
          }

        if( alphaplate.match(letters) && onlyNumbers(numberplate) ){
            numberplate = numberplate.map(str => {
                return Number(str);
              });
            isplate = true
            console.log("is :", plate," a Plate valid?:",isplate)
            console.log("Letters:", alphaplate.split(""))
            console.log("Number:", numberplate)
        }else{}
    }

    return isplate;
}


module.exports = { isPlate}
