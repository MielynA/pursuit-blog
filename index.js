//--- NPM PACKAGES MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//--- PATH ROUTER MODULES
const {userService} = require('./backend/routes/publicRoutes/user_public');
const {privateUserService} = require('./backend/routes/privateRoutes/user_private');
const {postService} = require('./backend/routes/publicRoutes/post_public');
const {privatePostService} = require('./backend/routes/privateRoutes/post_private');
const {commentService} = require('./backend/routes/publicRoutes/comment_public');
const {privateCommentService} = require('./backend/routes/privateRoutes/comment_private');


//--- MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());


app.use('/users', userService);
app.use('/users', privateUserService)
app.use('/posts', postService);
app.use('/posts', privatePostService)
app.use('/comments', commentService)
app.use('/comments', privateCommentService);





//--- RUNNING ENVI SERVER PORT
app.listen(process.env.PORT || 3006)
console.log('Port 3006 is listening..')