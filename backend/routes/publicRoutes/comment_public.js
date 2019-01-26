const app = require('express').Router();
const commentService = require('../../services/comment_services');

//--- CREATE COMMENTS
app.post('/', (req,res)=>{
    const {author,post_id,title,body} =req.body;
    commentService.createComments(author,post_id,title,body).then((comment)=>{
        res.json({commentadd: comment})
    })
    .catch(err=>{
        res.status(404).json({error: err.toString()})
    })
});
//--- READ COMMENTS (public)
app.get('/:comment_id', (req,res)=>{
    const {comment_id} = req.params; 
    if(!comment_id){
        res.json({message: `user ${comment_id} does not exist`})
    }
    userService.readUser(comment_id).then((commentId)=>{
        res.json({commentId})
    })
    .catch(err=>{
        res.json({error: err.toString()})
    })
});

module.exports = {
    commentService: app,
} 