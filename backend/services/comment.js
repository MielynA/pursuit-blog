const db = require('../db/database')
commentService = {}


commentService.createComments = (author,post_id,title,body) => {
    return db.one('INSERT INTO comments (author,post_id,title,body) VALUES(${author},${post_id},${title},${body}) RETURNING id',
    {author,post_id,title,body})
}


commentService.readComments = (id) => {
   return db.one('SELECT * FROM comments WHERE id =${id}', {id})
}

commentService.updateComments = (id,author,post_id,title,body) => {
    return db.none('UPDATE comments SET author = ${author}, post_id = ${post_id}, title = ${title}, body = ${body} WHERE id = ${id}', 
        {id,author,post_id,title,body})
}
commentService.deleteComments = (id) =>{
    return db.none('DELETE FROM comments WHERE id = ${id}', {id})
}



module.exports = commentService;