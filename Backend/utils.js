function loginCheck(req, res, next) {
    if (!req.session.userInfo) {
        res.status(200).json({ success: false, message: 'please login.', data: null })
    } else {
        next()
    }
}

module.exports = loginCheck