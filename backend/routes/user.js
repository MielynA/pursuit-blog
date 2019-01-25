const app = require('express').Router();
const userService = require('../services/user');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

//--- LOGIN USER (public)
app.post('/login', (req,res)=> {
   const {id, username, password } = req.body; 
   userService.readUser(id).then((user)=>{
       if(username === user.username){
        return bcrypt.compare(password, user.password) 
       }
   })
   .then(response=>{
       if(!response) throw new Error('Input is incorrect')
       const token = uuidv1();
       console.log(id,token)
       userService.updateTokenUser(token,id );
       res.json({
           status: 'Successful',
           token: token
       });
   })
   .catch(err => {
       res.status(400).json({ error: err.toString()})
   })
})

//--- CREATE USER W/ ENCRYPTED PASSWORD (public)
app.post('/', (req,res)=>{
   const {username, email, password, token} = req.body; 
   bcrypt.hash(password,10).then((encryptedPass)=> {
    return userService.createUser(username, email, encryptedPass, token).then((users)=>{
        res.json({users})
      })
   .catch(err=>{
        res.status(404).json({error: err.toString('utf-8')})
      })
   })
});
//--- READ USER (public)
app.get('/:user_id', (req,res)=>{
    const {user_id} =req.params;
    if(!user_id){
        res.json({message: `user ${user_id} does not exist`})
    }
    userService.readUser(user_id).then((userId)=>{
        res.json({userId})
    })
    .catch(err=>{
        res.json({error: err.toString()})
    })
});
//--- UPDATE/EDIT USER (private)
app.put('/:user_id',(req,res)=>{
   const {user_id} = req.params; 
   const {username, email, password, token} = req.body; 
   userService.readUser(user_id).then((data)=>{
       userService.updateUser(user_id, username, email, password, token).then(()=>{
           res.json({message: 'udpated!', data})
       })
       .catch(err=>{
           res.status(404).json({error: err.toString()})
       })
   })
});
//--- DELETE USER (private)
app.delete('/:user_id', (req,res)=>{
  const {user_id} =req.params; 
  const{username, email, password, token} = req.body;
  userService.readUser(user_id).then((data)=>{
    userService.deleteUser(user_id, username, password, email, token).then(()=>{
        res.json({message: 'deleted!', data })
  })
  })
  .catch(err=>{
      res.status(404).json({error: err.toString()})
  })
});
//--- GET ALL USERS 
app.get('/', (req,res)=> {
   userService.allUsers().then((users)=>{
       res.json({message: 'Here are the list of all Users:', users})
   })
   .catch(err=>{
       res.status(404).json({error: err.toString()})
   })
});

//--- GET USER_ID POSTS (public)
app.get('/:user_id/posts', (req,res)=>{
    const {user_id} = req.params;
    userService.readUsersPosts(user_id).then((usersPosts)=>{
        res.json({usersPosts})
    })
    .catch(err=>{
        res.status(404).json({error: err.toString()})
    })
});
//--- GET USER_ID SPECIFIC POST (public)
app.get('/:user_id/posts/:post_id', (req,res)=>{
    const {user_id, post_id} = req.params; 
  userService.readUserPost(user_id,post_id).then((userPost)=>{
      res.json({userPost})
  })
  .catch(err=>{
      res.status(404).json({error: err.toString()})
  })
})
//--- GET USER_ID COMMENTS (public)
app.get('/:user_id/comments', (req,res)=>{
    const {user_id} = req.params; 
    userService.readUserComments(user_id).then((userComment)=>{
        res.json({userComment})
    }) 
    .catch(err=>{
        res.status(404).json({error: err.toString()})
    })
});   
//--- GET COMMENT FROM A SPECIFIC USER_ID
app.get('/:user_id/comments/:comment_id', (req,res)=>{
    const {user_id, comment_id} = req.params; 
  userService.readUserComment(user_id,comment_id).then((userComment)=>{
      res.json({userComment})
  })
  .catch(err=>{
      res.status(404).json({error: err.toString()})
  })
})
module.exports = {
    userService: app,
}