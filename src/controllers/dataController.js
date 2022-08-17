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
            res.send("send the data for all fields !");
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
    res.send({ objectURL: amazonResponse.Location});
    

    //delete pdf from server (is already allowed in the s3 bucket)
    try {
        fs.unlinkSync(pdfPath)
            console.log("file deleted from API server")
      } catch(err) {
        console.error("error deleting file from API server: " + err)
      }
    };


module.exports = {
    createData,
};

