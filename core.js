var express = require('express');
var app = express();
var path = require("path");

app.set('port', (process.env.PORT || 5000));            //set port
app.use(express.static(__dirname));			//serve resources

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname+'/index2.html'));
  //__dirname : It will resolve to your project folder.
});
app.listen(app.get('port'), function() {
   console.log('Node app is running on port', app.get('port'));
});
