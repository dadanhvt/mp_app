var mongoose = require('mongoose');
var constants = require('../configs/index');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    local: {
        userName: [{
            type: String
        }],
        password: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String
        },
        name: {
            type: String
        },
        token: {
            type: String
        },
        avatar: {
            type: String
        }
    },
    firstName: {
        type: String,
        maxlength: 30
    },
    lastName: {
        type: String,
        maxlength: 30
    },
    avatar: {
        type: String
    },
    businessName: {
        type: String,
        maxlength: 250
    },
    role: {
        type: String,
        enum: [constants.ROLE_MEMBER, constants.ROLE_BUSINESS, constants.ROLE_ADMIN],
        default: constants.ROLE_MEMBER
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'O'],
        default: 'O'
    },
    birth: {
        type: Date
    },
    localtion: {
        long: {
            type: String
        },
        let: {
            type: String
        },
        address: {
            type: String
        }
    }
},
  {
    timestamps: true
  });

module.exports = mongoose.model('User', UserSchema);