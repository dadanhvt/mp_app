var express = require('express');
var unAuthRoutes = require('../routers/unauth');
var authRoutes = require('../routers/auth');
var MiddleWare = require('../routers/middleware');

module.exports = function () {
    var apiRoutes = express.Router();

    apiRoutes.use('/auth', MiddleWare.unauth, unAuthRoutes());

    apiRoutes.use('', MiddleWare.auth, authRoutes());
    
    return apiRoutes;
};
