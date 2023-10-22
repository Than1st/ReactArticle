const usersRouter = require('express').Router()
const usersController = require('../controllers/UsersController')
usersRouter.get('/', usersController.getUsers)
usersRouter.post('/register', usersController.createUsers)
usersRouter.post('/login', usersController.loginUsers)
usersRouter.get('/detail/:id', usersController.detailUsers)
usersRouter.put('/update/:id', usersController.updateUsers)
usersRouter.delete('/delete/:id', usersController.deleteUsers)
module.exports = usersRouter