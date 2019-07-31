var authRoute = require('./../components/auth/routes/auth.route');
var router = require('express').Router();

router.route('/auth',authRoute);

module.exports = router;