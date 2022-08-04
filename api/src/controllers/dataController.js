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
    console.log(newData)
    //hacer calculos






    
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

