const {Article, Users} = require('../models')
const {where} = require("sequelize");
class ArticleController {
    static async getArticle (req, res, next){
        try {
            const result = await Article.findAll({where: {status: true}, order: [['id','DESC']], include: [Users]})
            res.status(200).json(result)
        } catch (e) {
            res.status(400).json(e)
        }
    }
    static async detailArticle (req, res, next){
        try {
            const result = await Article.findAll({where: {id: req.params.id}, include: [Users]})
            result ?
                res.status(200).json(result) :
                res.status(400).json({message: `Article ID ${req.params.id} not found.`})
        } catch (e) {
            res.status(400).json(e)
        }
    }
    static async userArticle (req, res, next){
        try {
            const result = await Article.findAll({order:[['id', 'DESC']],include: {model: Users, where: {id:req.params.id}}})
            result ?
                res.status(200).json(result) :
                res.status(400).json({message: `User ID ${req.params.id} not found.`})
        } catch (e) {
            res.status(400).json(e)
        }
    }
    static async createArticle (req, res, next){
        try {
            const {title, content, status, image, userid} = req.body
            const result = await Article.create({
                title: title,
                content: content,
                status: status,
                image: image? image:"https://via.placeholder.com/100",
                UserId: userid? userid:1
            })
            res.status(200).json(result)
        } catch (e) {
            res.status(400).json(e)
        }
    }
    static async updateArticle (req, res, next){
        try {
            const {title, content, status, image, userid} = req.body
            const result = await Article.update({
                title: title,
                content: content,
                status: status,
                image: image? image:"https://via.placeholder.com/100",
                UserId: userid? userid:1
            },{
                where: {id: req.params.id}
            })
            result[0] === 1 ?
                res.status(200).json({message: `Article ID ${req.params.id} has been updated`}) :
                res.status(400).json({message: `Article ID ${req.params.id} has not been updated`})
        } catch (e) {
            res.status(400).json(e)
        }
    }
    static async deleteArticle (req, res, next){
        try {
            const result = await Article.destroy({where:{id:req.params.id}})
            result === 1 ?
                res.status(200).json({message: `Article ID ${req.params.id} has been deleted.`}) :
                res.status(400).json({message: `Article ID ${req.params.id} has not been deleted.`})
        } catch (e) {
            res.status(400).json(e)
        }
    }
}

module.exports = ArticleController