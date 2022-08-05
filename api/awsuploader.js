var AWS = require("aws-sdk");
var uuid = require('uuid');
var fs = require('fs');

//aws configs
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIAWU34ZNCTYT6M2KUT',
    secretAccessKey: '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',
  });


//pdf read  and convert format
const fileContent = fs.readFileSync('./ejemplo2.pdf');


var bucketName = 'nuevitocecf4c04-af40-4f35-b878-4cdae495101a';
var keyName = uuid.v4();
var bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName }).promise()


bucketPromise.then(
    function(data) {
      // Create params for putObject call
      var objectParams = {
        Bucket: bucketName, 
        Key: keyName, 
        Body: fileContent,
        ContentType : 'application/pdf',
        };
      // Create object upload promise
      var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).upload(objectParams).promise();
      uploadPromise.then(
        function(data) {
          console.log("Successfully uploaded data to " + bucketName + ".s3.amazonaws.com/" + keyName);
          //urlToQr = (bucketName + ".s3.amazonaws.com/" + keyName);
        });
  }).catch(
    function(err) {
      console.error(err, err.stack);
  });

