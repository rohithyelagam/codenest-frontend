const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    firstName: String,
    lastName: String,
    email:String,
    password: String
});

module.exports = mongoose.model('spark_users',user);