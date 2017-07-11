var express = require('express');
var AuthenticationControllers = require('../controllers/AuthenticationControllers');
module.exports = function () {
    var routers = express.Router();
    routers.post('/signIn', AuthenticationControllers.signIn);
    routers.post('/signUp', AuthenticationControllers.signUp);
    routers.post('/gotPassword', AuthenticationControllers.gotPassword);
    return routers;
};