const db = require('../db/database')
userService = {}

userService.createUser = (username,email,password,token) => {
    return db.one('INSERT INTO users (username,email,password,token) VALUES(${username},${email},${password},${token}) RETURNING id;', {username, email, password, token})
}

userService.readUser = (id) => {
    return db.one('SELECT * FROM users WHERE id = ${id} ', {id})
}

userService.updateUser = (id,username,email,password,token) => {
    return db.none('UPDATE users SET username = ${username}, email = ${email}, password = ${password}, token =${token} WHERE id = ${id}', 
       {id,username,email,password,token})
}

userService.deleteUser = (id) => {
   return db.none('DELETE FROM users WHERE id = ${id}', {id})
}

userService.allUsers = () => {
   return db.any('SELECT * FROM users')
}
module.exports = userService;