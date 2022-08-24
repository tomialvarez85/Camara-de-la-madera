//var pdf = require('html-pdf');
var uuid = require('uuid');
const co2calculator = require ('../co2calculator.js');
const awsuploader = require('../awsuploader')
const fs = require('fs')
const Promise = require('bluebird');
const pdf = Promise.promisifyAll(require('html-pdf'));
var ejs = require('ejs');
const path = require('path');
const { response } = require('express');

const createData = async (req, res) =>{ 
    const { body } = req;
    if (!body.vehicle ||
        !body.distance || 
        !body.domesticAppliances ||
        !body.nutrition || 
        !body.plantedTrees)

        {
            return res.status(406).send("Some fields are missing or empty");
        }
    

    newData = {
        vehicle : body.vehicle,
        distance : body.distance,
        domesticAppliances : body.domesticAppliances,
        nutrition : body.nutrition,
        plantedTrees : body.plantedTrees
    };

    var vehicleEmission = co2calculator.calculateVehicleCO2(newData.vehicle, newData.distance)

    if (vehicleEmission == 'error') {
        return res.status(406).send('This car option is not valid')
    };

    var domesticAppliancesEmission = co2calculator.calculateDomesticAppliancesCO2(newData.domesticAppliances)

    if (domesticAppliancesEmission == 'error'){
        return res.status(406).send('The amount of each domesticAppliances must be a number')
    }

    var nutritionEmission = co2calculator.calculateNutritionCO2(newData.nutrition)

    if (nutritionEmission == 'error'){
        return res.status(406).send('The nutrition type sent is not valid')
    }

    if (isNaN(newData.plantedTrees)){
        return res.status(406).send('The amount of planted trees must be a number')
    }

    var emissionContrarested = newData.plantedTrees * 40
    var totalEmission = (vehicleEmission + domesticAppliancesEmission + nutritionEmission ) - emissionContrarested

    var treesShouldPlant = Math.trunc(totalEmission / 40)

    console.log("total User emission: " + totalEmission + " CO2 kg");
    console.log("User should Plant : " + treesShouldPlant + " trees");

    var compiled = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../../public/pdfTemplate.html'),'utf8'));
    var html = compiled({ emission : totalEmission, treesShouldPlant : treesShouldPlant})
    var pdfid = uuid.v4()
    pdfPath = (`./pdf/${pdfid}.pdf`)
    async function pdfGenerator(){
        var res = await pdf.createAsync(html,{filename: pdfPath}); //height : '7.64in', width : '5.21in',
        console.log("pdf generated at " + res.filename);
    }

    
    await pdfGenerator();
    var amazonResponse = await awsuploader.uploadPdfToS3(pdfid)
    console.log(amazonResponse)
    
    //delete pdf from server (is already allowed in the s3 bucket)
    

    
    try {
        fs.unlinkSync(pdfPath)
            console.log("pdf deleted from API server")
            res.send({ objectURL: amazonResponse.Location});
      } catch(err) {
            console.error("error deleting file from API server: " + err)
            res.send({ objectURL: amazonResponse.Location});
      }
};
    

module.exports = {
    createData,
};

