const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const projectController = require('../Controllers/projectController')
const multerConfig = require('../Middlewares/multerMiddleware')
// register API
router.post('/user/register',userController.register)
// login
router.post('/user/login',userController.login)
// add projects
router.post('/projects/add',jwtMiddleware,multerConfig.single('projectimage'),projectController.addProjects)
// getuserprojects  token required
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)
// getallprojects token required
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)
// gethomeprojects
router.get('/projects/home-projects',projectController.getHomeProjects)
// editproject
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectimage"),projectController.editProjectController)
// delete project
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)


// export router
module.exports = router