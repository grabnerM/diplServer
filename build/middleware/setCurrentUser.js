"use strict";
var getUserFromToken = require("../getUserFromToken");
module.exports = function setCurrentUser(req, res, next) {
    // grab authentication token from req header
    var token = req.header("authorization");
    // look up the user based on the token
    var user = getUserFromToken(token).then(function (user) {
        // append the user object the the request object
        req.user = user;
        // call next middleware in the stack
        next();
    });
};
