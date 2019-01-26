const app = require('express').Router();
const commentService = require('../../services/comment_services');

const {checkForToken} = require('../../services/user_services')

//--- MIDDLEWARE FOR CHECKING USER TOKEN
app.use(checkForToken);


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
//--- DELETE COMMENTS (private)
app.delete('/:comment_id', (req,res)=>{
    const {comment_id} = req.params; 
    const {author,post_id,title,body} = req.body;
    commentService.readComments(comment_id).then((comments)=>{
        commentService.deleteComments(comment_id,author,post_id,title,body).then(()=>{
            res.json({message: 'successfully Deleted'})
        })
    })
    .catch(err=>{
        res.status(404).json({error: err.toString()})
    })
});
//--- GET ALL COMMENTS FROM ALL USERS (ADMIN)
app.get('/', (req,res)=> {
    commentService.allComments().then((comment)=>{
        res.json({message: 'Here are the list of all Users:', comment})
    })
    .catch(err=>{
        res.status(404).json({error: err.toString()})
    })
 });

module.exports = {privateCommentService: app,} 