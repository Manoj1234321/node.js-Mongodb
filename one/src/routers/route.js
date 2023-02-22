var express = require('express')
var logIncontroller = require('../controller/loginSignController')
var employeesController = require('../controller/employeeController')
var app = express()
const middleware = require('../middleware/middleware')

// post Data
app.post('/login',logIncontroller.logInData);

// getData
app.get('/allemployees',employeesController.getData);

// getData by id
app.get('/getemployee/:id',middleware.authenticateUser,employeesController.idData)


// save data

app.post('/addemployee', employeesController.saveData);

// signUp

app.post('/signup', logIncontroller.signUp)

// delete employee

app.delete('/deleteemployee/:id',  employeesController.deleteData)

// update employee

app.put('/updateemployee/:id',  employeesController.updateEmployee)


module.exports = app;