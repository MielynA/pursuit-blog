const app = require('express').Router();
const userService = require('../../services/user_services');
 const bcrypt = require('bcrypt');
// const uuidv1 = require('uuid/v1');

//--- MIDDLEWARE FOR CHECKING USER TOKEN
app.use(userService.checkForToken);

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
      if(data.token){
          next()
      }
          userService.deleteUser(user_id, username, password, email, token).then(()=>{
            res.json({message: 'deleted!', data })
      
  })
  })
  .catch(err=>{
      res.status(404).json({error: err.toString()})
  })
});
//--- GET ALL USERS (admin)
app.get('/', (req,res)=> {
   userService.allUsers().then((users)=>{
       res.json({message: 'Here are the list of all Users:', users})
   })
   .catch(err=>{
       res.status(404).json({error: err.toString()})
   })
});


module.exports = {
    privateUserService: app,
}