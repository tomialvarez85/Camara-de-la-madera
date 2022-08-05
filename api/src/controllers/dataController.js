var pdf = require('html-pdf');
var uuid = require('uuid');
const co2calculator = require ('../co2calculator.js');
const awsuploader = require('../awsuploader')

const createData = (req, res) =>{
    const { body } = req;
    if (!body.vehicle ||
        !body.distance || 
        !body.domesticAppliances ||
        !body.nutrition || 
        !body.plantedTrees)
        {
            res.send("ningun campo puede quedar vacio!");
        }
    for(var i = 0; i <= 6; i++){
        if (!body.domesticAppliances[i].name || !body.domesticAppliances[i].amount){
            res.send("falta datos en el electrodomestico numero: " + i + " !")
        }
    }

    newData = {
        vehicle : body.vehicle,
        distance : body.distance,
        domesticAppliances : body.domesticAppliances,
        nutrition : body.nutrition,
        plantedTrees : body.plantedTrees
    };
    
    var vehicleEmission = co2calculator.calculateVehicleCO2(newData.vehicle, newData.distance)

    var domesticAppliancesEmission = co2calculator.calculateDomesticAppliancesCO2(newData.domesticAppliances)

    var nutritionEmission = co2calculator.calculateNutritionCO2(newData.nutrition)

    var emissionContrarested = newData.plantedTrees * 40
    var totalEmission = (vehicleEmission + domesticAppliancesEmission + nutritionEmission ) - emissionContrarested

    var treesShouldPlant = Math.trunc(totalEmission / 40)
    console.log(treesShouldPlant)

    
    var contenido = `<p>tenes q pantar</p> ${treesShouldPlant}`;
    pdf.create(contenido).toFile(`./pdf/${uuid.v4()}.pdf`, function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });

    //consumir el uploader y subir 
    
    res.status(201).send({ status : "OK", info : "devolver url del objeto en el s3", data : newData});
};


module.exports = {
    createData,
};

