const express = require('express')
const router = express.Router()
const controllerSample = require('../controller/controller')
const foodController = require('../controller/foodscontroller')
const authController = require('../controller/authcontroller')
const foodsmodel = require('../models/foodsModel')
const verifitoken = require('../middleware/verifytoken')

// sample
router.get('/', controllerSample.methodGet)
router.post('/', controllerSample.methodPost)
router.put('/', controllerSample.methodPut)
router.delete('/', controllerSample.methodDelete)


// foods
router.post('/foods', foodController.methodPost)
router.get('/foods', verifitoken, foodController.methodGet)
router.get('/foods/:id', foodController.methodGetId)
router.put('/foods/:id', foodController.methodPut)
router.delete('/foods/:id', foodController.methodDelete)
router.post('/foods/upload', foodController.methoduploadFoods)
router.post('/foods/search', foodController.methodGetCondition)

// auth
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)



module.exports = router