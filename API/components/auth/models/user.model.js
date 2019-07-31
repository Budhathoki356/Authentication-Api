var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: String,
    email:{
        type : String,
        unique : true,
        sparse : true
    },
    role : {
        type :Number,
        enum: ['1','2'],
        default : 2
    },
    activeStatus: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

var UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;