const express = require('express')
const app = express();
var http = require('http');
var bodyParser = require('body-parser');
const port = 3000;
router = require("./router/router")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use('/api', router);
// app.post('/adduser',(req,res)=>{
//     console.log(req.body)
// })
var httpsServer = http.createServer(app);
httpsServer.listen(port);
console.log('RESTful API server started on: ' + port);
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`)
// });