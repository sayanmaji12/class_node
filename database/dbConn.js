

var mysql      = require('mysql');
var mongojs = require('mongojs');
var db = mongojs('classDB');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'class'
});
module.exports.getMongoId = () => {
  var mongoObj= new mongojs.ObjectID()
  var mongoId=mongoObj.toHexString();
  return mongoId
}
var collections = {
  inventory: db.inventory,
}
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

module.exports.collections = collections;
module.exports.connection = connection;
module.exports.db = db;
module.exports.mongojs = mongojs;
