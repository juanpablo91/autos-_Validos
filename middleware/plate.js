/*funcion encargada de verificar logicamente si 
  la placa ingresada es correcta
*/
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
            console.group("----IsPlate----")
            console.log("is :"+plate+" a Plate valid?:"+isplate,
                        "\nLetters:", alphaplate.split(""),
                        "\nNumber:", numberplate)
            console.groupEnd()

        }else
        { console.log("Uno o mas caracteres de la placa no son alfanumericos")}

    }else{ console.log("Placa no contiene 6 caracteres ")}

    return isplate;
}

module.exports = { isPlate}
