var Blog = require("../models/blog");
var router = require("express").Router();
// var loginCheck = require('../utils')

router.post('/clear', (req, res) => {
    Blog.deleteMany()
        .then(data => {
            res.json({ success: true, message: 'Succeed to clear.' })
        })
        .catch(err => {
            res.json({ success: false, message: 'Failed to clear.' })
        })
})


router.get('/:_id', (req, res) => {
    var { _id } = req.params;
    Blog.findOne({_id}, function (err, data) {
        res.json({
            success: true,
            data
        })
    })
})
router.post('/review', (req, res) => {
    try {        
        var { _id, author, review, title } = req.body;
        Blog.findOne({ $or: [{_id},{title}] })
            .then(data => {
                const reviews = data.reviews ? data.reviews : []
                reviews.unshift({
                    author,
                    review,
                    date: Date.now()
                })
    
                return Blog.updateOne({ $or: [{_id},{title}] }, {reviews})
            })
            .then(data => {
                res.json({ success: true, data, message: 'Succeed to add a review' })
            })
            .catch(err => {
                res.json({ success: false, message: 'failed to add a review.' })
            })
    } catch (error) {
        res.json({ success: false, message: error })
    }
})

router.route('/')
    .get((req, res) => {
        var { category } = req.query;
        var Objective = {};
        if (category) {
            var reg = new RegExp('^' + category + '$');
            Objective = { category: reg }
        }
        Blog.find(Objective)
        .sort({date:-1})
        .then(blogs => {
            res.json({
                success: true,
                data: blogs
            })
        })
    })
    .post((req, res) => { // new blog
        var { title, body, author, tags, hidden, category } = req.body;
        if (title.length < 3) {
            res.json({
                success: false,
                message: "The length of title should more than 3"
            })
            return
        }
        new Blog({
            title,
            body,
            author,
            tags: tags.split(",").map(title =>({title})),
            hidden,
            category
        }).save(function (err) {
            if (err) {
                res.json({ success: false, message: "Fail to publish" })
                return
            };
            res.json({ success: true, message: "Succeed to publish" })
        })
    })
    .put((req, res) => {
        var { title, newTitle, body, newBody, author, newAuthor } = req.body;
        if (newTitle.length < 3) {
            res.json({
                success: false,
                message: "The length of title should more than 3"
            })
        }
        Blog.updateOne({
            title: title,
            body: body,
            author: author
        }, {
            title: newTitle,
            body: newBody,
            author: newAuthor
        }, function (err, blog) {
            if (err) {
                res.json({
                    success: false,
                    message: "Fail to update"
                })
            }
        });
        res.json({
            success: true,
            message: "Succeed to update"
        })

    })
    .delete((req, res) => { // delete a blog
        var { _id, title } = req.body;
        Blog.deleteOne({ $or: [{_id},{title}] }, function (err) {
            if (err) {
                res.json({
                    success: false, message: "Fail to delete"
                })
            }
        })
        res.json({ success: true, message: "Succeed to delete" })
    })

module.exports = router;