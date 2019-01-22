const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {userService} = require('./backend/routes/user');

//--- MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());

//--- PATH
app.use('/users', userService);







app.listen(process.env.PORT || 3006)
console.log('Port 3006 is listenning..')