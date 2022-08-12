const express = require('express');
const v1DataRouter = require ('./v1/routes/dataRoutes.js');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1/", v1DataRouter);

app.use(express.static('C:/Users/Usuario/Desktop/Camara-de-la-madera/front'));


app.get("/", (req, res) => {
    res.sendFile(path.resolve("C:/Users/Usuario/Desktop/Camara-de-la-madera/front/index.html"));
    console.log(res)
});



app.listen(PORT, () => {
    console.log(`server running on port ${PORT} `)

});