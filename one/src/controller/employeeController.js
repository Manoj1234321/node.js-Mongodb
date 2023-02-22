var mongoose = require('mongoose')
const db = require('../database/db');
const Employee = require('../models/employee')
const multer =  require('multer')
var fs = require('fs');
const path = require('path')


// deleting data

const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByIdAndDelete(id);
        console.log(`Data with id = ${id} has been deleted`);
        res.status(202).send(employee);
    }
    catch (err) {
        console.log("Error while deleting data ", error);
        res.status(204).send(error);
    }

}

// getting data from database

var getData = (async (req, res) => {
    try {
        let allData = await Employee.find({});
        res.status(200).send(allData);
    } catch (err) {
        res.send(err)
    }
})

/// get data by id

var idData = (async (req, res) => {
    try {
        var _id = req.params.id;
        let result = await Employee.findById(_id);
        res.send(result)

    } catch (err) {
        console.log("This is Error ", err)
        res.send(err)
    }
})

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage:Storage
}).single('photo')

const saveData =  (req, res) => {
    upload(req,res,(err)=>{
        if(err){
        }else{

            const employees = new Employee({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                country: req.body.country,
                phonenumber: req.body.phonenumber,
                photo:{
                    data:  req.file.filename, 
                    contentType: 'image/png'
                },
                imagePath:"http://localhost:3000/uploads/"+req.file.filename
            })            
             employees.save((err, result) => {
                if (!err) {
                    console.log("data saved successfully")
                    res.status(201).send(result);
                } else {
                    console.log("error while data saving",err)
                    res.send(err)
                }
            })
        }
    })
    

}

// update employees

const updateEmployee = async (req, res) => {
    try {
        const response = await Employee.findOneAndUpdate({
            _id: req.params.id
        },
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                country: req.body.country,
                phonenumber: req.body.phonenumber
            },
            { new: true }
        )

        res.Status(200).send(response);
    }
    catch (err) {
        res.send(err);
    }
}


//  exporting modules

module.exports = { getData, idData, saveData, deleteData, updateEmployee }