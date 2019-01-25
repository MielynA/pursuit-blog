//--- NPM PACKAGES MODULES
const express = require('express');
const app = express();
//--- PATH ROUTER MODULES
const bodyParser = require('body-parser');
const {userService} = require('./backend/routes/user');
const {postService} = require('./backend/routes/post');
const {commentService} = require('./backend/routes/comment');


//--- MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());
app.use('/users', userService);
app.use('/usersAll', userService);
app.use('/posts', postService);
app.use('/comments', commentService);





//--- RUNNING ENVI SERVER PORT
app.listen(process.env.PORT || 3006)
console.log('Port 3006 is listenning..')