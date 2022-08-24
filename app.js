const express = require('express');
const v1DataRouter = require ('./src/v1/routes/dataRoutes.js');
const path = require('path');
const cors = require('cors');
const https = require('https')
const fs = require('fs')

const key = fs.readFileSync('private.key')
const cert = fs.readFileSync('certificate.crt')

const cred = {
    key,
    cert

}

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/v1/", v1DataRouter);

app.get('/' ,(req, res) =>{ 
    res.send('<h1>hola</h1>')
});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT} `)

});


const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443)
