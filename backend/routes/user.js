const app = require('express').Router();
const userService = require('../services/user');


app.post('/', (req,res)=>{
   const {username, email, password, token} = req.body; 
   userService.createUser(username, email, password, token).then((users)=>{
        res.json({users})
   })
   .catch(err=>{
        res.status(404).json({error: err.toString()})
   })
});
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

app.put('/:user_id',(req,res)=>{
   const {user_id} = req.params; 
   const {username, email, password, token} = req.body; 
   userService.readUser(user_id).then((data)=>{
       console.log("did you actually retrive data?", data)
       userService.updateUser(user_id, username, email, password, token).then(()=>{
           res.json({message: 'udpated!', data})
       })
       .catch(err=>{
           res.status(404).json({error: err.toString()})
       })
   })
});

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
})
module.exports = {
    userService: app,
}