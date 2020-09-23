"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sendercontroller_1 = require("./controller/sendercontroller");
var receivercontroller_1 = require("./controller/receivercontroller");
require('crypto').randomBytes(64).toString('hex');
require('dotenv').config();
process.env.TOKEN_SECRET;
var verify = require('./middleware/setCurrentUser').verify;
var serveIndex = require('serve-index');
var server = express_1.default();
var jwt = require("jsonwebtoken");
server.use(express_1.default.json());
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
server.get('/api/echo', verify);
function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    var authHeader = req.headers['authorization'];
    console.log(authHeader);
    var token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null)
        return res.sendStatus(401); // if there isn't any token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        console.log(err);
        if (err)
            return res.sendStatus(403);
        req.body = user;
        next(); // pass the execution off to whatever request the client intended
    });
}
server.use(function (req, res, next) {
    console.log('Time: ', new Date(Date.now()));
    next();
});
server.get('/getToken/:email', function (req, res) {
    res.send(generateAccessToken(req.params.email));
});
function generateAccessToken(email) {
    // expires after half and hour (1800 seconds = 30 minutes)
    var payload = {
        "email": email
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 1800 });
}
server.use('/sender', sendercontroller_1.SenderController.handler());
server.use('/receiver', receivercontroller_1.ReceiverController.handler());
server.get('/api/echo', function (req, res) {
    res.send('Hello Node');
});
server.get('/api/message', function (req, res) {
    res.send('Hello Message');
});
var port = 8080;
server.listen(port, function () {
    console.log('API is listening on port ' + port);
});
console.log('helloWorld');
