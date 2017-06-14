var express = require('express');
var authRoutes = require('../routers/auth');

module.exports = function () {
    var apiRoutes = express.Router();

    // MiddleWare Unauth
    apiRoutes.use('/auth', authRoutes());
    
    return apiRoutes;
};
