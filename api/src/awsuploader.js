var AWS = require("aws-sdk");
var uuid = require('uuid');
var fs = require('fs');


//pdf read  and convert format
//const fileContent = fs.readFileSync('./ejemplo2.pdf');
var bucketName = 'nuevitocecf4c04-af40-4f35-b878-4cdae495101a';

async function uploadPdfToS3(pdfid){
    var fileContent = fs.readFileSync(`./pdf/${pdfid}.pdf`);
    
    var objectParams = {
      Bucket: bucketName, 
      Key: pdfid, 
      Body: fileContent,
      ContentType : 'application/pdf',
    };

    

    // Create object upload promise
    var uploadPromise = await bucket.upload(objectParams).promise();
    return uploadPromise;
}

module.exports = {uploadPdfToS3};
