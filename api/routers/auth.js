var express = require('express');
var UserControllers = require('../controllers/UserControllers');
module.exports = function () {
    var routers = express.Router();
    routers.get('/getUser', UserControllers.getUser);
    routers.post('/changePassword', UserControllers.changePassword);
    routers.get('/signOut', UserControllers.signOut);
    return routers;
};