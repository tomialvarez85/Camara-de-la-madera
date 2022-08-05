const dataService = require("../services/dataService")
var pdf = require('html-pdf');

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
    
    //hacer calculos
    function calculateVehicleCO2(vehicle, distance){
        const weeksPerYear = 52
        if(vehicle == "bus"){
            const busEmission = 0.0284
            var result = (busEmission * distance ) * weeksPerYear
            return Math.trunc(result)
        }
        else if(vehicle == "naphthacar"){
            const naphthacarEmission = 0.143
            var result = (naphthacarEmission * distance ) * weeksPerYear
            return Math.trunc(result)
        }
        else if(vehicle == "dieselcar"){
            const dieselcarEmission = 0.132
            var result = (dieselcarEmission * distance ) * weeksPerYear
            return Math.trunc(result)
        }
        else if(vehicle == "electriccar"){
            const electriccarEmission = 0
            var result = (electriccarEmission * distance ) * weeksPerYear
            return Math.trunc(result)
        }
        else if(vehicle == "motorbike"){
            const motorbikeEmission = 0.167
            var result = (motorbikeEmission * distance ) * weeksPerYear
            return Math.trunc(result)
        }else if(vehicle == "bike"){
            const bikeEmission = 0
            var result = (bikeEmission * distance ) * weeksPerYear
            return Math.trunc(result)
        }
        else{
            res.status(406).send({ status : "ERROR", info : "The info sent doesnt match any possible vehicle option", vehicle : newData.vehicle});
        }
        
    };

    var vehicleEmission = calculateVehicleCO2(newData.vehicle, newData.distance)
    console.log(vehicleEmission)

    var domesticAppliancesEmission = calculateDomesticAppliancesCO2(newData.domesticAppliances)
    console.log(domesticAppliancesEmission)
    
    function calculateDomesticAppliancesCO2(value){
        const daysPerYear = 365
        const fridgeEmission = 0.9
        const washingmachineEmission = 4.6
        const dishwasherEmission = 4
        const clothesdryerEmission = 7.4
        const tvEmission = 1.2
        const computerEmission = 1.9
        const stereoEmission = 1.1
        
        var total = 0
        var fridgeAmount = value[0].amount
        var washingmachineAmount = value[1].amount
        var dishwasherAmount = value[2].amount
        var clothesdryerAmount = value[3].amount
        var tvAmount = value[4].amount
        var computerAmount = value[5].amount
        var stereoAmount = value[6].amount
        
        var fridgeTotal = (fridgeEmission * daysPerYear ) * fridgeAmount
        var washingmachineTotal = (washingmachineEmission * daysPerYear ) * washingmachineAmount
        var dishwashertotal = (dishwasherEmission * daysPerYear ) * dishwasherAmount
        var clothesdryertotal = (clothesdryerEmission * daysPerYear ) * clothesdryerAmount
        var tvtotal = (tvEmission * daysPerYear) * tvAmount
        var computertotal = (computerEmission * daysPerYear ) * computerAmount
        var stereototal = (stereoEmission * daysPerYear) * stereoAmount
        total = (
            fridgeTotal + 
            washingmachineTotal +
            dishwashertotal + 
            clothesdryertotal +
            tvtotal +
            computertotal + 
            stereototal
        )
        return Math.trunc(total)
    };



    function calculateNutrition(value){

    };

    function calculatePlantesTrees(value){
        
    };

    //Generar pdf
    var contenido = `<p>aca va la dataaaaaaa</p> ${newData.vehicle}`;
    pdf.create(contenido).toFile('./salida.pdf', function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });

    res.status(201).send({ status : "OK", info : "devolver url del objeto en el s3", data : newData});
};





//subir a amazon y devolver url del objeto

module.exports = {
    createData,
};

