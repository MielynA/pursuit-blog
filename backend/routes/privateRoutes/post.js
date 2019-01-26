const app = require('express').Router();
const postService = require('../../services/post_services')

//--- CREATE POSTS (private)
app.post('/', (req,res)=>{
    const {author,title,body} = req.body;
    postService.postCreate(author,title,body).then((posts)=>{
        res.json({postadded: posts})
    })
    .catch(err=>{
        res.status(404).json({error: err.toString('utf-8')})
      })
})

//--- UPDATE/EDIT POST (private)
app.put('/:post_id',(req,res)=>{
    const {post_id} = req.params; 
    const {author,title,body} = req.body; 
    postService.postRead(post_id).then((data)=>{
        postService.postUpdate(post_id, author,title,body).then(()=>{
            res.json({message: 'udpated!', data})
        })
        .catch(err=>{
            res.status(404).json({error: err.toString()})
        })
    })
 });
 

 //--- DELETE POST (private)
 app.delete('/:post_id', (req,res)=>{
     const {post_id} = req.params;
     const {author,title,body} = req.body;
      postService.postRead(post_id).then((post)=>{
        postService.postDelete(author,title,body).then(()=>{
            res.json({message: 'deleted!', post })
      })  
     })
     .catch(err=>{
         res.status(404).json({error: err.toString()})
     })
 })

 //--- GET ALL POSTS FROM ALL AUTHORS (admin)
 app.get('/', (req,res)=>{
     postService.allPosts().then((allPosts)=>{
         res.json({message: 'here are all the posts from all the authors', allPosts})
     })
     .catch(err=>{
         res.status(404).json({error: err.toString()})
     })
 })

module.exports = {
    postService: app,
}