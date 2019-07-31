var authQuery = require('../queries/auth.queries');

function oldUser(req,res,next) {
    var data = req.body;

    authQuery.loginUser(data)
    .then(function(data) {
        res.status(400).json(data);
    })
    .catch(function(err) {
        next(err);
    })
}

function newUser(req,res,next) {
    var data = req.body;

    authQuery.registerUser(data)
    .then(function(data) {
        res.status(400).json(data);
    })
    .catch(function(err) {
        next(err);
    })
}

module.exports = {
    oldUser : oldUser,
    newUser : newUser
}

