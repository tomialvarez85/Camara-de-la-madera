const dataService = require("../services/dataService")

const createData = (req, res) =>{
    const { body } = req;

    const createdData = dataService.createData();
    res.send("devolver url del pdf");
};

module.exports = {
    createData,
};

