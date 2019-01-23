const app = require('express').Router();
const userService = require('../services/user');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
//--- LOGIN USER 

//--- CREATE USER W AUTH
app.post('/', (req,res)=>{
   const {username, email, password, token} = req.body; 

   bcrypt.hash(password,10).then((encryptedPass)=>{
   
    return userService.createUser(username, email, encryptedPass, token).then((users)=>{
        res.json({users})
      })
   .catch(err=>{
        res.status(404).json({error: err.toString('utf-8')})
      })
   })
});
//--- READ USER
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
//--- UPDATE/EDIT USER
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
//--- DELETE USER
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
module.exports = {
    userService: app,
}