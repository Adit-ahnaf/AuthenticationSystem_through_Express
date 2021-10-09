const mongoose = require('mongoose');
const testSchema  = mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

module.exports = testSchema;