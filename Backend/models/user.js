const { mongoose } = require('../db/mongodb');

module.exports = mongoose.model('User', new mongoose.Schema({
    name: String,
    password: String,
    admin: Boolean
}))