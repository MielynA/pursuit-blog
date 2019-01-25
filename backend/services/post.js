const db = require('../db/database');
postService = {}


postService.postCreate = (id,author,title,body) =>{
   return db.one('INSERT INTO posts (id,author,title,body) VALUES id =${id}, author = ${author}, title = ${title}, body = ${body}',
       {id,author,title,body})
} 

postService.postRead = (id) =>{
    return db.none('SELECT * FROM posts WHERE id = ${id}', {id})
}

postService.postUpdate = (id,author,title,body) => {
   return db.none('UPDATE posts SET author = ${author}, title = ${title}, body = ${body} WHERE id = ${id}', {id,author,title,body})
}

postService.postDelete = () => {
   return db.none('DELETE FROM posts WHERE = ${id}', {id})

}
userService.allPosts = () => {
    return db.any('SELECT * FROM users')
 }



module.exports = postService; 