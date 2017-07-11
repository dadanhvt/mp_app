var mongoose = require('mongoose');
var User = mongoose.model("User");
exports.getUser = function (req, res) {
  var session = req.session;
  User.findOne({
    '_id': session.user.id
  }, function (err, user) {
    if (err) throw err;
    res.json({ success: true, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, gender: user.gender } });
  });
}
exports.changePassword = function (req, res) {
  if (!req.body.new_password || !req.body.password) {
    res.json({ success: false, msg: 'CHANGE_PASSWORD.MISSING' });
  } else {
    User.findOne({
      '_id': req.session.user.id
    }, function (err, user) {
      user.comparePassword(req.body.password, function (err, isMath) {
        if (isMath && !err) {
          user.local.password = req.body.new_password;
          user.save(function (err) {
            if (err) {
              res.json({ success: false, msg: err });
            } else {
              res.json({ success: true, msg: 'CHANGE_PASSWORD.SUCCESS' });
            }
          });
        } else {
          res.json({ success: false, msg: "CHANGE_PASSWORD.WRONG_PASSWORD" });
        }
      });
    });
  }
}
exports.signOut = function(req, res){
  req.session.user = undefined;
  res.json({success: true});
}