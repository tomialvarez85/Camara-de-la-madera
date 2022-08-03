const dataService = require("../services/dataService")

const createData = (req, res) =>{
    const {body} = req;
    
    if (!body.transporte ||
        !body.distancia || 
        !body.electrodomesticos ||
        !body.alimentos || 
        !body.plantados)
        {
            res.send("ningun campo puede quedar vacio!");
        }
    for(var i = 0; i <= 6; i++){
        if (!body.electrodomesticos[i].nombre || !body.electrodomesticos[i].cantidad){
            res.send("falta datos en el electrodomestico numero: " + i + " !")
        }
    }

    newData = {
        transporte : body.transporte,
        distancia : body.distancia,
        electrodomesticos : body.electrodomesticos,
        alimentos : body.alimentos,
        plantados : body.plantados
    };
    console.log(newData)
    res.status(201).send({ status : "OK", info : "Generating PDF", data : newData});
};

//Generar pdf



//subir a amazon y devolver url del objeto


module.exports = {
    createData,
};

