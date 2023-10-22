const route = require('express').Router()
route.get('/', (req, res, next)=>{
    res.json({message: "Welcome"})
})
const usersRouter = require('./Users')
const articleRouter = require('./Article')
route.use('/users', usersRouter)
route.use('/article', articleRouter)
module.exports = route