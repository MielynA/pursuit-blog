//--- NPM PACKAGES MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//--- PATH ROUTER MODULES
const {userService} = require('./backend/routes/publicRoutes/user_public');
const{privateUserService} = require('./backend/routes/privateRoutes/user_private')
const {postService} = require('./backend/routes/privateRoutes/post');
const {commentService} = require('./backend/routes/publicRoutes/comment_public')
//const {commentService} = require('./backend/routes/comment');


//--- MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());


app.use('/users', userService);
app.use('/users', privateUserService)
app.use('/comments', commentService)
//app.use('/comments', commentService);
app.use('/posts', postService);




//--- RUNNING ENVI SERVER PORT
app.listen(process.env.PORT || 3006)
console.log('Port 3006 is listenning..')