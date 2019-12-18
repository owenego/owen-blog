const { mongoose } = require('../db/mongodb');

module.exports = mongoose.model('Blog',new mongoose.Schema({
    title: String,
    body:String,
    author:String,
    category:String,
    tags:[{title:String}],
    date:{type:Date,default:Date.now},
    hidden:Boolean,
    reviews: [{author:String,review:String,date: Date}]
}))