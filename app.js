const express = require('express');
const v1DataRouter = require ('./src/v1/routes/dataRoutes.js');
const path = require('path')

const app = express();
const PORT = 8081;
//const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1/", v1DataRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT} `)

});