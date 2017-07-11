var mongoose = require('mongoose');
var config = require('../configs/index');
var User = mongoose.model("User");
exports.signIn = function (req, res){
    User.findOne({
        'local.userName': req.body.email
    }, function(err, user){
        if(err) throw err;
        if(!user){
            return res.status(403).send({success: false, msg: 'SIGNIN.FAIL'});
        }else{
            user.comparePassword(req.body.password, function(err, isMath){
                if(isMath && !err){
                    req.session.user = {};
                    req.session.user.id = user.id;
                    req.session.user.firstName = user.firstName;
                    req.session.user.lastName = user.lastName;
                    req.session.user.role = user.role;
                    if(req.body.remember && req.body.remember == true){
                        req.session.cookie.maxAge = config.sessionExpire;
                    }else{
                        req.session.cookie.maxAge = false;
                    }

                    return res.json({success: true, user: {id: user._id, firstName: user.firstName, lastName: user.lastName, gender: user.gender}});
                }else{
                    return res.status(403).send({success: false, msg: 'SIGNIN.FAIL'});
                }
            });
        }
    });
}
exports.signUp = function(req, res){
    if(!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.password){
        res.json({success: false, msg: 'SIGNUP.MISSING'});
    }else{
        var newUser = new User({
            local: {
                userName: req.body.email,
                password: req.body.password 
            },
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            role: config.ROLE_MEMBER,
            gender: req.body.gender
        });
        newUser.save(function(err){
            if(err){
                res.json({success: false, msg: err});
            }else{
                res.json({success: true, msg: 'SIGNUP.SUCCESS'});
            }
        });
    }
}
exports.gotPassword = function(req, res){
    //tu tu tinh
}