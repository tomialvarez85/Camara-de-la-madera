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



function calculateNutritionCO2(value){
    daysPerYear = 365
    if (value == "animal"){
        const animalEmission = 4.55
        var result = (animalEmission * daysPerYear )
        return Math.trunc(result)
    }
    else if( value == "vegetal"){
        const vegetalEmission = 4.32
        var result = (vegetalEmission * daysPerYear )
        return Math.trunc(result)
    }
    else if( value == "ultraprocessed"){
        const ultraprocessedEmission = 4.78
        var result = (ultraprocessedEmission * daysPerYear )
        return Math.trunc(result)

    }
    else if( value == "proximity"){
        const proximityEmission = 2.6
        var result = (proximityEmission * daysPerYear )
        return Math.trunc(result)

    }
    else if( value == "imported"){
        const importedEmission = 5.2
        var result = (importedEmission * daysPerYear )
        return Math.trunc(result)
    }
    else{
        res.status(406).send({ status : "ERROR", info : "The info sent doesnt match any possible nutrition option", nutrition : newData.nutrition});

    }
};

module.exports = {calculateVehicleCO2, calculateDomesticAppliancesCO2, calculateNutritionCO2};