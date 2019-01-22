const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog')

userService = {}

userService.createUser = (username,email,password,token) => {
    return db.one('INSERT INTO users (username,email,password,token) VALUES(${username},${email},${password},${token}) RETURNING id;', {username, email, password, token})
}

userService.readUser = (id) => {
    return db.none('SELECT * FROM users WHERE id = ${id}', {id})
}

userService.updateUser = () => {
    return db.one('UPDATE user SET username = ${username}, email = ${email}, password = ${password}, token =${token}', 
       {username,email,password,token})
}

module.exports = userService;