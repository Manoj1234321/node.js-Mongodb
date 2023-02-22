const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
let Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);
const uniqueValidator = require('mongoose-unique-validator')
const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },

    phonenumber: {
        type: String,
        required: true,
        unique: true
    },
    photo:{
        data: Buffer,
        contentType:String
    },
    imagePath:{
        type: String,
        required: true,
    }
})
employeeSchema.plugin(uniqueValidator)
employeeSchema.plugin(autoIncrement.plugin, {
    model: 'employee',
    field: '_id',
    startAt: 1,
    incrementedBy: 1
})

//  Creating the model

const Employee = mongoose.model('employee', employeeSchema)

module.exports = Employee