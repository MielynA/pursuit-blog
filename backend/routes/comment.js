const app = require('express').Router();
const commentService = require('../services/comment');

//--- CREATE COMMENTS
app.post('/', (req,res)=>{
    const {author,post_id,title,body} =req.body;
    commentService.createComments(author,post_id,title,body).then((comment)=>{
        res.json({commentadd: comment})
    })
    .catch(err=>{
        res.status(404).json({erro: err.toString()})
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
//--- UPDATE/EDIT COMMENTS (private)
app.put('/:comment_id',(req,res)=>{
    const {comment_id} = req.params; 
    const {author,post_id,title,body} = req.body; 
    commentService.readComments(comment_id).then((data)=>{
        commentService.updateComments(comment_id,author,post_id,title,body).then(()=>{
            res.json({message: 'udpated!', data})
        })
        .catch(err=>{
            res.status(404).json({error: err.toString()})
        })
    })
 });


module.exports = {commentService: app,} 