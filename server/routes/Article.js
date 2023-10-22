const articleRouter = require('express').Router()
const articleController = require('../controllers/ArticleController')
articleRouter.get('/', articleController.getArticle)
articleRouter.post('/create', articleController.createArticle)
articleRouter.get('/detail/:id', articleController.detailArticle)
articleRouter.get('/users/:id', articleController.userArticle)
articleRouter.put('/update/:id', articleController.updateArticle)
articleRouter.delete('/delete/:id', articleController.deleteArticle)
module.exports = articleRouter