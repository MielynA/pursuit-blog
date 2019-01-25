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

userService.updateTokenUser = (token,id) =>{
    return db.none('UPDATE users SET token = ${token} WHERE id = ${id}', {id,token})
}

userService.deleteUser = (id) => {
   return db.none('DELETE FROM users WHERE id = ${id}', {id})
}

userService.allUsers = () => {
   return db.any('SELECT * FROM users')
}

userService.readUsersPosts = (id) => {
  return db.any('SELECT users.username, posts.title, posts.body FROM users JOIN posts ON ${id} = posts.author WHERE users.id = ${id}', {id})

}
userService.readUserPost = (user_id, post_id) => {
    return db.any('SELECT users.username, posts.title, posts.body FROM users JOIN posts ON ${user_id} = posts.author WHERE posts.id = ${post_id} AND users.id = ${user_id}',
       {user_id, post_id})
}

userService.readUserComments = (id) =>{
    return db.any('SELECT users.username, comments.title, comments.body FROM users JOIN comments ON ${id} = comments.author WHERE users.id = ${id}', {id})

}
module.exports = userService;