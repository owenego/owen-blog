var Category = require('../models/category')
var Blog = require("../models/blog");
var router = require('express').Router();

router.post('/clear', (req, res) => {
    Category.deleteMany()
        .then(data => {
            res.json({ success: true, message: 'Succeed to clear.' })
        })
        .catch(err => {
            res.json({ success: false, message: 'Failed to clear.' })
        })
})


router.get('/blogs', (req, res) => {
    Blog.aggregate([
        {
            "$group": {
                _id: "$category",
                count: {
                    $sum: 1
                },
                category: { "$first": "$category" }
            }
        },
        {
            $sort: {
                count: -1,
            }
        },
        {
            $project: {
                _id: 0,
                count: 1,
                category: 1,
            }
        }]).then(data => {
            res.json({
                success: true,
                data
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: "Fail to get categoried blogs."
            })
        })
})

router.route('/')
    .get((req, res) => {// View all categories
        try {
            Category.find({}, function (err, categories) {
                res.json({
                    success: true,
                    data: categories
                })
            })
                .catch(err => {
                    res.json({
                        success: false,
                        message: err ? err : "Fail to get categories."
                    })
                })
        } catch (err) {
            res.json({
                success: false,
                message: err ? err : "Fail to get categories."
            })
        }
    })
    .post((req, res) => { // new 
        try {
            var { title } = req.body;
            new Category({ title }).save(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        message: "Fail to add category"
                    })
                }
            })
            res.json({ success: true, message: "success to add category" })

        } catch (err) {
            res.json({ success: false, message: "Fail to add category" })
        }
    })
    .put((req, res) => {// Update a category
        var { title, newtitle } = req.body;
        Category.findOneAndUpdate({ title: title }, { title: newtitle }, function (err, category) {
            if (err) {
                res.json({
                    success: false, message: "Fail to update category"
                })
            }
        })
        res.json({ success: true, message: "Success to update category" })
    })
    .delete((req, res) => {// Delete a category
        try {
            var { _id, title } = req.body;
            Category.deleteOne({ $or: [{ _id }, { title }] }, function (err) {
                if (err) {
                    res.json({
                        success: false, message: "Fail to delete category"
                    })
                }
            })
            res.json({ success: true, message: "Success to delete category" })
        } catch (error) {
            res.json({
                success: false, message: "Fail to delete category"
            })
        }
    })

module.exports = router;