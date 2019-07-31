var UserModel = require('../models/user.model');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('./../../../config/index');

function map_user_req(user, userDetails) {
    if (userDetails.username)
        user.username = userDetails.username;
    if (userDetails.password)
        user.password = userDetails.password;
    if (userDetails.email)
        user.email = userDetails.email;
    if (userDetails.role)
        user.role = userDetails.role;
    if (userDetails.activeStatus)
        user.activeStatus = userDetails.activeStatus;
        
    return user;
}

function generateToken(user) {
    var token = jwt.sign({
      _id: user._id
    }, config.jwtSecretKey);
    return token;
  } 

function getUser(data) {
    return new Promise(function(resolve, reject) {
        UserModel.findOne({
            username: data.body.username,
          })
          .exec(function (err, user) {
            if (err) {
              reject(err);
            }
            if (user) {
              var passwordMatch = passwordHash.verify(data.body.password, user.password);
              if (passwordMatch) {
                var token = generateToken(user);
                resolve({
                  user: user,
                  token: token
                });
              } else {
                reject({
                  message: "password didnot match",
                  status: 400
                })
              }
            } else {
              reject({
                message: 'Invalid Username',
                status: 400
              })
            }
        })
    })
}

function registerUser(data) {
    console.log('Request body ==> ', data.body);
    return new Promise(function(resolve, reject) {
        var newUser = new UserModel({});
    
        var newMappedUser = mapUser(newUser, data.body);
        if (data.body.password) {
          newMappedUser.password = passwordHash.generate(data.body.password);
        };
        newMappedUser.save(function (err, done) {
          if (err) {
            reject(err);
          } else {
            resolve(done);
          }
        });
    })
}

module.exports= {
    loginUser : getUser,
    registerUser : registerUser
};