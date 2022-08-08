var AWS = require("aws-sdk");
var uuid = require('uuid');
var fs = require('fs');


//pdf read  and convert format
//const fileContent = fs.readFileSync('./ejemplo2.pdf');
var bucketName = 'nuevitocecf4c04-af40-4f35-b878-4cdae495101a';

async function uploadPdfToS3(pdfid){
    var fileContent = fs.readFileSync(`C:/Users/Usuario/Desktop/Camara-de-la-madera/api/pdf/${pdfid}.pdf`);
    
    var objectParams = {
      Bucket: bucketName, 
      Key: pdfid, 
      Body: fileContent,
      ContentType : 'application/pdf',
    };

    const bucket = new AWS.S3({
      accessKeyId: "AKIAWU34ZNCTU2EWKC4S",
      secretAccessKey: "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",
      region: "us-east-1"
    })

    // Create object upload promise
    var uploadPromise = await bucket.upload(objectParams).promise();
    return uploadPromise;
}

module.exports = {uploadPdfToS3};
