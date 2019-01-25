const db = require('../db/database');
postService = {}


postService.postCreate = (author,title,body) =>{
   return db.one('INSERT INTO posts (author,title,body) VALUES(${author},${title},${body}) RETURNING id',
       {author,title,body})
} 

postService.postRead = (id) =>{
    return db.one('SELECT * FROM posts WHERE id = ${id}', {id})
}

postService.postUpdate = (id,author,title,body) => {
   return db.none('UPDATE posts SET author = ${author}, title = ${title}, body = ${body} WHERE id = ${id}', {id,author,title,body})
}

postService.postDelete = (id) => {
   return db.none('DELETE FROM posts WHERE id = ${id}', {id})

}
postService.commentsPost = (post_id) =>{
    return db.any('SELECT posts.author, posts.title, posts.body, comments.title, comments.body FROM posts JOIN comments ON posts.id = comments.post_id WHERE comments.post_id = ${post_id}',
    {post_id})
}

postService.commentPost = (post_id, comment_id) =>{
   return db.any('SELECT posts.author, posts.title, posts.body, comments.title, comments.body FROM posts JOIN comments ON posts.id = comments.post_id WHERE comments.post_id = ${post_id} AND comments.id = ${comment_id}', 
    {post_id, comment_id})

}
postService.allPosts = () => {
    return db.any('SELECT * FROM posts')
 }



module.exports = postService; 