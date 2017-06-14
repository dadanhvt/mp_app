var express = require('express');
var UserControllers = require('../controllers/UserControllers');
module.exports = function () {
    var routers = express.Router();
    routers.get('/test', UserControllers.login);
    return routers;
};