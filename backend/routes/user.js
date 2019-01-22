const app = require('express').Router();
const userService = require('../services/user');


app.post('/', (req,res)=>{
   const {username, email, password, token} = req.body; 
   userService.createUser(username, email, password, token).then((users)=>{
        res.json({users})
   })
   .catch(err=>{
        res.json({error: err.toString()})
   })
});




module.exports = {
    userService: app,
}