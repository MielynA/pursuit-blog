const app = require('express').Router();
const commentService = require('../services/comment');


app.post('/', (req,res)=>{
    const {author,post_id,title,body} =req.body;
    commentService.createComments(author,post_id,title,body).then((comment)=>{
        res.json({commentadd: comment})
    })
    .catch(err=>{
        res.status(404).json({erro: err.toString()})
    })
})




module.exports = {commentService: app,} 