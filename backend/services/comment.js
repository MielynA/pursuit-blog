const db = require('../db/database')
commentService = {}


commentService.createComments = (author,post_id,title,body) => {
    return db.one('INSERT INTO comments (author,post_id,title,body) VALUES(${author},${post_id},${title},${body}) RETURNING id',
    {author,post_id,title,body})
}










module.exports = commentService;