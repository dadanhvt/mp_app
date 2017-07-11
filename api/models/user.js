var mongoose = require('mongoose');
var constants = require('../configs/index');
var bcrypt = require('bcrypt-nodejs');
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

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('local.password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.local.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.local.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.local.password, function(err, isMath){
        if(err){
            return cb(err);
        }
        cb(null, isMath);
    });
};

mongoose.model('User', UserSchema);