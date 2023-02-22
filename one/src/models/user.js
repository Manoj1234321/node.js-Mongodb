const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
let Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);
const userSchema = new Schema ({
    username:{
        type : String,
        required : true
    },
    password:{
        type: String,
        required : true
    }
})

userSchema.plugin(autoIncrement.plugin,{
    model: 'user',
    field: '_id',
    startAt: 1,
    incrementedBy: 1
})

//  Creating the model

const User = mongoose.model('user',userSchema)

module.exports = User