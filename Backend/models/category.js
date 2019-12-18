const { mongoose } = require('../db/mongodb');

module.exports = mongoose.model('Category',new mongoose.Schema({
    title:String
}))