var router = require('express').Router();
var authCtrl = require('./../controllers/auth.controller');

router.route('/')
    .get(function (req, res, next) {
        res.render('index');
    })

router.route('/login')
    .post(authCtrl.oldUser)

router.route('/register')
    .post(authCtrl.newUser)

module.exports = router;
