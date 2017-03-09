# parse-server-sendgrid-adapter
Simple sendgrid adapter for parse server

## Configuration

```
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();
var SimpleSendGridAdapter = require('parse-server-sendgrid-adapter');

// Specify the connection string for your mongodb database
// and the location to your Parse cloud code
var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev',
  cloud: '/home/myApp/cloud/main.js', // Provide an absolute path
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
  appName: 'myAppName',
  publicServerURL: 'http://localhost:1337/parse',
  emailAdapter: SimpleSendGridAdapter({
    apiKey: 'sendgridApiKey',
    fromAddress: 'fromEmailAddress',
    fromName: 'Sender-Name'
  })
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.listen(1337, function() {
  console.log('parse-server-example running on port 1337.');
});

```
