const dataService = require("../services/dataService")

const createData = (req, res) =>{
    const {body} = req;
    
    if (!body.transporte ||
        !body.distancia || 
        !body.electrodomesticos || 
        !body.alimentos || 
        !body.plantados)
        {
            res.send("send all the fields !");
        }
    const newData = {
        transporte: body.transporte,
        distancia : body.distancia,
        electrodomesticos : body.electrodomesticos,
        alimentos : body.aliementos,
        plantados : body.plantados
    };
    
    //const createdData = dataService.createData(newData);
    console.log(body)
    res.status(201).send({ status : "OK", data : body});
};

module.exports = {
    createData,
};

