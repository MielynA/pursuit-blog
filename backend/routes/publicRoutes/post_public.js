const app = require('express').Router();
const postService = require('../../services/post_services')


//--- READ POSTS (public)
app.get('/:post_id', (req,res)=>{
    const {post_id} = req.params; 
   
        if(!post_id){
            res.json({message: `user ${post_id} does not exist`})
        }
        userService.readUser(post_id).then((postId)=>{
            res.json({postId})
        })
        .catch(err=>{
            res.json({error: err.toString()})
        })
})

//--- GET COMMENTS FROM POST_ID (public)
app.get('/:post_id/comments', (req,res)=>{
    const {post_id} = req.params;
    postService.commentsPost(post_id).then((commentPost)=>{
        res.json({commentPost})
    }) 
    .catch(err=>{
        res.status(404).json({error: err.toString()})
    })
});   

//--- GET COMMENTS FROM A SPECIFIC POST_ID
app.get('/:post_id/comments/:comment_id', (req,res)=>{
    const {post_id, comment_id} = req.params; 
  postService.commentPost(post_id,comment_id).then((commentPost)=>{
      res.json({commentPost})
  })
  .catch(err=>{
      res.status(404).json({error: err.toString()})
  })
})

module.exports = {
    postService: app,
}